---
layout: "layouts/Layout.astro"
title: "Modifier et supprimer une tâche sans perdre le contexte"
type: "TP"
order: 5
quizId: "s2-dev-04"
previousSession: "/semestre_2/developpement_Web/tp/ajout"
nextSession: "/semestre_2/developpement_Web/tp/erreurs"
---

<a id="comprendre"></a>

## Identifiant SQL et position dans un tableau

Le troisième élément visible peut posséder l’id 27. Après un filtre, il peut devenir le premier. Une commande reçoit donc l’identifiant de l’enregistrement, pas l’indice de sa carte dans la liste. Cette distinction vaut pour les boutons, les paramètres HTTP et les clauses SQL.

| Opération | Méthode du contrat | Cible et réponse |
|---|---|---|
| Renommer. | PATCH | Id existant et champ modifié. |
| Changer done. | PATCH | Id existant et booléen validé. |
| Supprimer. | DELETE | Id existant, confirmation selon l’API. |

## UPDATE et DELETE avec WHERE

```sql
UPDATE todos SET title = :title WHERE id = :id;
DELETE FROM todos WHERE id = :id;
```

`WHERE` limite les lignes concernées. Sans cette condition, une commande peut modifier ou supprimer toute la table. Les valeurs sont liées par une requête préparée. Un identifiant provenant du navigateur reste une entrée à valider côté serveur ; la présence d’un bouton correct n’est pas une garantie.

## Ligne absente et valeur inchangée

Une tâche peut exister et recevoir le même titre qu’avant. Selon la configuration du pilote, le nombre de lignes signalées comme changées peut être nul ; cela ne prouve pas à lui seul que l’id est absent. Le contrat doit distinguer enregistrement inexistant et opération sans changement.

Pour une suppression, demandez une confirmation montrant la cible. Si la requête échoue, ne retirez pas définitivement la carte en annonçant un succès. Pour le socle du TP, la mise à jour visuelle suit la confirmation du serveur ; un comportement optimiste demanderait une stratégie de retour arrière qui n’est pas nécessaire ici.

<a id="apprentissage"></a>

## Modifier une tâche par son identifiant

Une liste peut être triée ou filtrée. Son troisième élément n'est donc pas toujours la tâche numéro 3. Les opérations ciblent la clé primaire `id` reçue du serveur. Dans notre contrat, PATCH modifie `title` et/ou `done` ; DELETE supprime la ligne. Un identifiant absent en base donne 404.

```js
await fetch(`/api/todos.php?id=${id}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ done: true }),
});
```

Le code complet vérifie `response.ok`, conserve l'état de départ si l'envoi échoue et recharge ensuite la liste. `done: true` est un booléen JSON, pas `"true"`. N'envoyez pas tous les champs si un seul doit changer.

```php
$stmt = $pdo->prepare('UPDATE todos SET done = :done WHERE id = :id');
$stmt->execute(['done' => $done ? 1 : 0, 'id' => $id]);

$stmt = $pdo->prepare('DELETE FROM todos WHERE id = :id');
$stmt->execute(['id' => $id]);
```

Sans `WHERE`, ces instructions toucheraient toutes les lignes. Vérifiez l'existence de la tâche avant une modification : `rowCount() = 0` après UPDATE peut aussi signifier qu'une valeur est restée identique. Ne confondez pas « absent » et « déjà à cette valeur ».

```html live title="Changer et supprimer par identifiant — simulation"
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

## Tableau de référence — notions et opérations

| Notion | Règle à retenir |
|---|---|
| <a id="notion-1"></a>Identité | Les opérations utilisent l'id stable et pas la position affichée. |
| <a id="notion-2"></a>PATCH | PATCH change certains champs de la tâche existante. |
| <a id="notion-3"></a>DELETE | DELETE supprime la tâche ciblée. |
| <a id="notion-4"></a>Paramètre id | Le contrat place l'id dans le paramètre de requête id. |
| <a id="notion-5"></a>Booléen strict | Le champ done est un booléen JSON dans le contrat. |
| <a id="notion-6"></a>Modification SQL | UPDATE modifie une ligne existante. |
| <a id="notion-7"></a>Suppression SQL | DELETE FROM supprime les lignes ciblées. |
| <a id="notion-8"></a>Filtrage SQL | WHERE id = :id limite la modification à la tâche visée. |
| <a id="notion-9"></a>Sans WHERE | Un UPDATE sans WHERE peut toucher toutes les lignes. |
| <a id="notion-10"></a>Paramètres | Les valeurs et l'id sont transmis par paramètres préparés. |
| <a id="notion-11"></a>Id positif | L'id doit être un entier strictement positif. |
| <a id="notion-12"></a>Absence | Une tâche absente reçoit 404. |
| <a id="notion-13"></a>Modification identique | Un UPDATE sans changement de valeur ne prouve pas que la ligne est absente. |
| <a id="notion-14"></a>Vérification existence | Une lecture par id permet de distinguer absence et valeur inchangée. |
| <a id="notion-15"></a>Confirmation interface | response.ok doit être vérifié avant d'annoncer le succès. |
| <a id="notion-16"></a>Conservation état | Une requête échouée ne doit pas présenter un nouvel état comme enregistré. |
| <a id="notion-17"></a>Contrôle nommé | Le bouton Supprimer identifie la tâche concernée dans son nom accessible. |
| <a id="notion-18"></a>Confirmation suppression | Une suppression est précédée d'une confirmation explicite dans le travail attendu. |
| <a id="notion-19"></a>Suppression répétée | Un second DELETE sur une tâche déjà supprimée reçoit 404 dans notre contrat. |
| <a id="notion-20"></a>Vérification voisins | Un test vérifie que les tâches voisines restent intactes. |

## Travail à réaliser : cibler et confirmer

Ajoutez renommage, changement de `done` et suppression. Validez l’id positif côté serveur et vérifiez l’existence de la tâche. Pour PATCH, acceptez seulement les champs éditables et leur bon type. Pour DELETE, affichez une confirmation nommant la tâche ; une annulation n’émet aucune requête.

| Essai | Attendu |
|---|---|
| Modifier après filtre ou tri | Même id, seule la cible change |
| Réenvoyer un titre identique | Réussite si la tâche existe |
| `done: "false"` au lieu du booléen | 422, aucune modification |
| Id inexistant | 404 |
| DELETE confirmé puis répété | 200 puis 404 selon notre contrat |
| Panne pendant la modification | État confirmé conservé et réessai possible |

Vérifiez les tâches voisines et la persistance après rechargement. Après une reconstruction du DOM, replacez le focus sur le contrôle correspondant ou, si la cible a disparu, sur un contrôle pertinent encore présent.
