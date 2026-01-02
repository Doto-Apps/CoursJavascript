---
layout: "layouts/Layout.astro"
title: "PHP > Connexion à une base de données MySQL"
---

## Introduction à MySQL et PHP

MySQL est un système de gestion de base de données relationnelle très populaire, tandis que PHP est un langage de script côté serveur largement utilisé dans le développement web dynamique. Ensemble, MySQL et PHP offrent une puissante combinaison pour la création d'applications web interactives basées sur des données.

### Récapitulatif sur PHP

PHP (Hypertext Preprocessor) est un langage de script côté serveur conçu pour le développement web. Voici quelques points clés sur PHP :

- **Langage de script côté serveur** : PHP est principalement utilisé pour générer des pages web dynamiques sur des serveurs web.
- **Syntaxe similaire au C et au Perl** : PHP emprunte sa syntaxe à des langages comme le C et le Perl, ce qui le rend familier aux développeurs venant de ces environnements.
- **Intégration HTML** : PHP peut être intégré directement dans du code HTML, ce qui facilite la création de pages web dynamiques.

#### Exemple de code PHP basique :

```php
<?php
echo "Bonjour, monde!";
?>
```

### Récapitulatif sur MySQL

MySQL est un système de gestion de base de données relationnelle open source largement utilisé. Voici quelques points clés sur MySQL :

- **Système de gestion de base de données relationnelle** : MySQL stocke les données dans des tables liées entre elles par des relations.
- **Langage SQL** : MySQL utilise le langage SQL (Structured Query Language) pour interagir avec la base de données. SQL permet de récupérer, d'insérer, de mettre à jour et de supprimer des données.
- **Performant et évolutif** : MySQL est connu pour sa rapidité, sa fiabilité et sa capacité à évoluer pour gérer de grandes quantités de données.

#### Exemple de requête SQL SELECT :

```sql
SELECT id, nom, email FROM utilisateurs WHERE age > 18;
```

## Connexion à la base de données MySQL avec PHP

Pour établir une connexion entre PHP et MySQL, on utilise des extensions spécifiques comme `mysqli` ou `PDO` (PHP Data Objects). Ces extensions fournissent des interfaces pour interagir avec la base de données MySQL.

### Connexion avec mysqli

La méthode la plus courante pour se connecter à une base de données MySQL est d'utiliser l'extension `mysqli`.

#### Exemple de connexion avec mysqli :

```php
<?php
$servername = "localhost"; // Nom du serveur MySQL
$username = "nom_utilisateur"; // Nom d'utilisateur MySQL
$password = "mot_de_passe"; // Mot de passe MySQL
$database = "nom_base_de_données"; // Nom de la base de données MySQL

// Créer une connexion avec mysqli
$conn = new mysqli($servername, $username, $password, $database);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Échec de la connexion : " . $conn->connect_error);
} else {
    echo "Connexion réussie !";
}

// Fermer la connexion
$conn->close();
?>
```

### Connexion avec PDO

Une autre méthode populaire pour se connecter à une base de données MySQL est d'utiliser l'extension PDO (PHP Data Objects).

#### Exemple de connexion avec PDO :

```php
<?php
$servername = "localhost"; // Nom du serveur MySQL
$username = "nom_utilisateur"; // Nom d'utilisateur MySQL
$password = "mot_de_passe"; // Mot de passe MySQL
$database = "nom_base_de_données"; // Nom de la base de données MySQL

try {
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    // Définir le mode d'erreur PDO sur Exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connexion réussie !";
} catch(PDOException $e) {
    echo "Échec de la connexion : " . $e->getMessage();
}
$conn = null;
?>
```

## Exécution de requêtes SQL avec PHP

Une fois connecté à la base de données MySQL, vous pouvez exécuter des requêtes SQL pour interagir avec les données. Les requêtes SQL peuvent être utilisées pour lire, insérer, mettre à jour ou supprimer des données dans la base de données.

### Exemple de requête SELECT

Une requête SELECT est utilisée pour récupérer des données de la base de données.

```php
$sql = "SELECT id, nom, email FROM utilisateurs";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "ID: " . $row["id"]. " - Nom: " . $row["nom"]. " - Email: " . $row["email"]. "<br>";
    }
} else {
    echo "0 résultats";
}
```

## Insertion de données dans une table MySQL

L'insertion de données dans une table MySQL se fait à l'aide de requêtes SQL INSERT. Ces requêtes permettent d'ajouter de nouvelles lignes de données à une table spécifiée.

### Syntaxe de la requête INSERT

La syntaxe générale de la requête INSERT est la suivante :

```sql
INSERT INTO nom_table (colonne1, colonne2, ...) VALUES (valeur1, valeur2, ...);
```

- `nom_table` : le nom de la table dans laquelle les données seront insérées.
- `(colonne1, colonne2, ...)` : la liste des colonnes dans lesquelles les valeurs seront insérées.
- `VALUES` : mot-clé indiquant que les valeurs des colonnes vont suivre.
- `(valeur1, valeur2, ...)` : les valeurs à insérer dans les colonnes correspondantes.

### Exemple de requête INSERT

Considérons une table `utilisateurs` avec les colonnes `nom`, `email` et `age`. Voici comment insérer une nouvelle ligne dans cette table :

```sql
INSERT INTO utilisateurs (nom, email, age) VALUES ('John Doe', 'john@example.com', 30);
```

Dans cet exemple, une nouvelle ligne est insérée dans la table `utilisateurs`. Les valeurs `'John Doe'`, `'john@example.com'` et `30` sont insérées dans les colonnes `nom`, `email` et `age`, respectivement.

### Exemple de code PHP pour l'exécution d'une requête INSERT

Voici comment exécuter une requête INSERT en utilisant PHP avec MySQLi :

```php
<?php
$servername = "localhost";
$username = "nom_utilisateur";
$password = "mot_de_passe";
$database = "nom_base_de_données";

// Créer une connexion
$conn = new mysqli($servername, $username, $password, $database);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Échec de la connexion : " . $conn->connect_error);
}

// Requête INSERT
$sql = "INSERT INTO utilisateurs (nom, email, age) VALUES ('John Doe', 'john@example.com', 30)";

if ($conn->query($sql) === TRUE) {
    echo "Nouvel enregistrement créé avec succès";
} else {
    echo "Erreur lors de l'insertion : " . $conn->error;
}

// Fermer la connexion
$conn->close();
?>
```

Dans cet exemple PHP, une connexion à la base de données est d'abord établie. Ensuite, une requête INSERT est exécutée pour ajouter une nouvelle ligne à la table `utilisateurs`. Enfin, la connexion est fermée.

Les requêtes INSERT sont essentielles pour ajouter de nouvelles données à une base de données MySQL, et elles sont couramment utilisées dans le développement web pour la gestion des données utilisateur, des publications, etc.
