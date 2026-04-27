---
layout: "layouts/Layout.astro"
title: "Portfolio dynamique avec JavaScript Fetch, PHP et MySQL"
type: "TP"
---

# Portfolio dynamique avec JavaScript Fetch, PHP et MySQL

Dans le TP précédent, vous avez créé une **Todo List** simple avec :

- une page HTML/PHP,
- du JavaScript avec `fetch()`,
- des fichiers PHP dans un dossier `api/`,
- une base de données MySQL.

Dans ce nouveau TP, vous allez réutiliser la même logique, mais dans un contexte plus proche de votre **portfolio de fin d’année**.

L’objectif est de rendre une partie de votre portfolio **dynamique**.

Au lieu d’écrire directement tous vos projets dans le HTML, les projets seront stockés dans une base de données. JavaScript devra ensuite les récupérer avec `fetch()` et les afficher dans la page.

---

## 1. Contexte du projet

Dans un portfolio, on présente souvent plusieurs projets réalisés pendant l’année.

Chaque projet peut contenir :

- une image,
- un titre,
- une description,
- une date de début,
- une date de fin,
- une ou plusieurs technologies utilisées,
- un lien vers le projet,
- un lien vers le code source.

Dans ce TP, vous allez créer une petite partie dynamique permettant :

- d’enregistrer des projets dans une base de données,
- de récupérer ces projets avec PHP,
- de les afficher dans une page avec JavaScript,
- d’ajouter un nouveau projet depuis un formulaire.

---

## 2. Objectif du TP

Vous devez créer une section dynamique de portfolio qui permet :

1. d’afficher une liste de projets,
2. d’ajouter un nouveau projet,
3. de stocker les projets dans une base MySQL,
4. d’utiliser `fetch()` pour communiquer avec PHP,
5. de générer les cartes de projets avec JavaScript.

Vous devez vous inspirer du TP précédent sur la Todo List.

La logique reste la même, mais les données sont plus complètes.

---

## 3. Différence avec la Todo List

Dans le TP précédent, une tâche contenait principalement :

- un `id`,
- un `title`,
- une date de création.

Ici, un projet contient plusieurs informations.

Par exemple :

- un titre,
- une description,
- une image,
- une date de début,
- une date de fin,
- des technologies,
- un lien vers le projet,
- un lien vers le code.

Vous devez donc adapter votre ancien code.

---

## 4. Architecture générale

Le fonctionnement attendu est le suivant :

1. la page du portfolio se charge,
2. JavaScript appelle un fichier PHP avec `fetch()`,
3. PHP récupère les projets dans la base de données,
4. PHP renvoie les projets au format JSON,
5. JavaScript crée les cartes HTML des projets,
6. les projets apparaissent dans la page.

Pour ajouter un projet :

1. l’utilisateur remplit un formulaire,
2. JavaScript récupère les valeurs du formulaire,
3. JavaScript envoie les données à PHP avec `fetch()` en `POST`,
4. PHP insère le projet dans la base de données,
5. JavaScript recharge la liste des projets.

On peut retenir le schéma suivant :

**Navigateur → JavaScript → PHP → Base de données → PHP → JavaScript → HTML**

---

## 5. Organisation attendue du projet

Vous pouvez organiser votre projet de cette manière :

```txt
portfolio-dynamique/
├── index.php
├── js/
│   └── app.js
├── api/
│   ├── db.php
│   ├── get_projects.php
│   └── add_project.php
└── sql/
    └── portfolio.sql
```

### Rôle des fichiers

- `index.php` : page principale du portfolio
- `js/app.js` : JavaScript côté navigateur
- `api/db.php` : connexion à la base de données
- `api/get_projects.php` : récupération des projets
- `api/add_project.php` : ajout d’un projet
- `sql/portfolio.sql` : script SQL de création de la base

---

## 6. Base de données

Vous devez commencer par créer la base de données.

### `sql/portfolio.sql`

```sql
CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NULL,
    technologies VARCHAR(255) NOT NULL,
    project_url VARCHAR(500) NULL,
    code_url VARCHAR(500) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO projects (
    title,
    description,
    image_url,
    start_date,
    end_date,
    technologies,
    project_url,
    code_url
) VALUES
(
    'Portfolio personnel',
    'Création d’un portfolio en HTML, CSS et JavaScript pour présenter mes projets.',
    'images/portfolio.jpg',
    '2025-09-15',
    '2025-10-10',
    'HTML, CSS, JavaScript',
    NULL,
    NULL
),
(
    'Mini-jeu JavaScript',
    'Développement d’un petit jeu interactif dans le navigateur avec gestion des événements.',
    'images/game.jpg',
    '2025-11-01',
    '2025-11-20',
    'HTML, CSS, JavaScript',
    NULL,
    NULL
),
(
    'Application Todo List',
    'Création d’une Todo List dynamique utilisant JavaScript, PHP, MySQL et fetch.',
    'images/todo.jpg',
    '2026-01-10',
    '2026-01-18',
    'JavaScript, PHP, MySQL',
    NULL,
    NULL
);
```

---

## 7. Explication de la table `projects`

La table `projects` contient les colonnes suivantes.

### `id`

Identifiant unique du projet.

Il est généré automatiquement par MySQL.

### `title`

Titre du projet.

Exemple :

```txt
Portfolio personnel
```

### `description`

Description courte du projet.

Elle permet d’expliquer ce que fait le projet.

### `image_url`

Chemin vers l’image du projet.

Exemple avec une image locale :

```txt
images/portfolio.jpg
```

Exemple avec une image en ligne :

```txt
https://exemple.com/image.jpg
```

Pour simplifier le TP, vous ne devez pas gérer l’upload d’image.

Vous devez simplement stocker le chemin ou l’URL de l’image dans la base.

### `start_date`

Date de début du projet.

### `end_date`

Date de fin du projet.

Cette valeur peut être vide si le projet est encore en cours.

### `technologies`

Liste simple des technologies utilisées.

Exemple :

```txt
HTML, CSS, JavaScript
```

Pour ce TP, on stocke les technologies dans un simple champ texte.

### `project_url`

Lien vers le projet en ligne.

Ce champ peut être vide.

### `code_url`

Lien vers le code source.

Ce champ peut être vide.

### `created_at`

Date d’ajout du projet dans la base.

Cette valeur est générée automatiquement.

---

## 8. Travail demandé

Vous devez réaliser une application web permettant d’afficher et d’ajouter des projets.

Vous devez repartir du TP précédent sur la Todo List et l’adapter.

L’objectif n’est pas de copier une correction complète.

L’objectif est de comprendre comment transformer une application très simple en une application un peu plus proche d’un vrai portfolio dynamique.

---

## 9. Étape 1 — Créer la base de données

Vous devez :

1. créer un dossier `sql`,
2. créer un fichier `portfolio.sql`,
3. copier le script SQL donné,
4. exécuter le script dans phpMyAdmin ou dans votre outil MySQL,
5. vérifier que la table `projects` existe,
6. vérifier que les exemples de projets sont bien présents.

---

## 10. Étape 2 — Préparer la connexion à la base

Vous devez créer un fichier :

```txt
api/db.php
```

Ce fichier doit permettre de se connecter à la base :

```txt
portfolio_db
```

Vous pouvez vous inspirer du fichier `db.php` du TP précédent.

Attention : vous devez adapter le nom de la base de données.

---

## 11. Étape 3 — Récupérer les projets

Vous devez créer un fichier :

```txt
api/get_projects.php
```

Ce fichier doit :

1. se connecter à la base de données,
2. récupérer tous les projets de la table `projects`,
3. trier les projets du plus récent au plus ancien,
4. renvoyer les résultats au format JSON.

Vous pouvez vous inspirer de l’ancien fichier :

```txt
api/get_todos.php
```

Mais attention : ici, vous ne récupérez plus des tâches.

Vous récupérez des projets.

---

## 12. Étape 4 — Ajouter un projet

Vous devez créer un fichier :

```txt
api/add_project.php
```

Ce fichier doit :

1. recevoir des données envoyées en JSON,
2. récupérer les informations du projet,
3. vérifier que les champs obligatoires ne sont pas vides,
4. insérer le projet dans la table `projects`,
5. renvoyer une réponse JSON.

Les champs obligatoires sont :

- `title`,
- `description`,
- `image_url`,
- `start_date`,
- `technologies`.

Les champs facultatifs sont :

- `end_date`,
- `project_url`,
- `code_url`.

Vous pouvez vous inspirer de l’ancien fichier :

```txt
api/add_todo.php
```

Mais attention : ici, vous devez insérer plusieurs champs.

---

## 13. Étape 5 — Créer l’interface du portfolio

Dans votre fichier :

```txt
index.php
```

vous devez créer une page contenant :

- un titre,
- un formulaire d’ajout de projet,
- une zone d’affichage des projets.

Le formulaire doit contenir au minimum :

- un champ pour le titre,
- un champ pour la description,
- un champ pour l’image,
- un champ pour la date de début,
- un champ pour la date de fin,
- un champ pour les technologies,
- un champ pour le lien du projet,
- un champ pour le lien du code.

La page doit aussi contenir une zone dans laquelle JavaScript affichera les projets.

Exemple d’identifiant possible :

```txt
projects-list
```

Vous pouvez utiliser Tailwind pour rendre l’interface plus propre.

---

## 14. Étape 6 — Afficher les projets avec JavaScript

Dans votre fichier :

```txt
js/app.js
```

vous devez créer une fonction permettant de charger les projets.

Cette fonction doit :

1. appeler `api/get_projects.php` avec `fetch()`,
2. récupérer la réponse JSON,
3. vider la zone d’affichage,
4. parcourir les projets reçus,
5. créer une carte HTML pour chaque projet,
6. afficher l’image, le titre, la description, les dates et les technologies.

Vous pouvez vous inspirer de la fonction qui affichait les tâches dans le TP précédent.

Mais au lieu de créer une simple balise `li`, vous devez créer une carte de projet plus complète.

---

## 15. Étape 7 — Ajouter un projet avec JavaScript

Vous devez intercepter l’envoi du formulaire avec JavaScript.

Au moment de l’envoi :

1. empêcher le rechargement de la page,
2. récupérer les valeurs des champs,
3. vérifier que les champs obligatoires sont remplis,
4. envoyer les données à `api/add_project.php` avec `fetch()` en `POST`,
5. envoyer les données au format JSON,
6. récupérer la réponse de PHP,
7. vider le formulaire si l’ajout a réussi,
8. recharger la liste des projets.

Vous pouvez vous inspirer du formulaire de la Todo List.

Mais ici, vous devez envoyer plusieurs données au lieu d’un simple titre.

---

## 16. Résultat attendu

À la fin du TP, votre page doit permettre :

- d’afficher les projets déjà présents en base,
- d’ajouter un nouveau projet,
- de voir le nouveau projet apparaître dans la page,
- de conserver les projets après rechargement de la page,
- d’avoir une interface propre avec Tailwind.

---

## 17. Exemple de carte attendue

Chaque projet affiché dans la page doit ressembler à une carte.

La carte peut contenir :

- l’image du projet,
- le titre du projet,
- la description,
- les dates,
- les technologies utilisées,
- un bouton vers le projet si le lien existe,
- un bouton vers le code si le lien existe.

Vous êtes libres sur le design.

L’important est que les données viennent bien de la base de données.

---

## 18. Contraintes techniques

Vous devez respecter les contraintes suivantes :

- utiliser `fetch()` côté JavaScript,
- utiliser PHP pour communiquer avec MySQL,
- utiliser PDO pour les requêtes SQL,
- utiliser du JSON pour les échanges entre JavaScript et PHP,
- utiliser une requête `GET` pour récupérer les projets,
- utiliser une requête `POST` pour ajouter un projet,
- utiliser des requêtes préparées pour l’insertion,
- ne pas écrire les projets directement dans le HTML.

---

## 19. Questions à se poser avant de coder

Avant de commencer, répondez à ces questions :

1. Quel fichier doit récupérer les projets ?
2. Quel fichier doit ajouter un projet ?
3. Quelle table SQL doit être utilisée ?
4. Quels champs doivent être envoyés depuis le formulaire ?
5. Quels champs sont obligatoires ?
6. Comment JavaScript transforme-t-il les données en JSON ?
7. Comment PHP lit-il les données envoyées par JavaScript ?
8. Comment PHP renvoie-t-il une réponse JSON ?
9. Comment JavaScript crée-t-il une carte HTML ?
10. Que faut-il modifier par rapport à la Todo List ?

---

## 20. Aide méthodologique

Vous pouvez partir de votre ancien TP sur la Todo List.

Voici les éléments à adapter :

```txt
todo_db        -> portfolio_db
todos          -> projects
get_todos.php  -> get_projects.php
add_todo.php   -> add_project.php
todo-list      -> projects-list
todo-form      -> project-form
todo-input     -> plusieurs champs de formulaire
```

Attention : il ne suffit pas de changer les noms.

Il faut aussi adapter :

- les colonnes SQL,
- les données envoyées en JSON,
- les données insérées en base,
- l’affichage HTML généré par JavaScript.

---

## 21. Vérifications à faire

Vous devez vérifier les points suivants.

### Vérification de la base

- La base `portfolio_db` existe.
- La table `projects` existe.
- Les projets d’exemple sont présents.

### Vérification de l’API de récupération

Quand vous appelez le fichier :

```txt
api/get_projects.php
```

vous devez obtenir une réponse JSON contenant les projets.

### Vérification de l’ajout

Quand vous ajoutez un projet avec le formulaire :

- le projet doit être enregistré en base,
- il doit apparaître dans la page,
- il doit encore être présent après rechargement.

### Vérification de l’affichage

Chaque projet doit afficher au minimum :

- son image,
- son titre,
- sa description,
- ses technologies.

---

## 22. Améliorations possibles

Si vous avez terminé le travail principal, vous pouvez ajouter des améliorations.

### Amélioration 1 — Message de succès ou d’erreur

Afficher un message quand :

- un projet est bien ajouté,
- un champ obligatoire est vide,
- une erreur se produit.

### Amélioration 2 — Gestion des projets en cours

Si la date de fin est vide, afficher :

```txt
Projet en cours
```

au lieu d’une date vide.

### Amélioration 3 — Filtrer par technologie

Ajouter un champ permettant de filtrer les projets selon une technologie.

Exemples :

- HTML,
- CSS,
- JavaScript,
- PHP,
- MySQL.

### Amélioration 4 — Trier les projets

Ajouter un tri :

- du plus récent au plus ancien,
- du plus ancien au plus récent,
- par titre.

### Amélioration 5 — Supprimer un projet

Ajouter un bouton de suppression sur chaque carte.

Il faudra alors créer un nouveau fichier PHP, par exemple :

```txt
api/delete_project.php
```

Cette amélioration est facultative.

---

## 23. Travail à rendre

Vous devez rendre un dossier contenant :

```txt
portfolio-dynamique/
├── index.php
├── js/
│   └── app.js
├── api/
│   ├── db.php
│   ├── get_projects.php
│   └── add_project.php
└── sql/
    └── portfolio.sql
```

Votre application doit fonctionner localement avec MySQL.

---

## 24. Critères de réussite

Le TP est réussi si :

- la base de données est correctement créée,
- les projets sont récupérés depuis MySQL,
- les projets sont affichés dynamiquement avec JavaScript,
- le formulaire permet d’ajouter un projet,
- les données sont envoyées avec `fetch()`,
- PHP renvoie des réponses JSON,
- l’interface est claire et lisible.

---

## 25. Évaluation de compréhension

Une partie de la note portera sur votre compréhension du fonctionnement général.

Vous devez être capable d’expliquer :

- le rôle du HTML dans l’application,
- le rôle du JavaScript,
- le rôle de `fetch()`,
- le rôle des fichiers PHP,
- le rôle de la base de données,
- la différence entre une requête `GET` et une requête `POST`,
- pourquoi on utilise le format JSON,
- pourquoi on utilise une requête préparée avec PDO,
- comment les projets sont récupérés puis affichés dans la page,
- ce qui a été modifié par rapport à la Todo List.

Cette évaluation pourra prendre la forme :

- de questions écrites,
- d’une courte explication orale,
- ou de commentaires demandés sur certaines parties du code.

---

## 26. Barème de notation

Le TP est noté sur **20 points**.

### 1. Base de données et script SQL — 3 points

- Base `portfolio_db` correctement créée : **0,5 point**
- Table `projects` correctement créée : **1 point**
- Colonnes adaptées aux projets : **1 point**
- Données d’exemple correctement insérées : **0,5 point**

### 2. Connexion PHP et récupération des projets — 3 points

- Fichier `db.php` fonctionnel : **1 point**
- Connexion PDO correcte : **0,75 point**
- Fichier `get_projects.php` fonctionnel : **0,75 point**
- Réponse renvoyée au format JSON : **0,5 point**

### 3. Ajout d’un projet avec PHP — 3 points

- Lecture correcte des données envoyées en JSON : **0,75 point**
- Vérification des champs obligatoires : **0,75 point**
- Insertion correcte dans la table `projects` : **1 point**
- Réponse JSON claire après l’ajout : **0,5 point**

### 4. JavaScript et utilisation de `fetch()` — 4 points

- Récupération des projets avec `fetch()` : **1 point**
- Affichage dynamique des projets dans la page : **1 point**
- Envoi du formulaire avec `fetch()` en `POST` : **1 point**
- Rechargement correct de la liste après ajout : **1 point**

### 5. Interface et affichage du portfolio — 2 points

- Formulaire complet et clair : **0,75 point**
- Cartes de projets lisibles : **0,75 point**
- Utilisation correcte de Tailwind ou d’un CSS propre : **0,5 point**

### 6. Qualité du code — 2 points

- Code bien organisé dans les bons fichiers : **0,75 point**
- Noms de variables compréhensibles : **0,5 point**
- Code lisible et indenté : **0,5 point**
- Absence de code inutile ou de répétitions excessives : **0,25 point**

### 7. Évaluation de compréhension — 3 points

- Explication correcte du chemin complet d’une requête : **1 point**
- Compréhension du rôle de `GET`, `POST` et JSON : **0,75 point**
- Compréhension du rôle de PHP entre JavaScript et MySQL : **0,75 point**
- Capacité à expliquer les différences avec la Todo List : **0,5 point**

---

## 27. Conclusion

Ce TP reprend la logique de la Todo List, mais dans un contexte plus réaliste : un portfolio dynamique.

L’objectif n’est plus seulement d’ajouter une tâche simple, mais de gérer des données plus complètes.

Vous devez retenir l’idée suivante :

- les projets sont stockés dans MySQL,
- PHP sert d’intermédiaire entre JavaScript et la base,
- JavaScript utilise `fetch()` pour récupérer ou envoyer les données,
- la page affiche les projets dynamiquement sans les écrire directement dans le HTML.

Cette méthode permet de rendre un portfolio plus flexible, plus propre et plus facile à faire évoluer.
