---
layout: "layouts/Layout.astro"
title: "Exemple commenté : une liste asynchrone"
type: "td"
---

## Une liste asynchrone avec chargement et erreur

Cette démonstration corrigée utilise une promesse locale pour isoler l’attente et le rendu. Elle ne contacte aucune API et ne conserve rien après rechargement. Le même rendu peut ensuite recevoir les données de [fetch](/semestre_4/js/intermediate/fetch).

```html live title="Chargement simulé d’une liste"
<button type="button">Charger les projets</button>
<label><input type="checkbox"> Simuler une panne</label>
<p role="status"></p>
<ul></ul>
<script>
  const bouton = document.querySelector('button');
  const statut = document.querySelector('p');
  const liste = document.querySelector('ul');
  bouton.addEventListener('click', async () => {
    const panne = document.querySelector('input').checked;
    bouton.disabled = true;
    statut.textContent = 'Chargement…';
    liste.replaceChildren();
    try {
      const projets = await new Promise((resolve, reject) => {
        setTimeout(() => panne ? reject(new Error('Service indisponible')) : resolve(['Affiche', 'Vidéo']), 500);
      });
      for (const titre of projets) {
        const item = document.createElement('li');
        item.textContent = titre;
        liste.append(item);
      }
      statut.textContent = `${projets.length} projets`;
    } catch (error) {
      statut.textContent = error.message;
    } finally {
      bouton.disabled = false;
    }
  });
</script>
```

Au clic, « Chargement… » apparaît pendant environ une demi-seconde. La réussite affiche deux éléments et « 2 projets ». Avec la case cochée, le message devient « Service indisponible » et la liste reste vide. Dans les deux cas, le bouton est réactivé. `replaceChildren` retire les résultats précédents afin de ne pas les présenter comme ceux de la nouvelle requête.

## Du prototype à la requête réelle

Le bloc `try` peut appeler une fonction `lireProjets` qui vérifie statut, JSON et forme des données. Le rendu reçoit alors des objets et lit leur propriété `titre`. Cette séparation permet de tester la liste vide, la panne et les titres contenant des caractères HTML sans dépendre d’un service extérieur. Pour persister une sélection, utilisez ensuite un stockage validé ; le rendu seul ne prouve pas une écriture serveur.
