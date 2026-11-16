---
layout: "layouts/Layout.astro"
title: "TP PHP : calculer un tarif et tester les limites"
type: "TP"
order: 3
quizId: "s1-dev-02"
previousSession: "/semestre_1/developpement_Web/PHP_inter"
nextSession: "/semestre_1/developpement_Web/phpVarTab"
---

<a id="comprendre"></a>

## Le calcul d’un tarif en PHP

Une règle métier est une contrainte du scénario : quantité autorisée, prix unitaire, seuil ou réduction. Elle ne dépend pas de votre préférence de programmation. Écrivez un petit tableau d’entrées et de sorties avant le code : il sert d’oracle de test, c’est-à-dire de résultat attendu indépendant de l’implémentation.

| Étape | Question | Exemple de décision |
|---|---|---|
| Valider | La quantité appartient-elle à l’intervalle autorisé ? | Refuser une valeur sous la borne basse. |
| Calculer | Quel est le total sans remise ? | Quantité multipliée par prix unitaire. |
| Choisir | La condition de remise est-elle satisfaite ? | Tester le seuil avec la bonne inclusion. |
| Produire | Quel résultat doit être affiché ? | Un montant ou un message de refus. |

## L’ordre des branches conditionnelles

Une chaîne `if / elseif / else` s’arrête à la première condition vraie. Si une condition large précède une condition plus précise, cette dernière peut devenir inatteignable. Écrivez les cas sur papier et vérifiez leur ordre ; deux `if` indépendants ne garantissent pas l’exclusion des branches.

```php
<?php
$quantite = 0;
if ($quantite < 1) {
    echo 'Quantité trop petite';
} elseif ($quantite > 12) {
    echo 'Quantité trop grande';
} else {
    echo 'Quantité acceptée';
}
```

**Sortie attendue :** `Quantité trop petite`. Avec 1 ou 12, la troisième branche s’applique ; avec 13, la seconde. Cet exemple enseigne la validation d’un intervalle. Le tarif du travail autonome possède ses propres règles, à conserver exactement.

## Les tests aux limites des conditions

Testez les bornes, une valeur normale et une valeur refusée. Recalculer l’attendu avec la même formule erronée que le programme ne détecterait rien : prenez la règle énoncée et vérifiez manuellement. Une trace suit la valeur après chaque affectation. `var_dump` montre une valeur et son type ; ce diagnostic temporaire ne remplace pas la sortie finale demandée.

**Erreur fréquente :** annoncer « ça marche » après une seule quantité. Un programme peut fonctionner pour 6 et échouer pour 1. Le livrable comporte donc le fichier, les entrées testées et la comparaison attendu / observé.

## Les conditions du tarif

Avant le travail autonome, distinguons entrée, traitement et sortie. L’entrée est la quantité. Le traitement vérifie les limites, calcule un total et applique éventuellement une remise. La sortie annonce un tarif ou une erreur. On ne doit pas calculer un tarif validé pour une quantité refusée.

```text
Lire la quantité
Si elle est inférieure à 1 OU supérieure à 6
    afficher « Quantité invalide »
Sinon
    calculer quantité × 12
    si quantité >= 4, retirer 6 euros au total
    afficher le total final
```

Le OU de l’invalidité relie deux cas possibles. Exiger en même temps « inférieur à 1 ET supérieur à 6 » rendrait la condition impossible. La validité, elle, demande de respecter simultanément les deux bornes.

**Démonstration à vérifier :** pour 3 billets, `3 × 12 = 36`, sans remise. Pour 4 billets, `4 × 12 − 6 = 42`. La remise est globale : retirer 6 euros à chaque billet produirait un autre résultat.

<a id="regles"></a>

## Les règles du tarif de l’atelier

Un billet coûte 12 euros. On ne reçoit que des quantités entières de 1 à 6. Si la quantité est au moins 4, une réduction fixe de 6 euros s'applique au total. Les données sont des variables écrites en haut du fichier. Une quantité invalide affiche « Quantité invalide » et ne calcule pas de tarif.

Le pseudo-code décrit les étapes avant leur implémentation : vérifier la quantité ; sinon calculer quantité × prix ; appliquer éventuellement la réduction ; afficher le résultat. Une réduction fixe n'est pas un pourcentage. Le tarif final et le total initial sont deux valeurs distinctes.

<a id="programme"></a>

## Les variables et conditions du calcul

Le programme applique la validation avant le calcul :

```php
<?php
$quantite = 3;
$prixUnitaire = 12;
if (!is_int($quantite) || $quantite < 1 || $quantite > 6) {
    echo 'Quantité invalide';
} else {
    $totalInitial = $quantite * $prixUnitaire;
    $reduction = $quantite >= 4 ? 6 : 0;
    $totalFinal = $totalInitial - $reduction;
    echo $totalFinal . ' euros';
}
```

**Sortie attendue :** `36 euros`. Pour quatre billets, la sortie devient `42 euros`. Avec `7` ou une chaîne `'3'`, la quantité est refusée par les règles de ce programme. Une saisie de formulaire doit être validée et convertie avant d’utiliser ce calcul : elle arrive habituellement comme du texte.

Utilisez des noms comme `$totalInitial`, `$reduction` et `$totalFinal`. Initialiser la réduction à 0 évite de lire une variable non définie dans la branche sans réduction. La comparaison `$quantite >= 4` inclut quatre billets. La condition invalide peut utiliser « inférieur à 1 OU supérieur à 6 » ; la condition valide utilise « au moins 1 ET au plus 6 ». Les deux formulations décrivent des ensembles opposés.

Ajoutez un commentaire pour la règle métier, pas un commentaire sur chaque caractère. Conservez les données d'entrée dans une seule zone pour changer de scénario facilement.

<a id="tests"></a>

## Les valeurs limites du tarif

| Quantité | Résultat attendu |
|---|---|
| 0 | Quantité invalide |
| 1 | 12 euros |
| 3 | 36 euros |
| 4 | 42 euros |
| 6 | 66 euros |
| 7 | Quantité invalide |

Pour quatre billets : 4 × 12 = 48, puis 48 − 6 = 42. Testez le seuil et les bornes, pas seulement un cas central. Une sortie observée n'est pas une sortie attendue : la seconde est calculée indépendamment avant l'exécution. Un message d'erreur PHP doit être compris et corrigé, pas masqué.

Pour tester sans navigateur, placez-vous dans le dossier puis lancez `php tarif.php`, ou utilisez le chemin complet de PHP. Pour vérifier uniquement la syntaxe : `php -l tarif.php`. Une syntaxe valide ne garantit pas le bon tarif.

<a id="trace"></a>

## Le diagnostic d’un résultat PHP incorrect

Lorsque le résultat diffère, relevez la quantité, la condition sélectionnée, le total initial, la réduction et le total final. `var_dump` sert à observer une valeur et son type ; retirez les affichages de diagnostic du livrable final. Ne changez pas simultanément trois conditions : corrigez une hypothèse et refaites les tests.

## Tableau des tarifs attendus

Cette simulation JavaScript montre le résultat attendu de la règle métier. Vous devez écrire et tester séparément son équivalent PHP. On refuse les quantités hors bornes avant de calculer le total ; la remise est globale.

```html live title="Visualiser les frontières du tarif"
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

<h1>Tarif de l’atelier</h1>
<label for="quantite">Nombre de billets</label>
<input id="quantite" type="number" step="1" value="3" />
<output id="resultat" for="quantite" aria-live="polite"></output>
<script>
  function calculer() {
    const quantite = document.querySelector("#quantite").valueAsNumber;
    const sortie = document.querySelector("#resultat");
    if (!Number.isInteger(quantite) || quantite < 1 || quantite > 6) {
      sortie.textContent = "Quantité invalide";
      return;
    }
    const initial = quantite * 12;
    const reduction = quantite >= 4 ? 6 : 0;
    sortie.textContent = `${initial} − ${reduction} = ${initial - reduction} euros`;
  }
  document.querySelector("#quantite").addEventListener("input", calculer);
  calculer();
</script>
```

**Résultat à observer :** 3 billets donnent 36 euros ; 4 donnent 42 euros ; 0 et 7 sont refusés. La validation du formulaire de votre futur projet doit aussi être effectuée côté serveur.

## Travail autonome et tests à remettre

Écrivez `tarif.php` avec les données d’entrée en tête de fichier. Avant de lancer PHP, calculez les attendus des quantités 0, 1, 3, 4, 6 et 7. Ajoutez les valeurs de mauvais type `'3'` et `3.5` : le programme présenté attend un entier, elles sont donc refusées.

Comparez ensuite attendu et observé, puis introduisez volontairement `> 4` à la place de `>= 4`. Le test de quatre billets doit détecter l’erreur. Rétablissez la condition et rejouez tous les cas. Remettez le fichier, le tableau de tests et une courte explication du seuil inclus et de la remise globale.
