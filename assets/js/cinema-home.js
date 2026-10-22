/* Play the existing Busking for Berlin film from the approved homepage feature. */
document.addEventListener('DOMContentLoaded', () => {
    const trigger = document.querySelector('[data-cinema-film]');
    const dialog = document.getElementById('cinema-film-dialog');
    if (!trigger || !dialog || typeof dialog.showModal !== 'function') return;
    const player = dialog.querySelector('.cinema-film-player');
    trigger.addEventListener('click', (event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        const iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube-nocookie.com/embed/WjtMEQx34NE?autoplay=1&rel=0';
        iframe.title = 'Busking for Berlin, documentary by Carl Tomich';
        iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        iframe.allowFullscreen = true;
        iframe.referrerPolicy = 'strict-origin-when-cross-origin';
        player.replaceChildren(iframe);
        dialog.showModal();
    });
    dialog.querySelector('.cinema-dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
        if (event.target !== dialog) return;
        const bounds = dialog.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
        player.replaceChildren();
        trigger.focus({ preventScroll: true });
    });
});
