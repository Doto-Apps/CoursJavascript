---
layout: "layouts/Layout.astro"
title: "Portfolio : finaliser, livrer et présenter"
type: "TD"
order: 7
quizId: "s2-site-06"
previousSession: "/semestre_2/Site_Web_Avec_Donnees/td/qualite"
---

<a id="comprendre"></a>

## Les fichiers nécessaires à l’installation

Les fichiers du front ne suffisent pas : il faut aussi les scripts PHP, le schéma SQL, les ressources et une configuration expliquée. Une base présente uniquement sur votre ordinateur ne sera pas reconstruite automatiquement sur celui du correcteur.

| Livrable | Contenu | Vérification par un binôme |
|---|---|---|
| Notice. | Prérequis, import SQL, configuration et adresse. | Démarrage sans explication orale. |
| Schéma et données de test. | Tables et projets fictifs. | Import dans une base propre. |
| Application. | Lecture, filtres et gestion. | Un parcours complet puis un échec contrôlé. |
| Bilan. | Tests, choix et limites. | Correspondance avec la version remise. |

## L’installation sur un autre poste

Testez la version destinée à être remise, dans un dossier distinct, avec la notice. Annoncez les dépendances et les versions utiles. Les exemples de paramètres ne doivent pas devenir des secrets réels publiés. La configuration reste côté serveur ; le point d’entrée doit être évident.

## La vérification du parcours navigateur–API–SQL

Présentez un projet depuis sa ligne en base jusqu’à sa carte visible. Modifiez une donnée avec le formulaire, confirmez la réponse et vérifiez la persistance après rechargement. Exécutez aussi un filtre sans résultat ou un cas de validation refusée : cela montre les états du produit, pas seulement son écran idéal.

## Les limites connues du projet

Reliez un choix technique à son effet : une fonction de rendu commune évite des cartes incohérentes ; une requête préparée sépare SQL et valeur ; une validation de date respecte le dictionnaire. Une limite restante décrit un comportement et une amélioration réalisable. Les quatre heures incluent la reprise par un autre groupe et la correction des derniers blocages, pas quatre heures de nouvelles notions.

<a id="apprentissage"></a>

## Le README et la configuration du projet

Finaliser ne signifie pas seulement ajouter une animation : une autre personne doit pouvoir démarrer le projet, retrouver les données et comprendre les choix. Le README et le script SQL sont des parties du livrable.

```text
portfolio/
  index.html
  app.js
  styles.css
  api/
    common.php
    projects.php
  schema.sql
  README.md
```

Expliquez dans le README le nom de base, l'import SQL, la configuration côté serveur, la commande PHP et l'URL à ouvrir. Fournissez un exemple de configuration sans mot de passe réel. Un dépôt contenant seulement des captures ne permet pas de reconstruire l'application.

```html live title="Le prototype de référence — comparer avec votre version persistante"
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

## Les scénarios de vérification de la livraison

Rejouez un ajout et une édition en suivant navigateur → PHP → SQL → JSON → DOM. Identifiez les parties réutilisées du TP Todo List et celles adaptées aux projets. Distinguez prototype local en mémoire, application locale persistante et publication avec gestion authentifiée : notre livraison obligatoire couvre la deuxième.

## Remise et validation finale

Préparez une copie installable avec fichiers du front, API PHP, SQL, médias autorisés, crédits et README. Indiquez versions, extensions PHP, paramètres d’exemple, import SQL, commande de lancement et URL. Un binôme démarre cette copie sur son environnement de test et vérifie lecture, filtres, ajout, édition puis rechargement.

La remise inclut les attendus et observés des cas normaux et refusés, les corrections rejouées et les limites connues. Présentez le parcours d’un projet du formulaire à la base puis à sa carte. La gestion reste locale dans le cadre du TP ; décrivez clairement ce que votre version exécute et conserve réellement.
