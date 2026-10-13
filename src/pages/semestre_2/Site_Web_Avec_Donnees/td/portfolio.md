---
layout: "layouts/Layout.astro"
title: "Portfolio dynamique : cadrer les données et les parcours"
type: "TP"
order: 1
nextSession: "/semestre_2/Site_Web_Avec_Donnees/td/base"
---

<a id="comprendre"></a>

## Le modèle de données du portfolio

Le visiteur veut comprendre un projet, identifier votre contribution et accéder à une ressource. Le gestionnaire ajoute ou modifie ces informations. Ces deux usages ne justifient pas les mêmes pages ni les mêmes commandes.

| Champ | Type prévu | Règle utile |
|---|---|---|
| `id` | Entier. | Identité persistante, générée par la base. |
| `title` | Chaîne. | Titre explicite et non vide. |
| `description` | Chaîne. | Explique le projet et votre rôle. |
| `technology` | Chaîne. | Valeur cohérente pour les filtres. |
| `start_date` | Date. | Début du projet au format du contrat. |
| `end_date` | Date ou null. | Absence possible pour un projet en cours. |

Un dictionnaire de données décrit nom, type, rôle et contraintes. Le préparer évite que PHP attende `title` alors que JavaScript envoie `nomProjet`. Le modèle doit suivre le contenu réellement utile, pas toutes les fonctionnalités imaginées.

## Les couches HTML, API et base SQL

Le socle comporte un affichage des projets persistants, une recherche ou un filtre et une gestion locale guidée. Commencez par une lecture correcte ; ajoutez ensuite les commandes. Un système complet de comptes et de publication n’est pas un prérequis implicite de la SAE.

Le formulaire de gestion de ce parcours sert à une démonstration sur le réseau autorisé. Il ne constitue pas une administration prête à être exposée publiquement : une publication demanderait les contrôles d’accès appropriés. Préparez des projets et médias dont vous pouvez justifier l’usage.

## Les tests des parcours du portfolio

« Portfolio professionnel » ne suffit pas comme critère. Vérifiez que trois projets peuvent être lus, qu’un filtre possède un état sans résultat et qu’une donnée invalide est refusée. Les thèmes personnels peuvent varier ; la structure des données et les vérifications restent communes.

<a id="apprentissage"></a>

## Les champs d’une fiche projet

Un portfolio dynamique est un catalogue de projets personnels. Le visiteur lit les projets ; une interface de gestion locale permet de les ajouter et les modifier. Le TP existant fournissait déjà titre, description, image, dates, technologies et liens : nous conservons ces informations en précisant leurs types, leur rôle et les validations.

La maquette n'est pas une table SQL. Une carte peut afficher cinq informations provenant d'une ligne ; une colonne ne devient pas nécessairement un élément visible. Décrivez d'abord le parcours : voir la liste, filtrer, consulter un lien ; côté gestion, remplir, valider et corriger un projet.

```json
{
  "id": 1,
  "title": "Festival étudiant",
  "description": "Identité et site de l'événement.",
  "image_url": "/images/festival.svg",
  "start_date": "2027-02-01",
  "end_date": "2027-03-01",
  "technologies": "HTML, CSS",
  "project_url": "https://example.org",
  "code_url": ""
}
```

**Lecture :** l'id est stable, les dates sont au format année-mois-jour et la chaîne vide indique ici l'absence de lien vers le code. Notre contrat utilise une chaîne pour `technologies`, pas un tableau caché : un futur modèle plus complexe serait une évolution à documenter.

```html live title="Explorer la liste et ses filtres — prototype en mémoire"
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
    <form id="ajout">
      <h2>Ajouter au prototype</h2>
      <label for="titre">Titre du projet</label>
      <input id="titre" name="title" required maxlength="120" />
      <label for="description">Description</label>
      <textarea id="description" name="description" required></textarea>
      <button>Ajouter</button>
    </form>

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
      document.querySelector("#ajout").addEventListener("submit", (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const title = data.get("title").trim(),
          description = data.get("description").trim();
        if (!title || !description) {
          document.querySelector("#etat").textContent =
            "Titre et description sont obligatoires.";
          return;
        }
        projects.push({
          id: Math.max(...projects.map((p) => p.id), 0) + 1,
          title,
          description,
          technologies: "HTML",
        });
        form.reset();
        render();
      });
      render();
    </script>
```

## Tableau de référence — notions et opérations

| Notion | Règle à retenir |
|---|---|
| <a id="notion-1"></a>Portfolio | Le portfolio est un catalogue de projets. |
| <a id="notion-2"></a>Parcours visiteur | Le visiteur consulte et filtre les projets. |
| <a id="notion-3"></a>Parcours gestion | La gestion ajoute et modifie les données du catalogue. |
| <a id="notion-4"></a>Dictionnaire | Le dictionnaire de données décrit type, exemple et règles de chaque champ. |
| <a id="notion-5"></a>Identité | L'id identifie le projet indépendamment du titre. |
| <a id="notion-6"></a>Titre | Le titre est une chaîne obligatoire. |
| <a id="notion-7"></a>Description | description présente le projet sous forme textuelle. |
| <a id="notion-8"></a>Image | image_url désigne une image, pas sa description textuelle. |
| <a id="notion-9"></a>Date de début | Les dates du contrat suivent année-mois-jour. |
| <a id="notion-10"></a>Chronologie | La date de fin ne doit pas précéder celle de début. |
| <a id="notion-11"></a>Technologies | technologies est une chaîne dans ce contrat. |
| <a id="notion-12"></a>Lien projet | project_url désigne la destination du projet. |
| <a id="notion-13"></a>Lien code | code_url désigne le lien vers le code si disponible. |
| <a id="notion-14"></a>Absence lien | Une chaîne vide représente ici l'absence de lien vers le code. |
| <a id="notion-15"></a>URL externe | Les liens externes acceptés sont HTTP ou HTTPS. |
| <a id="notion-16"></a>Image locale | Une image peut être un chemin local connu ou une URL HTTP(S). |
| <a id="notion-17"></a>Alternative informative | Une image informative reçoit un texte alternatif adapté à son rôle. |
| <a id="notion-18"></a>Décoration | Une image purement décorative peut porter alt="". |
| <a id="notion-19"></a>Maquette et base | Une maquette décrit l'interface ; le dictionnaire prépare les données. |
| <a id="notion-20"></a>Priorité | Le minimum livrable est défini avant les détails décoratifs. |
