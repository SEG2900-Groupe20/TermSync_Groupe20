# Conventions de l'équipe

## Organisation
- `index.html` : page d'accueil
- `pages/` : une page HTML par fonctionnalité
- `css/` : `variables`, `base`, `components` communs ; un fichier par page dans `css/pages/`
- `js/` : `main.js` commun ; un fichier par page dans `js/pages/` ; fonctions réutilisables dans `js/utils/`
- `assets/` : images, icônes, polices
- `docs/` : documentation

## Règles
- Noms de fichiers en minuscules, sans espace ni accent : `liste-cours.html`
- Classes CSS en minuscules avec tirets : `.carte-cours`
- Variables et fonctions JS en camelCase : `ajouterCours()`
- Les couleurs et polices se définissent dans `css/variables.css`, jamais en dur ailleurs
- Une page = son propre fichier CSS et JS dans `css/pages/` et `js/pages/`

## Travail en groupe avec git
- Ne jamais travailler directement sur `main`
- Une branche par tâche : `prenom/fonctionnalite` (ex. `axel/page-connexion`)
- Avant de commencer : `git pull`
- Messages de commit courts et clairs
- Fusion dans `main` par pull request, relue par un autre membre

## Navbar commune
- Le menu du haut est un composant : `js/utils/navbar.js` (liste des liens) + style dans `css/components.css`
- Dans chaque page : `<script src="../js/utils/navbar.js" defer></script>` dans le `<head>`
  (depuis `index.html` : `./js/utils/navbar.js`) et `<div id="navbar"></div>` au début du `<body>`
- Ne pas recréer de menu dans le CSS d'une page
