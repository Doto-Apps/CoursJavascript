---
layout: "layouts/Layout.astro"
title: "Retool : consolider une interface d’administration"
type: "TD"
order: 3
quizId: "s3-retool-catalogue"
previousSession: "/semestre_3/deploiement_Services/tpteeshirt"
---

<a id="parcours"></a>

## Lecture, gestion et analyse dans Retool

| Vue | Besoin | Commandes prioritaires |
|---|---|---|
| Catalogue | Trouver et lire un produit. | Recherche, filtre, sélection et réinitialisation. |
| Gestion | Ajouter ou corriger une donnée. | Formulaire explicite, Enregistrer et Annuler. |
| Tableau de bord | Comprendre une mesure. | Période/population nommée et indicateurs expliqués. |

Ces vues peuvent être des pages ou des panneaux selon l’éditeur utilisé. Choisissez une navigation claire plutôt que plusieurs apps dupliquant les mêmes requêtes. Dans une app multipage, distinguez le code global partagé du code limité à une page : une requête globale ne doit pas dépendre d’un composant qui n’existe que sur une autre page.

<a id="formulaire"></a>

## États du formulaire et requêtes Retool

Avant édition, conserver l’id ciblé et préparer les valeurs. Pendant saisie, ne pas écrire en base à chaque caractère. Lors de Submit, contrôler puis envoyer. En cas de réussite, actualiser la lecture ; en cas d’erreur, garder la saisie. Annuler quitte l’édition sans modifier le document.

Un champ prérempli une fois n’est pas nécessairement une expression constamment liée à la sélection. Si la ligne change pendant une édition, le formulaire pourrait montrer un mélange de contextes. Décidez d’un comportement : bloquer le changement, demander une confirmation ou charger un nouveau formulaire. Rendez cette décision visible.

| État | Bouton Enregistrer | Message attendu |
|---|---|---|
| Saisie invalide. | Inactif selon les contraintes. | Champ et règle à corriger. |
| Envoi en cours. | Inactif pour éviter une soumission concurrente. | Opération en cours. |
| Réussite confirmée. | Disponible pour une autre action. | Produit enregistré, cible identifiable. |
| Échec de requête. | Réactivé pour une reprise. | Échec expliqué sans effacer la saisie. |

<a id="promotions"></a>

## Prix remisé et période de promotion

Une promotion n’est pas obligatoire pour réussir le catalogue. Si elle est ajoutée, son modèle doit préciser un pourcentage entre 0 et 100, une date de début, une date de fin et une cible. Pour commencer, choisissez une seule cible globale ; les variantes marque/produit sont une extension.

```javascript
function prixRemise(prix, pourcentage) {
  if (!Number.isFinite(prix) || prix < 0
      || !Number.isFinite(pourcentage)
      || pourcentage < 0 || pourcentage > 100) {
    throw new Error('Prix ou pourcentage invalide');
  }
  return prix * (1 - pourcentage / 100);
}
console.log(prixRemise(20, 25)); // 15
```

Le prix affiché est calculé sans remplacer le prix d’origine du catalogue. Le calcul retourne 15 euros ; il faut un formatage monétaire pour la présentation. Définissez aussi la règle temporelle : début inclus et fin exclue, avec un fuseau annoncé. Une date de fin antérieure au début est refusée. Les dates d’exemple sont des données de test choisies pour la séance, pas des promotions toujours actives.

<a id="etats"></a>

## Chargement, absence de sélection et erreurs

Le chargement n’est pas une collection vide ; une erreur n’est pas un résultat de recherche nul ; une sélection absente n’est pas le premier produit. Chaque état doit permettre de comprendre la situation et de continuer.

Testez un nom long, zéro stock, zéro prix, aucune sélection et une panne. Vérifiez les libellés, les commandes et le parcours clavier. La ressource Firebase protège la connexion ; cacher un bouton ne suffit pas à définir les droits des utilisateurs Retool. L’enseignant règle l’accès à l’app et à la ressource dans l’environnement de test.

## Pour approfondir

- [Portée globale et pages Retool](https://docs.retool.com/apps/concepts/intro).
- [Composants Retool](https://docs.retool.com/apps/reference/components).
