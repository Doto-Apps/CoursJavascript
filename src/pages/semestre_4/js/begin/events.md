---
layout: "layouts/Layout.astro"
title: "Events"
type: "tp"
---

## Le DOM et querySelector

Le DOM est la représentation du document que JavaScript peut consulter et modifier. `document.querySelector('.carte')` renvoie le premier élément correspondant au sélecteur CSS, ou `null`. Le script doit s’exécuter après la création de cet élément : placez-le après le HTML ou chargez un fichier de module.

## addEventListener et la fonction de rappel

```html live title="Un compteur de clics"
<button type="button">Ajouter un clic</button>
<p role="status">0 clic</p>
<script>
  const bouton = document.querySelector('button');
  const sortie = document.querySelector('p');
  let nombre = 0;
  bouton.addEventListener('click', () => {
    nombre += 1;
    sortie.textContent = `${nombre} clic(s)`;
  });
</script>
```

L’inscription de l’écouteur ne modifie pas le compteur. Après deux clics, le paragraphe affiche `2 clic(s)`. La variable conserve l’état et le paragraphe en présente la valeur. `textContent` insère du texte, sans interpréter des balises fournies par une saisie.

## target, currentTarget et propagation

Un clic sur un élément enfant remonte généralement à ses parents. `event.target` désigne l’élément à l’origine de l’événement ; `event.currentTarget`, celui dont l’écouteur s’exécute. Un clic sur une icône dans un bouton peut donc donner deux éléments différents. Pour déléguer des clics sur une liste, utilisez `event.target.closest('button[data-id]')` puis vérifiez qu’un bouton a été trouvé.

## input, change et submit

| Événement | Usage |
|---|---|
| `click` | Activation d’un bouton, y compris au clavier avec l’élément natif |
| `input` | Mise à jour pendant la saisie |
| `change` | Choix validé ou valeur confirmée selon le contrôle |
| `submit` | Soumission d’un formulaire, même par Entrée |
| `keydown` | Touche précise, par exemple Échap pour fermer un menu |

`preventDefault()` annule une action par défaut, par exemple la navigation d’un formulaire soumis. Il n’arrête pas la propagation. `stopPropagation()` agit sur la propagation et ne remplace pas l’annulation de la soumission. N’ajoutez ces appels que lorsque le comportement l’exige. `removeEventListener` nécessite la même fonction de rappel que celle enregistrée : conservez son nom si vous devez retirer l’écouteur.
