---
order: 3
layout: "layouts/Layout.astro"
title: "Apprendre les sélecteurs CSS avec des jeux"
type: "TP"
---

## Les sélecteurs CSS avec CSS Diner

[CSS Diner](https://flukeout.github.io/) propose de sélectionner des éléments dans une structure. Il correspond directement au [cours sur les sélecteurs](/semestre_1/integration/csstd#selecteurs). Cette ressource est facultative ; elle n’impose ni progression ni résultat à remettre.

| Sélecteur | Éléments ciblés |
|---|---|
| `p` | Tous les paragraphes |
| `.carte` | Éléments ayant la classe carte |
| `#programme` | Élément de cet identifiant unique |
| `.carte p` | Tous les paragraphes descendants d’une carte |
| `.carte > p` | Paragraphes enfants directs d’une carte |

Dans `.carte.active`, un même élément possède les deux classes. Dans `.carte .active`, l’élément actif est un descendant : l’espace modifie la relation. Le résultat d’un sélecteur peut être vérifié dans l’inspecteur avant d’ajouter une propriété.

## CSS Battle : composition visuelle

[CSS Battle](https://cssbattle.dev/) propose de reproduire des formes visuelles. Ce travail porte sur des propriétés et des dispositions, et ne constitue pas un équivalent du jeu de sélection. La brièveté recherchée dans un défi doit être distinguée de la lisibilité d’une feuille de style utilisée dans un projet collectif.
