---
layout: "layouts/Layout.astro"
title: "TP : Transformation de la Maquette Figma en Site Statique"
type: "TP"
---

## Objectif

L'objectif de ce TP est de transformer la maquette Figma que vous avez réalisée pour le site **Birbone** en un site statique. Ce TP est conçu pour durer 4 heures, au terme desquelles je passerai dans la salle pour évaluer votre travail. Vous devez avoir mis en place le squelette de votre site avec un placement des éléments en Flexbox.

## Étapes du TP

### 1. Préparation de l'Environnement

Assurez-vous d'avoir un environnement de développement prêt pour coder en HTML et CSS. Vous pouvez utiliser un éditeur de texte comme Visual Studio Code, Sublime Text ou Brackets.

### 2. Structure du Squelette HTML

- **Création du Fichier HTML** : Créez un fichier `index.html` à la racine de votre projet.
- **Squelette HTML5** : Mettez en place la structure de base du document HTML5.
  
  Exemple de squelette de base :
  ```html
  <!DOCTYPE html>
  <html lang="fr">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Birbone</title>
      <link rel="stylesheet" href="styles.css">
  </head>
  <body>
      <!-- Ajoutez vos sections ici -->
  </body>
  </html>
  ```

### 3. Placement des Éléments avec Flexbox

- **Création du Fichier CSS** : Créez un fichier `styles.css` dans lequel vous allez écrire vos règles CSS.
- **Organisation du Squelette** : Utilisez des balises sémantiques HTML5 comme `<header>`, `<nav>`, `<section>`, `<footer>` pour structurer les différentes parties de votre site.
- **Mise en Place du Flexbox** : Utilisez Flexbox pour organiser les éléments à l'intérieur de chaque section.

  Exemple de CSS pour organiser une section en Flexbox :
  ```css
  body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
  }

  header, nav, section, footer {
      width: 100%;
      max-width: 1200px;
      margin: 20px 0;
  }

  section {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
  }
  ```

### 4. Intégration des Éléments de la Maquette

- **Placement des Sections** : Placez les éléments principaux de votre maquette (en-tête, menu, sections de contenu) dans les différentes sections de votre HTML.
- **Utilisation du Flexbox** : Ajustez les propriétés Flexbox pour obtenir un alignement et une disposition conformes à votre maquette Figma.

## Barème d'Évaluation

L'évaluation sera réalisée à la fin du TP. Voici les critères qui seront utilisés pour noter votre travail :

- **Structure du Squelette HTML (2 points)** : Le squelette HTML est en place et utilise des balises sémantiques appropriées.
- **Mise en Place du Flexbox (3 points)** : Les éléments sont correctement placés en utilisant Flexbox pour aligner et distribuer les sections.
- **Conformité à la Maquette (3 points)** : Le site reflète fidèlement la maquette réalisée sur Figma, en respectant la structure et l'organisation des éléments.
- **Présentation du Code (2 points)** : Le code est bien structuré, clair, et prêt à être validé selon les normes W3C lors de la prochaine étape.

## Conclusion

À la fin de ce TP, vous devriez avoir un squelette de site fonctionnel qui respecte la structure et l'organisation définies dans votre maquette Figma. Ce travail est une étape intermédiaire avant de finaliser le développement complet de votre site **Birbone**.

Bonne chance dans votre développement, et n'oubliez pas que je passerai dans la salle pour évaluer votre travail à la fin des 4 heures.