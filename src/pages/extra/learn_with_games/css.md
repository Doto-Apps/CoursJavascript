---
order: 2
layout: "layouts/Layout.astro"
title: "Apprendre le CSS avec des jeux"
type: "TP"
---

## CSS : sélection et déclaration

Une règle choisit des éléments puis leur applique des déclarations. Le [cours CSS](/semestre_1/integration/csstd) distingue ces deux responsabilités avant de traiter les boîtes et la disposition.

```html preview title="Un sélecteur ne cible que sa classe" height=140
<p class="accent">Texte sélectionné</p><p>Autre texte</p>
<style>.accent { color: #1d4ed8; }</style>
```

Seul le premier paragraphe devient bleu. `.accent` est le sélecteur ; `color` est la propriété ; `#1d4ed8` est la valeur. Une règle sans élément correspondant n’a pas d’effet visible.

## Ressources facultatives par notion

| Notion | Ressource | Ce qu’elle permet d’observer |
|---|---|---|
| Éléments ciblés | [Sélecteurs et CSS Diner](/extra/learn_with_games/selector) | Différence entre type, classe et relation de descendance |
| Axes et alignements | [Jeux Flexbox](/extra/learn_with_games/flexbox) | Effet de la direction et de la distribution |

La reproduction d’une forme avec le moins de code possible est un défi particulier. Dans un site à maintenir, la clarté des sélecteurs, l’accessibilité et l’adaptation du contenu restent des critères distincts de la brièveté.
