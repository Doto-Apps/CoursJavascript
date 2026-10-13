---
layout: "layouts/Layout.astro"
title: "Événements JavaScript : construire une interaction"
type: "TP"
order: 7
quizId: "s2-int-06"
previousSession: "/semestre_2/integration/tp/pluginJs"
---

<a id="comprendre"></a>

## Les événements click, input, change et submit

| Événement | Situation | Exemple |
|---|---|---|
| `click` | Activation d’un contrôle. | Ouvrir un panneau. |
| `input` | Valeur modifiée pendant la saisie. | Filtrer une liste au fur et à mesure. |
| `change` | Changement de valeur validé selon le contrôle. | Choisir une catégorie dans un select. |
| `submit` | Soumission d’un formulaire. | Traiter aussi l’envoi avec Entrée. |
| `keydown` | Appui sur une touche. | Reconnaître Échap. |

Écouter seulement le clic sur « Envoyer » oublie les autres moyens de soumettre un formulaire. `preventDefault()` annule l’action native associée à un événement annulable ; il ne signifie pas « arrêter tout JavaScript » et ne remplace pas la validation.

## event.target et event.currentTarget

La fonction d’écoute reçoit un objet qui décrit l’événement. `target` désigne l’origine ; `currentTarget` désigne l’élément portant l’écouteur pendant son exécution. Si un bouton contient une icône, cliquer l’icône peut donner cette icône comme `target`, alors que `currentTarget` reste le bouton.

```javascript
const bouton = document.querySelector('#compter');
let total = 0;
bouton.addEventListener('click', () => {
  total = total + 1;
  document.querySelector('#total').textContent = total;
});
```

Le compteur est l’état ; le texte est son rendu. Ajouter un écouteur à chaque clic créerait plusieurs appels pour la même activation. Enregistrez les écouteurs lors de la préparation de l’interface, pas à chaque mise à jour.

## Propagation des événements et mise à jour DOM

De nombreux événements remontent vers les parents. Une délégation place un écouteur sur un conteneur et identifie l’action concernée : elle peut être utile pour des éléments ajoutés après le chargement. Commencez cependant avec un contrôle et un écouteur explicites ; comprendre l’objet événement vient avant la généralisation.

<a id="apprentissage"></a>

## addEventListener et mise à jour du DOM

Un gestionnaire est une fonction appelée quand un événement se produit. Il reçoit un objet événement, dont le nom de paramètre est choisi par le développeur. `event.target` désigne l’élément d’origine ; `event.currentTarget` désigne celui sur lequel le gestionnaire courant est enregistré. Ce sont deux rôles distincts lorsque des éléments sont imbriqués.

```js
const formulaire = document.querySelector('form');
const liste = document.querySelector('ul');

formulaire.addEventListener('submit', (event) => {
  event.preventDefault();
  const titre = new FormData(formulaire).get('title');
  if (typeof titre !== 'string' || !titre.trim()) return;
  const entree = document.createElement('li');
  entree.textContent = titre.trim();
  liste.append(entree);
});
```

**Résultat attendu :** la soumission ajoute une entrée textuelle sans recharger la page. Cette démonstration est locale en mémoire : elle n’enregistre rien dans MySQL. `textContent` garde une saisie comme `<b>Film</b>` sous forme de texte ; `innerHTML` l’interpréterait comme du balisage.

```html live title="Construire une liste avec des événements"
<style>
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        padding: 20px;
        font-family: system-ui, sans-serif;
        color: #18324c;
        background: #f1f5f9;
      }
      button,
      input,
      select,
      textarea {
        font: inherit;
        max-width: 100%;
      }
      button {
        padding: 8px 12px;
        cursor: pointer;
      }
      input,
      select,
      textarea {
        padding: 8px;
      }
      :focus-visible {
        outline: 3px solid #2563eb;
        outline-offset: 3px;
      }
      article,
      .panel {
        padding: 16px;
        background: white;
        border-radius: 12px;
        min-width: 0;
      }
      .cards {
        display: grid;
        gap: 16px;
      }
      label {
        display: block;
        margin-block: 12px 4px;
      }
      h1 {
        font-size: 1.4rem;
      }
      h2 {
        font-size: 1.15rem;
      }
      p,
      h2,
      a {
        overflow-wrap: anywhere;
      }
      .note {
        font-size: 0.9rem;
      }
    </style>

<h1>Un événement, une action, un état</h1>
    <form id="formulaire">
      <label for="titre">Nouvelle idée</label>
      <input id="titre" name="title" required maxlength="120" />
      <button>Ajouter</button>
    </form>
    <ul id="idees"></ul>
    <p id="etat" role="status">0 idée</p>
    <p class="note">
      Tableau local : un rechargement réinitialise ce prototype.
    </p>

    <script>
      const form = document.querySelector("#formulaire");
      const liste = document.querySelector("#idees");
      const etat = document.querySelector("#etat");
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const title = new FormData(form).get("title").trim();
        if (!title) {
          etat.textContent = "Un titre non vide est obligatoire.";
          return;
        }
        const ligne = document.createElement("li");
        const texte = document.createElement("span");
        texte.textContent = title + " ";
        const supprimer = document.createElement("button");
        supprimer.type = "button";
        supprimer.textContent = "Supprimer";
        supprimer.setAttribute("aria-label", `Supprimer ${title}`);
        supprimer.addEventListener("click", () => {
          ligne.remove();
          etat.textContent = `${liste.children.length} idée(s)`;
          document.querySelector("#titre").focus();
        });
        ligne.append(texte, supprimer);
        liste.append(ligne);
        etat.textContent = `${liste.children.length} idée(s)`;
        form.reset();
      });
    </script>
```

## Les événements des contrôles HTML

| Événement | Situation | Exemple dans le TP |
|---|---|---|
| `click` | Activation d'un contrôle | Supprimer une entrée avec son bouton |
| `submit` | Soumission d'un formulaire | Ajouter aussi lorsque l'utilisateur appuie sur Entrée |
| `input` | Modification de valeur par l'utilisateur | Mettre à jour une recherche pendant la frappe |
| `change` | Changement de valeur selon le contrôle et sa validation | Lire une nouvelle option du Select |
| `keydown` | Enfoncement d'une touche | Fermer la navigation avec Échap |

Écouter seulement le clic du bouton Ajouter laisse de côté l'intention portée par le formulaire. Un gestionnaire `submit` couvre ce parcours, y compris l'envoi avec Entrée. `preventDefault()` empêche ici la soumission native qui ferait naviguer la page ; il ne désactive pas tous les événements du document.

## La cible et l’élément écouté

Un clic sur un enfant peut remonter vers ses parents : c'est la propagation. Le formulaire peut ainsi recevoir un événement dont l'origine est son bouton. Avec l'écouteur suivant, cliquez successivement sur le champ et le bouton, puis comparez les deux noms affichés par la console.

```js
formulaire.addEventListener('click', (event) => {
  console.log('Origine :', event.target.tagName);
  console.log('Écouteur sur :', event.currentTarget.tagName);
});
```

L'origine change ; le gestionnaire reste enregistré sur le formulaire. Dans ce cours, les cibles cliquées sont des éléments HTML. Ne confondez pas `preventDefault`, qui annule une action native, et `stopPropagation`, qui arrête la propagation : empêcher la navigation d'un formulaire ne demande pas de bloquer toute propagation.

## L’état JavaScript et le rendu HTML

Une liste contient un état : ses entrées et leur nombre. Une suppression change cet état, puis le compteur doit être recalculé. Le prototype recalcule le nombre à partir des éléments présents ; une version avec tableau peut utiliser `tableau.length`. Ne décrémentez pas un compteur plusieurs fois pour une seule action.

Prédisez avant l'essai : zéro entrée au départ, deux après deux ajouts, une après suppression. Recommencez avec deux titres identiques : ils correspondent à deux entrées distinctes. Testez aussi un titre composé d'espaces, un titre long et la chaîne `<b>Film</b>`. L'interface doit expliquer le refus et afficher le dernier cas comme du texte.
