(() => {
    const share = document.querySelector('[data-hoodie-share]');
    if (!share) return;

    const link = share.querySelector('input');
    const button = share.querySelector('button');
    const status = share.querySelector('[role="status"]');
    const url = new URL(window.location.href);
    url.hash = '';
    for (const name of Array.from(url.searchParams.keys())) {
        if (name.startsWith('utm_') || name.startsWith('attribute_') || name === 'add-to-cart') {
            url.searchParams.delete(name);
        }
    }
    link.value = url.href;
    share.hidden = false;

    button.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(link.value);
            status.textContent = 'پیوند کپی شد.';
        } catch {
            link.focus();
            link.select();
            status.textContent = 'پیوند انتخاب شد. آن را با گزینهٔ کپی مرورگر کپی کنید.';
        }
    });
})();
