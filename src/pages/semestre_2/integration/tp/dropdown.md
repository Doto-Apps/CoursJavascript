---
layout: "layouts/Layout.astro"
title: "Menu déroulant : état et interaction JavaScript"
type: "TP"
order: 5
quizId: "s2-int-04"
previousSession: "/semestre_2/integration/tp/hover"
nextSession: "/semestre_2/integration/tp/pluginJs"
---

<a id="comprendre"></a>

## querySelector et addEventListener

Une **fonction** regroupe des instructions. Un **événement** signale une action ou un changement. `addEventListener` associe une fonction à un événement ; cette fonction sera appelée lorsque l’événement survient, pas dès son enregistrement.

| Instruction | Effet | Condition nécessaire |
|---|---|---|
| `document.querySelector('#ouvrir')` | Trouver le premier élément correspondant. | Le sélecteur doit correspondre à un élément existant. |
| `bouton.addEventListener('click', fonction)` | Écouter l’activation du bouton. | Le bouton doit avoir été trouvé. |
| `bouton.getAttribute('aria-expanded')` | Lire une valeur d’attribut. | La valeur est ici une chaîne. |
| `navigation.hidden = true` | Masquer le panneau. | Ne pas confondre masquage et suppression du document. |
| `bouton.focus()` | Redonner un repère au clavier. | Le bouton doit rester présent et utilisable. |

`querySelector` peut renvoyer `null` si le nom est incorrect ou si le script s’exécute avant les éléments. Dans cet exemple, le script suit les éléments HTML. L’attribut renvoie `'true'` ou `'false'` comme texte ; le booléen `true` est un autre type.

## État du menu, hidden et aria-expanded

| Avant le clic | Après le clic | Panneau | Attribut |
|---|---|---|---|
| Fermé. | Ouvert. | `hidden = false` | `aria-expanded="true"` |
| Ouvert. | Fermé. | `hidden = true` | `aria-expanded="false"` |

L’état annoncé et la visibilité doivent changer ensemble. Une seule fonction de mise à jour évite deux morceaux de code contradictoires. Le bouton possède un nom indiquant son action ; `aria-controls` relie ce contrôle à l’identifiant du panneau.

## Ouverture, fermeture et touche Échap

Un bouton natif est activable avec le clavier. L’événement `click` couvre cette activation sans écrire un gestionnaire Entrée supplémentaire qui risquerait de basculer deux fois. Échap ferme le panneau ; le focus revient au bouton si la fermeture masque l’élément auparavant ciblé. La navigation contient des liens ordinaires : n’ajoutez pas un rôle de menu applicatif sans en enseigner aussi le comportement clavier complet.

<a id="apprentissage"></a>

## Le menu ouvert et le menu fermé

Le menu est ouvert ou fermé. Un clic demande un changement d’état ; le JavaScript met à jour la visibilité et l’attribut qui décrit cet état. Le bouton reste un vrai bouton pour recevoir le focus et l’activation clavier. Le panneau contient une navigation ordinaire : ce n’est pas automatiquement un menu applicatif ARIA à flèches.

```html
<button type="button" aria-expanded="false" aria-controls="liens">
  Afficher les rubriques
</button>
<nav id="liens" hidden aria-label="Rubriques">
  <a href="#musique">Musique</a>
  <a href="#contact">Contact</a>
</nav>
```

```js
const bouton = document.querySelector('button');
const panneau = document.querySelector('#liens');

bouton.addEventListener('click', () => {
  const ouvert = bouton.getAttribute('aria-expanded') === 'true';
  bouton.setAttribute('aria-expanded', String(!ouvert));
  panneau.hidden = ouvert;
});
```

**Lecture :** les attributs HTML sont des chaînes ; le test compare donc à `'true'`. Quand le menu était fermé, `ouvert` vaut false et `panneau.hidden` devient false. Le bouton et le panneau doivent annoncer le même état après chaque action.

```html live title="Ouvrir, parcourir et fermer une navigation"
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

      nav {
        background: #dbeafe;
        padding: 12px;
        margin-block: 12px;
      }
    </style>

<h1>Le bouton pilote l’état de la navigation</h1>
    <button id="ouvrir" aria-expanded="false" aria-controls="navigation">
      Navigation
    </button>
    <nav id="navigation" aria-label="Exemple" hidden>
      <ul>
        <li><a href="#projets">Projets</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
    <section id="projets">
      <h2>Projets du campus</h2>
      <p>Tab atteint les liens quand la navigation est ouverte.</p>
    </section>
    <section id="contact">
      <h2>Contact</h2>
      <p>Échap ferme la navigation et rend le focus au bouton.</p>
    </section>

    <script>
      const bouton = document.querySelector("#ouvrir");
      const navigation = document.querySelector("#navigation");
      function definirOuverture(ouvert) {
        bouton.setAttribute("aria-expanded", String(ouvert));
        navigation.hidden = !ouvert;
      }
      bouton.addEventListener("click", () => {
        definirOuverture(bouton.getAttribute("aria-expanded") !== "true");
      });
      document.addEventListener("keydown", (event) => {
        if (
          event.key === "Escape" &&
          bouton.getAttribute("aria-expanded") === "true"
        ) {
          definirOuverture(false);
          bouton.focus();
        }
      });
    </script>
```

## Tableau de référence — notions et opérations

| Notion | Règle à retenir |
|---|---|
| <a id="notion-1"></a>Bouton natif | Le contrôle qui ouvre la navigation est un bouton natif. |
| <a id="notion-2"></a>État ARIA | aria-expanded indique si le panneau associé est ouvert. |
| <a id="notion-3"></a>Association | aria-controls contient l'id de l'élément contrôlé. |
| <a id="notion-4"></a>Valeur textuelle | getAttribute renvoie ici une chaîne, comparée à 'true'. |
| <a id="notion-5"></a>Masquage | hidden masque le panneau fermé. |
| <a id="notion-6"></a>Inverse | navigation.hidden vaut l'inverse de l'état ouvert. |
| <a id="notion-7"></a>Écouteur | addEventListener associe une fonction à un événement. |
| <a id="notion-8"></a>Sélection | querySelector sélectionne le premier élément correspondant au sélecteur. |
| <a id="notion-9"></a>Clic | L'événement click est utilisé pour l'activation du bouton. |
| <a id="notion-10"></a>Bascule | L'ouverture alterne entre deux états. |
| <a id="notion-11"></a>Synchronisation | Le masquage et aria-expanded doivent décrire le même état. |
| <a id="notion-12"></a>Échap | event.key === 'Escape' reconnaît la touche Échap. |
| <a id="notion-13"></a>Retour du focus | Après fermeture par Échap, le focus revient au bouton d'ouverture. |
| <a id="notion-14"></a>Focus programmatique | focus() place le focus sur un contrôle ciblé. |
| <a id="notion-15"></a>Navigation ordinaire | Une navigation de site n'est pas un menu applicatif ARIA. |
| <a id="notion-16"></a>Liens | Un lien de navigation doit avoir une destination. |
| <a id="notion-17"></a>Id unique | Un id doit identifier une cible unique dans le document. |
| <a id="notion-18"></a>Clavier | Un bouton natif s'active au clavier sans recréer manuellement son comportement de base. |
| <a id="notion-19"></a>État initial | Le panneau fermé démarre avec hidden et aria-expanded="false". |
| <a id="notion-20"></a>Nommage | Le nom du bouton explique son action. |
