---
hidden: true
order: 9
layout: "layouts/Layout.astro"
title: "Formulaires HTML : dimensions et états des champs"
type: "TP"
---

## Dimensions et ?tats des champs

Les contr?les d?un formulaire sont aussi des bo?tes CSS. Le [formulaire accessible](/semestre_1/integration/formulairetd) d?finit leurs r?les ; la mise en page doit ensuite conserver leurs labels, leurs dimensions et leur focus ? toutes les largeurs.

| Décision | Justification | Erreur fréquente |
|---|---|---|
| label associé à chaque champ | Nom persistant et cible de clic. | Placeholder seul. |
| name sur chaque donnée transmise | Clé disponible dans la requête. | id utilisé comme substitut de name. |
| Largeur fluide avec max-width | Formulaire borné sur grand écran. | Largeur fixe qui déborde sur mobile. |
| box-sizing: border-box | Padding inclus dans la largeur. | Champ à 100% plus padding extérieur. |
| Focus perceptible | Position compréhensible au clavier. | outline retiré sans remplacement. |
| Transition sur la règle de base | Effet aller et retour. | Transition uniquement sur hover. |

```html preview title="Un champ à la largeur disponible" height=130
<label for="nom">Nom affiché</label>
<input id="nom" name="nom">
<style>
  input {
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 12px;
    border: 1px solid #2457a7;
  }
</style>
```

L’aperçu explique la boîte du champ. Réutilisez le laboratoire de la référence pour manipuler les contraintes et l’annonce de résultat. La confirmation doit dire « Démonstration — aucun envoi » si aucun serveur ne traite les données : une navigation vers confirmation.html ne crée pas à elle seule une inscription.
