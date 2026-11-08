// Composant navbar : le menu du haut, identique sur toutes les pages.
//
// Utilisation dans une page :
//   <head>  <script src="../js/utils/navbar.js" defer></script>  </head>
//   <body>  <div id="navbar"></div>  ...
// (dans index.html à la racine : src="js/utils/navbar.js")
//
// Pour ajouter ou renommer un lien, il suffit de modifier la liste ci-dessous.

(function () {
  // Adresse de ce script : permet de retrouver la racine du site
  // quel que soit le dossier de la page (index.html ou pages/...)
  const racine = new URL('../../', document.currentScript.src);

  const liens = [
    { texte: 'Accueil', page: 'index.html' },
    { texte: 'Solutions', page: 'pages/solutions.html' },
    { texte: 'Fonctionnalités', page: 'pages/features.html' },
    { texte: 'Tarifs', page: 'pages/pricing.html' },
    { texte: 'Équipe', page: 'pages/team.html' }
  ];

  function nomDuFichier(chemin) {
    return chemin.split('/').pop() || 'index.html';
  }

  function creerNavbar() {
    const pageActuelle = nomDuFichier(window.location.pathname);

    const nav = document.createElement('nav');
    nav.className = 'top-menu';
    nav.setAttribute('aria-label', 'Navigation principale');

    liens.forEach(function (lien) {
      const a = document.createElement('a');
      a.className = 'menu-item';
      a.textContent = lien.texte;
      a.href = new URL(lien.page, racine).href;

      if (nomDuFichier(lien.page) === pageActuelle) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
      }
      nav.appendChild(a);
    });

    return nav;
  }

  function afficher() {
    const emplacement = document.getElementById('navbar');
    const nav = creerNavbar();

    if (emplacement) {
      emplacement.appendChild(nav);
    } else {
      document.body.prepend(nav);
    }
    // Le menu est fixe : le guide demande 100px de marge en haut du body
    document.body.classList.add('avec-menu');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', afficher);
  } else {
    afficher();
  }
})();
