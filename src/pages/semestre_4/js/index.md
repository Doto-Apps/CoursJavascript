---
layout: "layouts/Layout.astro"
title: "JavaScript : données, DOM et asynchronisme"
type: "tp"
---

## JavaScript : données, DOM et opérations asynchrones

Au S2, JavaScript servait à écouter des événements et à afficher les données d’une API. Au S3, le même langage s’exécutait aussi dans Node. Ce parcours consolide les valeurs et les fonctions avant d’aborder les collections, le DOM, les promesses et la persistance dans le navigateur.

| Étape | Supports | Application |
|---|---|---|
| Valeurs et décisions | [Variables](/semestre_4/js/begin/variables), [types](/semestre_4/js/begin/types), [conditions](/semestre_4/js/begin/conditions) | Calculer et vérifier une saisie |
| Traitements réutilisables | [Fonctions](/semestre_4/js/begin/functions), [boucles](/semestre_4/js/begin/loops) | Transformer plusieurs valeurs |
| Collections | [Tableaux](/semestre_4/js/begin/arrays), [méthodes](/semestre_4/js/begin/array-functions), [objets](/semestre_4/js/begin/objects), [Object](/semestre_4/js/begin/object-functions) | Représenter des fiches |
| Interface | [Événements](/semestre_4/js/begin/events), [FormData](/semestre_4/js/begin/form) | Relier saisie et état |
| Asynchronisme | [Promesses](/semestre_4/js/intermediate/promises), [async/await](/semestre_4/js/intermediate/async-await), [fetch](/semestre_4/js/intermediate/fetch) | Charger une API et traiter ses erreurs |
| Persistance | [Stockage](/semestre_4/js/intermediate/storages) | Retrouver une sélection |

Dans le navigateur, `document` donne accès au DOM. Dans Node, cette variable n’existe pas par défaut. Les exemples `html live` de ce parcours utilisent le navigateur ; les sorties de console sont indiquées après les extraits JavaScript.

```html live title="Un événement modifie le DOM"
<button type="button">Afficher le message</button>
<p role="status"></p>
<script>
  const bouton = document.querySelector('button');
  bouton.addEventListener('click', () => {
    document.querySelector('p').textContent = 'Bonjour MMI !';
  });
</script>
```

Le bouton existe avant l’exécution du script. `querySelector` récupère l’élément ; `addEventListener` enregistre une fonction qui sera appelée au clic. `textContent` écrit du texte dans le paragraphe. Après un clic, « Bonjour MMI ! » apparaît sans rechargement.

Dans un projet, placez le JavaScript dans `app.js`, chargé par `<script type="module" src="app.js"></script>`. Un script de module attend l’analyse du document et possède sa propre portée.
