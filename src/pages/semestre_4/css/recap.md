---
layout: "layouts/Layout.astro"
title: "Récapitulatif"
---

## HTML sémantique et CSS de composition

Ce mémento renvoie aux notions étudiées précédemment pour préparer une interface alimentée par JavaScript. La balise exprime le rôle ; CSS règle le rendu ; JavaScript gère l’état et les interactions.

| Situation | Choix | Support détaillé |
|---|---|---|
| Naviguer vers une page | `a` avec un `href` réel | [HTML](/semestre_1/integration/htmltd) |
| Déclencher une action | `button` natif | [Événements](/semestre_4/js/begin/events) |
| Nommer un champ | `label` associé par `for` et `id` | [Formulaires](/semestre_1/integration/formulairetd) |
| Espacer une boîte | `padding`, `margin`, `border-box` | [Modèle de boîte](/semestre_1/integration/csstd#boites) |
| Aligner sur un axe | Parent flex | [Flexbox](/semestre_4/css/flex) |
| Partager des colonnes | Parent grid | [Grid](/semestre_4/css/grid) |
| Adapter selon la largeur | Media query | [Responsive](/semestre_1/produire_Un_Site_Web/responsive) |

## Une carte responsive

```html preview title="Le contenu décide de la hauteur" height=230
<article>
  <h2>Projet de photographie</h2>
  <p>Une description qui peut occuper plusieurs lignes sans être coupée.</p>
  <a href="#details">Détails du projet</a>
</article>
<p id="details">Exposition réalisée en atelier.</p>
<style>
  article { box-sizing: border-box; max-width: 24rem; padding: 16px; border: 2px solid #1d4ed8; }
  h2 { margin-top: 0; }
  :focus-visible { outline: 3px solid #be123c; outline-offset: 3px; }
</style>
```

La largeur est limitée, la hauteur reste automatique et le lien possède une destination. La navigation clavier dispose d’un repère visible. Une `height` fixe serait fragile lorsque le titre ou la description s’allongent.

## Mouvement et accessibilité

Une transition accompagne un changement d’état ; une animation `@keyframes` définit une séquence. Elles ne doivent pas cacher une information essentielle. Respectez `prefers-reduced-motion` et conservez des états utilisables sans animation. Les [transitions](/semestre_1/produire_Un_Site_Web/animationTransition) et les [animations](/semestre_1/produire_Un_Site_Web/animationKeyframes) présentent des démonstrations distinctes.
