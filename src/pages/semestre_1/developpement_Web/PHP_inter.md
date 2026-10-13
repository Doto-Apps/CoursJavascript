---
layout: "layouts/Layout.astro"
title: "Algorithmique PHP : données, décisions et traces"
type: "TD"
order: 2
quizId: "s1-dev-01"
previousSession: "/semestre_1/developpement_Web/util_dev_tool"
nextSession: "/semestre_1/developpement_Web/PHP_begin"
---

<a id="comprendre"></a>

## Variables, valeurs et instructions PHP

« Calculer le prix de trois billets et appliquer une réduction » doit devenir une suite de décisions explicites : lire la quantité, calculer le total initial, décider si la réduction s’applique, calculer le total final puis l’afficher. Une **entrée** est une donnée utilisée par le programme ; le **traitement** transforme ces données ; la **sortie** est le résultat produit.

| Élément PHP | Syntaxe | Rôle et vigilance |
|---|---|---|
| Affectation | `$prix = 12;` | Stocker une valeur dans une variable ; `=` n’est pas une comparaison. |
| Chaîne | `$nom = 'Léa';` | Représenter du texte, avec des guillemets. |
| Booléen | `$ouvert = true;` | Représenter une condition vraie ou fausse, sans guillemets. |
| Concaténation | `$nom . ' : ' . $prix` | Assembler du texte et des valeurs pour l’affichage. |
| Comparaison stricte | `$age === 18` | Comparer la valeur et le type. |
| Condition | `if (...) { ... } else { ... }` | Exécuter une branche selon un résultat booléen. |

Une **expression** est un calcul qui produit une valeur. Une **instruction** réalise une étape, souvent terminée par `;`. `$total = $prix * $quantite;` calcule une expression puis affecte son résultat. Les accolades délimitent les instructions d’une branche ; l’indentation rend cette structure lisible, mais ne remplace pas les accolades.

## Comparaisons et conditions PHP

```php
<?php
$total = 30;
$reduction = 0;
if ($total >= 30) {
    $reduction = 5;
}
echo $total - $reduction;
```

**Sortie attendue :** `25`. La réduction commence à zéro ; elle change seulement si le seuil est atteint. Avec 29, la sortie serait 29. Utiliser `>` au lieu de `>=` exclurait le cas exactement égal à 30. Une comparaison fournit un booléen, pas directement le montant d’une réduction.

`&&` demande que deux conditions soient vraies ; `||` demande qu’au moins l’une soit vraie. Écrivez d’abord les conditions séparément et testez chaque cas. Pour « quantité valide entre 1 et 12 », il faut une borne basse **et** une borne haute, pas une seule comparaison.

## Clés et valeurs des tableaux PHP

Dans `['web', 'image', 'son']`, l’indice 0 désigne la première valeur. Dans `['nom' => 'Léa']`, la clé textuelle `nom` désigne la valeur `Léa`. La clé sert à retrouver la donnée ; elle n’est pas la donnée elle-même. Avant un accès, vérifiez quelles clés existent. La séance de parcours ajoutera les boucles : une collection n’oblige pas à écrire une ligne d’affichage par élément.

## L’exécution des instructions PHP

Un programme n’interprète pas une intention générale : il applique les instructions dans leur ordre. Une variable donne un nom à une valeur ; une affectation peut remplacer cette valeur. Pour comprendre un calcul, écrivez une trace avant de demander au programme de l’exécuter.

```php
<?php
$quantite = 3;
$prix = 12.5;
$total = $quantite * $prix;
$total = $total - 5;
echo $total;
```

| Après l’instruction | Valeur de `$total` |
|---|---|
| Multiplication | `37.5` |
| Soustraction | `32.5` |

**Sortie attendue :** `32.5`. Le dernier `echo` affiche la valeur courante. Le signe `=` affecte ; `==` compare avec des conversions possibles, et `===` compare également les types. Un entier `5` et une chaîne `'5'` ne sont donc pas identiques au sens strict.

**Erreur à éviter :** lire `=` comme « est égal à » dans un test. Décrivez oralement les opérations : « stocker », « calculer », « comparer », « afficher ». Ces verbes aident à traduire une règle métier en pseudo-code, puis en PHP.

<a id="variables"></a>

## Déclarer et modifier une variable PHP

Une variable PHP commence par `$`. L'affectation `=` stocke une valeur ; elle ne compare pas. Les noms sont sensibles à la casse : `$prix` et `$Prix` sont distincts. Chaque instruction usuelle se termine par `;`. Les chaînes, les entiers, les nombres décimaux et les booléens sont des types différents.

```php
<?php
$nom = 'Léa';       // chaîne
$quantite = 3;      // entier
$prix = 12.5;       // nombre décimal, point dans le code
$disponible = true; // booléen
$total = $quantite * $prix;
echo $nom . ' : ' . $total;
```

**Sortie attendue :** `Léa : 37.5`. Le point `.` concatène des chaînes ; `*` multiplie. `echo` produit une sortie. Une variable déclarée après son utilisation ne fournit pas magiquement une valeur à la ligne précédente.

<a id="operateurs"></a>

## Les opérateurs de calcul et de comparaison

`+`, `-`, `*`, `/` réalisent les calculs usuels ; `%` calcule le reste d'une division entière. Les parenthèses rendent l'ordre d'un calcul explicite. `===` compare la valeur et le type, tandis que `==` autorise des conversions de types. Pour des tests prévisibles, privilégiez une comparaison stricte après avoir obtenu des données du bon type.

```php
var_dump(5 === '5'); // bool(false)
var_dump(5 > 3);     // bool(true)
```

`&&` signifie « et », `||` signifie « ou », `!` inverse un booléen. `>=` inclut l'égalité ; `>` ne l'inclut pas. Ne confondez pas `$age = 18` avec `$age === 18`.

<a id="conditions"></a>

## Les conditions if, elseif et else

```php
$age = 18;
if ($age >= 18) {
    echo 'Accès adulte';
} else {
    echo 'Accès junior';
}
```

Une seule de ces deux branches est exécutée. Avec 18, la sortie est `Accès adulte`. `elseif` permet une condition intermédiaire ; la première branche vraie d'une chaîne if/elseif est retenue. Testez les limites, par exemple 17, 18 et 19, plutôt qu'une seule valeur éloignée du seuil.

<a id="tableaux"></a>

## Tableaux et parcours foreach

```php
$tags = ['web', 'image', 'son'];
$profil = ['nom' => 'Léa', 'age' => 18];
echo $tags[0];          // web
echo $profil['nom'];    // Léa
```

Un tableau indexé commence ici à l'indice 0. Un tableau associatif utilise des clés choisies. `count($tags)` donne le nombre d'éléments, ici 3. Une clé et sa valeur ne sont pas la même chose. Ne lisez pas un indice absent sans décider comment traiter ce cas.

Une trace note l'évolution des variables dans l'ordre des instructions :

```php
$points = 2;
$points = $points + 3;
$points = $points * 2;
echo $points; // 10
```

Sur papier : 2 → 5 → 10. Une trace permet d'expliquer un résultat sans dépendre de l'essai au hasard.

## La sortie d’un calcul PHP

Les expressions PHP ci-dessus sont exécutées avec PHP. Ce modèle visuel utilise JavaScript pour rendre visibles les valeurs intermédiaires : ce n’est pas un interpréteur PHP. Une affectation remplace une valeur ; une condition choisit une branche.

```html live title="Voir les étapes d’un calcul"
<style>
  body {
    margin: 16px;
    font-family: system-ui, sans-serif;
    color: #18324c;
  }
  .cartes {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  article,
  output {
    display: block;
    padding: 16px;
    border: 1px solid #9aaabe;
  }
  button,
  input {
    font: inherit;
    padding: 8px;
  }
  label {
    display: block;
    margin-block: 12px 4px;
  }
  :focus-visible {
    outline: 3px solid #2563eb;
    outline-offset: 3px;
  }
</style>

<h1>Tracer un calcul</h1>
<ol id="trace"></ol>
<script>
  const quantite = 3;
  const prix = 12.5;
  const totalInitial = quantite * prix;
  const total = totalInitial - 5;
  const autorise = total <= 40;
  const etapes = [
    `quantite = ${quantite}`,
    `prix = ${prix}`,
    `total initial = ${totalInitial}`,
    `total = ${total}`,
    `total <= 40 : ${autorise}`,
    autorise ? "Budget respecté" : "Budget dépassé",
  ];
  for (const etape of etapes) {
    const li = document.createElement("li");
    li.textContent = etape;
    document.querySelector("#trace").append(li);
  }
</script>
```

**Résultat à observer :** Comme dans le premier exemple PHP, trois éléments à 12,50 euros donnent 37,50 euros, puis retirer 5 euros produit 32,50 euros. Le modèle ajoute une condition de budget : changez uniquement le prix pour dépasser 40 euros, puis reproduisez cette condition en PHP.
