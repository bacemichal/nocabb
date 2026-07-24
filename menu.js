function pagePath(file) {
    const inProducts = window.location.pathname.includes('/products/');
    return inProducts ? `../${file}` : file;
}

function createMenu() {
    const menu = document.createElement('div');
    menu.className = 'menu-overlay';
    menu.id = 'site-menu';
    menu.setAttribute('aria-hidden', 'true');

    menu.innerHTML = `
        <div class="container">
            <div class="nav">
                <nav class="nav-link">
                    <span class="nav-link__mirror" aria-hidden="true">Lookbook &#x2197;</span>
                    <a href="#" class="nav-close">Close</a>
                    <a href="${pagePath('index.html')}" class="nav-logo">
                        <img src="${pagePath('assets/images/logo.svg')}" alt="Nocabb Creative Lab">
                    </a>
                </nav>
            </div>
        </div>
        <div class="container menu-overlay__body">
            <div class="link-list">
                <a href="${pagePath('about.html')}" class="list-item">
                    <span class="link-text">About Nocabb</span>
                    <span class="link-arrow">&#x2197;</span>
                </a>
                <a href="${pagePath('lookbook.html?collection=gobelin-drop')}" class="list-item">
                    <span class="link-text">Gobelin drop (lookbook)</span>
                    <span class="link-arrow">&#x2197;</span>
                </a>
            </div>
            <p class="menu-overlay__contact">
                Get in touch: <a href="https://www.instagram.com/no.cabb/" target="_blank" rel="noopener noreferrer">@no.cabb</a>
            </p>
        </div>
    `;

    document.body.appendChild(menu);
    return menu;
}

function initMenu() {
    const moreLink = document.querySelector('.nav-more');
    if (!moreLink) return;

    const menu = document.getElementById('site-menu') || createMenu();
    const closeBtn = menu.querySelector('.nav-close');

    const openMenu = () => {
        menu.classList.add('is-open');
        menu.setAttribute('aria-hidden', 'false');
        document.body.classList.add('menu-is-open');
    };

    const closeMenu = () => {
        menu.classList.remove('is-open');
        menu.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('menu-is-open');
    };

    moreLink.addEventListener('click', (event) => {
        event.preventDefault();
        openMenu();
    });

    closeBtn.addEventListener('click', (event) => {
        event.preventDefault();
        closeMenu();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menu.classList.contains('is-open')) {
            closeMenu();
        }
    });
}

document.addEventListener('DOMContentLoaded', initMenu);
