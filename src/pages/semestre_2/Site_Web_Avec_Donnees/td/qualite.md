---
layout: "layouts/Layout.astro"
title: "Portfolio : sécurité, accessibilité et tests croisés"
type: "TD"
order: 6
quizId: "s2-site-05"
previousSession: "/semestre_2/Site_Web_Avec_Donnees/td/gestion"
nextSession: "/semestre_2/Site_Web_Avec_Donnees/td/livraison"
---

<a id="comprendre"></a>

## La matrice de tests du portfolio

| Axe | Entrée de test | Résultat attendu |
|---|---|---|
| Données. | Aucun projet. | État vide normal et explicite. |
| Contenu. | Titre très long. | Carte lisible sans couper l’action. |
| Sécurité d’affichage. | Texte contenant `<` et `&`. | Texte visible sans interprétation HTML. |
| Réseau. | Serveur arrêté. | Erreur utile et reprise possible. |
| Clavier. | Tab puis activation. | Contrôles atteignables et focus visible. |
| Écran. | Largeur étroite et zoom. | Contenus et commandes disponibles. |

## Validation, requêtes préparées et échappement

La validation décide si une donnée est acceptable. L’échappement ou l’affichage par `textContent` décide comment représenter un texte sans l’interpréter comme du code. Une requête préparée protège la séparation SQL/valeurs. Aucun de ces outils ne remplace les deux autres : ils agissent à des frontières différentes.

## Le rapport d’anomalie

Un signalement indique la page, les étapes, les données, l’attendu et l’observé. « Le formulaire bugue » ne permet pas de refaire le test. « Éditer le projet 4, vider la date de fin, enregistrer : la date précédente reste présente au lieu de null » fournit une piste vérifiable.

## La gravité des anomalies et les tests de régression

Commencez par les actions bloquées, les données mal ciblées et les contenus invisibles. Corrigez une cause puis répétez le scénario précis. Les outils automatiques complètent les essais de parcours mais ne décident pas seuls de la clarté des messages ou de la pertinence des alternatives d’image.

Un groupe partenaire teste la remise selon sa notice, sans connaître vos raccourcis de développement. Notez les limites réellement restantes au lieu de remplacer les observations par un score unique.

<a id="apprentissage"></a>

## Les tests d’entrées invalides

Une application fiable reste compréhensible face à un titre long, un lien absent, une panne et une saisie hostile. Les validations côté serveur protègent le contrat ; les requêtes préparées séparent valeurs et SQL ; `textContent` traite les textes comme textes. Ces mécanismes agissent à des frontières différentes et ne se remplacent pas.

```js
const lien = document.createElement('a');
const url = new URL(project.project_url);
if (['http:', 'https:'].includes(url.protocol)) {
  lien.href = url.href;
  lien.textContent = `Voir ${project.title}`;
}
```

L'extrait suppose une URL non vide déjà validée ; dans le rendu complet, traitez aussi l'absence et les exceptions de `new URL`. Le texte du lien doit décrire sa destination. Ne masquez pas le focus avec `outline: none` sans autre indication visible.

## Les contrôles de sécurité et d’accessibilité

Parcourez tous les contrôles au clavier, vérifiez labels, focus, messages et ordre de lecture. Testez 320 px puis un zoom à 200 %. Le formulaire ne doit pas dépasser l'écran ; `min-width: 0` sur un enfant Grid et `overflow-wrap: anywhere` sur un long contenu peuvent éviter un débordement.

```html live title="Auditer les cartes, les labels et les états de résultat"
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
| <a id="notion-1"></a>Frontières | Validation, paramètres SQL et rendu texte agissent à des frontières distinctes. |
| <a id="notion-2"></a>Texte | textContent traite les textes reçus comme texte. |
| <a id="notion-3"></a>URL | Le protocole d'un lien doit être contrôlé. |
| <a id="notion-4"></a>Analyse URL | new URL analyse une URL et peut lever une exception. |
| <a id="notion-5"></a>Protocole autorisé | Le rendu n'utilise comme lien externe que http: ou https:. |
| <a id="notion-6"></a>Lien nommé | Le texte d'un lien décrit sa destination. |
| <a id="notion-7"></a>Focus | Le focus visible ne doit pas être supprimé sans indication équivalente. |
| <a id="notion-8"></a>Clavier | Tous les contrôles doivent être utilisables sans souris. |
| <a id="notion-9"></a>Écran étroit | L'audit comprend une largeur de 320 pixels CSS. |
| <a id="notion-10"></a>Zoom | L'audit comprend un zoom à 200 %. |
| <a id="notion-11"></a>Minimum Grid | min-width: 0 autorise un enfant de grille à réduire sa largeur. |
| <a id="notion-12"></a>Texte long | overflow-wrap: anywhere permet la coupure d'un long texte si nécessaire. |
| <a id="notion-13"></a>Apostrophe | Une apostrophe doit être conservée comme donnée grâce aux paramètres SQL. |
| <a id="notion-14"></a>Date impossible | Une date impossible est refusée même si son format est correct. |
| <a id="notion-15"></a>Chronologie | Une date de fin antérieure au début est refusée. |
| <a id="notion-16"></a>Erreur JSON | Le JSON mal formé reçoit 400. |
| <a id="notion-17"></a>Erreur valeur | Une valeur non conforme reçoit 422. |
| <a id="notion-18"></a>Absent | Un projet identifié mais inexistant reçoit 404. |
| <a id="notion-19"></a>Reproduction | Un rapport de test donne étapes, attendu et observé. |
| <a id="notion-20"></a>Rejeu | Après correction, le test concerné est rejoué. |
