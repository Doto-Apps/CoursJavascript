---
layout: "layouts/Layout.astro"
title: "Introduction au langage PHP et à un environnement de développement"
type: "TP"
---

#### Objectifs du TD

- Comprendre les bases du langage PHP
- Installer et configurer un environnement de développement PHP
- Écrire et exécuter des scripts PHP simples

## Introduction au langage PHP

PHP (Hypertext Preprocessor) est un langage de script côté serveur largement utilisé pour le développement web. Il permet de créer des pages web dynamiques et interactives. PHP est intégré au code HTML et est exécuté sur le serveur, ce qui envoie du HTML pur au navigateur du client.

### Structure de base d'un script PHP

Un script PHP est enveloppé dans des balises PHP :

```php
<?php
  // Code PHP ici
?>
```

Les balises PHP permettent d'insérer du code PHP dans des documents HTML. Elles sont nécessaires pour indiquer au serveur où commence et où se termine le code PHP.

### Exemple simple

```php
<?php
  echo "Bonjour, monde!";
?>
```

Ce script PHP affiche "Bonjour, monde!" lorsque la page est chargée.

## Installation d'un environnement de développement PHP

Pour développer en PHP, vous avez besoin d'un serveur web avec PHP installé. XAMPP est un environnement de développement populaire qui inclut Apache (serveur web), MySQL (base de données), et PHP.

### Étapes d'installation de XAMPP

1. **Téléchargement** : Téléchargez XAMPP depuis le site officiel [Apache Friends](https://www.apachefriends.org/index.html).
2. **Installation** : Suivez les instructions d'installation pour votre système d'exploitation. Acceptez les paramètres par défaut pour une installation standard.
3. **Lancement** : Une fois installé, lancez le panneau de contrôle XAMPP et démarrez Apache et MySQL en cliquant sur les boutons "Start" à côté de chaque service.

### Premier script PHP

Créez un fichier nommé `index.php` dans le dossier `htdocs` de votre installation XAMPP. Ce dossier est généralement situé dans `C:xampphtdocs` sous Windows ou `/Applications/XAMPP/htdocs` sous macOS.

```php
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Premier Script PHP</title>
</head>
<body>
  <h1><?php echo 'Bonjour, monde!'; ?></h1>
</body>
</html>
```

Ouvrez votre navigateur et accédez à `http://localhost/index.php` pour voir le résultat.

### Explications

- `<?php echo 'Bonjour, monde!'; ?>` : Cette ligne de code PHP affiche le texte "Bonjour, monde!" dans la page HTML. La fonction `echo` en PHP est utilisée pour envoyer une sortie au navigateur.

### Variables et Types de Données en PHP

Les variables en PHP commencent par le signe `$`. Elles peuvent contenir différents types de données : chaînes de caractères, entiers, flottants, tableaux, etc.

#### Exemple de variables

```php
<?php
  $nom = "Jean";
  $age = 25;
  $estEtudiant = true;

  echo "Nom: $nom, Âge: $age, Est étudiant: " . ($estEtudiant ? 'Oui' : 'Non');
?>
```

- `$nom`, `$age`, `$estEtudiant` : Déclaration de variables en PHP.
- `.` : Opérateur de concaténation utilisé pour joindre des chaînes de caractères.
- `($estEtudiant ? 'Oui' : 'Non')` : Opérateur ternaire utilisé pour afficher "Oui" si `$estEtudiant` est vrai, sinon "Non".

### Les types de données

Les types de données en PHP incluent :

- **Chaînes de caractères** (string) : Texte, par exemple `"Bonjour"`.
- **Entiers** (integer) : Nombres entiers, par exemple `42`.
- **Flottants** (float) : Nombres à virgule flottante, par exemple `3.14`.
- **Booléens** (boolean) : Vrai ou faux (`true` ou `false`).

#### Exemple avec différents types de données

```php
<?php
  $chaine = "Bonjour";
  $entier = 42;
  $flottant = 3.14;
  $booleen = true;

  echo "Chaîne: $chaine, Entier: $entier, Flottant: $flottant, Booléen: " . ($booleen ? 'Vrai' : 'Faux');
?>
```

### Conditions en PHP

Les conditions permettent d'exécuter du code de manière conditionnelle.

#### Exemple de condition if

```php
<?php
  $heure = date("H");

  if ($heure < 12) {
    echo "Bonjour!";
  } else {
    echo "Bon après-midi!";
  }
?>
```

- `date("H")` : Fonction PHP qui retourne l'heure actuelle au format 24 heures.
- `if`, `else` : Structures conditionnelles en PHP pour exécuter du code en fonction de la condition.

#### Exemple de condition switch

```php
<?php
  $couleur = "rouge";

  switch ($couleur) {
    case "rouge":
      echo "La couleur est rouge.";
      break;
    case "bleu":
      echo "La couleur est bleue.";
      break;
    default:
      echo "Couleur inconnue.";
      break;
  }
?>
```

- `switch` : Structure conditionnelle en PHP utilisée pour exécuter différents blocs de code en fonction de la valeur d'une variable.

### Boucles en PHP

Les boucles permettent de répéter du code plusieurs fois.

#### Exemple de boucle for

```php
<?php
  for ($i = 0; $i < 5; $i++) {
    echo "Nombre: $i<br>";
  }
?>
```

- `for` : Boucle `for` en PHP utilisée pour répéter une instruction un nombre spécifique de fois.
- `$i++` : Incrémente la variable `$i` de 1 à chaque itération.

#### Exemple de boucle while

```php
<?php
  $i = 0;

  while ($i < 5) {
    echo "Nombre: $i<br>";
    $i++;
  }
?>
```

- `while` : Boucle `while` en PHP utilisée pour répéter une instruction tant qu'une condition est vraie.

### Conclusion

Dans ce TD, nous avons couvert les bases du langage PHP, y compris les variables, les types de données, les structures conditionnelles et les boucles. Vous avez également appris à installer et configurer un environnement de développement PHP avec XAMPP. Ces compétences de base sont essentielles pour commencer à développer des applications web dynamiques en PHP. Pratiquez en écrivant vos propres scripts pour renforcer vos compétences.

---
