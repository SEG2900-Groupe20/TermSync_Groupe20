// Page Solutions

// ----- Étapes : cliquer sur une étape affiche son explication -----
const etapes = document.querySelectorAll('.etape');
const detail = document.getElementById('detail-etape');

function choisirEtape(etape) {
  etapes.forEach(function (e) {
    e.classList.remove('actif');
  });
  etape.classList.add('actif');
  detail.textContent = etape.dataset.detail;
}

etapes.forEach(function (etape) {
  etape.tabIndex = 0;
  etape.addEventListener('click', function () {
    choisirEtape(etape);
  });
  // Accessible aussi au clavier (Entrée ou Espace)
  etape.addEventListener('keydown', function (evenement) {
    if (evenement.key === 'Enter' || evenement.key === ' ') {
      evenement.preventDefault();
      choisirEtape(etape);
    }
  });
});

if (etapes.length > 0) {
  choisirEtape(etapes[0]);
}

// ----- Solutions : apparition en douceur au défilement -----
const solutions = document.querySelectorAll('.solution');

if ('IntersectionObserver' in window) {
  const observateur = new IntersectionObserver(function (entrees) {
    entrees.forEach(function (entree) {
      if (entree.isIntersecting) {
        entree.target.classList.add('visible');
        observateur.unobserve(entree.target);
      }
    });
  }, { threshold: 0.2 });

  solutions.forEach(function (solution) {
    observateur.observe(solution);
  });
} else {
  // Vieux navigateur : on affiche tout directement
  solutions.forEach(function (solution) {
    solution.classList.add('visible');
  });
}

// ----- Petit calendrier dessiné dans la tablette -----
const calendrier = document.getElementById('calendrier');

if (calendrier) {
  // Jours (numérotés à partir de 1) marqués comme examen ou devoir
  const joursImportants = [4, 11, 17, 25, 30];

  for (let numero = 1; numero <= 35; numero++) {
    const jour = document.createElement('div');
    jour.className = 'jour';
    if (joursImportants.includes(numero)) {
      jour.classList.add('important');
    }
    calendrier.appendChild(jour);
  }
}
