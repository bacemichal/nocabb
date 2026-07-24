const produkty = [
    { 
        id: "obsidian-bag",
        nazov: "Obsidian bag", 
        kategoria: "bags", 
        cena: "50 €", 
        foto: "assets/images/products/obsidian-bag.jpg" 
    },
    { 
        id: "ocean-gobelin-jacket",
        nazov: "Ocean gobelin jacket", 
        kategoria: "jackets", 
        cena: "150 €", 
        foto: "assets/images/products/ocean-gobelin-jacket.jpg" 
    },
    { 
        id: "ruby-mandala-jacket",
        nazov: "Ruby mandala jacket", 
        kategoria: "jackets", 
        cena: "Sold", 
        foto: "assets/images/products/ruby-mandala-jacket.jpg" 
    },
    { 
        id: "amsterdam-oldtown-jacket",
        nazov: "Amsterdam oldtown jacket", 
        kategoria: "jackets", 
        cena: "Sold", 
        foto: "assets/images/products/amsterdam-oldtown-jacket.JPG" 
    },
    { 
        id: "archive-jacket",
        nazov: "Archive jacket", 
        kategoria: "jackets", 
        cena: "150 €", 
        foto: "assets/images/products/archive-jacket.JPG" 
    },
    { 
        id: "archive-tote-bag",
        nazov: "Archive tote bag", 
        kategoria: "bags", 
        cena: "50 €", 
        foto: "assets/images/products/archive-tote-bag.JPG" 
    },
    { 
        id: "aurora-bag",
        nazov: "Aurora bag", 
        kategoria: "bags", 
        cena: "50 €", 
        foto: "assets/images/products/aurora-bag.JPG" 
    },
    { 
        id: "aurora-jacket",
        nazov: "Aurora jacket", 
        kategoria: "jackets", 
        cena: "150 €", 
        foto: "assets/images/products/aurora-jacket.JPG" 
    },
    { 
        id: "blossom-tote-bag",
        nazov: "Blossom tote bag", 
        kategoria: "bags", 
        cena: "50 €", 
        foto: "assets/images/products/blossom-tote-bag.JPG" 
    },
    { 
        id: "blue-flower-bag",
        nazov: "Blue flower bag", 
        kategoria: "bags", 
        cena: "Sold", 
        foto: "assets/images/products/blue-flower-bag.JPG" 
    },
    { 
        id: "milagro-verde-bag",
        nazov: "Milagro verde bag", 
        kategoria: "bags", 
        cena: "50 €", 
        foto: "assets/images/products/milagro-verde-bag.JPG" 
    },
    { 
        id: "monarch-tote-bag",
        nazov: "Monarch tote bag", 
        kategoria: "bags", 
        cena: "50 €", 
        foto: "assets/images/products/monarch-tote-bag.JPG" 
    },
    { 
        id: "ruby-bomber-jacket",
        nazov: "Ruby bomber jacket", 
        kategoria: "jackets", 
        cena: "150 €", 
        foto: "assets/images/products/ruby-bomber-jacket.JPG" 
    },
];

function jePredany(produkt) {
    return produkt.cena === 'Sold';
}

function aktualizujPocitadla() {
    // Kontrola, či spany v HTML existujú, aby kód nespadol, ak nejaký filter chýba
    if (document.getElementById('count-all')) {
        document.getElementById('count-all').textContent = produkty.length;
    }
    if (document.getElementById('count-jackets')) {
        document.getElementById('count-jackets').textContent = produkty.filter(p => p.kategoria === 'jackets').length;
    }
    if (document.getElementById('count-bags')) {
        document.getElementById('count-bags').textContent = produkty.filter(p => p.kategoria === 'bags').length;
    }
    if (document.getElementById('count-accessories')) {
        document.getElementById('count-accessories').textContent = produkty.filter(p => p.kategoria === 'accessories').length;
    }
    if (document.getElementById('count-gobelin')) {
        document.getElementById('count-gobelin').textContent = produkty.filter(p => p.kategoria === 'gobelin').length;
    }
}

function zafiltruj(kategoria) {
    const grid = document.querySelector('.product-grid');
    if (!grid) return;

    // 1. MANIPULÁCIA S TRIEDAMI GOMBÍKOV
    // Najprv nájdeme úplne všetky tlačidlá v sekcii filtrov
    const gombiky = document.querySelectorAll('.filters-layout button');
    
    gombiky.forEach(gombik => {
        // Vytiahneme hodnotu z atribútu onclick (napr. zafiltruj('jackets') vytiahne 'jackets')
        const podmienka = gombik.getAttribute('onclick');
        
        if (podmienka && podmienka.includes(`'${kategoria}'`)) {
            // Ak sa kategória zhoduje s kliknutou, nastavíme aktívny štýl
            gombik.classList.remove('btn--secondary');
            gombik.classList.add('btn--primary');
        } else {
            // Všetkým ostatným gombíkom vrátime neaktívny vzhľad
            gombik.classList.remove('btn--primary');
            gombik.classList.add('btn--secondary');
        }
    });

    // 2. SAMOTNÉ FILTROVANIE PRODUKTOV (tvoj pôvodný funkčný kód)
    grid.innerHTML = ''; 

    const vybrateProdukty = kategoria === 'all' 
        ? produkty 
        : produkty.filter(p => p.kategoria === kategoria);


    vybrateProdukty.forEach(p => {
        const predany = jePredany(p);

        grid.innerHTML += `
            <article class="product-card${predany ? ' product-card--sold' : ''}">
                <a href="products/${p.id}.html"${predany ? '' : ` onclick="localStorage.setItem('vybrany_produkt', '${p.nazov}')"`}>
                    <div class="product-card-image">
                        <img src="${p.foto}" alt="${p.nazov}">
                    </div>
                    <h2>${p.nazov}</h2>
                    <p>${p.cena}</p>
                </a>
            </article>
        `;
    });
}

function initProductCursor() {
    const cursor = document.querySelector('.product-cursor');
    const grid = document.querySelector('.product-grid');
    if (!cursor || !grid) return;

    const moveCursor = (event) => {
        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;
    };

    grid.addEventListener('pointermove', (event) => {
        if (event.pointerType === 'touch') return;

        const card = event.target.closest('.product-card');
        if (card && grid.contains(card)) {
            cursor.classList.add('is-visible');
            moveCursor(event);
        } else {
            cursor.classList.remove('is-visible');
        }
    });

    grid.addEventListener('pointerleave', () => {
        cursor.classList.remove('is-visible');
    });
}

function initProductDetail() {
    const match = window.location.pathname.match(/\/products\/([^/]+)\.html$/);
    if (!match) return;

    const produkt = produkty.find(p => p.id === match[1]);
    if (!produkt) return;

    document.querySelectorAll('.product-detail-info__table tr').forEach(row => {
        if (row.cells[0]?.textContent.trim() === 'Price:') {
            row.cells[1].textContent = produkt.cena;
        }
    });

    if (!jePredany(produkt)) return;

    const wantBtn = document.querySelector('.product-detail-info__actions .btn--primary');
    if (!wantBtn) return;

    const disabledBtn = document.createElement('span');
    disabledBtn.className = 'btn btn--primary btn--disabled';
    disabledBtn.textContent = 'I want it!';
    disabledBtn.setAttribute('aria-disabled', 'true');
    wantBtn.replaceWith(disabledBtn);
}

// Spustenie filtrov po načítaní celej stránky
document.addEventListener("DOMContentLoaded", () => {
    aktualizujPocitadla();
    zafiltruj('all');
    initProductCursor();
    initProductDetail();
});

// Kód pre obsluhu newsletteru prispôsobený tvojmu HTML (výber cez tagy, keďže nemáš ID vo formulári)
document.addEventListener("DOMContentLoaded", () => {
    const newsletter = document.querySelector('.newsletter');
    
    if (newsletter) {
        const form = newsletter.querySelector('.inline-form');
        const text = newsletter.querySelector('p');

        if (form && text) {
            form.addEventListener('submit', (e) => {
                // Skontrolujeme, či bot vyplnil skryté pole
                const honeypot = form.querySelector('.honeypot');
                
                if (honeypot && honeypot.value !== '') {
                    // Ak je v políčku text, je to BOT. 
                    // Zastavíme odoslanie do Google Forms.
                    e.preventDefault(); 
                    
                    // Napriek tomu simulujeme úspech, aby bot odišiel
                    form.style.display = 'none';
                    text.textContent = 'Thank you for subscribing!';
                    return; 
                }

                // Ak je políčko prázdne, ide o reálneho človeka.
                // JavaScript neblokuje odoslanie (žiadne preventDefault) 
                // a dáta normálne odídu do iframe.
                form.style.display = 'none';
                text.textContent = 'Thank you for subscribing!';
            });
        }
    }
});