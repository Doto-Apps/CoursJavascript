---
layout: "layouts/Layout.astro"
title: "Base de l'algorithmique à partir de PHP"
type: "TD"
---

## Introduction

Dans ce TD, nous allons explorer les bases de l'algorithmique en utilisant PHP. Vous apprendrez à utiliser des variables, des tableaux, et des structures conditionnelles pour écrire des scripts PHP plus complexes.

### Variables en PHP

Les variables sont utilisées pour stocker des données. En PHP, vous pouvez créer une variable en utilisant le signe `$`.

#### Exemple de variables

```php
<?php
  $nom = "Alice";
  $age = 30;
  $estEtudiant = false;

  echo "Nom: $nom, Âge: $age, Est étudiant: " . ($estEtudiant ? 'Oui' : 'Non');
?>
```

### Explications

- `$nom`, `$age`, `$estEtudiant` : Ce sont des variables qui stockent des valeurs.
- `echo` : Cette fonction affiche le contenu des variables à l'écran.
- `.` : L'opérateur de concaténation joint des chaînes de caractères.
- `($estEtudiant ? 'Oui' : 'Non')` : Ceci est un opérateur ternaire qui vérifie si `$estEtudiant` est vrai ou faux et affiche "Oui" ou "Non" en conséquence.

### Tableaux en PHP

Les tableaux sont des structures de données qui permettent de stocker plusieurs valeurs dans une seule variable.

#### Tableaux indexés

```php
<?php
  $fruits = array("Pomme", "Banane", "Orange");
  echo $fruits[1]; // Affiche "Banane"
?>
```

### Explications

- `$fruits` : C'est un tableau indexé qui contient trois valeurs.
- `array("Pomme", "Banane", "Orange")` : Utilisé pour créer un tableau avec des valeurs.
- `$fruits[1]` : Accède à l'élément à l'index 1 du tableau, qui est "Banane".

#### Tableaux associatifs

```php
<?php
  $personne = array("nom" => "Alice", "age" => 30, "ville" => "Paris");
  echo $personne["ville"]; // Affiche "Paris"
?>
```

### Explications

- `$personne` : C'est un tableau associatif avec des clés et des valeurs.
- `array("nom" => "Alice", "age" => 30, "ville" => "Paris")` : Utilisé pour créer un tableau associatif.
- `$personne["ville"]` : Accède à la valeur associée à la clé "ville", qui est "Paris".

### Structures conditionnelles

Les structures conditionnelles permettent d'exécuter du code de manière conditionnelle.

#### Exemple de condition if

```php
<?php
  $age = 20;

  if ($age >= 18) {
    echo "Vous êtes majeur.";
  } else {
    echo "Vous êtes mineur.";
  }
?>
```

### Explications

- `if` : Utilisé pour vérifier une condition.
- `$age >= 18` : Condition qui vérifie si l'âge est supérieur ou égal à 18.
- `else` : Bloc de code qui s'exécute si la condition `if` est fausse.

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

### Explications

- `switch` : Structure conditionnelle utilisée pour exécuter différents blocs de code basés sur la valeur d'une variable.
- `case "rouge":` : Bloc de code exécuté si la variable `$couleur` est égale à "rouge".
- `default` : Bloc de code exécuté si aucune des valeurs `case` ne correspond.

### Boucles en PHP

Les boucles permettent de répéter du code plusieurs fois.

#### Boucle for

```php
<?php
  for ($i = 0; $i < 5; $i++) {
    echo "Nombre: $i<br>";
  }
?>
```

### Explications

- `for` : Utilisé pour créer une boucle qui s'exécute un nombre spécifique de fois.
- `$i = 0; $i < 5; $i++` : Initialisation de la boucle avec `$i` commençant à 0, se terminant à moins de 5, et s'incrémentant de 1 à chaque itération.
- `echo "Nombre: $i<br>";` : Affiche la valeur de `$i` à chaque itération de la boucle.

#### Boucle while

```php
<?php
  $i = 0;

  while ($i < 5) {
    echo "Nombre: $i<br>";
    $i++;
  }
?>
```

### Explications

- `while` : Utilisé pour créer une boucle qui s'exécute tant qu'une condition est vraie.
- `$i < 5` : Condition qui doit être vraie pour que la boucle continue de s'exécuter.
- `$i++` : Incrémente la variable `$i` de 1 à chaque itération.

### Boucle foreach

La boucle `foreach` est utilisée pour itérer sur les éléments d'un tableau.

#### Exemple de boucle foreach

```php
<?php
  $fruits = array("Pomme", "Banane", "Orange");

  foreach ($fruits as $fruit) {
    echo "Fruit: $fruit<br>";
  }
?>
```

### Explications

- `foreach` : Utilisé pour itérer sur chaque élément d'un tableau.
- `$fruits as $fruit` : À chaque itération, `$fruit` prend la valeur de l'élément courant du tableau `$fruits`.

### Fonctions en PHP

Les fonctions permettent de regrouper du code réutilisable.

#### Exemple de fonction

```php
<?php
  function saluer($nom) {
    return "Bonjour, $nom!";
  }

  echo saluer("Alice");
?>
```

### Explications

- `function` : Mot-clé utilisé pour définir une fonction en PHP.
- `saluer($nom)` : Déclare une fonction nommée `saluer` qui prend un argument `$nom`.
- `return "Bonjour, $nom!";` : La fonction retourne une chaîne de caractères "Bonjour, $nom!".

## Exercices pratiques

### Exercice 1 : Afficher des informations sur une personne

Créez un script PHP qui définit des variables pour le nom, l'âge et la ville d'une personne, puis affiche ces informations.

```php
<?php
  $nom = "Marie";
  $age = 28;
  $ville = "Lyon";

  echo "Nom: $nom<br>";
  echo "Âge: $age<br>";
  echo "Ville: $ville<br>";
?>
```

### Explications

- Créez trois variables `$nom`, `$age`, et `$ville`.
- Utilisez `echo` pour afficher les valeurs de ces variables avec des sauts de ligne `<br>`.

### Exercice 2 : Calculer la somme des éléments d'un tableau

Créez un script PHP qui définit un tableau de nombres et calcule la somme des éléments du tableau.

```php
<?php
  $nombres = array(1, 2, 3, 4, 5);
  $somme = 0;

  foreach ($nombres as $nombre) {
    $somme += $nombre;
  }

  echo "La somme des nombres est: $somme";
?>
```

### Explications

- Créez un tableau `$nombres` avec plusieurs valeurs numériques.
- Initialisez une variable `$somme` à 0.
- Utilisez une boucle `foreach` pour ajouter chaque valeur du tableau à `$somme`.
- Affichez la somme totale avec `echo`.

### Exercice 3 : Vérifier l'âge pour voter

Créez un script PHP qui demande l'âge d'une personne et affiche un message indiquant si cette personne est en âge de voter (18 ans et plus).

```php
<?php
  $age = 16;

  if ($age >= 18) {
    echo "Vous pouvez voter.";
  } else {
    echo "Vous ne pouvez pas voter.";
  }
?>
```

### Explications

- Définissez une variable `$age`.
- Utilisez une structure conditionnelle `if` pour vérifier si l'âge est supérieur ou égal à 18.
- Affichez un message différent selon que la personne peut ou non voter.

### Exercice 4 : Afficher une table de multiplication

Créez un script PHP qui affiche la table de multiplication de 1 à 10 pour un nombre donné.

```php
<?php
  $nombre = 3;

  for ($i = 1; $i <= 10; $i++) {
    echo "$nombre x $i = " . ($nombre * $i) . "<br>";
  }
?>
```

### Explications

- Définissez une variable `$nombre` pour le nombre dont vous voulez afficher la table de multiplication.
- Utilisez une boucle `for` pour multiplier `$nombre` par chaque nombre de 1 à 10.
- Affichez le résultat de chaque multiplication avec `echo`.

### Exercice 5 : Afficher les jours de la semaine

Créez un script PHP qui utilise un tableau associatif pour afficher les jours de la semaine en français.

```php
<?php
  $jours = array(
    "Lundi" => "Monday",
    "Mardi" => "Tuesday",
    "Mercredi" => "Wednesday",
    "Jeudi" => "Thursday",
    "Vendredi" => "Friday",
    "Samedi" => "Saturday",
    "Dimanche" => "Sunday"
  );

  foreach ($jours as $francais => $anglais) {
    echo "$francais en anglais est $anglais<br>";
  }
?>
```

### Explications

- Créez un tableau associatif `$jours` où les clés sont les jours en français et les valeurs sont les jours en anglais.
- Utilisez une boucle `foreach` pour itérer sur chaque paire clé-valeur.
- Affichez chaque jour en français et sa traduction en anglais avec `echo`.

## Conclusion

Dans ce TD, nous avons exploré les bases de l'algorithmique avec PHP, y compris les variables, les tableaux, les structures conditionnelles et les boucles. Ces concepts sont essentiels pour écrire des scripts PHP efficaces et fonctionnels. Pratiquez en écrivant vos propres scripts pour renforcer vos compétences.

---
