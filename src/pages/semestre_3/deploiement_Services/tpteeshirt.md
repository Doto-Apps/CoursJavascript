---
layout: "layouts/Layout.astro"
title: "TP Retool : catalogue persistant et statistiques"
type: "TP"
order: 2
quizId: "s3-retool"
previousSession: "/semestre_3/deploiement_Services/retool"
nextSession: "/semestre_3/integrer_Interface/retool"
---

<a id="identite"></a>

## Identifiant de document et sélection Retool

Le tri et les filtres changent l’ordre de la Table. Une action Éditer ou Supprimer conserve donc l’id du document sélectionné. Si la troisième ligne correspond à `p08`, l’opération vise `p08`, pas « le document numéro 3 ».

| Action | Donnée nécessaire | Après réussite |
|---|---|---|
| Créer | Champs validés. | Relire la collection et retrouver le nouvel id. |
| Modifier | Id existant et champs validés. | Garder le même id et actualiser les valeurs. |
| Supprimer | Id existant et confirmation. | Relire et vérifier l’absence de la cible. |

Configurez chaque requête avec l’opération Firebase disponible pour les documents. Le chemin utilise l’identité normalisée issue du document. Une sélection absente désactive l’action ; elle ne doit pas produire une adresse contenant undefined. Confirmez la suppression avec le nom du produit pour rendre la cible claire.

<a id="filtre"></a>

## Le filtrage du catalogue en JavaScript

```javascript
const texte = (inputRecherche.value ?? '').trim().toLowerCase();
const marque = selectFiltreMarque.value;
return (getProduits.data ?? []).filter((produit) =>
  produit.nom.toLowerCase().includes(texte)
  && (!marque || produit.marque === marque)
);
```

Cette requête JavaScript suppose le résultat normalisé du premier TD et les composants indiqués. `filter` retourne les produits qui satisfont les conditions ; il ne supprime aucun document. `&&` combine recherche et marque. Effacer le champ et choisir Toutes doit restaurer la collection complète.

Un résultat filtré vide n’est pas un catalogue vide. Affichez « Aucun produit pour ces critères » et proposez une réinitialisation. Pour le petit jeu de test, le filtre local est suffisant ; un catalogue très grand nécessiterait un autre choix de requêtes, hors du socle du TP.

<a id="statistiques"></a>

## Stock total, valeur du stock et statistiques

| Indicateur | Formule | Unité et interprétation |
|---|---|---|
| Nombre de références | Nombre de documents. | Références, pas articles physiques. |
| Stock total | Somme des stocks. | Unités disponibles. |
| Valeur du stock | Somme de prix × stock. | Euros théoriques, pas chiffre d’affaires réalisé. |
| Stock par marque | Somme des stocks regroupés. | Comparer des marques avec la même unité. |

```javascript
const produits = getProduits.data ?? [];
return {
  references: produits.length,
  stockTotal: produits.reduce((somme, p) => somme + p.stock, 0),
  valeurStock: produits.reduce((somme, p) => somme + p.prix * p.stock, 0),
};
```

**Résultat attendu avec les données de l’introduction :** 2 références, 5 unités et 60 euros de valeur de stock. Une référence à stock zéro compte dans le catalogue mais n’ajoute rien à la valeur de stock. La valeur initiale 0 du `reduce` permet aussi le calcul sur un tableau vide.

Décidez si les indicateurs portent sur le catalogue complet ou sur le résultat filtré, et écrivez-le dans leur intitulé. Un total global et un graphique filtré sans indication peuvent sembler contradictoires alors qu’ils ne mesurent pas la même population.

<a id="ventes"></a>

## Les données de stock et les données de vente

Le socle n’exige pas de ventes. Pour un groupe en avance, une collection `ventes` conserve produit_id, quantité, prix_unitaire et date_vente. Le prix enregistré est celui de l’achat : modifier ensuite le prix du catalogue ne doit pas réécrire le passé. Le chiffre d’affaires est la somme des quantités × prix_unitaires vendus sur une période annoncée.

Une moyenne demande un dénominateur : panier moyen = total des ventes / nombre de ventes. Sans vente, affichez un résultat prévu par le contrat plutôt que de diviser par zéro. Les promotions, dates et canaux sont des extensions ; elles ne remplacent pas les opérations et statistiques essentielles évaluées.

## Pour approfondir

- [Méthode filter](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/filter).
- [Méthode reduce](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce).
- [Données Firestore](https://firebase.google.com/docs/firestore/query-data/get-data).
