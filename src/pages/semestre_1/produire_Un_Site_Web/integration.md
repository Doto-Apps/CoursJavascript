---
layout: "layouts/Layout.astro"
title: "Projet : construire la structure sémantique"
type: "TD"
order: 3
previousSession: "/semestre_1/produire_Un_Site_Web/figma"
nextSession: "/semestre_1/produire_Un_Site_Web/disposition"
---

<a id="comprendre"></a>
## Le document HTML et les fichiers du projet

La maquette fournit des relations de contenu et de disposition ; le HTML exprime d’abord les rôles et la hiérarchie. Une page doit rester lisible avant sa décoration. Le support [HTML du S1](/semestre_1/integration/htmltd) détaille la syntaxe des éléments.

```text
site/
  index.html
  css/styles.css
  images/affiche.jpg
  credits.md
```

Un chemin relatif est résolu depuis le document qui le référence. `images/affiche.jpg` part ici du dossier d’`index.html`. Vérifiez la casse exacte du chemin et du fichier : elle peut devenir significative sur l’hébergement. Dans une feuille CSS, `url(...)` part du fichier CSS.

## Métadonnées et grandes zones sémantiques

`title` nomme l’onglet ; `h1` est le titre principal visible. `head` contient les métadonnées ; `body` contient la page. L’encodage UTF-8 du fichier et la déclaration `charset` doivent correspondre.

```html preview title="Une page avec ses zones sémantiques" height=380
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Portfolio de Léa</title>
</head>
<body>
  <header><h1>Portfolio de Léa</h1></header>
  <nav aria-label="Navigation"><a href="#projets">Projets</a> <a href="#contact">Contact</a></nav>
  <main>
    <section id="projets">
      <h2>Projets</h2>
      <article class="carte"><h3>Affiche du festival</h3><p>Création de l’identité visuelle.</p></article>
    </section>
    <section id="contact"><h2>Contact</h2><p>Coordonnées du créateur.</p></section>
  </main>
  <footer><p>Crédits des médias disponibles dans le projet.</p></footer>
</body>
</html>
```

Le résultat présente un titre, une navigation, une fiche et un contact sans nécessiter de CSS. `header` est l’en-tête, `nav` la navigation principale et `main` le contenu principal. `section` regroupe un thème titré ; `article` convient à un projet autonome ; `footer` termine le document. `div` reste un conteneur générique sans sens supplémentaire lorsque les autres éléments ne correspondent pas au rôle recherché.

## Titres, classes et identifiants

Le niveau de titre suit la hiérarchie, pas la taille souhaitée. Ne changez pas un `h2` en `h6` pour le rendre petit : CSS règle la taille. Plusieurs cartes partagent la classe `carte`, mais un id reste unique dans le document.

`href="#contact"` doit correspondre à l’élément dont l’id vaut `contact`. Une destination inexistante casse le parcours même si le lien est correctement stylisé. Un bouton exécute une action ; un lien navigue vers une ressource.

## Validation et lecture sans CSS

Retirer temporairement la feuille de style permet d’observer l’ordre réel, les titres et le sens des contrôles. Un validateur HTML complète cette lecture, puis des tests manuels vérifient les liens, les alternatives d’images et la navigation clavier. Ces contrôles répondent à des questions différentes : un HTML valide ne prouve pas à lui seul un parcours utile.

La [disposition CSS](disposition) ajoute ensuite largeur, alignements et gouttières sans modifier les rôles HTML.

## Construire la première version du site

Créez les fichiers du projet et traduisez le parcours du brief en destinations réelles. Rédigez le document complet, les grandes zones et au moins trois articles de projet avec titres hiérarchisés et descriptions. Préparez les images et leurs alternatives, puis associez les liens à leurs cibles exactes.

Contrôlez la lecture sans CSS, la validité HTML, chaque lien et chaque chemin de ressource. Remettez cette version structurée avec les médias et les crédits. Votre binôme doit pouvoir retrouver un projet et le contact sans s’aider des couleurs ou de la maquette.
