---
layout: "layouts/Layout.astro"
title: "PHP et MySQL : PDO et requêtes préparées"
---

## PHP, MySQL et les requêtes préparées

Au S2, l’API PHP séparait déjà requête HTTP, validation, accès SQL et réponse JSON. Ce support consolide l’accès relationnel avec PDO. Le serveur exécute PHP et dialogue avec MySQL ; le navigateur reçoit une sortie HTML ou JSON et ne doit jamais recevoir les identifiants SQL.

## Schéma et données de départ

Exécutez ce SQL dans une base de test nommée `mmi`, avec votre outil MySQL. Le nom et le type des colonnes définissent ce qu’une ligne représente ; la clé primaire identifie durablement la ligne.

```sql
CREATE TABLE projets (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(120) NOT NULL,
  publie BOOLEAN NOT NULL DEFAULT FALSE
);
INSERT INTO projets (titre, publie) VALUES ('Affiche', TRUE), ('Vidéo', FALSE);
SELECT id, titre, publie FROM projets ORDER BY id;
```

**Résultat attendu sur cette table neuve :** deux lignes, `(1, Affiche, 1)` et `(2, Vidéo, 0)`. Dans MySQL, `BOOLEAN` est un alias d’un type entier ; normalisez le champ en booléen si votre contrat JSON l’exige. `NOT NULL` interdit l’absence SQL, mais pas une chaîne vide.

## Connexion PDO

Dans `db.php`, utilisez la configuration de votre serveur local. L’extension PHP `pdo_mysql` doit être activée et la base doit exister.

```php
<?php
$pdo = new PDO(
    'mysql:host=127.0.0.1;dbname=mmi;charset=utf8mb4',
    getenv('DB_USER'),
    getenv('DB_PASSWORD'),
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
     PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
     PDO::ATTR_EMULATE_PREPARES => false]
);
```

Une connexion réussie n’affiche rien. Une exception signale un échec à gérer ; vérifiez le service SQL, l’hôte, le nom de base et les droits du compte. Conservez les détails techniques dans les journaux serveur, puis fournissez au client un message adapté. `mysqli` est une autre API PHP dédiée à MySQL, avec une syntaxe différente ; PDO reste ici l’API commune aux exemples pour ne pas mélanger les interfaces.

## SELECT : lire des lignes

Dans `liste.php`, après la connexion :

```php
<?php
require __DIR__ . '/db.php';
$stmt = $pdo->prepare('SELECT id, titre FROM projets WHERE publie = :publie ORDER BY id');
$stmt->execute(['publie' => 1]);
$projets = $stmt->fetchAll();
header('Content-Type: application/json; charset=utf-8');
echo json_encode($projets, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
```

**Sortie attendue :** un tableau JSON contenant l’identifiant et le titre `Affiche`. Le type numérique d’une valeur issue du pilote doit être vérifié ou converti explicitement selon le contrat. Aucun projet publié donne `[]`, pas une erreur. `fetch` lit une ligne, `fetchAll` les regroupe ; ces appels ne déclenchent pas une nouvelle requête.

## INSERT : séparer les valeurs du SQL

```php
<?php
require __DIR__ . '/db.php';
$titre = "L'atelier photo"; // Valeur de démonstration déjà connue.
$stmt = $pdo->prepare('INSERT INTO projets (titre) VALUES (:titre)');
$stmt->execute(['titre' => $titre]);
echo (int) $pdo->lastInsertId();
```

Sur la table de départ sans autre insertion, la sortie vaut `3`. L’apostrophe reste une donnée. Un paramètre représente une valeur, pas un nom de table ni une colonne ; pour un tri choisi par l’utilisateur, sélectionnez le nom SQL dans une liste autorisée. Une requête préparée ne remplace pas les validations de type, longueur et droits d’accès.

## UPDATE et DELETE : cibler l’identité

```sql
UPDATE projets SET publie = TRUE WHERE id = 2;
DELETE FROM projets WHERE id = 3;
SELECT id, titre, publie FROM projets ORDER BY id;
```

Après ces opérations sur l’état précédent, il reste Affiche et Vidéo, toutes deux publiées. Sans `WHERE`, l’opération affecterait toutes les lignes. Dans PHP, préparez aussi ces écritures avec des paramètres. Une absence de ligne modifiée peut signifier une valeur déjà identique : elle ne prouve pas toujours que l’identifiant n’existe pas.

## Transactions et affichage HTML

Une transaction regroupe plusieurs écritures qui doivent réussir ensemble : `beginTransaction`, les requêtes, puis `commit`. En cas d’exception, `rollBack` annule la transaction active. Avec MySQL, utilisez un moteur transactionnel tel qu’InnoDB ; les opérations de structure peuvent avoir des règles de validation implicite différentes.

Pour afficher un titre dans du HTML, utilisez `htmlspecialchars($titre, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')`. Cela protège ce contexte d’affichage, pas une requête SQL. Pour JSON, utilisez `json_encode`. Les [requêtes préparées — manuel PHP](https://www.php.net/manual/en/pdo.prepared-statements.php) expliquent cette séparation entre structure SQL et valeurs.
