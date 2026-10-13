---
order: 4
layout: "layouts/Layout.astro"
title: "Apprendre les flexbox avec des jeux"
type: "TP"
---

## Les axes et les alignements Flexbox

Les jeux de cette page prolongent les [propriétés Flexbox](/semestre_1/integration/csstd#flex). Le parent porte `display: flex` ; ses enfants directs sont distribués selon les axes du conteneur.

| Propriété | Effet à rechercher |
|---|---|
| `flex-direction` | Direction de l’axe principal |
| `justify-content` | Distribution sur l’axe principal |
| `align-items` | Alignement sur l’axe transversal |
| `flex-wrap` | Retour sur plusieurs lignes |
| `gap` | Espacement entre éléments ou lignes |

## Flexbox Froggy et Flexbox Defense

[Flexbox Froggy](https://flexboxfroggy.com/#fr) associe des cibles à des positions d’éléments. [Flexbox Defense](http://www.flexboxdefense.com/) utilise la disposition d’éléments dans un contexte de jeu. Ces ressources sont facultatives et restent externes à la plateforme.

Si une direction passe de `row` à `column`, `justify-content` suit le nouvel axe principal : il ne signifie pas systématiquement « aligner horizontalement ». Une position obtenue dans un niveau devient une connaissance réutilisable quand la propriété et le parent concernés sont identifiés.
