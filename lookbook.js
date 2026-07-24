function vytvorLookbookFiltre() {
    const filters = document.getElementById('lookbook-filters');
    if (!filters || typeof lookbookCollections === 'undefined') return;

    filters.innerHTML = lookbookCollections.map((collection, index) => `
        <button
            class="btn btn--${index === 0 ? 'primary' : 'secondary'} btn--small"
            onclick="zafiltrujLookbook('${collection.id}')"
            type="button"
        >
            ${collection.name} (${collection.images.length})
        </button>
    `).join('');
}

function zafiltrujLookbook(kategoria) {
    const gallery = document.querySelector('.lookbook-gallery');
    if (!gallery || typeof lookbookCollections === 'undefined') return;

    const gombiky = document.querySelectorAll('#lookbook-filters button');

    gombiky.forEach(gombik => {
        const podmienka = gombik.getAttribute('onclick');

        if (podmienka && podmienka.includes(`'${kategoria}'`)) {
            gombik.classList.remove('btn--secondary');
            gombik.classList.add('btn--primary');
        } else {
            gombik.classList.remove('btn--primary');
            gombik.classList.add('btn--secondary');
        }
    });

    const collection = lookbookCollections.find(item => item.id === kategoria);
    if (!collection) return;

    gallery.innerHTML = collection.images.map(src => `
        <img src="${encodeURI(src)}" alt="${collection.name}">
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    vytvorLookbookFiltre();

    if (typeof lookbookCollections === 'undefined' || lookbookCollections.length === 0) return;

    const params = new URLSearchParams(window.location.search);
    const collectionId = params.get('collection');
    const activeCollection = lookbookCollections.find(item => item.id === collectionId);

    zafiltrujLookbook(activeCollection ? activeCollection.id : lookbookCollections[0].id);
});
