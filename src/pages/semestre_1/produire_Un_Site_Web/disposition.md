---
layout: "layouts/Layout.astro"
title: "Projet : disposer les blocs avec Flexbox et Grid"
type: "TD"
order: 4
previousSession: "/semestre_1/produire_Un_Site_Web/integration"
nextSession: "/semestre_1/produire_Un_Site_Web/composants"
---

<a id="comprendre"></a>
## Le conteneur de page

Une page peut occuper toute la fenêtre sans que ses textes doivent remplir toute cette largeur. Le conteneur de page limite la longueur des lignes et aligne les grandes zones. Les [boîtes CSS](/semestre_1/integration/csstd#boites) expliquent pourquoi padding et bordures participent au calcul.

```html preview title="Un conteneur limité et centré" height=170
<main><h2>Nos projets</h2><p>Le contenu garde un espace intérieur et une largeur maximale.</p></main>
<style>
  main { box-sizing: border-box; width: 100%; max-width: 700px; margin-inline: auto; padding: 24px; background: #dbeafe; }
</style>
```

`width: 100%` suit la place disponible ; `max-width` fixe une limite supérieure tout en permettant de rétrécir. `margin-inline: auto` répartit l’espace libre des deux côtés pour centrer le bloc. Le padding réserve l’espace intérieur. Avec `border-box`, la largeur inclut contenu, padding et bordures ; sans cette précaution, un bloc à 100 % plus padding peut déborder.

## La navigation avec Flexbox

Une navigation est une suite de liens. Le parent commun porte `display: flex` ; chaque lien n’a pas besoin de connaître la position de ses voisins.

```html live title="Des liens qui peuvent revenir à la ligne"
<nav aria-label="Navigation principale">
  <a href="#accueil">Accueil</a><a href="#projets">Projets</a><a href="#contact">Contact</a>
</nav>
<p id="accueil">Présentation</p><p id="projets">Réalisations</p><p id="contact">Coordonnées</p>
<style>
  nav { display: flex; flex-direction: row; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; padding: 12px; background: #dbeafe; }
</style>
```

`flex-direction` définit l’axe principal. `justify-content` répartit sur cet axe et `align-items` aligne sur l’axe transversal. `gap` espace les enfants ; `flex-wrap: wrap` autorise une nouvelle ligne si les liens ne tiennent plus. Sans espace libre, `space-between` ne crée pas une grande séparation : le contenu et la largeur du parent restent déterminants.

## Le catalogue avec Grid

Pour plusieurs rangées de projets qui doivent partager leurs colonnes, Grid définit des pistes communes. Six cartes sur trois colonnes produisent deux lignes en placement automatique, si aucune carte ne s’étend sur plusieurs pistes.

```html live title="Des colonnes communes à deux lignes"
<section aria-label="Projets" class="projets">
  <article>Photo</article><article>Vidéo</article><article>Affiche</article>
  <article>Son</article><article>Animation</article><article>Site</article>
</section>
<style>
  .projets { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
  article { padding: 16px; background: #dbeafe; overflow-wrap: anywhere; }
</style>
```

Le parent commun porte `display: grid`. `minmax(0, 1fr)` autorise chaque piste à rétrécir ; `overflow-wrap: anywhere` permet au texte long de se couper si nécessaire. Les adaptations du nombre de colonnes seront traitées dans le [responsive](/semestre_1/produire_Un_Site_Web/responsive).

## Flux normal et positionnement absolu

Une grille exprime des relations : trois colonnes de même fraction et une gouttière. Placer chaque carte avec des coordonnées absolues la retire du flux normal : les suivantes ne se déplacent plus correctement quand son texte grandit. Réservez le positionnement absolu à des éléments dont ce comportement est voulu, par exemple un badge dans une carte positionnée.

Dans l’inspecteur, mesurez successivement le conteneur, les pistes et les cartes. Une carte supplémentaire ou un titre long permet de distinguer une disposition souple d’une reproduction de coordonnées. Les [composants](composants) définissent ensuite les styles partagés à l’intérieur de cette disposition.

## Travail de disposition

Appliquez un conteneur centré, une navigation flex avec retour à la ligne et un catalogue Grid. Commencez par trois colonnes sur une largeur suffisante, puis ajoutez des projets et allongez une description : la hauteur doit suivre le contenu. La version étroite sera ajustée au cours responsive.

Relevez dans DevTools la largeur du conteneur, son padding, le gap et la largeur d’une piste. Avec six cartes sans étendue particulière, vérifiez les deux rangées de trois. Remettez le CSS et justifiez le choix de Flexbox pour la navigation et de Grid pour les colonnes communes.
