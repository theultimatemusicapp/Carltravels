const PROVIDERS = [
    ["amadeus", ["AMADEUS_CLIENT_ID", "AMADEUS_CLIENT_SECRET"]],
    ["travelpayoutsDataApi", ["TRAVELPAYOUTS_TOKEN"]],
    ["navitia", ["NAVITIA_TOKEN"]],
    ["duffel", ["DUFFEL_ACCESS_TOKEN"]]
];

function json(data, status = 200, origin = "*") {
    return new Response(JSON.stringify(data, null, 2), {
        status,
        headers: {
            "content-type": "application/json; charset=utf-8",
            "access-control-allow-origin": origin,
            "access-control-allow-methods": "POST, OPTIONS",
            "access-control-allow-headers": "content-type"
        }
    });
}

function missingProviderStatus(env) {
    return PROVIDERS.map(([provider, secrets]) => {
        const missing = secrets.filter((secret) => !env[secret]);
        return {
            provider,
            status: missing.length ? "missing_credentials" : "configured",
            missing
        };
    });
}

export default {
    async fetch(request, env) {
        const origin = env.ALLOWED_ORIGIN || "*";
        if (request.method === "OPTIONS") return json({}, 204, origin);
        const url = new URL(request.url);

        if (url.pathname !== "/api/route-finder/search") {
            return json({ error: "Not found" }, 404, origin);
        }

        if (request.method !== "POST") {
            return json({ error: "Use POST" }, 405, origin);
        }

        let criteria;
        try {
            criteria = await request.json();
        } catch (error) {
            return json({ error: "Invalid JSON body" }, 400, origin);
        }

        return json({
            routes: [],
            providerStatus: missingProviderStatus(env),
            criteria,
            retrievedAt: new Date().toISOString(),
            message: "No live backend provider is configured yet. Add secrets and implement provider adapters here; do not fabricate fares or schedules."
        }, 200, origin);
    }
};
