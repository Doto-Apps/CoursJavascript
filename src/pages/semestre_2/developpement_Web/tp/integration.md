---
layout: "layouts/Layout.astro"
title: "Finaliser et tester la Todo List complète"
type: "TP"
order: 7
quizId: "s2-dev-06"
previousSession: "/semestre_2/developpement_Web/tp/erreurs"
---

<a id="comprendre"></a>

## Le parcours complet du CRUD

Un test d’intégration suit une action complète : ajouter une tâche, observer son identité, la renommer, changer son état et la supprimer. La réussite de chaque fonction isolée ne garantit pas que leurs formats et leurs mises à jour s’accordent.

| Jalon | Preuve attendue | Erreur typique |
|---|---|---|
| Chargement. | Liste persistante et état vide. | Une seule donnée fixe dans le navigateur. |
| Création. | Nouvelle ligne en base et dans le rendu. | Un affichage ajouté avant confirmation. |
| Modification. | Même id et nouvelle valeur. | Une nouvelle tâche créée par erreur. |
| Suppression. | Cible choisie absente après confirmation. | Suppression de la position visible plutôt que de l’id. |
| Redémarrage. | Données cohérentes après relance. | Configuration seulement mémorisée sur un poste. |

## Transport HTTP, données et rendu DOM

Les fonctions réseau produisent des données ou des erreurs. Les fonctions de rendu présentent ces données. Les écouteurs traduisent une action en appel de fonction. Garder cette séparation permet de tester le JSON sans parcourir l’interface et de modifier une carte sans réécrire le SQL.

## Installation et documentation du projet

La notice indique les versions utilisées, la création de base, la configuration serveur et l’adresse de démarrage. Un script SQL contient le schéma et des données de test explicitement fictives. Le projet remis ne contient pas de secret réel. Un autre groupe démarre la remise et reproduit un parcours normal puis un échec.

**Bilan technique :** expliquer une donnée depuis son champ de formulaire jusqu’à sa ligne SQL et son rendu final. Cette explication prouve la compréhension de la chaîne entière, au-delà d’un résultat obtenu par essais successifs.

<a id="apprentissage"></a>

## L’intégration du CRUD persistant

Nous avons construit des fonctions ; nous devons maintenant vérifier leur coopération. Le résultat de l'API est la source de vérité pour les opérations persistantes. Une tâche affichée mais jamais enregistrée ne constitue pas une création réussie. Séparez transport (`demander`), rendu (`afficherTaches`) et interactions (`submit`, `change`, `click`) pour localiser les problèmes.

```js
async function actualiser() {
  const taches = await demander('/api/todos.php');
  afficherTaches(taches);
  compteur.textContent = `${taches.filter(t => !t.done).length} à faire`;
}
```

**Résultat attendu :** le compteur reflète les données confirmées par le serveur. Un filtre « à faire » ne supprime aucune ligne en base : il sélectionne les tâches affichées. Un changement de tri ne change pas les identifiants.

```html live title="Réunir les interactions — prototype local sans persistance"
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

<h1>Prototype de Todo List</h1>
    <p class="note">
      Simulation en mémoire : aucun appel API ; les ajouts disparaissent au
      rechargement.
    </p>
    <form id="formulaire">
      <label for="title">Tâche</label>
      <input id="title" name="title" required maxlength="120" />
      <button>Ajouter</button>
    </form>
    <label for="filtre">Afficher</label>
    <select id="filtre">
      <option value="all">Toutes</option>
      <option value="todo">À faire</option>
      <option value="done">Terminées</option>
    </select>
    <ul id="liste"></ul>
    <p id="etat" role="status"></p>

    <script>
      let tasks = [{ id: 1, title: "Préparer les photos", done: false }];
      let nextId = 2;
      const form = document.querySelector("#formulaire");
      function render() {
        const filter = document.querySelector("#filtre").value;
        const visible = tasks.filter(
          (t) => filter === "all" || t.done === (filter === "done"),
        );
        const rows = visible.map((task) => {
          const li = document.createElement("li");
          li.dataset.taskId = task.id;
          const label = document.createElement("label");
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.checked = task.done;
          checkbox.addEventListener("change", () => {
            task.done = checkbox.checked;
            render();
            const next = document.querySelector(`[data-task-id="${task.id}"] input[type="checkbox"]`);
            (next ?? document.querySelector("#title")).focus();
          });
          label.append(
            checkbox,
            document.createTextNode(" " + task.title + " "),
          );
          const remove = document.createElement("button");
          remove.type = "button";
          let suppressionDemandee = false;
          const annuler = document.createElement("button");
          annuler.type = "button";
          annuler.textContent = "Annuler la suppression";
          annuler.hidden = true;
          annuler.addEventListener("click", () => {
            suppressionDemandee = false;
            annuler.hidden = true;
            remove.textContent = "Supprimer";
            remove.setAttribute("aria-label", `Supprimer ${task.title}`);
            remove.focus();
          });
          remove.textContent = "Supprimer";
          remove.setAttribute("aria-label", `Supprimer ${task.title}`);
          remove.addEventListener("click", () => {
            if (!suppressionDemandee) {
              suppressionDemandee = true;
              remove.textContent = "Confirmer la suppression";
              remove.setAttribute("aria-label", `Confirmer la suppression de ${task.title}`);
              annuler.hidden = false;
              return;
            }
            tasks = tasks.filter((t) => t.id !== task.id);
            render();
            document.querySelector("#title").focus();
          });
          const titleInput = document.createElement("input");
          titleInput.value = task.title;
          titleInput.maxLength = 120;
          titleInput.setAttribute(
            "aria-label",
            `Nouveau titre de ${task.title}`,
          );
          const rename = document.createElement("button");
          rename.textContent = "Renommer";
          rename.addEventListener("click", () => {
            const title = titleInput.value.trim();
            if (!title) {
              document.querySelector("#etat").textContent =
                "Le titre est obligatoire.";
              return;
            }
            task.title = title;
            render();
            document.querySelector(`[data-task-id="${task.id}"] input:not([type="checkbox"])`)?.focus();
          });
          li.append(label, titleInput, rename, remove, annuler);
          return li;
        });
        document.querySelector("#liste").replaceChildren(...rows);
        document.querySelector("#etat").textContent =
          `${visible.length} résultat(s), ${tasks.filter((t) => !t.done).length} à faire`;
      }
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const title = new FormData(form).get("title").trim();
        if (!title) {
          document.querySelector("#etat").textContent =
            "Le titre est obligatoire.";
          return;
        }
        tasks.push({ id: nextId++, title, done: false });
        form.reset();
        render();
      });
      document.querySelector("#filtre").addEventListener("change", render);
      render();
    </script>
```

## Livraison de la Todo List

Reprenez le [squelette du projet](/exemples/s2/todo-squelette.zip) complété au fil des séances. La version remise doit lire, créer, renommer, changer l’état et supprimer en PHP/MySQL. Les filtres « toutes », « à faire » et « terminées » changent la vue sans effacer les autres tâches ; le compteur doit indiquer clairement sa population.

Faites un parcours complet sur une base de test : ajouter deux tâches, en renommer une, la terminer, filtrer, recharger puis supprimer la cible confirmée. Vérifiez la base après chaque écriture. Exécutez aussi un refus de validation et une panne suivie d’un réessai.

Remettez HTML/CSS/JS, API PHP, schéma, données fictives, README et résultats des tests. Un autre groupe doit installer cette copie sans explication orale. La démonstration finale suit une donnée du formulaire à SQL, puis de la réponse JSON au DOM.
