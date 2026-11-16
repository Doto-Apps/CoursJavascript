---
layout: "layouts/Layout.astro"
title: "Portfolio : recherche, filtres et états de résultat"
type: "TD"
order: 4
quizId: "s2-site-03"
previousSession: "/semestre_2/Site_Web_Avec_Donnees/td/affichage"
nextSession: "/semestre_2/Site_Web_Avec_Donnees/td/gestion"
---

<a id="comprendre"></a>

## Les prédicats de recherche et de filtre

Un projet reste visible si son titre correspond à la recherche **et** si sa technologie correspond au choix, sauf lorsque ce choix vaut « toutes ». Décrire cette règle permet de choisir les opérateurs avant le code.

```javascript
const recherche = saisie.trim().toLowerCase();
const visibles = projets.filter((projet) =>
  projet.title.toLowerCase().includes(recherche)
);
```

`filter` produit un nouveau tableau contenant les éléments pour lesquels la fonction renvoie vrai. Il ne supprime pas les projets de la base. `includes` recherche ici une sous-chaîne ; `toLowerCase` rend la comparaison insensible à la casse dans ce cas simple. `trim` retire les espaces de bord, pas les espaces au milieu du titre.

| Opération | Donnée concernée | Résultat |
|---|---|---|
| Recherche. | Tableau complet reçu. | Sous-ensemble visible. |
| Filtre de technologie. | Champ `technologies`, découpé par virgules. | Projets contenant la technologie choisie ou tous. |
| Réinitialisation. | Contrôles et vue. | Collection complète affichée à nouveau. |

## Le tableau source et la vue filtrée

Si vous remplacez le tableau source à chaque recherche, effacer le champ peut ne pas restaurer les projets déjà éliminés. Conservez une source stable et recalculez la vue à partir de cette source. Une suppression véritable relève d’une commande différente vers l’API.

## input, change et compteur de résultats

`input` convient à une recherche pendant la saisie ; `change` convient à un select. Affichez le nombre de projets visibles et un état sans résultat. La recherche locale est adaptée à la petite collection du TP ; une très grande collection demanderait une recherche côté serveur, qui n’est pas ajoutée ici sans besoin.

<a id="apprentissage"></a>

## Array.filter et combinaison des filtres

Le visiteur veut trouver un projet. Une recherche locale part du tableau complet reçu et produit un sous-ensemble avec `filter`. Elle ne supprime rien dans MySQL. Gardez le tableau source pour pouvoir réinitialiser la recherche.

```js
function selectionner(projects, texte, technologie) {
  const recherche = texte.trim().toLocaleLowerCase('fr');
  return projects.filter(project => {
    const titreCorrespond = project.title.toLocaleLowerCase('fr')
      .includes(recherche);
    const technoCorrespond = !technologie || project.technologies
      .split(',').map(t => t.trim()).includes(technologie);
    return titreCorrespond && technoCorrespond;
  });
}
```

**Résultat attendu :** le titre et la technologie doivent correspondre tous les deux. La casse du titre est ignorée ici ; les accents restent significatifs. Le découpage par virgule découle de notre contrat `technologies` en chaîne. Un autre modèle exigerait une autre lecture.

```html live title="Combiner recherche et filtre sans perdre les données"
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

      @media (min-width: 700px) {
        .cards {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
      @media (min-width: 1000px) {
        .cards {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
      }
    </style>

<h1>Portfolio : données, rendu et filtres</h1>
    <p class="note">
      Prototype en mémoire ; la version PHP/MySQL du TP conserve les données.
    </p>
    <label for="recherche">Rechercher dans les titres</label>
    <input id="recherche" type="search" />
    <label for="technologie">Technologie</label>
    <select id="technologie">
      <option value="">Toutes</option>
      <option>HTML</option>
      <option>CSS</option>
      <option>PHP</option>
    </select>
    <button id="reset">Réinitialiser les filtres</button>
    <p id="etat" role="status"></p>
    <section id="projets" class="cards"></section>

    <script>
      const projects = [
        {
          id: 1,
          title: "Festival étudiant",
          description: "Une identité et un site.",
          technologies: "HTML, CSS",
        },
        {
          id: 2,
          title: "Galerie photo",
          description: "Un catalogue de portraits.",
          technologies: "PHP, CSS",
        },
        {
          id: 3,
          title: "Tournoi du campus",
          description: "Une page événement.",
          technologies: "HTML",
        },
      ];
      function render() {
        const text = document
          .querySelector("#recherche")
          .value.trim()
          .toLocaleLowerCase("fr");
        const technology = document.querySelector("#technologie").value;
        const results = projects.filter(
          (p) =>
            p.title.toLocaleLowerCase("fr").includes(text) &&
            (!technology ||
              p.technologies
                .split(",")
                .map((t) => t.trim())
                .includes(technology)),
        );
        const cards = results.map((p) => {
          const article = document.createElement("article");
          const h2 = document.createElement("h2");
          h2.textContent = p.title;
          const description = document.createElement("p");
          description.textContent = p.description;
          const technologies = document.createElement("p");
          technologies.textContent = p.technologies;
          article.append(h2, description, technologies);
          return article;
        });
        document.querySelector("#projets").replaceChildren(...cards);
        document.querySelector("#etat").textContent = results.length
          ? `${results.length} projet(s)`
          : "Aucun résultat pour ces filtres.";
      }
      document.querySelector("#recherche").addEventListener("input", render);
      document.querySelector("#technologie").addEventListener("change", render);
      document.querySelector("#reset").addEventListener("click", () => {
        document.querySelector("#recherche").value = "";
        document.querySelector("#technologie").value = "";
        render();
      });
      render();
    </script>
```

## Les événements nécessaires

`input` suit les modifications du champ de recherche ; `change` suffit pour le choix dans le `select`. Les labels décrivent les deux contrôles. Le bouton de remise à zéro restaure texte et technologie avant de relancer le rendu. Un compteur dans `role="status"` indique le nombre de résultats sans déplacer le focus.

Les données du petit portfolio tiennent en mémoire : il n'est pas nécessaire d'appeler PHP à chaque frappe. Pour un catalogue volumineux, une recherche serveur serait pertinente ; elle demanderait un contrat et des requêtes paramétrées distincts.

## Tableau de référence — notions et opérations

| Notion | Règle à retenir |
|---|---|
| <a id="notion-1"></a>Filtre local | Le filtre local sélectionne des données déjà reçues. |
| <a id="notion-2"></a>Source complète | Le tableau complet est conservé pour réinitialiser le filtre. |
| <a id="notion-3"></a>Filter | Array.filter produit le sous-ensemble des éléments qui satisfont une condition. |
| <a id="notion-4"></a>Normalisation | trim enlève les espaces de bord de la recherche. |
| <a id="notion-5"></a>Casse | toLocaleLowerCase('fr') sert à comparer les titres sans tenir compte de la casse. |
| <a id="notion-6"></a>Accents | Dans cet exemple, les accents restent significatifs. |
| <a id="notion-7"></a>Sous-chaîne | includes vérifie si le titre contient le texte recherché. |
| <a id="notion-8"></a>Recherche vide | Une chaîne vide n'exclut aucun titre avec includes. |
| <a id="notion-9"></a>Technologies chaîne | Le contrat stocke technologies sous forme de chaîne séparée par virgules. |
| <a id="notion-10"></a>Découpage | split(',') découpe la chaîne des technologies. |
| <a id="notion-11"></a>Nettoyage morceaux | Les morceaux de technologies sont nettoyés par trim. |
| <a id="notion-12"></a>Combinaison | && exige que texte et technologie correspondent tous les deux. |
| <a id="notion-13"></a>Technologie vide | Une technologie vide signifie aucun filtre de technologie. |
| <a id="notion-14"></a>Input | input suit les modifications du champ de recherche. |
| <a id="notion-15"></a>Change | change est utilisé pour le choix de technologie. |
| <a id="notion-16"></a>Labels | Chaque contrôle de filtre possède un label. |
| <a id="notion-17"></a>Remise à zéro | La remise à zéro restaure texte et technologie avant de rendre. |
| <a id="notion-18"></a>Compteur | Le compteur d'état indique le nombre de résultats sans déplacer le focus. |
| <a id="notion-19"></a>Aucun résultat | Aucun résultat de filtre ne signifie pas nécessairement une base vide. |
| <a id="notion-20"></a>Sans requête par frappe | Ce petit filtre local n'exige pas un appel PHP à chaque frappe. |

## Travail à réaliser et jeu d’essai

Ajoutez recherche par titre, choix d’une technologie et remise à zéro au rendu alimenté par l’API. Gardez la collection complète et combinez les deux critères par ET. Une sélection de technologie compare un nom complet après découpage par virgules : le choix CSS ne doit pas sélectionner SCSS par simple sous-chaîne.

Avec « Festival étudiant » en HTML/CSS, « Galerie photo » en PHP/CSS et « Tournoi du campus » en HTML, vérifiez : recherche vide = trois projets ; technologie CSS = deux ; recherche « GALERIE » et PHP = un ; « Galerie » et HTML = aucun. La remise à zéro retrouve trois projets sans nouvelle écriture SQL. Remettez les fonctions de sélection/rendu et ce tableau attendu/observé.
