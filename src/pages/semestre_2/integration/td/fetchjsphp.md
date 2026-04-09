---
layout: "layouts/Layout.astro"
title: "JavaScript Fetch avec PHP et base de données SQL"
type: "TD"
---

# JavaScript Fetch avec PHP et base de données

Dans ce TD, nous allons voir comment une page web peut communiquer avec un serveur PHP grâce à **JavaScript** et **`fetch()`**, puis comment PHP peut lire ou enregistrer des données dans une **base de données MySQL**.

Le but du cours est de rester simple et de comprendre l’idée générale :

- une page web affiche une interface,
- JavaScript envoie une requête,
- PHP reçoit cette requête,
- PHP lit ou modifie la base de données,
- PHP renvoie une réponse,
- JavaScript met à jour la page.

---

## 1. L’architecture générale

Quand on travaille avec une page web reliée à une base de données, on sépare souvent le projet en plusieurs parties.

### Le front-end

C’est ce que voit l’utilisateur dans le navigateur :

- le HTML,
- le CSS,
- le JavaScript.

Le front-end sert à :

- afficher les informations,
- lire les actions de l’utilisateur,
- envoyer des requêtes au serveur.

### Le back-end

Ici, le back-end est en **PHP**.

Il sert à :

- recevoir les requêtes du navigateur,
- traiter les données,
- interagir avec la base de données,
- renvoyer une réponse.

### La base de données

La base de données stocke les informations de manière durable.

Par exemple, elle peut contenir :

- des tâches,
- des messages,
- des utilisateurs,
- des produits.

---

## 2. Le chemin d’une requête

Voici le chemin classique :

1. l’utilisateur clique sur un bouton,
2. JavaScript envoie une requête avec `fetch()`,
3. un fichier PHP reçoit cette requête,
4. PHP lit ou écrit dans MySQL,
5. PHP renvoie une réponse,
6. JavaScript récupère cette réponse,
7. la page est mise à jour.

On peut retenir ce schéma :

**Navigateur → JavaScript → PHP → Base de données → PHP → JavaScript → HTML**

---

## 3. Organisation simple d’un projet

Voici une organisation très simple :

```txt
mon-projet/
├── index.php
├── js/
│   └── app.js
├── api/
│   ├── db.php
│   ├── get_items.php
│   └── add_item.php
└── sql/
    └── database.sql
```

### Rôle des fichiers

- `index.php` : la page principale
- `js/app.js` : le JavaScript côté navigateur
- `api/db.php` : la connexion à la base de données
- `api/get_items.php` : récupérer des données
- `api/add_item.php` : ajouter des données
- `sql/database.sql` : créer la base et la table

---

## 4. Rappel : le rôle de `fetch()` en JavaScript

`fetch()` permet à JavaScript d’envoyer une requête HTTP vers un serveur.

On l’utilise souvent pour :

- récupérer des données avec `GET`,
- envoyer des données avec `POST`.

### Exemple simple avec `GET`

```js
fetch("api/get_items.php")
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });
```

### Ce code fait quoi ?

- il appelle le fichier PHP,
- il attend la réponse,
- il transforme la réponse en JSON,
- il affiche le résultat dans la console.

---

## 5. Envoyer des données avec `POST`

Quand on veut envoyer une donnée, on utilise souvent `POST`.

### Exemple simple

```js
fetch("api/add_item.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    title: "Exemple"
  })
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });
```

### À retenir

- `method: "POST"` indique que l’on envoie des données,
- `Content-Type: "application/json"` indique le format envoyé,
- `body` contient les données converties en JSON.

---

## 6. Rappel : qu’est-ce que le JSON ?

Le **JSON** est un format texte très utilisé pour échanger des données entre JavaScript et PHP.

### Exemple d’objet JSON

```json
{
  "title": "Exemple",
  "done": false
}
```

### Exemple de tableau JSON

```json
[
  {
    "id": 1,
    "title": "Lire le cours"
  },
  {
    "id": 2,
    "title": "Faire l'exercice"
  }
]
```

### En JavaScript

Transformer un objet JavaScript en JSON :

```js
JSON.stringify(monObjet);
```

Transformer une réponse JSON en objet JavaScript :

```js
response.json();
```

---

## 7. Côté PHP : lire les données envoyées

Quand JavaScript envoie du JSON avec `fetch()`, PHP doit le lire.

### Exemple simple

```php
<?php
$data = json_decode(file_get_contents("php://input"), true);

$title = $data["title"] ?? "";

echo $title;
?>
```

### Explication

- `file_get_contents("php://input")` récupère le contenu brut envoyé,
- `json_decode(..., true)` transforme ce JSON en tableau PHP,
- on peut ensuite accéder aux valeurs.

---

## 8. Côté PHP : renvoyer du JSON

PHP peut aussi répondre au navigateur au format JSON.

### Exemple simple

```php
<?php
header("Content-Type: application/json");

echo json_encode([
    "success" => true,
    "message" => "Donnée reçue"
]);
?>
```

### Pourquoi mettre ce header ?

Parce que le navigateur doit savoir que PHP renvoie du **JSON** et non du HTML.

---

## 9. Rappel : connexion à la base de données avec PDO

Pour communiquer avec MySQL en PHP, on utilise souvent **PDO**.

### Exemple simple de connexion

```php
<?php
$host = "localhost";
$dbname = "cours_fetch";
$username = "root";
$password = "";

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8",
        $username,
        $password
    );

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}
?>
```

### Ce code fait quoi ?

- il essaie de se connecter à MySQL,
- s’il réussit, on peut faire des requêtes SQL,
- s’il échoue, on affiche une erreur.

---

## 10. Créer une base de données simple

Pour nos exemples, on peut créer une base de données très simple.

### Script SQL

```sql
CREATE DATABASE IF NOT EXISTS cours_fetch;
USE cours_fetch;

CREATE TABLE IF NOT EXISTS items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Cette table contient

- `id` : identifiant de la ligne,
- `title` : texte principal,
- `created_at` : date de création.

---

## 11. Rappel : récupérer des données depuis la base

Voici un exemple simple pour lire toutes les lignes d’une table.

### `api/get_items.php`

```php
<?php
header("Content-Type: application/json");
require_once "db.php";

$stmt = $pdo->query("SELECT * FROM items ORDER BY id DESC");
$items = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($items);
?>
```

### Explication

- on exécute une requête SQL,
- on récupère toutes les lignes,
- on les transforme en tableau PHP,
- on renvoie ce tableau en JSON.

---

## 12. Rappel : ajouter une donnée en base

Voici un exemple simple pour insérer une ligne.

### `api/add_item.php`

```php
<?php
header("Content-Type: application/json");
require_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);
$title = trim($data["title"] ?? "");

if ($title === "") {
    echo json_encode([
        "success" => false,
        "message" => "Le champ est vide"
    ]);
    exit;
}

$stmt = $pdo->prepare("INSERT INTO items (title) VALUES (:title)");
$stmt->execute([
    "title" => $title
]);

echo json_encode([
    "success" => true,
    "message" => "Élément ajouté"
]);
?>
```

### Pourquoi utiliser `prepare()` ?

Parce que c’est une manière plus propre et plus sûre d’envoyer des données à la base.

---

## 13. Exemple JavaScript : afficher les données reçues

Supposons que PHP renvoie une liste d’éléments. JavaScript peut ensuite les afficher dans la page.

```js
const list = document.getElementById("list");

fetch("api/get_items.php")
  .then(response => response.json())
  .then(items => {
    list.innerHTML = "";

    items.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item.title;
      list.appendChild(li);
    });
  });
```

### Ce code fait quoi ?

- il demande les données à PHP,
- il reçoit un tableau,
- il crée un élément HTML pour chaque ligne,
- il l’ajoute dans la page.

---

## 14. Exemple JavaScript : envoyer un formulaire

```js
const form = document.getElementById("item-form");
const input = document.getElementById("item-input");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  fetch("api/add_item.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: input.value
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
});
```

### Pourquoi utiliser `event.preventDefault()` ?

Parce qu’on ne veut pas recharger toute la page au moment de l’envoi du formulaire.

---

## 15. Ce qu’il faut retenir

Dans ce type d’application :

- **le HTML** affiche l’interface,
- **JavaScript** utilise `fetch()` pour envoyer ou récupérer des données,
- **PHP** traite la requête,
- **MySQL** stocke les informations,
- **JSON** sert de format d’échange.

---

## 16. Exercice : Todo List simple avec Tailwind, JavaScript, PHP et MySQL

Nous allons maintenant appliquer le cours avec une petite application simple.

### Objectif

Créer une **Todo List** qui permet :

- d’ajouter une tâche,
- d’afficher les tâches enregistrées.

Ici, on reste volontairement simple :

- pas de suppression,
- pas de modification,
- pas de case terminée.

Le but est juste de relier :

- **Tailwind** pour l’apparence,
- **JavaScript** pour `fetch()`,
- **PHP** pour le traitement,
- **MySQL** pour le stockage.

---

## 17. Structure attendue

```txt
todo-list/
├── index.php
├── js/
│   └── app.js
├── api/
│   ├── db.php
│   ├── get_todos.php
│   └── add_todo.php
└── sql/
    └── todo.sql
```

---

## 18. Base de données de l’exercice

### `sql/todo.sql`

```sql
CREATE DATABASE IF NOT EXISTS todo_db;
USE todo_db;

CREATE TABLE IF NOT EXISTS todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 19. Page principale

### `index.php`

```php
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Todo List</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen flex items-center justify-center">

  <div class="bg-white shadow-md rounded-xl p-6 w-full max-w-lg">
    <h1 class="text-2xl font-bold text-center mb-4">Todo List</h1>

    <form id="todo-form" class="flex gap-2 mb-4">
      <input
        id="todo-input"
        type="text"
        placeholder="Ajouter une tâche"
        class="flex-1 border border-gray-300 rounded-lg px-4 py-2"
      />
      <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Ajouter
      </button>
    </form>

    <ul id="todo-list" class="space-y-2"></ul>
  </div>

  <script src="js/app.js"></script>
</body>
</html>
```

---

## 20. Connexion à la base

### `api/db.php`

```php
<?php
$host = "localhost";
$dbname = "todo_db";
$username = "root";
$password = "";

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8",
        $username,
        $password
    );

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}
?>
```

---

## 21. Récupérer les tâches

### `api/get_todos.php`

```php
<?php
header("Content-Type: application/json");
require_once "db.php";

$stmt = $pdo->query("SELECT * FROM todos ORDER BY id DESC");
$todos = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($todos);
?>
```

---

## 22. Ajouter une tâche

### `api/add_todo.php`

```php
<?php
header("Content-Type: application/json");
require_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);
$title = trim($data["title"] ?? "");

if ($title === "") {
    echo json_encode([
        "success" => false,
        "message" => "Le champ est vide"
    ]);
    exit;
}

$stmt = $pdo->prepare("INSERT INTO todos (title) VALUES (:title)");
$stmt->execute([
    "title" => $title
]);

echo json_encode([
    "success" => true,
    "message" => "Tâche ajoutée"
]);
?>
```

---

## 23. JavaScript de l’exercice

### `js/app.js`

```js
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

function loadTodos() {
  fetch("api/get_todos.php")
    .then(response => response.json())
    .then(todos => {
      todoList.innerHTML = "";

      todos.forEach(todo => {
        const li = document.createElement("li");
        li.className = "bg-gray-50 border border-gray-200 rounded-lg px-4 py-2";
        li.textContent = todo.title;
        todoList.appendChild(li);
      });
    });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = input.value.trim();

  if (title === "") {
    return;
  }

  fetch("api/add_todo.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        input.value = "";
        loadTodos();
      }
    });
});

loadTodos();
```

---

## 24. Consignes de l’exercice

### Travail demandé

1. créer la base de données avec le script SQL,
2. créer les fichiers PHP,
3. créer la page `index.php`,
4. créer le fichier JavaScript,
5. vérifier que les tâches s’ajoutent bien,
6. vérifier qu’elles s’affichent après rechargement.

### Résultat attendu

- quand on ajoute une tâche, elle est enregistrée en base,
- la liste s’affiche sur la page,
- l’interface est propre grâce à Tailwind.

---

## 25. Conclusion

Ce TD présente le fonctionnement de base d’une communication entre :

- **JavaScript**
- **PHP**
- **MySQL**

L’idée la plus importante à retenir est la suivante :

- JavaScript envoie ou demande des données avec `fetch()`,
- PHP sert d’intermédiaire avec la base de données,
- la réponse revient en JSON,
- la page peut être mise à jour sans rechargement complet.

C’est une base essentielle pour la suite du développement web dynamique.
