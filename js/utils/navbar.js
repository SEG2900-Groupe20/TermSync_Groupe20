// Composant navbar : le menu du haut, identique sur toutes les pages.
//
// Utilisation dans une page :
//   <head>  <script src="../js/utils/navbar.js" defer></script>  </head>
//   <body>  <div id="navbar"></div>  ...
// (dans index.html à la racine : src="./js/utils/navbar.js")
//
// Pour ajouter ou renommer un lien, modifier la liste ci-dessous.
// Le logo est l'image assets/logo/logo_termsync_recadre.png (voir creerLogo()).

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

  // Bouton d'action à droite du menu
  const action = { texte: 'Commencer', page: 'pages/pricing.html' };

  function adresse(page) {
    return new URL(page, racine).href;
  }

  function nomDuFichier(chemin) {
    return chemin.split('/').pop() || 'index.html';
  }

  // Logo : image dans assets/logo (version recadrée, sans marges)
  function creerLogo() {
    const logo = document.createElement('a');
    logo.className = 'menu-logo';
    logo.href = adresse('index.html');
    logo.setAttribute('aria-label', 'TermSync, retour à l\'accueil');

    const image = document.createElement('img');
    image.className = 'menu-logo-image';
    image.src = adresse('assets/logo/logo_termsync_recadre.png');
    image.alt = 'TermSync';

    logo.appendChild(image);
    return logo;
  }

  function creerLiens() {
    const pageActuelle = nomDuFichier(window.location.pathname);
    const nav = document.createElement('nav');
    nav.className = 'menu-liens';
    nav.id = 'menu-liens';
    nav.setAttribute('aria-label', 'Navigation principale');

    liens.forEach(function (lien) {
      const a = document.createElement('a');
      a.className = 'menu-item';
      a.textContent = lien.texte;
      a.href = adresse(lien.page);

      if (nomDuFichier(lien.page) === pageActuelle) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
      }
      nav.appendChild(a);
    });
    return nav;
  }

  function creerBouton() {
    const a = document.createElement('a');
    a.className = 'menu-action';
    a.textContent = action.texte;
    a.href = adresse(action.page);
    return a;
  }

  // Bouton à 3 barres, visible seulement sur petit écran
  function creerBurger(barre) {
    const bouton = document.createElement('button');
    bouton.type = 'button';
    bouton.className = 'menu-burger';
    bouton.setAttribute('aria-label', 'Ouvrir le menu');
    bouton.setAttribute('aria-controls', 'menu-liens');
    bouton.setAttribute('aria-expanded', 'false');
    bouton.innerHTML =
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"></path></svg>';

    function basculer(ouvrir) {
      barre.classList.toggle('ouvert', ouvrir);
      bouton.setAttribute('aria-expanded', String(ouvrir));
    }

    bouton.addEventListener('click', function () {
      basculer(!barre.classList.contains('ouvert'));
    });
    document.addEventListener('keydown', function (evenement) {
      if (evenement.key === 'Escape') basculer(false);
    });
    barre.addEventListener('click', function (evenement) {
      if (evenement.target.closest('.menu-item, .menu-action')) basculer(false);
    });
    return bouton;
  }

  function creerNavbar() {
    const barre = document.createElement('header');
    barre.className = 'top-menu';

    const interieur = document.createElement('div');
    interieur.className = 'top-menu-interieur';
    interieur.appendChild(creerLogo());
    interieur.appendChild(creerLiens());
    interieur.appendChild(creerBouton());
    interieur.appendChild(creerBurger(barre));

    barre.appendChild(interieur);
    return barre;
  }

  function afficher() {
    const emplacement = document.getElementById('navbar');
    const barre = creerNavbar();

    if (emplacement) {
      emplacement.appendChild(barre);
    } else {
      document.body.prepend(barre);
    }
    // Le menu est fixe : on laisse la place en haut du body
    document.body.classList.add('avec-menu');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', afficher);
  } else {
    afficher();
  }
})();
