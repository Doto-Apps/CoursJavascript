---
layout: "layouts/Layout.astro"
title: "Flexbox"
---

## Flexbox : dimensions et espace disponible

Les [axes et alignements de Flexbox](/semestre_1/integration/csstd#flex) ont été introduits au S1. Le conteneur organise ses enfants directs ; `justify-content` distribue sur l’axe principal et `align-items` aligne sur l’axe transversal. Ici, la difficulté porte sur les dimensions flexibles et les contenus longs.

## flex-basis, flex-grow et flex-shrink

```html live title="Taille de base et partage de l’espace"
<div class="ligne"><article>A</article><article class="prioritaire">B</article></div>
<style>
  .ligne { display: flex; gap: 16px; border: 2px dashed #1d4ed8; }
  article { flex: 1 1 120px; min-width: 0; padding-block: 24px; background: #dbeafe; }
  .prioritaire { flex-grow: 2; }
</style>
```

Chaque enfant part de 120 px. L’espace restant après les bases et la gouttière est partagé en trois parts : une pour A, deux pour B. Quand il manque de la place, `flex-shrink: 1` autorise une réduction. `flex: 0 0 120px` empêcherait à la fois croissance et réduction.

## La taille minimale d’un enfant

La taille minimale automatique peut empêcher un élément flex de devenir plus étroit que son contenu. `min-width: 0` autorise la réduction de sa boîte ; le texte doit aussi pouvoir revenir à la ligne.

```html preview title="Texte long dans une colonne flexible" height=170
<div class="ligne"><aside>Menu</aside><p>UnTitreSansEspaceTrèsLongQuiDoitResterDansLeConteneur</p></div>
<style>
  .ligne { display: flex; gap: 16px; max-width: 300px; border: 2px solid #1d4ed8; }
  aside { flex: 0 0 70px; }
  p { flex: 1; min-width: 0; overflow-wrap: anywhere; margin: 0; background: #dbeafe; }
</style>
```

Le menu garde 70 px et le texte utilise l’espace restant sans imposer un débordement horizontal. Masquer ce texte avec `overflow: hidden` aurait dissimulé l’information.

## Retour à la ligne et alignement de plusieurs lignes

`flex-wrap: wrap` crée de nouvelles lignes. `align-items` règle les enfants dans leur ligne ; `align-content` distribue les lignes sur l’axe transversal quand le conteneur possède de l’espace libre. Si plusieurs rangées doivent partager les mêmes colonnes, utilisez [Grid](/semestre_4/css/grid) plutôt que de forcer les largeurs de lignes flex indépendantes.

`order` change l’ordre visuel sans changer le DOM ni l’ordre de tabulation. Une navigation ou un formulaire doit conserver une lecture cohérente ; privilégiez l’ordre du document.
