---
hidden: true
order: 5
layout: "layouts/Layout.astro"
title: "TP 1 : Transitions CSS — Animer en douceur"
type: "TP"
---

## Les transitions CSS

Une transition accompagne le passage entre deux valeurs d’une propriété. Elle ne déclenche pas ce changement : un survol, un focus ou une classe doit d’abord définir un nouvel état. Une animation `@keyframes`, étudiée dans le [support suivant](/semestre_1/produire_Un_Site_Web/animationKeyframes), décrit une séquence indépendante de deux états seulement.

## transition-property et transition-duration

```html live title="Une couleur change au survol et au focus"
<button type="button">Survolez-moi ou utilisez Tab</button>
<style>
  button { background: #dbeafe; color: #172554; padding: 12px; border: 2px solid #1d4ed8;
    transition-property: background-color; transition-duration: 600ms; }
  button:hover, button:focus-visible { background-color: #fef08a; }
</style>
```

Le fond passe progressivement du bleu au jaune, puis revient au bleu quand l’état cesse. La transition appartient à la règle de base pour fonctionner dans les deux sens. `600ms` vaut 0,6 seconde ; une durée nulle produit un changement immédiat.

## transition-timing-function et transition-delay

La fonction de progression règle la vitesse au cours du temps : `linear` garde une vitesse constante, `ease-in` démarre lentement, `ease-out` ralentit à la fin et `ease-in-out` ralentit aux deux extrémités. `transition-delay` ajoute une attente avant le départ, pas une durée supplémentaire au mouvement lui-même.

```html live title="Comparer linear et ease-in"
<div class="piste"><div class="linear">linear</div><div class="progressif">ease-in</div></div>
<style>
  .piste { padding: 12px; border: 2px dashed #1d4ed8; }
  .piste div { width: 90px; margin-block: 8px; padding: 8px; background: #dbeafe; transition: transform 1s; }
  .linear { transition-timing-function: linear; }
  .progressif { transition-timing-function: ease-in; }
  .piste:hover div { transform: translateX(100px); }
</style>
```

Au survol du cadre, les deux boîtes parcourent la même distance en une seconde. `ease-in` part plus lentement puis rattrape la destination. Les règles spécifiques choisissent ici la progression de chaque boîte.

## Le raccourci transition

`transition: transform 300ms ease-out 100ms` associe propriété, durée, progression et délai. Le premier temps représente la durée, le second le délai. Plusieurs transitions se séparent par une virgule, par exemple `background-color 200ms, transform 300ms`. Nommer les propriétés évite qu’un futur changement de taille déclenche un effet involontaire comme avec `all`.

## transform et place dans le document

Une transformation déplace, redimensionne ou tourne le rendu d’un élément sans recalculer sa place initiale dans le flux. Elle peut donc faire chevaucher des voisins. `translateX(20px)` déplace horizontalement, `scale(1.05)` agrandit et `rotate(5deg)` tourne.

```html live title="Transformation sans déplacement du voisin"
<div class="carte" tabindex="0">Carte</div>
<p>Ce paragraphe conserve sa place.</p>
<style>
  .carte { width: 120px; padding: 16px; background: #dbeafe; transition: transform 300ms; }
  .carte:hover, .carte:focus-visible { transform: translateX(40px); }
</style>
```

La carte se déplace au survol ou au focus ; le paragraphe ne vient pas occuper sa place. Les couleurs, l’opacité et les transformations conviennent à de nombreuses transitions. Une propriété discrète comme `display` ne se comporte pas comme une couleur interpolable dans une transition ordinaire : commencez par des propriétés dont les valeurs intermédiaires sont claires.

## prefers-reduced-motion

```css
@media (prefers-reduced-motion: reduce) {
  .carte { transition: none; }
  .carte:hover, .carte:focus-visible { transform: none; }
}
```

Dans l’exemple précédent, ces règles retirent le déplacement si une réduction du mouvement est demandée. L’état de focus doit rester perceptible grâce au contour natif ou à son remplacement visible. Une animation décorative ne doit pas être le seul moyen d’annoncer une information.
