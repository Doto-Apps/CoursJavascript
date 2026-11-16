---
layout: "layouts/Layout.astro"
title: "TP PHP : algorithmie, tableaux et affichage"
type: "TP"
order: 4
quizId: "s1-dev-03"
previousSession: "/semestre_1/developpement_Web/PHP_begin"
nextSession: "/semestre_1/developpement_Web/phpForm"
---

Les tableaux ont été introduits en séance 2. Nous allons les utiliser pour résoudre des problèmes : parcourir une collection, sélectionner des entrées, calculer un bilan et produire du HTML. Les exercices de fin de séance sont à réaliser en autonomie avec les notions de ce support et des séances précédentes.

| Temps indicatif | Activité |
|---|---|
| 10 min | QCM sur les notions de la séance 3 |
| 35 min | Cours et manipulations des exemples |
| 65 min | Trois exercices progressifs |
| 10 min | Vérifications et explication d’un choix algorithmique |

<a id="collection"></a>

## Une collection et ses enregistrements

Un tableau indexé représente ici une liste ; chaque entrée est un tableau associatif représentant un enregistrement. Une clé choisit un champ, tandis qu’un indice choisit une position dans la liste. `count` donne le nombre d’éléments du tableau qu’on lui transmet.

```php
<?php
$livres = [
    ['titre' => 'Atlas des îles', 'pages' => 96, 'disponible' => true],
    ['titre' => 'Carnet de voyage', 'pages' => 144, 'disponible' => false],
];
echo $livres[0]['titre'];
echo count($livres);
```

**Résultat :** le premier accès lit un titre ; le second compte les livres. Compter les champs d’un livre serait une autre opération. Dans cette liste créée sans indices explicites, les positions commencent à zéro. La position n’est pas une identité durable : elle peut changer si on réorganise la liste.

Pour ajouter une entrée à un tableau, on peut écrire `$selection[] = $livre;`. Les crochets vides ajoutent à la fin ; ils ne remplacent pas toute la collection. Une collection vide s’écrit `[]`.

<a id="boucle"></a>

## Parcourir avec foreach

```php
foreach ($livres as $livre) {
    echo $livre['titre'] . PHP_EOL;
}
```

`foreach` exécute son bloc une fois pour chaque élément. `$livres` reste la collection ; `$livre` contient l’élément courant. Les noms sont choisis par le développeur. Dans ce parcours par valeur, modifier la variable courante ne réécrit pas automatiquement l’entrée du tableau source.

Une collection vide n’effectue aucun tour. Après une boucle, ne comptez pas sur la variable de parcours pour représenter toute la liste. `PHP_EOL` produit un retour à la ligne dans une sortie texte ; dans une page HTML, utilisez la structure HTML adaptée pour séparer les éléments.

Une boucle `for` comporte une initialisation, une condition et une mise à jour. Elle est utile lorsqu’on doit gérer des indices. `foreach` convient lorsque chaque entrée doit être traitée sans gérer sa position.

<a id="accumulation"></a>

## Accumuler, compter et calculer une moyenne

Un accumulateur conserve un résultat entre les tours. Il s’initialise avant la boucle. `+=` ajoute une valeur au résultat existant ; une affectation simple le remplacerait.

```php
$durees = [8, 12, 5];
$total = 0;
foreach ($durees as $duree) {
    $total += $duree;
}
$nombre = count($durees);
if ($nombre > 0) {
    echo $total / $nombre;
} else {
    echo 'Aucune durée disponible';
}
```

Le total représente la somme ; la moyenne utilise aussi le nombre d’entrées. Vérifiez que ce nombre est supérieur à zéro avant de diviser. Réinitialiser le total dans la boucle effacerait le travail des tours précédents.

Pour compter seulement les entrées qui satisfont un critère, initialisez un compteur à zéro, puis augmentez-le uniquement lorsque la condition est vraie. Compter toute la collection et compter une sélection sont deux opérations différentes.

<a id="selection"></a>

## Sélectionner et rechercher

Une condition dans la boucle permet de décider si l’entrée courante doit participer au résultat. Le tableau source reste disponible ; un tableau de sélection peut contenir les entrées retenues.

```php
$disponibles = [];
foreach ($livres as $livre) {
    if ($livre['disponible'] === true) {
        $disponibles[] = $livre;
    }
}
```

Le filtre conserve les entrées qui satisfont une condition. Il ne supprime pas les autres entrées du tableau source. Plusieurs critères nécessaires se combinent avec ET ; des alternatives se combinent avec OU, comme en séance 3.

Pour rechercher un maximum, on garde un candidat et on le remplace lorsqu’une valeur plus grande est rencontrée. Un candidat initial absent permet de traiter une liste vide sans inventer une valeur maximale.

```php
$temperatures = [-4, -1, -7];
$maximum = null;
foreach ($temperatures as $temperature) {
    if ($maximum === null || $temperature > $maximum) {
        $maximum = $temperature;
    }
}
```

Initialiser arbitrairement à zéro échouerait pour cette liste entièrement négative. `null` représente ici l’absence de résultat. Pour retrouver aussi l’enregistrement gagnant, conservez l’enregistrement correspondant au candidat. Décidez à l’avance comment départager les égalités, par exemple garder le premier rencontré.

<a id="affichage"></a>

## Des données au HTML

PHP parcourt les données sur le serveur et génère la réponse HTML. Le navigateur reçoit cette réponse : il ne reçoit pas le tableau PHP à parcourir. Une structure de présentation écrite une fois dans une boucle produit plusieurs éléments HTML.

```php
<ul>
<?php foreach ($livres as $livre): ?>
  <li><?= htmlspecialchars($livre['titre'], ENT_QUOTES, 'UTF-8') ?></li>
<?php endforeach; ?>
</ul>
```

`<?= ... ?>` affiche une expression. `htmlspecialchars` permet d’afficher les caractères spéciaux d’un texte sans les interpréter comme des balises HTML. L’échappement intervient à l’affichage : les données conservées dans le tableau restent brutes.

**HTML produit avec les deux livres de l’exemple :**

```html preview title="Résultat HTML produit par PHP" height=150
<ul><li>Atlas des îles</li><li>Carnet de voyage</li></ul>
```

Ce rendu est le résultat du PHP exécuté sur le serveur ; l’aperçu n’exécute pas PHP. Le même principe produit des articles avec titre, description et informations de disponibilité. Un ajout aux données doit produire un élément supplémentaire sans recopier manuellement son HTML. Prévoyez aussi un message pour une collection vide.

<a id="memoire"></a>

## Stocker dans une variable et conserver entre deux visites

Un tableau PHP ordinaire existe pendant l’exécution de la requête. Modifier ce tableau en mémoire ne conserve pas la modification pour la requête suivante. Un tableau écrit dans le fichier source est reconstruit lorsque ce code s’exécute.

La séance 5 utilisera une session pour retrouver l’utilisateur entre les requêtes. La séance 6 enregistrera des messages dans un fichier texte, puis les relira pour reconstruire l’affichage.

<a id="methode"></a>

## Préparer et vérifier un algorithme

Avant le code, identifiez les données d’entrée, les critères de sélection, les résultats et les cas particuliers. Une trace indique ce que contient le candidat, le compteur ou le total après chaque tour. Les essais doivent couvrir une liste normale, une liste vide et un cas limite. Un résultat attendu est défini avant de comparer la sortie observée.

<a id="exercices-autonomes"></a>

## Exercices autonomes — sans programme de départ

Les consignes ci-dessous décrivent ce que votre programme doit faire. À vous de choisir les variables, les boucles et leur organisation. Les cours restent consultables. Vous pouvez commencer par une trace sur papier ; aucun corrigé ni squelette de programme n’est fourni dans les exercices.

### 1. Le tournoi du campus — environ 20 minutes

Préparez une collection d’au moins cinq joueurs, avec leur pseudo et leur score. Votre page doit présenter le nombre de participants, le total des scores, la moyenne et le pseudo du gagnant. En cas d’égalité, gardez le premier joueur rencontré. Si la collection est vide, affichez un message explicite plutôt qu’une moyenne ou un gagnant inventés.

Vérifiez votre programme avec une liste normale, une égalité, des scores tous négatifs et une liste vide. Expliquez pourquoi votre candidat initial convient à ces cas.

### 2. La boutique éphémère — environ 25 minutes

Préparez au moins quatre produits avec un nom, un prix et une quantité disponible. Produisez une fiche HTML pour chaque produit : nom, prix, disponibilité et indication « Épuisé » lorsque la quantité est nulle. Les fiches doivent être générées à partir de la collection, avec une structure commune.

Ajoutez un cinquième produit uniquement dans les données : sa fiche doit apparaître. Testez un nom long, un nom contenant des chevrons et une collection vide. Les textes saisis restent des textes lors de l’affichage. La mise en forme CSS peut rester simple.

### 3. Mon programme de festival — environ 20 minutes

Préparez des activités avec un nom, une durée et un nombre de places restantes. Constituez une sélection des activités de 45 minutes maximum ayant encore des places. Présentez leurs noms et le nombre d’activités retenues ; la collection complète doit rester disponible.

Vérifiez une durée exactement égale à la limite, une activité complète et un jeu de données sans résultat. Distinguez « aucune activité dans le programme » et « aucune activité correspondant à la sélection ».
