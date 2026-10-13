---
layout: "layouts/Layout.astro"
title: "Grid"
---

## Grid : pistes communes et contenus variables

La [grille du S1](/semestre_1/integration/grid) introduit conteneur, lignes et placement. Grid organise simultanément lignes et colonnes ; Flexbox répartit principalement les éléments sur un axe. La taille des pistes doit aussi résister aux titres longs et à l’espace disponible.

## fr et minmax

`fr` représente une part de l’espace distribuable, après les pistes fixes et les gouttières. `1fr 2fr` réserve deux parts à la seconde piste, sous réserve des contraintes minimales du contenu. `minmax(0, 1fr)` permet une piste flexible dont le minimum ne soit pas imposé par un long mot.

```html live title="Deux pistes de largeur différente"
<div class="grille"><article>A</article><article>B</article><article>C</article><article>D</article></div>
<style>
  .grille { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 2fr); gap: 12px; }
  article { padding: 16px; background: #dbeafe; overflow-wrap: anywhere; }
</style>
```

A et C occupent la première colonne ; B et D, la seconde. Les lignes partagent leurs pistes, contrairement à plusieurs lignes Flexbox indépendantes.

## repeat, auto-fit et auto-fill

```html live title="Une grille qui adapte son nombre de colonnes"
<div class="grille"><article>Photo</article><article>Vidéo</article><article>Son</article></div>
<style>
  .grille { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 160px), 1fr)); gap: 16px; }
  article { padding: 16px; background: #dbeafe; }
</style>
```

La grille crée autant de pistes de 160 px minimum que l’espace le permet, puis les étire. `min(100%, 160px)` évite d’imposer 160 px à un conteneur encore plus étroit. `auto-fit` replie les pistes vides ; `auto-fill` conserve leur place. Avec peu de cartes dans un grand conteneur, cette différence devient visible.

## Placement et zones nommées

`grid-column: 1 / -1` traverse de la première à la dernière ligne de la grille explicite. `grid-column: span 2` occupe deux pistes à partir du placement choisi. Une disposition nommée utilise `grid-template-areas` sur le parent et `grid-area` sur chaque enfant ; chaque zone doit former un rectangle.

Le placement visuel ne modifie pas l’ordre du DOM. Gardez un document lisible sans CSS et un parcours clavier logique. Une piste explicite de hauteur fixe peut couper un contenu long : laissez la hauteur automatique lorsque le texte décide de la dimension.
