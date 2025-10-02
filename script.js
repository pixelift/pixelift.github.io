const PAGE_TEMPLATE = document.querySelector(".page-template");
const shield = document.querySelector(".shield");
let anyPageOpen = false;
let currentPageKey = null;

const LOCALES = {
    sk: {
        pattern: {
            label: "Inšpirácia",
            desc: "Mama",
            paras: [
                "Na svoju mamu myslím v tom najpozitívnejšom svetle. Veľa si prežila a v mnohých situáciách je pre mňa vzorom.",
                "Vždy stála pri mne a dávala mi životné rady — ako mama aj ako priateľka. V mojom živote zohráva obe úlohy."
            ]
        },
        strong: {
            label: "Silná stránka",
            desc: "Perfekcionizmus",
            paras: [
                "Povedal by som, že som perfekcionista; zvyknem sa sústreďovať na detaily. Keď si všimnem drobnú chybu alebo nepresnosť, už ju neviem nevidieť.",
                "Táto vlastnosť mi pomáha vidieť detaily, ktoré si väčšina ľudí nevšimne — čo je veľmi užitočné, hoci niekedy aj trochu otravné."
            ]
        },
        animal: { 
            label: "Zvieratá",
            desc: "Sova",
            paras: [
                "Nočná sova ma vystihuje; nie som ranný typ, ale v noci som veľmi produktívny.",
                "Ak by som si mal vybrať medzi nocou a dňom, vždy si zvolím noc; radšej pôjdem spať neskoro, než by som vstával skoro.",
                "Neznamená to, že sa zabávam do druhej ráno; znamená to, že ak mám prácu, urobím ju večer alebo v noci."
            ]
        },
        success: { 
            label: "Najväčší úspech",
            desc: "Práca ako hobby",
            paras: [
                "Po strednej škole som začal pracovať ako webový vývojár a pridal som sa k trojčlennému tímu.",
                "Šesť mesiacov sme pracovali na rôznych projektoch, ale rozhodli sme sa skončiť, pretože sme nemali dosť času hľadať nových klientov.",
                "Ak by som mal pomenovať svoj najväčší úspech, bolo by to, že som mohol pracovať s takýmto tímom a robiť niečo, čo ma naozaj baví."
            ]
        },
        source: { 
            label: "Zdroj sily",
            desc: "Videá a hry",
            paras: [
                "Oddychujem pri hrách alebo sledovaním YouTubu; väčšinou napokon skončím pri videách.",
                "Najčastejšie sledujem politické videá zo Slovenska aj zo zahraničia. Je zaujímavé vidieť, čo ľudia inde robia a ako rozmýšľajú inak než my."
            ]
        },
        goal: { 
            label: "Životný cieľ",
            desc: "Ideálna práca",
            paras: [
                "Mnohí hovoria, že chcú finančnú slobodu a veľa peňazí.",
                "Môj cieľ je trochu iný: chcem chodiť do práce a pracovať usilovne, ale na veciach, ktoré ma zaujímajú.",
                "Chcem sa vracať z práce nevyčerpaný a mať čas na svoje budúce deti."
            ]
        }
    },
    en: {
        pattern: {
            label: "Inspiration",
            desc: "Mother",
            paras: [
                "I think of my mother in the most positive light. She has endured a lot, and I look up to her in many situations in my life.",
                "She has always been by my side, offering life advice—both as a mother and as a friend. In my life, she plays both roles."
            ]
        },
        strong: {
            label: "Strength",
            desc: "Perfectionism",
            paras: [
                "I’d say I’m a perfectionist; I tend to focus on details. When I notice a tiny flaw or misalignment, I can’t unsee it.",
                "This trait helps me see details most people don’t, which can be very useful—though a bit annoying at times."
            ]
        },
        animal: { 
            label: "Animal",
            desc: "Owl",
            paras: [
                "A night owl represents me well; I’m not a morning person, but I’m very productive at night.",
                "If I had to choose between night and day, I’d choose night every time; I’d rather stay up late than wake up early.",
                "This doesn’t mean I’m out partying until 2 a.m.; it means that if I have work to do, I’ll do it in the evening or at night."
            ]
        },
        success: { 
            label: "Greatest Success",
            desc: "Work as a hobby",
            paras: [
                "After finishing high school, I started working as a web developer and joined a three‑person team.",
                "We worked on all kinds of projects for six months, but we decided to stop because we didn’t have enough time to find new clients.",
                "If I had to name my greatest success, it would be having worked with such a team and doing something I truly enjoy."
            ]
        },
        source: { 
            label: "Source of Strength",
            desc: "Videos & Games",
            paras: [
                "I relax by playing games or binge‑watching YouTube; more often than not, I end up watching videos.",
                "I mostly watch political videos from Slovakia and from abroad. It’s interesting to see what people do elsewhere and how they think differently from us."
            ]
        },
        goal: { 
            label: "Life Goal",
            desc: "Perfect Job",
            paras: [
                "Many people say they want financial freedom and lots of money.",
                "My goal is a bit different: I still want to go to work and work hard, but on things I find interesting.",
                "I want to come home from work not exhausted and have time for my future children."
            ]
        }
    },
    ua: {
        pattern: {
            label: "Натхнення",
            desc: "Мати",
            paras: [
                "Я думаю про свою маму в найпозитивнішому світлі. Вона багато пережила, і в багатьох ситуаціях я рівняюся на неї.",
                "Вона завжди була поруч, даючи життєві поради — і як мама, і як подруга. У моєму житті вона виконує обидві ролі."
            ]
        },
        strong: {
            label: "Сильна сторона",
            desc: "Перфекціонізм",
            paras: [
                "Я б сказав, що я перфекціоніст; зазвичай зосереджуюся на деталях. Коли помічаю найменший недолік або перекіс, більше не можу його не бачити.",
                "Ця риса допомагає мені бачити деталі, яких більшість не помічає — це дуже корисно, хоч іноді й трохи дратує."
            ]
        },
        animal: {
            label: "Тварина",
            desc: "Сова",
            paras: [
                "Нічна сова добре мене описує; я не ранкова людина, але вночі дуже продуктивний.",
                "Якби довелося обирати між ніччю і днем, я щоразу обрав би ніч; краще ляжу пізно, ніж прокинуся рано.",
                "Це не означає, що я гуляю до другої ночі; це означає, що якщо є робота, я зроблю її ввечері або вночі."
            ]
        },
        success: {
            label: "Найбільше досягнення",
            desc: "Робота як хобі",
            paras: [
                "Після закінчення школи я почав працювати веброзробником і приєднався до команди з трьох людей.",
                "Ми працювали над різними проєктами шість місяців, але вирішили зупинитися, бо нам бракувало часу шукати нових клієнтів.",
                "Якби назвати моє найбільше досягнення, то це можливість працювати з такою командою і робити те, що мені справді подобається."
            ]
        },
        source: {
            label: "Джерело сили",
            desc: "Відео та ігри",
            paras: [
                "Відпочиваю, граючи в ігри або запоєм дивлячись YouTube; частіше за все все ж дивлюся відео.",
                "Переважно дивлюся політичні відео зі Словаччини та з-за кордону. Цікаво бачити, що роблять люди в інших місцях і як вони мислять інакше за нас."
            ]
        },
        goal: {
            label: "Життєва мета",
            desc: "Ідеальна робота",
            paras: [
                "Багато людей кажуть, що хочуть фінансової свободи та багато грошей.",
                "Моя мета трохи інша: я все ж хочу ходити на роботу й наполегливо працювати, але над тим, що мені цікаво.",
                "Я хочу повертатися з роботи не виснаженим і мати час для майбутніх дітей."
            ]
        }
    }
};

// Single, key-based config including pronunciation fields
const CONFIG = {
    pattern: { image_align: "center", icon: "star", image: "static/pattern.webp", latin: "mater matris", phonemic: "/ˈmaː.tɛr ˈmaː.tris/", phonetic: "[ˈmaː.tɛr ˈmaː.trɪs]" },
    strong:  { image_align: "center", icon: "dumbbell", image: "static/strong.webp", latin: "perfectus",      phonemic: "/pɛrˈfɛk.tus/",               phonetic: "[pɛrˈfɛk.tʊs]" },
    animal:  { image_align: "right",  icon: "paw-print", image: "static/animal.webp",  latin: "noctua",         phonemic: "/ˈnok.tu.a/",               phonetic: "[ˈnɔk.tʊ.a]" },
    source:  { image_align: "center", icon: "battery-charging", image: "static/source.webp", latin: "relaxo",   phonemic: "/rɛˈlak.soː/",               phonetic: "[rɛˈlaks.oː]" },
    success: { image_align: "center", icon: "trophy",   image: "static/success.webp", latin: "operor",          phonemic: "/ˈo.pɛ.ror/",               phonetic: "[ˈɔ.pɛ.rɔr]" },
    goal:    { image_align: "center", icon: "target",   image: "static/goal.webp",    latin: "officium",        phonemic: "/ofˈfi.ki.um/",             phonetic: "[ɔfˈfi.ki.um]" }
};

function localizeConfig(locale) {
    const dict = LOCALES[locale] || LOCALES.sk;
    return Object.entries(CONFIG).map(([key, base]) => {
        const l = dict[key] || {};
        return { key, ...base, label: l.label || key, desc: l.desc || "", paras: l.paras };
    });
}

function openPageTemplate() {
    PAGE_TEMPLATE.style.display = "block";
    anyPageOpen = true;
    lucide.createIcons();
}

function openPage(pageKey) {
    if (!PAGE_TEMPLATE) return;

    const item = (window.__CONFIG__ || []).find(p => p.key === pageKey);
    const base = CONFIG[pageKey] || {};
    if (!item) return;
    currentPageKey = pageKey;

    if (shield) shield.style.display = "none";

    PAGE_TEMPLATE.querySelector(".page-icon").innerHTML = `<i data-lucide="${item.icon}"></i>`;
    PAGE_TEMPLATE.querySelector(".page-label").textContent = item.label;
    PAGE_TEMPLATE.querySelector(".page-explanation").textContent = item.desc;
    PAGE_TEMPLATE.querySelector(".page-latin").textContent = [base.latin, base.phonemic, base.phonetic]
        .filter(Boolean)
        .join("  ");

    const configParas = item.paras || [];
    PAGE_TEMPLATE.querySelector(".page-paras").innerHTML = configParas
        .map(para => `<p>${para}</p>`)
        .join("");
    
    const bgImg = PAGE_TEMPLATE.querySelector(".page-bg");
    
    if (bgImg) {
        bgImg.src = item.image;
        if (bgImg.complete && bgImg.naturalWidth > 0) {
            openPageTemplate();
        } else {
            bgImg.onload = function () { openPageTemplate(); };
            bgImg.onerror = function () { console.warn("Failed to load page background image:", item.image); };
        }
    }
}

function closePage() {
    PAGE_TEMPLATE.style.display = "none";
    if (shield) shield.style.display = "grid";
    anyPageOpen = false;
}

function renderShield() {
    if (!shield) return;
    const localizedConfig = localizeConfig(currentLocale);
    const partsHtml = localizedConfig.map(({ key, label, desc, image, icon, latin, phonemic, phonetic }) => {
        const iconHtml = icon ? `<i data-lucide="${icon}" class="icon"></i>` : "";
        return `
        <button class="shield-part" type="button" aria-label="${label}: ${desc}" data-key="${key}" onclick="openPage('${key}')">
            <div class="icon-wrap">
                <div class="part-label">${label}</div>
                ${iconHtml}    
            </div>    
            <div>            
                <div class="part-desc">${desc}</div>
                <div class="part-latin">${latin} ${phonemic} ${phonetic}</div>
            </div>
            <img class="part-bg" src="${image}" />
        </button>`;
    }).join("");

    shield.innerHTML = partsHtml;

    window.__CONFIG__ = localizedConfig;

    if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
    }
}

window.setLocale = function (locale) {
    if (!LOCALES[locale]) return;
    currentLocale = locale;
    if (anyPageOpen && currentPageKey) {
        openPage(currentPageKey);
    } else {
        renderShield();
    }
}

function showLanguagePicker() {
    $('#lang-overlay').show();
    $('.shield').hide();
}

$(function () {
    if (!$('.shield').length) return;

    $(document).on('keydown', function (e) {
        if (e.key === 'Escape' && anyPageOpen) {
            closePage();
        }
    });

    $(document).on('click', '#lang-overlay .lang-button', function () {
        const code = $(this).data('locale');
        if (!code) return;
        window.setLocale(code);
        try { localStorage.setItem('locale', code); } catch (e) {}
        $('#lang-overlay').hide();
        $('.shield').css('display', 'grid');
    });

    showLanguagePicker();
});


