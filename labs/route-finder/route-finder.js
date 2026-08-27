(() => {
    const demoMode = new URLSearchParams(window.location.search).get("demo") === "1";
    const state = {
        criteria: null,
        locations: { origin: null, destination: null },
        locationCache: new Map(),
        results: [],
        selected: new Set(),
        searchDebounce: null,
        sortBy: "practical"
    };

    const elements = {
        form: document.getElementById("route-search-form"),
        origin: document.getElementById("origin"),
        destination: document.getElementById("destination"),
        originList: document.getElementById("originCityOptions"),
        destinationList: document.getElementById("destinationCityOptions"),
        originSelected: document.getElementById("originSelected"),
        destinationSelected: document.getElementById("destinationSelected"),
        departureDate: document.getElementById("departureDate"),
        travellers: document.getElementById("travellers"),
        rankingPreference: document.getElementById("rankingPreference"),
        sortResults: document.getElementById("sortResults"),
        nearbyAirports: document.getElementById("nearbyAirports"),
        airportRadius: document.getElementById("airportRadiusKm"),
        resultsList: document.getElementById("results-list"),
        resultsHeading: document.getElementById("results-heading"),
        resultsSummary: document.getElementById("results-summary"),
        fareStatus: document.getElementById("fare-status"),
        comparisonPanel: document.getElementById("comparison-panel"),
        comparisonGrid: document.getElementById("comparison-grid"),
        clearComparison: document.getElementById("clearComparison")
    };

    const fallbackLocations = [
        place("Berlin", "Berlin", "Germany", "city", "BER", 52.5234051, 13.4113999, "fallback:berlin", "Brandenburg"),
        place("Zagreb", "Zagreb", "Croatia", "city", "ZAG", 45.815011, 15.981919, "fallback:zagreb", "Franjo Tudman"),
        place("Rome", "Rome", "Italy", "city", "ROM", 41.9027835, 12.4963655, "fallback:rome", "Fiumicino / Ciampino"),
        place("Paris", "Paris", "France", "city", "PAR", 48.856614, 2.3522219, "fallback:paris", "Charles de Gaulle / Orly"),
        place("Bangkok", "Bangkok", "Thailand", "city", "BKK", 13.7563309, 100.5017651, "fallback:bangkok", "Suvarnabhumi / Don Mueang"),
        place("Hua Hin", "Hua Hin", "Thailand", "city", "HHQ", 12.5683747, 99.9576888, "fallback:hua-hin", "Hua Hin"),
        place("Hanoi", "Hanoi", "Vietnam", "city", "HAN", 21.0277644, 105.8341598, "fallback:hanoi", "Noi Bai"),
        place("Da Nang", "Da Nang", "Vietnam", "city", "DAD", 16.0544068, 108.2021667, "fallback:da-nang", "Da Nang"),
        place("Tokyo", "Tokyo", "Japan", "city", "TYO", 35.6764225, 139.650027, "fallback:tokyo", "Haneda / Narita"),
        place("Osaka", "Osaka", "Japan", "city", "OSA", 34.6937249, 135.5022535, "fallback:osaka", "Kansai / Itami")
    ];

    function place(name, city, country, type, iataCode, latitude, longitude, providerId, nearbyAirport) {
        return { name, city, country, type, iataCode, latitude, longitude, providerId, nearbyAirport };
    }

    function routeCandidate({ id, title, status, modes, routeSteps, facts, warnings, source, retrievedAt, durationMinutes = null, distanceKm = null, practicality = 50 }) {
        return { id, title, status, modes, routeSteps, facts, warnings, source, retrievedAt, durationMinutes, distanceKm, practicality };
    }

    function escapeHtml(value) {
        const div = document.createElement("div");
        div.textContent = String(value ?? "");
        return div.innerHTML;
    }

    function formatTimestamp(date = new Date()) {
        return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(date);
    }

    function setDefaultDate() {
        const date = new Date();
        date.setDate(date.getDate() + 21);
        elements.departureDate.value = date.toISOString().slice(0, 10);
    }

    function duration(minutes) {
        if (!Number.isFinite(minutes)) return "Unavailable";
        const rounded = Math.round(minutes);
        const hours = Math.floor(rounded / 60);
        const mins = rounded % 60;
        if (!hours) return `${mins}m`;
        if (!mins) return `${hours}h`;
        return `${hours}h ${mins}m`;
    }

    function distance(km) {
        return Number.isFinite(km) ? `${Math.round(km)} km` : "Unavailable";
    }

    function optionValue(location) {
        const code = location.iataCode ? ` (${location.iataCode})` : "";
        return `${location.name}${code}, ${location.country}`;
    }

    function describeLocation(location) {
        if (!location) return "Select a city, airport or station suggestion.";
        const code = location.iataCode ? ` · ${location.iataCode}` : "";
        const airport = location.nearbyAirport ? ` · Nearby airport: ${location.nearbyAirport}` : "";
        return `${location.type}${code} · ${location.country}${airport}`;
    }

    function seedOptions(list, locations) {
        list.innerHTML = locations.slice(0, 24).map((location) => {
            const value = optionValue(location);
            state.locationCache.set(value, location);
            return `<option value="${escapeHtml(value)}">${escapeHtml(describeLocation(location))}</option>`;
        }).join("");
    }

    function normalizeTravelpayoutsPlace(raw) {
        const coords = raw.coordinates || {};
        return place(
            raw.name,
            raw.name,
            raw.country_name,
            raw.type || "city",
            raw.code || "",
            Number(coords.lat),
            Number(coords.lon),
            `travelpayouts:${raw.id || raw.code || raw.name}`,
            raw.main_airport_name || ""
        );
    }

    function normalizeOpenMeteoPlace(raw) {
        return place(raw.name, raw.name, raw.country, "city", "", Number(raw.latitude), Number(raw.longitude), `open-meteo:${raw.id}`, "");
    }

    async function searchTravelpayoutsLocations(query) {
        const params = ["city", "airport"].map((type) => `types[]=${encodeURIComponent(type)}`).join("&");
        const url = `https://autocomplete.travelpayouts.com/places2?term=${encodeURIComponent(query)}&locale=en&${params}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Travelpayouts autocomplete returned ${response.status}`);
        const data = await response.json();
        return data.map(normalizeTravelpayoutsPlace).filter((location) => location.name && location.country);
    }

    async function searchOpenMeteoLocations(query) {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=en&format=json`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Open-Meteo returned ${response.status}`);
        const data = await response.json();
        return (data.results || []).map(normalizeOpenMeteoPlace);
    }

    async function searchLocations(query) {
        if (query.length < 2) return fallbackLocations;
        const [tp, om] = await Promise.allSettled([searchTravelpayoutsLocations(query), searchOpenMeteoLocations(query)]);
        const results = [
            ...(tp.status === "fulfilled" ? tp.value : []),
            ...(om.status === "fulfilled" ? om.value : [])
        ];
        const unique = new Map();
        results.forEach((location) => unique.set(`${location.name}-${location.country}-${location.type}-${location.iataCode}`, location));
        return unique.size ? Array.from(unique.values()) : fallbackLocations.filter((location) => optionValue(location).toLowerCase().includes(query.toLowerCase()));
    }

    function pickLocation(input, key, statusElement) {
        const selected = state.locationCache.get(input.value);
        if (!selected) {
            state.locations[key] = null;
            statusElement.textContent = "Select one of the structured suggestions.";
            return null;
        }
        state.locations[key] = selected;
        input.value = optionValue(selected);
        statusElement.textContent = describeLocation(selected);
        return selected;
    }

    async function resolveTypedLocation(input, list, key, statusElement) {
        const selected = pickLocation(input, key, statusElement);
        if (selected) return selected;
        const query = input.value.trim();
        if (query.length < 2) return null;
        statusElement.textContent = "Resolving typed location...";
        const matches = await searchLocations(query);
        seedOptions(list, matches);
        const normalized = query.toLowerCase();
        const best = matches.find((location) => optionValue(location).toLowerCase() === normalized)
            || matches.find((location) => location.name.toLowerCase() === normalized)
            || matches[0]
            || null;
        if (!best) {
            state.locations[key] = null;
            statusElement.textContent = "No structured location found.";
            return null;
        }
        state.locations[key] = best;
        input.value = optionValue(best);
        statusElement.textContent = `${describeLocation(best)} · auto-resolved`;
        return best;
    }

    function attachLocationControl(input, list, key, statusElement) {
        let debounce = null;
        input.addEventListener("input", () => {
            state.locations[key] = null;
            statusElement.textContent = "Searching locations...";
            window.clearTimeout(debounce);
            debounce = window.setTimeout(async () => {
                try {
                    seedOptions(list, await searchLocations(input.value.trim()));
                    pickLocation(input, key, statusElement);
                } catch (error) {
                    seedOptions(list, fallbackLocations);
                    statusElement.textContent = "Location search failed. Fallback list shown.";
                }
            }, 250);
        });
        input.addEventListener("change", () => pickLocation(input, key, statusElement));
    }

    function collectCriteria() {
        return {
            originText: elements.origin.value.trim(),
            destinationText: elements.destination.value.trim(),
            origin: state.locations.origin,
            destination: state.locations.destination,
            departureDate: elements.departureDate.value,
            travellers: Number(elements.travellers.value),
            cabinBag: document.getElementById("cabinBag").checked,
            checkedBag: document.getElementById("checkedBag").checked,
            nearbyAirports: elements.nearbyAirports.checked,
            maxTransfers: Number(document.getElementById("maxTransfers").value),
            overnightAllowed: document.getElementById("overnightAllowed").checked,
            separateTicketsAllowed: document.getElementById("separateTicketsAllowed").checked,
            rankingPreference: elements.rankingPreference.value
        };
    }

    function validate(criteria) {
        const errors = {};
        if (!criteria.originText) errors.origin = "Choose a starting city or airport.";
        if (!criteria.destinationText) errors.destination = "Choose a destination city or airport.";
        if (!criteria.origin) errors.origin = "Select a structured origin suggestion.";
        if (!criteria.destination) errors.destination = "Select a structured destination suggestion.";
        if (criteria.origin && criteria.destination && optionValue(criteria.origin) === optionValue(criteria.destination)) {
            errors.destination = "Choose a different destination.";
        }
        if (!criteria.departureDate) errors.departureDate = "Choose a departure date.";
        if (!Number.isInteger(criteria.travellers) || criteria.travellers < 1 || criteria.travellers > 8) {
            errors.travellers = "Use 1 to 8 travellers.";
        }
        document.querySelectorAll(".field-error").forEach((element) => {
            element.textContent = errors[element.dataset.errorFor] || "";
        });
        return Object.keys(errors).length === 0;
    }

    async function getRoadEstimate(origin, destination) {
        if (![origin.latitude, origin.longitude, destination.latitude, destination.longitude].every(Number.isFinite)) return null;
        const url = `https://router.project-osrm.org/route/v1/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?overview=false&alternatives=false&steps=false`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`OSRM returned ${response.status}`);
        const data = await response.json();
        const route = data.routes?.[0];
        if (!route) return null;
        return { durationMinutes: route.duration / 60, distanceKm: route.distance / 1000, source: "OSRM public demo server using OpenStreetMap road data" };
    }

    function locationLabel(location) {
        const code = location.iataCode ? ` (${location.iataCode})` : "";
        return `${location.name}${code}`;
    }

    function buildFlightRoute(criteria, roadEstimate) {
        if (!criteria.origin.iataCode || !criteria.destination.iataCode) {
            return routeCandidate({
                id: "flight-unavailable",
                title: "Flying is not clear for this pair",
                status: "Unavailable",
                modes: ["flight"],
                routeSteps: [locationLabel(criteria.origin), "No IATA-coded air route available from the selected pair", locationLabel(criteria.destination)],
                facts: ["Choose city or airport suggestions with IATA codes to outline an air route."],
                warnings: ["No fare shown", "No schedule shown", "No operator shown"],
                source: "Travelpayouts/Aviasales location autocomplete",
                retrievedAt: formatTimestamp(),
                practicality: 10
            });
        }
        const airportNote = criteria.origin.type === "city" || criteria.destination.type === "city"
            ? "Airport access legs still need a local transfer estimator or user confirmation."
            : "Airport endpoints are selected directly.";
        return routeCandidate({
            id: "flight-route",
            title: "Fly between the main airports",
            status: "Route shape",
            modes: ["flight", "transfer"],
            routeSteps: [
                locationLabel(criteria.origin),
                `Fly ${criteria.origin.iataCode} to ${criteria.destination.iataCode}`,
                locationLabel(criteria.destination)
            ],
            facts: [
                `Origin code: ${criteria.origin.iataCode}`,
                `Destination code: ${criteria.destination.iataCode}`,
                airportNote,
                roadEstimate ? `Ground distance between selected coordinates: ${distance(roadEstimate.distanceKm)}` : "Ground distance unavailable"
            ],
            warnings: ["No live fare inside CarlTravels", "No airline/operator shown", "No scheduled departure shown"],
            source: "Travelpayouts/Aviasales public location autocomplete",
            retrievedAt: formatTimestamp(),
            practicality: roadEstimate && roadEstimate.distanceKm > 650 ? 70 : 45
        });
    }

    function buildOverlandRoute(criteria, roadEstimate) {
        return routeCandidate({
            id: "direct-overland-route",
            title: "Go overland",
            status: roadEstimate ? "Estimated transfer" : "Unavailable",
            modes: ["train", "bus", "transfer"],
            routeSteps: [locationLabel(criteria.origin), "Overland corridor", locationLabel(criteria.destination)],
            facts: roadEstimate
                ? [`Road distance: ${distance(roadEstimate.distanceKm)}`, `Road-time estimate: ${duration(roadEstimate.durationMinutes)}`, "Use this as a sanity-check baseline for bus, car transfer or mixed ground routing."]
                : ["No road estimate returned for this pair."],
            warnings: ["Not a train or bus schedule", "No fare shown", "No operator shown"],
            source: roadEstimate?.source || "OSRM public demo server using OpenStreetMap road data",
            retrievedAt: formatTimestamp(),
            durationMinutes: roadEstimate?.durationMinutes ?? null,
            distanceKm: roadEstimate?.distanceKm ?? null,
            practicality: roadEstimate ? Math.max(20, 80 - (roadEstimate.durationMinutes / 60) * 4) : 5
        });
    }

    function buildNearbyAirportRoute(criteria, roadEstimate) {
        if (!criteria.nearbyAirports) return null;
        const hasNearby = criteria.origin.nearbyAirport || criteria.destination.nearbyAirport;
        return routeCandidate({
            id: "nearby-airport-route",
            title: "Check nearby airports",
            status: hasNearby ? "Route shape" : "Unavailable",
            modes: ["flight", "transfer"],
            routeSteps: [
                locationLabel(criteria.origin),
                criteria.origin.nearbyAirport ? `Consider ${criteria.origin.nearbyAirport}` : "No nearby origin airport returned",
                criteria.destination.nearbyAirport ? `Arrive near ${criteria.destination.nearbyAirport}` : "No nearby destination airport returned",
                locationLabel(criteria.destination)
            ],
            facts: [
                `Search radius selected: ${elements.airportRadius.value} km`,
                roadEstimate ? `End-to-end road baseline: ${duration(roadEstimate.durationMinutes)}` : "Road baseline unavailable"
            ],
            warnings: ["Airport choice must be confirmed before booking", "May require self-transfer", "No fare or schedule shown"],
            source: "Nearby airport names from structured location provider where supplied",
            retrievedAt: formatTimestamp(),
            practicality: hasNearby ? 48 : 5
        });
    }

    function buildScheduleReadinessRoute(criteria) {
        return routeCandidate({
            id: "schedule-data-needed",
            title: "Look for trains or buses",
            status: "Unavailable",
            modes: ["train", "bus"],
            routeSteps: [locationLabel(criteria.origin), "Public transport schedule data not connected", locationLabel(criteria.destination)],
            facts: [
                "Normal mode does not invent stations, operators, times or transfer legs.",
                "A backend GTFS/OpenTripPlanner/Navitia integration is needed to compute actual scheduled train or bus itineraries inside CarlTravels.",
                "When that exists, this card becomes real train/bus route candidates instead of a status card."
            ],
            warnings: ["No schedule provider connected", "No fare shown"],
            source: "CarlTravels route integrity rule",
            retrievedAt: formatTimestamp(),
            practicality: 1
        });
    }

    function buildDemoRoute(criteria) {
        return routeCandidate({
            id: "demo-mode-only",
            title: "Developer demo mode",
            status: "Indicative price",
            modes: ["flight", "train", "bus"],
            routeSteps: [locationLabel(criteria.origin), "Demo-only leg", locationLabel(criteria.destination)],
            facts: ["This appears only when the URL includes ?demo=1."],
            warnings: ["Demo data"],
            source: "Local developer mode",
            retrievedAt: formatTimestamp(),
            practicality: 1
        });
    }

    async function buildRoutes(criteria) {
        let roadEstimate = null;
        renderProgress("Checking the road distance and route shapes...");
        try {
            roadEstimate = await getRoadEstimate(criteria.origin, criteria.destination);
        } catch (error) {
            roadEstimate = null;
        }

        const routes = demoMode ? [buildDemoRoute(criteria)] : [
            buildFlightRoute(criteria, roadEstimate),
            buildOverlandRoute(criteria, roadEstimate),
            buildNearbyAirportRoute(criteria, roadEstimate),
            buildScheduleReadinessRoute(criteria)
        ].filter(Boolean);
        renderProgress(roadEstimate
            ? `Found a ${distance(roadEstimate.distanceKm)} road baseline. Times and fares still need checking before booking.`
            : "Location found. Road timing is unavailable for this pair, so only route shapes are shown.");
        return routes;
    }

    function renderProgress(message) {
        elements.fareStatus.textContent = message;
    }

    function passesFilters(route) {
        const enabledModes = Array.from(document.querySelectorAll("[data-mode-filter]:checked")).map((input) => input.dataset.modeFilter);
        const maxDurationHours = Number(document.getElementById("maxDuration").value);
        const modeMatch = route.modes.some((mode) => enabledModes.includes(mode));
        return modeMatch && (!maxDurationHours || !route.durationMinutes || route.durationMinutes <= maxDurationHours * 60);
    }

    function sortRoutes(routes) {
        const sorted = [...routes];
        if (state.sortBy === "fastest") return sorted.sort((a, b) => (a.durationMinutes ?? Infinity) - (b.durationMinutes ?? Infinity));
        if (state.sortBy === "cheapest") return sorted.sort((a, b) => {
            const aPriced = ["Live fare", "Recently cached fare", "Indicative price"].includes(a.status);
            const bPriced = ["Live fare", "Recently cached fare", "Indicative price"].includes(b.status);
            return Number(bPriced) - Number(aPriced);
        });
        return sorted.sort((a, b) => b.practicality - a.practicality);
    }

    function renderRoute(route) {
        return `
            <article class="route-card provider-card">
                <div class="route-card__head">
                    <div>
                        <p class="route-kicker">${escapeHtml(route.status)}</p>
                        <h3>${escapeHtml(route.title)}</h3>
                        <p class="route-summary">A practical route idea based on the places you selected and the open data available here.</p>
                    </div>
                    <label class="compare-toggle">
                        <input type="checkbox" data-compare-id="${escapeHtml(route.id)}" ${state.selected.has(route.id) ? "checked" : ""}>
                        Compare
                    </label>
                </div>
                <ol class="route-steps">
                    ${route.routeSteps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
                </ol>
                <div class="metrics">
                    <div class="metric"><b>${escapeHtml(route.status)}</b><span>Integrity status</span></div>
                    <div class="metric"><b>${duration(route.durationMinutes)}</b><span>Known duration</span></div>
                    <div class="metric"><b>${distance(route.distanceKm)}</b><span>Known distance</span></div>
                    <div class="metric"><b>${escapeHtml(route.retrievedAt)}</b><span>Retrieved</span></div>
                </div>
                <details class="provider-details">
                    <summary>What we know</summary>
                    <ul class="fact-list">${route.facts.map((fact) => `<li>${escapeHtml(fact)}</li>`).join("")}</ul>
                    <div class="warning-list">${route.warnings.map((warning) => `<span class="badge badge--warning"><i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>${escapeHtml(warning)}</span>`).join("")}</div>
                    <p><strong>Source:</strong> ${escapeHtml(route.source)}</p>
                    <p><strong>Modes:</strong> ${escapeHtml(route.modes.join(", "))}</p>
                </details>
                <button class="route-button" type="button" disabled>
                    Book yourself after confirming schedules and fares
                </button>
            </article>
        `;
    }

    function renderComparison() {
        const selected = state.results.filter((route) => state.selected.has(route.id)).slice(0, 3);
        elements.comparisonPanel.hidden = selected.length === 0;
        elements.comparisonGrid.innerHTML = selected.map((route) => `
            <div class="comparison-card">
                <h4>${escapeHtml(route.title)}</h4>
                <p>${escapeHtml(route.status)}</p>
                <b>${duration(route.durationMinutes)}</b>
                <span>${distance(route.distanceKm)}</span>
            </div>
        `).join("");
    }

    function renderResults() {
        if (!state.criteria) return;
        const filtered = sortRoutes(state.results.filter(passesFilters));
        elements.resultsHeading.textContent = `${state.criteria.origin.name} to ${state.criteria.destination.name}`;
        elements.resultsSummary.textContent = filtered.length
            ? `${filtered.length} route candidates. No outbound provider links and no invented fares, operators, stations or times.`
            : "No route candidates match these filters.";
        elements.resultsList.innerHTML = filtered.length
            ? filtered.map(renderRoute).join("")
            : `<div class="empty-state">No route candidates match the current filters. Enable more transport modes or clear the duration filter.</div>`;
        renderComparison();
    }

    async function runSearch() {
        await Promise.all([
            resolveTypedLocation(elements.origin, elements.originList, "origin", elements.originSelected),
            resolveTypedLocation(elements.destination, elements.destinationList, "destination", elements.destinationSelected)
        ]);
        const criteria = collectCriteria();
        if (!validate(criteria)) return;
        state.criteria = criteria;
        state.sortBy = criteria.rankingPreference;
        elements.sortResults.value = state.sortBy;
        elements.resultsList.innerHTML = `<div class="empty-state">Building route outlines from available open data...</div>`;
        state.results = await buildRoutes(criteria);
        renderResults();
    }

    function scheduleSearch() {
        window.clearTimeout(state.searchDebounce);
        state.searchDebounce = window.setTimeout(runSearch, 450);
    }

    function initialise() {
        setDefaultDate();
        seedOptions(elements.originList, fallbackLocations);
        seedOptions(elements.destinationList, fallbackLocations);
        elements.origin.value = "Berlin (BER), Germany";
        elements.destination.value = "Zagreb (ZAG), Croatia";
        pickLocation(elements.origin, "origin", elements.originSelected);
        pickLocation(elements.destination, "destination", elements.destinationSelected);
        attachLocationControl(elements.origin, elements.originList, "origin", elements.originSelected);
        attachLocationControl(elements.destination, elements.destinationList, "destination", elements.destinationSelected);
        elements.airportRadius.disabled = !elements.nearbyAirports.checked;
        elements.form.addEventListener("submit", (event) => {
            event.preventDefault();
            runSearch();
        });
        elements.form.addEventListener("change", scheduleSearch);
        elements.rankingPreference.addEventListener("change", () => {
            state.sortBy = elements.rankingPreference.value;
            elements.sortResults.value = state.sortBy;
            renderResults();
        });
        elements.sortResults.addEventListener("change", () => {
            state.sortBy = elements.sortResults.value;
            elements.rankingPreference.value = state.sortBy;
            renderResults();
        });
        elements.nearbyAirports.addEventListener("change", () => {
            elements.airportRadius.disabled = !elements.nearbyAirports.checked;
        });
        document.querySelectorAll("[data-mode-filter], #maxDuration, #allowSeparateFilter, #allowOvernightFilter").forEach((control) => {
            control.addEventListener("input", renderResults);
        });
        elements.resultsList.addEventListener("change", (event) => {
            const id = event.target?.dataset?.compareId;
            if (!id) return;
            if (event.target.checked) {
                if (state.selected.size >= 3) {
                    event.target.checked = false;
                    return;
                }
                state.selected.add(id);
            } else {
                state.selected.delete(id);
            }
            renderComparison();
        });
        elements.clearComparison.addEventListener("click", () => {
            state.selected.clear();
            renderResults();
        });
        runSearch();
    }

    initialise();
})();
