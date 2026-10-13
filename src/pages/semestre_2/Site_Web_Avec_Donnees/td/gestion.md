---
layout: "layouts/Layout.astro"
title: "Portfolio : formulaire d’ajout et d’édition"
type: "TD"
order: 5
quizId: "s2-site-04"
previousSession: "/semestre_2/Site_Web_Avec_Donnees/td/filtres"
nextSession: "/semestre_2/Site_Web_Avec_Donnees/td/qualite"
---

<a id="comprendre"></a>

## Champs HTML, FormData et types JSON

Un `label` explique ce que l’utilisateur saisit ; `name` fournit la clé de FormData ; le type du contrôle aide la saisie. La valeur reçue doit encore être convertie et validée selon le dictionnaire, surtout pour les dates et les valeurs optionnelles.

| Champ | Contrôle | Règle à vérifier côté serveur |
|---|---|---|
| Titre. | Input text. | Chaîne non vide après trim et longueur autorisée. |
| Description. | Textarea. | Texte conforme aux contraintes du projet. |
| Technologie. | Select ou champ cadré. | Valeur appartenant au vocabulaire retenu. |
| Date de début. | Input date. | Date de calendrier valide. |
| Date de fin. | Input date optionnel. | Null si absente ; pas avant le début si présente. |

## Le formulaire en mode ajout ou modification

En création, aucun id existant n’est ciblé et l’API attribue une identité. En édition, le formulaire est prérempli avec un projet identifié et la mise à jour conserve cet id. Le titre d’un bouton et le contexte doivent rendre cette distinction visible.

Le prototype interactif du cours permet de comprendre ce contrat sans modifier une base. La version évaluée doit utiliser Fetch, PHP et MySQL dans le projet local. Une interface qui semble réussir dans le prototype n’a pas pour autant enregistré le projet dans votre base.

## Erreurs de validation et conservation de la saisie

Conservez la saisie si le serveur refuse un champ. Attendez la confirmation avant de réinitialiser. Une suppression exige une cible affichée et une confirmation. Après réussite, rechargez les données ou appliquez l’objet confirmé selon la stratégie choisie.

Testez une modification sans changement, une date de fin absente, une date de fin antérieure au début et une ressource inexistante. Ces cas vérifient des règles différentes ; ils ne doivent pas tous être annoncés comme « erreur réseau ».

<a id="apprentissage"></a>

## La validation du formulaire de projet

Le formulaire de gestion reprend le dictionnaire établi au cadrage. Chaque contrôle a un label et un `name`, utilisé par FormData. Un champ caché peut conserver l'id du projet en cours d'édition, mais cet id doit aussi être validé côté serveur : un champ caché n'est pas une protection.

```js
const data = new FormData(form);
const payload = {
  title: data.get('title').trim(),
  description: data.get('description').trim(),
  image_url: data.get('image_url').trim(),
  start_date: data.get('start_date'),
  end_date: data.get('end_date') || null,
  technologies: data.get('technologies').trim(),
  project_url: data.get('project_url').trim(),
  code_url: data.get('code_url').trim(),
};
```

Le contrat conserve une vraie valeur `null` pour la date de fin absente. Un ajout utilise POST ; une édition utilise PATCH avec un id. La réponse confirme l'opération avant de réinitialiser le formulaire et de recharger les données.

```php
$stmt = $pdo->prepare(
    'INSERT INTO projects (title, description, image_url, start_date,
     end_date, technologies, project_url, code_url)
     VALUES (:title, :description, :image_url, :start_date,
     :end_date, :technologies, :project_url, :code_url)'
);
$stmt->execute($validated);
```

**Sortie attendue :** un projet avec un nouvel id et HTTP 201. Les valeurs ne sont jamais concaténées dans SQL. Pour l'édition, un UPDATE paramétré utilise `WHERE id = :id` ; les champs éditables sont limités par le serveur.

```html live title="Ajouter puis éditer un projet — simulation en mémoire"
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
      <h2>Gestion du prototype</h2>
      <input name="id" type="hidden" />
      <label for="titre">Titre</label>
      <input id="titre" name="title" required maxlength="120" />
      <label for="description">Description</label>
      <textarea
        id="description"
        name="description"
        required
        maxlength="2000"
      ></textarea>
      <label for="image">Image (URL HTTP(S) facultative dans cet essai)</label>
      <input id="image" name="image_url" type="url" maxlength="500" />
      <label for="debut">Date de début</label>
      <input id="debut" name="start_date" type="date" required />
      <label for="fin">Date de fin (facultative)</label>
      <input id="fin" name="end_date" type="date" />
      <label for="technos">Technologies</label>
      <input
        id="technos"
        name="technologies"
        maxlength="255"
        placeholder="HTML, CSS"
      />
      <label for="projet">Lien du projet (facultatif)</label>
      <input id="projet" name="project_url" type="url" maxlength="500" />
      <label for="code">Lien du code (facultatif)</label>
      <input id="code" name="code_url" type="url" maxlength="500" />
      <button>Enregistrer</button>
      <button id="annuler" type="button">Annuler l’édition</button>
    </form>
    <pre id="contrat" aria-label="Dernière opération simulée"></pre>

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
      const form = document.querySelector("#ajout");
      for (const project of projects) {
        Object.assign(project, {
          image_url: "",
          start_date: "2026-09-01",
          end_date: null,
          project_url: "",
          code_url: "",
        });
      }
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
          const edit = document.createElement("button");
          edit.type = "button";
          edit.textContent = `Éditer ${p.title}`;
          edit.addEventListener("click", () => {
            for (const name of [
              "id",
              "title",
              "description",
              "image_url",
              "start_date",
              "end_date",
              "technologies",
              "project_url",
              "code_url",
            ]) {
              form.elements.namedItem(name).value = p[name] ?? "";
            }
            document.querySelector("#titre").focus();
          });
          article.append(h2, description, technologies, edit);
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
      document.querySelector("#annuler").addEventListener("click", () => {
        form.reset();
        form.elements.namedItem("id").value = "";
      });
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const payload = Object.fromEntries(
          [...data].map(([key, value]) => [key, value.trim()]),
        );
        const id = Number(payload.id);
        delete payload.id;
        payload.end_date ||= null;
        const validUrl = (value) =>
          !value || /^https?:$/.test(new URL(value).protocol);
        let urlsOk = false;
        try {
          urlsOk = ["image_url", "project_url", "code_url"].every((key) =>
            validUrl(payload[key]),
          );
        } catch {
          /* Une URL illisible est également refusée. */
        }
        if (
          !payload.title ||
          !payload.description ||
          !urlsOk ||
          (payload.end_date && payload.end_date < payload.start_date)
        ) {
          document.querySelector("#etat").textContent =
            "Refus : textes vides, URL non HTTP(S) ou fin avant le début.";
          return;
        }
        const existing = projects.find((project) => project.id === id);
        if (existing) Object.assign(existing, payload);
        else
          projects.push({
            id: Math.max(0, ...projects.map((project) => project.id)) + 1,
            ...payload,
          });
        document.querySelector("#contrat").textContent =
          `${existing ? "PATCH" : "POST"} simulé, aucun appel réseau\n${JSON.stringify(payload, null, 2)}`;
        form.reset();
        form.elements.namedItem("id").value = "";
        render();
      });
      render();
    </script>
```

## Les limites de la simulation locale

Le bouton « Éditer » préremplit les huit champs et conserve l’id. Une fin vide devient `null` ; la trace indique POST ou PATCH **simulé**, pas une réponse de PHP. Les filtres restent applicables : un ajout peut être masqué par le filtre actif. Cette maquette stocke les projets uniquement en mémoire. La version PHP/MySQL doit valider de nouveau les valeurs, vérifier l’id et confirmer l’écriture réelle avant d’annoncer un succès.

## La validation côté client et côté serveur

Vérifiez titre non vide, description non vide, longueurs, dates valides et ordre chronologique. N'acceptez pas une URL `javascript:` ; les liens externes du contrat sont HTTP(S). Les paramètres de connexion restent dans PHP. Cette interface de gestion est destinée au projet local : une publication réelle demanderait une authentification et des autorisations côté serveur.

## Tableau de référence — notions et opérations

| Notion | Règle à retenir |
|---|---|
| <a id="notion-1"></a>Formulaire | Le formulaire reprend les champs du dictionnaire de données. |
| <a id="notion-2"></a>Label | Chaque contrôle possède un label. |
| <a id="notion-3"></a>Name | name fournit la clé lue par FormData. |
| <a id="notion-4"></a>Champ caché | Un champ caché peut porter l'id mais ne constitue pas une protection. |
| <a id="notion-5"></a>Payload | Le payload reprend les champs prévus par le contrat. |
| <a id="notion-6"></a>Fin absente | Une fin absente est envoyée comme null dans le contrat. |
| <a id="notion-7"></a>Ajout | POST ajoute un nouveau projet. |
| <a id="notion-8"></a>Édition | PATCH édite un projet identifié. |
| <a id="notion-9"></a>Id édition | L'édition transmet l'id du projet existant. |
| <a id="notion-10"></a>SQL ajout | INSERT crée une ligne de projects. |
| <a id="notion-11"></a>SQL édition | UPDATE avec WHERE id cible un projet. |
| <a id="notion-12"></a>Paramètres | Les valeurs du formulaire sont passées comme paramètres. |
| <a id="notion-13"></a>Statut création | Un ajout réussi renvoie HTTP 201 et un nouvel id. |
| <a id="notion-14"></a>Confirmation | La réinitialisation suit la réponse réussie. |
| <a id="notion-15"></a>Titre requis | Le titre doit être non vide après nettoyage. |
| <a id="notion-16"></a>Description requise | La description est obligatoire dans ce projet. |
| <a id="notion-17"></a>Dates réelles | Une date doit être réelle et pas seulement avoir le bon format. |
| <a id="notion-18"></a>Ordre dates | La fin ne doit pas précéder le début. |
| <a id="notion-19"></a>URLs | Les liens externes du contrat n'acceptent que HTTP(S). |
| <a id="notion-20"></a>Gestion locale | Le projet de gestion livré est local ; une publication demande une authentification serveur. |
