// Page Solutions

// ----- Étapes et solutions : apparition en douceur au défilement -----
const elements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observateur = new IntersectionObserver(function (entrees) {
    entrees.forEach(function (entree) {
      if (entree.isIntersecting) {
        entree.target.classList.add('visible');
        observateur.unobserve(entree.target);
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(function (element) {
    observateur.observe(element);
  });
} else {
  // Vieux navigateur : on affiche tout directement
  elements.forEach(function (element) {
    element.classList.add('visible');
  });
}

// ----- Petit calendrier dessiné (hero) -----
// data-jours : examens, data-devoirs : devoirs, data-revisions : révisions suggérées (jours numérotés à partir de 1)
document.querySelectorAll('.calendrier').forEach(function (calendrier) {
  function lireListe(texte) {
    return (texte || '').split(',').map(Number);
  }

  const examens = lireListe(calendrier.dataset.jours);
  const devoirs = lireListe(calendrier.dataset.devoirs);
  const revisions = lireListe(calendrier.dataset.revisions);

  for (let numero = 1; numero <= 35; numero++) {
    const jour = document.createElement('div');
    jour.className = 'jour';
    if (examens.includes(numero)) {
      jour.classList.add('important');
    } else if (devoirs.includes(numero)) {
      jour.classList.add('devoir');
    } else if (revisions.includes(numero)) {
      jour.classList.add('revision');
    }
    calendrier.appendChild(jour);
  }
});
