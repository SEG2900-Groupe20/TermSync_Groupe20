# Conventions de l'équipe

Les règles de style (couleurs, typographie, composants) sont dans `style_guidelines.txt`.

## Organisation
- `index.html` : page d'accueil
- `pages/` : une page HTML par sujet (solutions, features, pricing, team, cgu, privacy, about)
- `css/` : `components.css` (navbar et footer, sur toutes les pages), `base.css` et `variables.css`
  (pages Solutions, Fonctionnalités, CGU, Confidentialité, À propos), `pages/` pour le CSS de chaque page
  (`pages/legal.css` est partagé par les CGU et la Confidentialité)
- `js/` : `utils/navbar.js` et `utils/footer.js` communs ; un fichier dans `js/pages/` seulement si la page en a besoin
- `assets/` : `logo/`, `images/` (photos de l'équipe, illustrations) et `images/screens/` (captures de l'app)
- `mockups/screens/` : sources HTML des captures de l'app, exportées par `export.sh`
- `docs/` : documentation

## Règles
- Noms de fichiers en minuscules, sans espace ni accent : `liste-cours.html`
- Classes CSS en minuscules avec tirets : `.carte-cours`
- Variables et fonctions JS en camelCase : `ajouterCours()`
- Les couleurs viennent de la palette de `style_guidelines.txt` (rouge du logo `#a41c1c`) ; pas de dégradé
- Ne pas créer de fichier CSS ou JS vide : on l'ajoute quand la page en a besoin
- Supprimer ce qui n'est plus utilisé (images, règles CSS, scripts)

## Travail en groupe avec git
- Une branche par tâche : `prenom/fonctionnalite` (ex. `axel/page-connexion`)
- Avant de commencer : `git pull`
- Messages de commit courts et clairs
- Fusion dans `main` par pull request, relue par un autre membre
- Avant de fusionner une branche ancienne, la mettre à jour avec `main` pour éviter les conflits sur la navbar et le footer

## Navbar et footer communs
- Le menu du haut est un composant : `js/utils/navbar.js` (liste des liens) + style dans `css/components.css`
- Le pied de page est un composant : `js/utils/footer.js` (liens et slogan) + style dans `css/components.css`
- Dans chaque page : les deux scripts dans le `<head>` avec `defer`
  (`../js/utils/navbar.js` et `../js/utils/footer.js` ; depuis `index.html` : `./js/utils/...`),
  `<div id="navbar"></div>` au début du `<body>` et `<div id="footer"></div>` à la fin
- Ne pas recréer de menu ni de footer dans le CSS ou le HTML d'une page

## Captures de l'app
- Les écrans (ordinateur, téléphone, tablette) sont dessinés dans `mockups/screens/*.html`
- `bash mockups/screens/export.sh` les exporte en PNG 2x dans `assets/images/screens/`
- Le site utilise des versions allégées (`*-hero.png`, `*-mid.png`) : les originaux 2x ne sont pas versionnés
