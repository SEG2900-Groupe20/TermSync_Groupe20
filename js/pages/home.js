// Code propre à la page d'accueil

// Les captures de chaque écran (ordinateur, téléphone, tablette) défilent toutes seules
// en fondu, sans boutons ni points. JavaScript natif, sans bibliothèque.
document.addEventListener('DOMContentLoaded', () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('.screen[data-interval]').forEach((screen, n) => {
    const images = Array.from(screen.querySelectorAll('.slide-img'));
    if (images.length < 2) return;

    const interval = Number(screen.dataset.interval) || 4000;
    let current = 0;
    let timer = null;

    function next() {
      images[current].classList.remove('is-active');
      current = (current + 1) % images.length;
      images[current].classList.add('is-active');
    }

    function start() {
      if (!timer) timer = setInterval(next, interval);
    }

    function stop() {
      clearInterval(timer);
      timer = null;
    }

    // Pause quand l'onglet n'est pas visible
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

    // Décale le départ de chaque écran pour qu'ils ne changent pas tous en même temps
    setTimeout(start, n * 800);
  });
});

const section = document.querySelector('.termsync');
const sticky = section.querySelector('.termsync-sticky');
const hub = section.querySelector('.termsync-hub');
const branches = Array.from(section.querySelectorAll('.branch'));

// ----- Courbes du logo vers chaque image -----
const SVG_NS = 'http://www.w3.org/2000/svg';
const liens = document.createElementNS(SVG_NS, 'svg');
liens.setAttribute('class', 'termsync-links');
liens.setAttribute('aria-hidden', 'true');
sticky.prepend(liens);

// Un groupe (courbe + point d'arrivée) par branche, dans le même ordre
const groupes = branches.map(() => {
  const g = document.createElementNS(SVG_NS, 'g');
  const chemin = document.createElementNS(SVG_NS, 'path');
  const point = document.createElementNS(SVG_NS, 'circle');
  point.setAttribute('r', '4.5');
  g.append(chemin, point);
  liens.append(g);
  return { g, chemin, point };
});

function dessinerLiens() {
  const base = sticky.getBoundingClientRect();
  // Position d'un élément dans la zone, sans le léger décalage d'apparition (translateY)
  const boite = (el, decalage) => {
    const r = el.getBoundingClientRect();
    return { gauche: r.left - base.left, droite: r.right - base.left,
             haut: r.top - base.top - decalage, bas: r.bottom - base.top - decalage,
             cx: (r.left + r.right) / 2 - base.left, cy: (r.top + r.bottom) / 2 - base.top - decalage };
  };
  const h = boite(hub, 0);
  const marge = 8;

  branches.forEach((branche, i) => {
    const image = branche.querySelector('img');
    if (!image) return;
    const visible = branche.classList.contains('is-visible');
    const m = boite(image, visible ? 0 : 20);
    let x1, y1, x2, y2, d;

    if (branche.classList.contains('branch-top') || branche.classList.contains('branch-bottom')) {
      const haut = branche.classList.contains('branch-top');
      x1 = h.cx; y1 = haut ? h.haut - marge : h.bas + marge;
      x2 = m.cx; y2 = haut ? m.bas + marge : m.haut - marge;
      const milieu = (y1 + y2) / 2, ecart = haut ? 38 : -38;
      d = `M${x1},${y1} C${x1 + ecart},${milieu} ${x2 - ecart},${milieu} ${x2},${y2}`;
    } else {
      const gauche = branche.classList.contains('branch-left');
      x1 = gauche ? h.gauche - marge : h.droite + marge; y1 = h.cy;
      x2 = gauche ? m.droite + marge : m.gauche - marge; y2 = m.cy;
      const milieu = (x1 + x2) / 2, ecart = gauche ? 42 : -42;
      d = `M${x1},${y1} C${milieu},${y1 + ecart} ${milieu},${y2 - ecart} ${x2},${y2}`;
    }

    const { chemin, point } = groupes[i];
    chemin.setAttribute('d', d);
    point.setAttribute('cx', x2);
    point.setAttribute('cy', y2);
    // La courbe se dessine petit à petit quand la branche apparaît
    const longueur = chemin.getTotalLength();
    chemin.style.strokeDasharray = longueur;
    chemin.style.strokeDashoffset = visible ? 0 : longueur;
  });
}

function mettreAJour() {
  if (window.innerWidth <= 768) {               // mobile : tout visible, sans courbes
    branches.forEach(b => b.classList.add('is-visible'));
    return;
  }
  const rect = section.getBoundingClientRect();
  const progress = -rect.top / (section.offsetHeight - innerHeight); // 0 → 1
  // Au moins la première branche est toujours affichée : pas de grand vide au début.
  const active = Math.min(branches.length - 1, Math.max(0, Math.floor(progress * branches.length)));
  // Les branches s'ajoutent une à une et restent affichées : la carte se remplit au fil du scroll
  branches.forEach((b, i) => {
    const visible = i <= active;
    b.classList.toggle('is-visible', visible);
    groupes[i].g.classList.toggle('is-visible', visible);
    groupes[i].chemin.style.strokeDashoffset = visible ? 0 : groupes[i].chemin.style.strokeDasharray;
  });
}

window.addEventListener('scroll', mettreAJour);
window.addEventListener('resize', () => { dessinerLiens(); mettreAJour(); });
window.addEventListener('load', () => { dessinerLiens(); mettreAJour(); });
section.querySelectorAll('img').forEach(img => img.addEventListener('load', dessinerLiens));
dessinerLiens();
mettreAJour();
