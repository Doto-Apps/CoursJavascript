---
hidden: true
order: 4
layout: "layouts/Layout.astro"
title: "WooCommerce : produits, variations et panier"
---

## Les produits WooCommerce

Un produit regroupe des données métier : nom, description, prix, disponibilité et médias. Le thème affiche ces données mais ne doit pas servir à saisir un prix sous forme d’image. Les [réglages de boutique](/semestre_2/Gestion_De_Contenus/tp/tp-1) déterminent notamment la devise.

## Produit simple : une fiche complète

Dans la gestion des produits, ajoutez un produit simple nommé « Carnet sérigraphié ». Saisissez une description, un prix de 12 €, une image et une catégorie « Papeterie », puis publiez-le.

| Donnée | Exemple | Effet |
|---|---|---|
| Nom | Carnet sérigraphié | Titre du catalogue et de la fiche |
| Description courte | Carnet A5, couverture imprimée | Présentation synthétique |
| Description longue | Papier, dimensions et fabrication | Détails de la fiche |
| Prix | 12 | Valeur numérique utilisée dans le panier |
| Stock | 5 si la gestion est activée | Quantité disponible |
| Image | Vue du carnet | Illustration et alternative adaptée |

**Résultat attendu :** le produit apparaît dans la boutique et le clic ouvre sa fiche. Un brouillon n’apparaît pas comme un produit publié ; une visibilité de catalogue masquée peut également expliquer une absence.

## Catégories, attributs et variations

Une catégorie organise le catalogue, par exemple « Papeterie ». Un attribut décrit une caractéristique, par exemple « Couleur ». Une variation représente une combinaison achetable, par exemple le carnet bleu, qui peut avoir son propre stock et son propre prix. Créer un attribut ne crée pas automatiquement toutes les variations.

Pour un produit variable, définissez les valeurs de l’attribut, activez son utilisation pour les variations, puis créez et renseignez les variations. **Attendu :** le visiteur choisit la variante avant de l’ajouter au panier. Une variation sans prix ou indisponible peut ne pas être achetable.

## Panier et stock

Avec deux carnets à 12 €, le sous-total des articles vaut 24 €. Le total final peut aussi inclure transport et taxes selon la configuration : ne confondez pas sous-total et total. Augmenter la quantité doit recalculer le panier. La gestion du stock dépend de son activation et du statut des commandes ; ajouter au panier ne prouve pas à lui seul une vente définitive.

[Gestion des produits — documentation WooCommerce](https://woocommerce.com/document/managing-products/).
