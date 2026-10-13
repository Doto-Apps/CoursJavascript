---
layout: "layouts/Layout.astro"
title: "TP PHP : parcourir des données et afficher des profils"
type: "TP"
order: 4
quizId: "s1-dev-03"
previousSession: "/semestre_1/developpement_Web/PHP_begin"
nextSession: "/semestre_1/developpement_Web/phpForm"
---

<a id="comprendre"></a>

## Valeur, enregistrement et collection PHP

La collection regroupe plusieurs profils ; chaque profil est un enregistrement ; chaque enregistrement possède des champs comme un nom et un âge. Cette organisation est distincte du HTML utilisé pour la présenter. On peut changer le rendu sans réécrire les données.

```php
<?php
$profils = [
    ['nom' => 'Léa', 'age' => 18],
    ['nom' => 'Sam', 'age' => 19],
];
foreach ($profils as $profil) {
    echo $profil['nom'] . ' : ' . $profil['age'] . "
";
}
```

**Sortie attendue :** `Léa : 18`, puis `Sam : 19`. À chaque tour, `$profil` représente un enregistrement. Ce nom ne désigne pas la collection entière. Ajouter un troisième profil provoque un troisième tour, sans ajouter une instruction d’affichage.

| Syntaxe | Ce qu’elle lit | Confusion à éviter |
|---|---|---|
| `$profils[0]` | Le premier enregistrement. | Ce n’est pas directement le nom du profil. |
| `$profils[0]['nom']` | Son champ `nom`. | Les deux accès concernent deux niveaux. |
| `count($profils)` | Le nombre d’enregistrements. | Ce n’est pas le dernier indice. |
| `foreach ($profils as $profil)` | Chaque enregistrement successif. | Le corps s’exécute une fois par élément. |

## Tableaux associatifs et objets PHP

Un tableau associatif se lit avec des crochets et une clé. Un objet simple possède des propriétés, lues avec `->`. Une classe décrit une structure et des comportements ; un objet est une instance de cette classe. Dans cette séance, un petit objet sert uniquement à reconnaître cette autre notation : il n’est pas nécessaire de construire une architecture orientée objet complète.

## L’échappement HTML à la sortie

Une chaîne peut contenir `<` ou `&`. Dans une page HTML, ces signes peuvent être interprétés comme du balisage. `htmlspecialchars($texte, ENT_QUOTES, 'UTF-8')` transforme les caractères spéciaux pour afficher du texte dans un contexte HTML. Cela ne valide pas une URL, ne protège pas une requête SQL et ne remplace pas la validation des données.

Conservez les données brutes dans la collection ; échappez-les lors de la sortie dans le HTML. Une liste vide reste un cas normal : la boucle ne produit aucun profil et l’interface peut afficher un message explicite.

## Générer des cartes avec foreach

Un tableau représente une collection ; chaque entrée peut être un tableau associatif décrivant un profil. Les index identifient la position dans la collection, les clés identifient les champs dans le profil. Dans `$profils[1]['nom']`, on choisit d’abord le deuxième profil, puis son champ `nom`.

```php
<?php
$profils = [
    ['nom' => 'Léa', 'points' => 12],
    ['nom' => 'Sam', 'points' => 8],
    ['nom' => 'Noa', 'points' => 15],
];
$total = 0;
foreach ($profils as $profil) {
    $total += $profil['points'];
}
echo $total;
```

**Trace avec 12, 8 et 15 points :** le total passe de 0 à 12, puis à 20, puis à 35. L’initialisation se place avant la boucle : la déplacer dans la boucle effacerait les additions précédentes. Pour une collection vide, aucun tour ne se produit et le total reste 0.

**Lecture accompagnée :** `$profils` reste la collection ; `$profil` désigne l’entrée courante. Le HTML d’une carte sera écrit une fois dans le parcours, mais produit plusieurs fois dans la réponse. Ce HTML doit afficher les valeurs comme texte échappé.

**Thèmes possibles :** joueurs et points, musiciens et morceaux, photographes et séries. Les champs et les calculs doivent garder un sens dans le thème choisi ; ne changez pas seulement les couleurs.

<a id="collection"></a>

## Les tableaux imbriqués de profils

```php
$profils = [
    ['nom' => 'Léa', 'points' => 12],
    ['nom' => 'Sam', 'points' => 8],
    ['nom' => 'Noa', 'points' => 15],
];
```

Le tableau extérieur contient trois profils. Chaque profil est un tableau associatif. `$profils[1]['nom']` donne `Sam` ; `count($profils)` donne 3. Ajouter un profil doit produire un affichage supplémentaire sans recopier un bloc HTML entier.

<a id="boucle"></a>

## La boucle foreach

```php
$total = 0;
foreach ($profils as $profil) {
    $total += $profil['points'];
}
echo $total; // 35
```

`foreach` exécute son bloc pour chaque élément ; `$profil` reçoit l'élément courant. `$total += valeur` ajoute cette valeur au total. Initialisez le total avant la boucle : le remettre à zéro à chaque tour détruit l'accumulation. Une collection vide n'effectue aucun tour.

Pour une moyenne, divisez par `count($profils)` seulement si le nombre est supérieur à zéro. Une division par zéro n'est pas une moyenne de zéro. Une boucle `for` possède généralement une initialisation, une condition et une mise à jour ; avec des indices, le dernier indice est ici 2, pas 3.

<a id="objet"></a>

## Les propriétés d’un objet PHP

```php
class Profil {
    public string $nom;
    public int $points;
    public function __construct(string $nom, int $points) {
        $this->nom = $nom;
        $this->points = $points;
    }
}
$lea = new Profil('Léa', 12);
echo $lea->nom; // Léa
```

Une classe décrit un type d'objet ; `new` crée une instance. `->` accède à une propriété d'objet ; `['nom']` accède à une entrée de tableau associatif. `$this` désigne l'instance courante dans ses méthodes. L'objectif est de reconnaître ces deux représentations, pas de réécrire tout l'exercice en architecture complexe.

<a id="affichage"></a>

## echo et htmlspecialchars

```php
<ul>
<?php foreach ($profils as $profil): ?>
  <li><?= htmlspecialchars($profil['nom'], ENT_QUOTES, 'UTF-8') ?> :
      <?= $profil['points'] ?> points</li>
<?php endforeach; ?>
</ul>
```

`<?= ... ?>` affiche une expression. `htmlspecialchars` transforme les caractères sensibles en entités HTML lors de l'affichage : un nom contenant `<b>` doit apparaître comme texte, pas créer du balisage. PHP génère le HTML côté serveur ; le navigateur ne parcourt pas votre tableau PHP lui-même.

## Le HTML produit par la boucle

En PHP, foreach parcourt la collection avant l’envoi de la réponse HTML. Ici, un tableau JavaScript illustre la même transformation dans le navigateur. Les syntaxes sont différentes : observez le principe « une entrée → une carte », puis exécutez votre version PHP.

```html live title="D’une collection à plusieurs cartes"
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

<h1>Profils de l’atelier</h1>
<section class="cartes" id="profils"></section>
<script>
  const profils = [
    { nom: "Léa", passion: "Photographie" },
    { nom: "Sam", passion: "Jeux coopératifs" },
    { nom: "Noa", passion: "Illustration" },
  ];
  for (const profil of profils) {
    const article = document.createElement("article");
    const titre = document.createElement("h2");
    titre.textContent = profil.nom;
    const texte = document.createElement("p");
    texte.textContent = profil.passion;
    article.append(titre, texte);
    document.querySelector("#profils").append(article);
  }
</script>
```

**Résultat à observer :** Trois objets produisent trois cartes. Ajoutez un quatrième objet sans copier le HTML d’une carte. Les valeurs affichées sont du texte, même si elles contiennent des chevrons.
