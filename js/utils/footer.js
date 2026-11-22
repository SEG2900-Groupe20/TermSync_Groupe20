// Composant footer : le pied de page, identique sur toutes les pages.
//
// Utilisation dans une page :
//   <head>  <script src="../js/utils/footer.js" defer></script>  </head>
//   <body>  ...  <div id="footer"></div>  (en bas du body)
// (dans index.html à la racine : src="./js/utils/footer.js")
//
// Pour ajouter ou renommer un lien, modifier les listes ci-dessous.

(function () {
  // Adresse de ce script : permet de retrouver la racine du site
  // quel que soit le dossier de la page (index.html ou pages/...)
  const racine = new URL('../../', document.currentScript.src);

  const colonnes = [
    {
      titre: 'Produit',
      liens: [
        { texte: 'Solutions', page: 'pages/solutions.html' },
        { texte: 'Fonctionnalités', page: 'pages/features.html' },
        { texte: 'Tarifs', page: 'pages/pricing.html' }
      ]
    },
    {
      titre: 'Entreprise',
      liens: [
        { texte: 'À propos', page: 'pages/about.html' },
        { texte: 'Équipe', page: 'pages/team.html' }
      ]
    },
    {
      titre: 'Légal',
      liens: [
        { texte: 'CGU', page: 'pages/cgu.html' },
        { texte: 'Confidentialité', page: 'pages/privacy.html' }
      ]
    }
  ];

  function adresse(page) {
    return new URL(page, racine).href;
  }

  function creerMarque() {
    const bloc = document.createElement('div');
    bloc.className = 'footer-marque';

    const logo = document.createElement('a');
    logo.href = adresse('index.html');
    logo.setAttribute('aria-label', 'TermSync, retour à l\'accueil');
    const image = document.createElement('img');
    image.className = 'footer-logo';
    image.src = adresse('assets/logo/Official_logo.png');
    image.alt = 'TermSync';
    logo.appendChild(image);

    const texte = document.createElement('p');
    texte.className = 'footer-slogan';
    texte.textContent = 'Votre trimestre, synchronisé.';

    bloc.appendChild(logo);
    bloc.appendChild(texte);
    return bloc;
  }

  function creerColonne(colonne) {
    const nav = document.createElement('nav');
    nav.className = 'footer-colonne';
    nav.setAttribute('aria-label', colonne.titre);

    const titre = document.createElement('h2');
    titre.className = 'footer-titre';
    titre.textContent = colonne.titre;
    nav.appendChild(titre);

    colonne.liens.forEach(function (lien) {
      const a = document.createElement('a');
      a.className = 'footer-lien';
      a.textContent = lien.texte;
      a.href = adresse(lien.page);
      nav.appendChild(a);
    });
    return nav;
  }

  function creerFooter() {
    const pied = document.createElement('footer');
    pied.className = 'site-footer';

    const interieur = document.createElement('div');
    interieur.className = 'site-footer-interieur';
    interieur.appendChild(creerMarque());
    colonnes.forEach(function (colonne) {
      interieur.appendChild(creerColonne(colonne));
    });

    const bas = document.createElement('p');
    bas.className = 'footer-copyright';
    bas.textContent = '© ' + new Date().getFullYear() + ' TermSync. Tous droits réservés.';

    pied.appendChild(interieur);
    pied.appendChild(bas);
    return pied;
  }

  function afficher() {
    const emplacement = document.getElementById('footer');
    const pied = creerFooter();

    if (emplacement) {
      emplacement.appendChild(pied);
    } else {
      document.body.appendChild(pied);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', afficher);
  } else {
    afficher();
  }
})();
