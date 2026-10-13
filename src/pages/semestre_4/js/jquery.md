---
layout: "layouts/Layout.astro"
title: "jQuery"
type: "tp"
---

## jQuery dans un projet existant

jQuery est une bibliothèque qui fournit une sélection d’éléments, des événements et des méthodes de modification du DOM. Elle apparaît dans des projets anciens et certains CMS. Les API natives étudiées précédemment couvrent déjà de nombreux usages : connaître leur équivalence permet de lire et de maintenir ces projets.

| API jQuery | API native correspondante |
|---|---|
| `$()` | `querySelectorAll` |
| `.text()` | `textContent` |
| `.on()` | `addEventListener` |
| `.addClass()` | `classList.add` |

La sélection `$('.carte')` correspond à une recherche native comme `document.querySelectorAll('.carte')`, mais les objets renvoyés sont différents. `.text('Photo')` écrit du texte, `.on('click', fn)` inscrit un écouteur et `.addClass('active')` ajoute une classe aux éléments de la sélection. Avec les API natives, une collection de nœuds demande généralement une boucle pour appliquer la même modification à tous.

## Chargement et ordre des scripts

Dans une page utilisant jQuery, chargez d’abord une version identifiée de la bibliothèque, puis le script de l’application. `$` n’est pas une fonction native : l’erreur `$ is not defined` signifie souvent un script manquant ou un mauvais ordre. Vérifiez dans Réseau qu’il a été chargé ; évitez d’ajouter deux copies pour résoudre un problème.

```js
// Exemple à exécuter dans une page où jQuery est déjà chargé.
$(function () {
  $('#bouton').on('click', function () {
    $('#message').text('Bonjour MMI !');
  });
});
```

La fonction extérieure attend que le DOM puisse être utilisé. Le clic sur `#bouton` écrit « Bonjour MMI ! » dans `#message`. Le document doit contenir ces deux éléments. `.text()` conserve une saisie comme du texte ; `.html()` interprète des balises et exige donc une autre maîtrise des données.

## Équivalent natif observable

```html live title="Le même comportement sans bibliothèque"
<button id="bouton" type="button">Afficher</button>
<p id="message" role="status"></p>
<script>
  document.querySelector('#bouton').addEventListener('click', () => {
    document.querySelector('#message').textContent = 'Bonjour MMI !';
  });
</script>
```

Le résultat au clic est identique. Les objets jQuery et les éléments DOM ne sont pas interchangeables : `.text()` s’appelle sur une sélection jQuery ; `textContent` appartient à un nœud DOM. Cette distinction explique beaucoup d’erreurs lors d’une migration.
