/**
 * Max Belon — Shopify Shop Manager Portfolio
 * Core JavaScript Engine & Shared Data Objects
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAccordions();
  initProjectFilters();
  initCaseStudyModals();
});

/* Navigation & Mobile Menu */
function initNavigation() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  
  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('hidden');
    });
  }

  // Highlight active link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* Accordion Component */
function initAccordions() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        
        // Optional: close other accordions in same parent
        const parent = item.closest('.accordion-group');
        if (parent) {
          parent.querySelectorAll('.accordion-item').forEach(sibling => {
            sibling.classList.remove('active');
          });
        }
        
        if (!isOpen) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* Project Category Filtering */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-zinc-950', 'bg-zinc-900', 'text-white', 'shadow-xs', 'active-filter');
        b.classList.add('bg-zinc-100', 'text-zinc-700', 'hover:bg-zinc-200', 'hover:text-zinc-950');
      });
      
      btn.classList.remove('bg-zinc-100', 'text-zinc-700', 'hover:bg-zinc-200', 'hover:text-zinc-950');
      btn.classList.add('bg-zinc-950', 'text-white', 'shadow-xs', 'active-filter');

      const category = btn.getAttribute('data-category');

      projectCards.forEach(card => {
        const cardCats = card.getAttribute('data-categories') || '';
        if (category === 'all' || cardCats.includes(category)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* Case Study Detail Modal Viewer */
function initCaseStudyModals() {
  const openBtns = document.querySelectorAll('[data-open-case-study]');
  const closeBtns = document.querySelectorAll('[data-close-modal]');
  const modal = document.getElementById('case-study-modal');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const caseStudyId = btn.getAttribute('data-open-case-study');
      loadCaseStudyData(caseStudyId);
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  });
}

/* Sample Case Study Database for Modals */
const caseStudyData = {
  'pdp-redesign': {
    title: 'High-Converting Shopify Produktseite für Premium Nahrungsergänzung',
    category: 'Shopify Produktseiten',
    tools: ['Shopify', 'Claude', 'ChatGPT', 'NanoBanana Pro', 'Canva AI', 'Kaching Bundles'],
    ausgangssituation: 'Die alte Produktseite hatte eine hohe Absprungrate. Produktvorteile waren in langen Fließtexten versteckt, Lifestyle-Visuals fehlten völlig, und das Vertrauen von Neukunden war gering.',
    ziel: 'Vollständige Überarbeitung der Produktseite zur Steigerung der Verständlichkeit, Aufbau von Social Proof und Optimierung des AOV (Average Order Value) durch Bundle-Integration.',
    beitrag: [
      'Entwicklung der kompletten Seitenstruktur & Liquid Sections in Shopify',
      'Erstellung von 6 realistischen KI-Lifestyle-Bildern mit NanoBanana Pro',
      'Texten von zielgruppenorientierten Vorteilen & FAQs mit Claude & ChatGPT',
      'Gestaltung von Vorher/Nachher-Vergleichstabellen & Feature-Badges',
      'Integration & Konfiguration von Kaching Bundles für Mengenrabatte',
      'Pflege von Metafields, SEO-Titel, Meta-Description und Bild-Alt-Texten'
    ],
    vorgehensweise: 'Recherche von Kunden-Pain-Points in Rezensionen → Erstellung des Tonalitäts-Frameworks → Prompting realistischer Lifestyle-Visuals → Strukturierung der Shopify-Sections → Qualitätsdurchlauf auf Mobile.',
    ergebnis: 'Deutliche Steigerung der Verweildauer auf der Produktseite, professionelles Markenbild und reibungslose Kauferfahrung auf Mobilgeräten.',
    learnings: 'Kunden kaufen keine Inhaltsstoffe, sondern Ergebnisse. Die visuelle Trennung von Nutzen-Icons und detaillierten FAQs bringt maximale Transparenz.'
  },
  'shop-management': {
    title: 'Strukturiertes Shopify Shop Management & Collection-Optimierung',
    category: 'Shopify Shop Management',
    tools: ['Shopify', 'Notion', 'Google Sheets', 'Slack', 'StoryClicks'],
    ausgangssituation: 'Ein schnell wachsender Modeshop verlor den Überblick über Varianten, Bestände, alte Kollektionen und unvollständige Produkt-Tags.',
    ziel: 'Aufbau eines sauberen Shop-Managements, Bereinigung von Metafields, Automatisierung von Smart Collections und Einführung eines wöchentlichen Pflege-Prozesses.',
    beitrag: [
      'Strukturierung von über 120 Produkten und Varianten-Optionen',
      'Erstellung automatisierter Smart Collections basierend auf klaren Tags',
      'Einrichtung von Notfall-Rabattaktionen & Promo-Bannern im Theme',
      'Systematische Einbindung von Größentabellen und Pflegehinweisen',
      'Einführung eines transparenten Notion-Boards für Aufgaben & Status'
    ],
    vorgehensweise: 'Audit des bestehenden Katalogs → Definition von Naming-Conventions → Batch-Update via CSV/Sheets → Einbindung von Custom Liquid Blöcken → Regelmäßiger Statusabgleich.',
    ergebnis: 'Ein aufgeräumtes Shopify-Backend, schnelle Produkt-Launches in unter 30 Minuten und fehlerfreie Zuordnung aller Varianten.',
    learnings: 'Ein sauberes Backend ist die Grundlage für jede erfolgreiche Skalierung im E-Commerce.'
  },
  'ai-visuals': {
    title: 'KI-gestützte Produkt-Visuals & Lifestyle-Fotografie (NanoBanana Pro)',
    category: 'KI-Bilder & Design',
    tools: ['NanoBanana Pro', 'Canva AI', 'Shopify'],
    ausgangssituation: 'Neue Produktvarianten sollten launchen, aber Studio-Fotoshootings hätten mehrere Wochen gedauert und hohe Kosten verursacht.',
    ziel: 'Erstellung von 12 hochauflösenden, realistischen Lifestyle-Produktbildern im Studio-Look innerhalb von 48 Stunden.',
    beitrag: [
      'Aufnahme von Rohmaterial-Freistellern der Produkte',
      'Generierung realistischer Hintergründe & Lichtverhältnisse mit NanoBanana Pro',
      'Grafisches Fine-Tuning, Farbkorrektur & Badge-Integration in Canva AI',
      'Kompression und WebP-Konvertierung für optimale Shopify-Ladezeiten',
      'Upload und Einbindung in die entsprechenden Shopify-Produktgalerien'
    ],
    vorgehensweise: 'Analyse von Wettbewerber-Fotos → Prompting passender Raum- & Natur-Settings → Multi-Iterative Generierung → Nachbearbeitung → Mobile-Prüfung in Shopify.',
    ergebnis: 'Verkaufsfertige Bildwelt ohne Verzögerung des Launchelements, 100% konsistentes Branding über die gesamte Kollektion.',
    learnings: 'KI-Bilder benötigen menschliches Auge für Schatten, Proportionen und Details. Die Kombination aus NanoBanana Pro und manueller Feinarbeit ist unschlagbar.'
  }
};

function loadCaseStudyData(id) {
  const data = caseStudyData[id];
  if (!data) return;

  document.getElementById('modal-title').textContent = data.title;
  document.getElementById('modal-category').textContent = data.category;
  document.getElementById('modal-ausgangssituation').textContent = data.ausgangssituation;
  document.getElementById('modal-ziel').textContent = data.ziel;
  document.getElementById('modal-vorgehensweise').textContent = data.vorgehensweise;
  document.getElementById('modal-ergebnis').textContent = data.ergebnis;
  document.getElementById('modal-learnings').textContent = data.learnings;

  // Render Tools
  const toolsContainer = document.getElementById('modal-tools');
  toolsContainer.innerHTML = data.tools.map(t => `<span class="px-2.5 py-1 bg-zinc-100 text-zinc-800 text-xs font-medium rounded-md">${t}</span>`).join('');

  // Render Beitrag List
  const beitragContainer = document.getElementById('modal-beitrag');
  beitragContainer.innerHTML = data.beitrag.map(b => `<li class="flex items-start gap-2 text-zinc-600 text-sm"><span class="text-emerald-700 font-bold">✓</span> ${b}</li>`).join('');
}
