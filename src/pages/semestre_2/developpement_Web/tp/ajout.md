---
layout: "layouts/Layout.astro"
title: "Ajouter une tâche avec un formulaire et une API"
type: "TP"
order: 4
quizId: "s2-dev-03"
previousSession: "/semestre_2/developpement_Web/tp/lecture"
nextSession: "/semestre_2/developpement_Web/tp/modification"
---

<a id="comprendre"></a>

## Le trajet du POST jusqu’à INSERT

Le formulaire produit une intention ; JavaScript prépare un corps JSON ; PHP le lit et valide les champs ; PDO réalise l’insertion ; la réponse confirme le résultat. Ne confondez pas le texte encore présent dans le champ avec une donnée déjà enregistrée.

| Étape | Contrôle | Résultat si le contrôle échoue |
|---|---|---|
| Lire le corps. | JSON analysable. | Requête mal formée, pas une insertion. |
| Lire le titre. | Chaîne présente. | Erreur de champ/type. |
| Valider le titre. | Texte non vide après trim, longueur autorisée. | Réponse de validation refusée. |
| Insérer. | Requête préparée et base disponible. | Réponse serveur utile, sans détails SQL. |
| Confirmer. | Identifiant généré et donnée enregistrée. | Le client attend la confirmation avant de vider le champ. |

## prepare, execute et paramètres SQL

```php
$requete = $pdo->prepare('INSERT INTO todos (title) VALUES (:title)');
$requete->execute(['title' => $titre]);
```

Le SQL fixe l’opération ; `:title` est un emplacement réservé pour une valeur. La valeur est transmise séparément. Une apostrophe dans un titre reste une donnée au lieu de casser la construction de la requête. Cela ne remplace pas la vérification de longueur ni les règles métier.

## La confirmation de création et le rendu

Désactivez la commande pendant l’envoi et rétablissez-la dans `finally`. En cas d’échec, conservez le texte pour permettre une correction. Après réussite, ajoutez l’objet confirmé ou rechargez la liste selon le choix documenté. Le nouvel identifiant vient du serveur : il ne se déduit pas du nombre de cartes affichées.

Testez un titre normal, un titre avec une apostrophe, des espaces seuls et un double clic. Une création réussie doit produire une seule ligne selon le fonctionnement attendu du formulaire, et une erreur ne doit pas faire disparaître la saisie.

<a id="apprentissage"></a>

## Le formulaire, la validation PHP et la réponse 201

Le formulaire recueille une intention ; PHP valide les données ; MySQL enregistre ; la réponse confirme l'opération. Ne videz pas le champ avant cette confirmation : si le réseau échoue, l'utilisateur doit retrouver son texte. La validation HTML améliore l'expérience mais ne remplace pas la validation serveur.

```js
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const title = new FormData(form).get('title').trim();
  const response = await fetch('/api/todos.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  if (!response.ok) throw new Error('Création refusée');
  const nouvelleTache = await response.json();
  form.reset();
  await lireTaches();
});
```

Dans la version complète, encadrez le traitement par `try/catch/finally`, bloquez le bouton pendant l'envoi et réactivez-le même en cas d'erreur. L'extrait isole le trajet de création ; ne le considérez pas comme une gestion complète des erreurs.

```php
$data = json_decode(file_get_contents('php://input'), true, 512, JSON_THROW_ON_ERROR);
// L'extrait suppose un objet JSON décodé en tableau ; traiter les erreurs
// d'analyse et les autres formes avant de poursuivre.
if (!is_array($data) || !isset($data['title']) || !is_string($data['title'])) {
    respond(['error' => 'Le titre doit être du texte.'], 422);
}
$title = trim($data['title']);
if ($title === '' || mb_strlen($title, 'UTF-8') > 120) {
    respond(['error' => 'Titre obligatoire, au plus 120 caractères.'], 422);
}
$stmt = $pdo->prepare('INSERT INTO todos (title) VALUES (:title)');
$stmt->execute(['title' => $title]);
$id = (int) $pdo->lastInsertId();
```

Le paramètre `:title` sépare la valeur de la structure SQL. Une apostrophe dans « L'atelier photo » ne doit pas casser la requête. Le titre n'est ni un nom de table ni un morceau de SQL. La réponse de notre POST est l'objet créé avec son identifiant et le statut 201.

`respond` est la fonction fournie dans `api/common.php` du squelette : elle fixe le statut, encode le JSON et termine le script. Le corps complet distingue aussi un JSON mal formé (400) d’un objet de mauvais type ou de contenu refusé (422).

```html live title="Observer l'ajout d'une tâche — simulation en mémoire"
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
          li.append(label, remove, annuler);
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
| <a id="notion-1"></a>Soumission | L'événement submit du formulaire déclenche le traitement. |
| <a id="notion-2"></a>Comportement par défaut | preventDefault évite la navigation de soumission native dans ce traitement. |
| <a id="notion-3"></a>Lecture formulaire | FormData lit les contrôles nommés du formulaire. |
| <a id="notion-4"></a>Nom du champ | name est la clé utilisée par FormData. |
| <a id="notion-5"></a>Espaces | trim retire les espaces aux extrémités. |
| <a id="notion-6"></a>Format POST | Le corps de création est envoyé en JSON. |
| <a id="notion-7"></a>Sérialisation | JSON.stringify transforme un objet JavaScript en texte JSON. |
| <a id="notion-8"></a>Lecture corps PHP | php://input donne accès au corps brut envoyé à PHP. |
| <a id="notion-9"></a>Décodage | json_decode analyse le texte JSON en données PHP. |
| <a id="notion-10"></a>Mauvais JSON | Un JSON mal formé reçoit 400 dans notre contrat. |
| <a id="notion-11"></a>Validation serveur | Le serveur vérifie le titre même si HTML possède required. |
| <a id="notion-12"></a>Longueur | Le titre accepté contient au plus 120 caractères après trim. |
| <a id="notion-13"></a>Titre refusé | Un titre vide après trim reçoit 422. |
| <a id="notion-14"></a>Requête préparée | prepare sépare la structure SQL des valeurs. |
| <a id="notion-15"></a>Paramètre | :title est un emplacement de paramètre SQL. |
| <a id="notion-16"></a>Exécution | execute fournit les valeurs au statement préparé. |
| <a id="notion-17"></a>Identifiant créé | lastInsertId récupère l'identifiant généré après INSERT. |
| <a id="notion-18"></a>Confirmation | Le formulaire est réinitialisé seulement après succès confirmé. |
| <a id="notion-19"></a>Double envoi | Désactiver le bouton pendant l'envoi limite les doubles soumissions de l'interface. |
| <a id="notion-20"></a>Persistance vérifiée | Un ajout réussi reste présent après rechargement depuis MySQL. |

## Travail à réaliser : une création persistante

Complétez POST dans l’API et reliez-le à `submit`. Le serveur analyse le JSON, exige un objet, valide le type du titre avant `trim`, refuse le vide et contrôle au plus 120 caractères avec `mb_strlen($title, 'UTF-8')`. Il prépare INSERT, exécute les valeurs et renvoie l’objet créé en 201.

Côté navigateur, un indicateur d’envoi en cours empêche de lancer une deuxième requête depuis ce formulaire ; désactiver le bouton seul ne protège pas toutes les façons de soumettre. Rétablissez cet indicateur et le bouton dans `finally`. Conservez la saisie en cas de refus. Une création confirmée suivie d’une panne de relecture doit être annoncée comme « enregistrée, liste à recharger », pour éviter de créer un doublon au réessai.

Testez « L’atelier photo », les espaces seuls, 120 puis 121 caractères et une valeur tableau. Vérifiez qu’un double clic ne crée qu’une ligne, puis rechargez la page. Remettez front, PHP et tableau statut/effet en base.
