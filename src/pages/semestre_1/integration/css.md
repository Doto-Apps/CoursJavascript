---
hidden: true
order: 4
layout: "layouts/Layout.astro"
title: "Sélecteurs CSS & Flexbox — Cours CSS"
type: "CM"
---

## Sélecteurs, boîtes et Flexbox

Cette référence réunit les notions de base de CSS. Le [cours sur les sélecteurs, le modèle de boîte et Flexbox](/semestre_1/integration/csstd) explique chaque propriété et fournit ses démonstrations ; la [cascade](/semestre_1/integration/html) traite les règles concurrentes et [Grid](/semestre_1/integration/grid) les pistes communes.

| Besoin | Syntaxe | Emplacement |
|---|---|---|
| Tous les paragraphes | `p` | Sélecteur |
| Un composant répété | `.carte` | Sélecteur ; `class="carte"` dans le HTML |
| Un élément unique | `#programme` | Sélecteur ; `id="programme"` unique |
| Tous les descendants | `.carte p` | Sélecteur |
| Les enfants directs | `.carte > p` | Sélecteur |
| Espace dans une boîte | `padding` | Élément concerné |
| Espace hors d’une boîte | `margin` | Élément concerné |
| Espace entre enfants | `gap` | Parent flex ou grid |
| Distribution principale | `justify-content` | Parent flex |
| Alignement transversal | `align-items` | Parent flex |

## Une règle et son résultat

```html preview title="Une classe commune, deux cartes" height=160
<div class="cartes"><p class="carte">Photo</p><p class="carte">Vidéo</p></div>
<style>
  .cartes { display: flex; gap: 16px; }
  .carte { margin: 0; padding: 12px; border: 2px solid #1d4ed8; }
</style>
```

Les deux paragraphes reçoivent le même cadre et le même padding. Le parent les place en ligne et réserve 16 px entre leurs bordures. `margin: 0` retire les marges par défaut des paragraphes pour isoler l’effet de `gap`. Une règle ne doit pas compenser un sélecteur incorrect : vérifiez d’abord les éléments ciblés dans l’inspecteur.
