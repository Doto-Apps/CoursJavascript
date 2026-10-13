---
layout: "layouts/Layout.astro"
title: "Retool : composants, données et premières actions"
type: "TD"
order: 1
nextSession: "/semestre_3/deploiement_Services/tpteeshirt"
---

<a id="roles"></a>

## Composant, ressource, requête et événement Retool

| Objet | Rôle | Exemple |
|---|---|---|
| Composant | Afficher une valeur ou recueillir une action. | Table, Text Input, Select, Button, Form. |
| Ressource | Décrire la connexion à un service. | Firebase connecté au projet de test. |
| Requête | Lire ou modifier des données via la ressource. | `getProduits`, `createProduit`. |
| Événement | Déclencher une action à un moment donné. | Soumission du formulaire → lancer la création. |

Un composant Table n’est pas une base de données : il présente des lignes reçues. Une ressource n’exécute pas une lecture toute seule : une requête décrit l’opération. Un bouton ne sauvegarde rien tant qu’un événement ne déclenche pas l’action attendue.

Le trajet d’une lecture est **composant → requête Retool → ressource Firebase → Firestore → résultat → composant**. Les identifiants de ressource sont conservés côté Retool ; ils ne doivent pas être copiés dans une expression d’interface ou une capture du rapport.

<a id="donnees"></a>

## Le modèle de données des produits

Firestore conserve des **documents** réunis dans des **collections**. Un document possède un identifiant et des champs. Pour commencer, la collection `produits` contient nom, marque, prix et stock. Le prix est un nombre ; le stock est un entier positif ou nul ; un titre vide n’est pas un produit exploitable.

```json
[
  {"id":"p01","nom":"Affiche A3","marque":"Pixel","prix":12,"stock":5},
  {"id":"p02","nom":"Carnet","marque":"Campus","prix":8,"stock":0}
]
```

**Résultat normalisé attendu pour l’interface :** deux lignes dont l’identité est `id`. L’identifiant du document Firestore peut être présenté sous un autre nom dans la réponse du connecteur. Observez ce résultat avant de le transformer : faites correspondre l’identité réelle à la colonne `id`, sans utiliser le rang de ligne comme identité.

Le connecteur renvoie des données ; l’expression `{{ ... }}` les utilise dans une propriété. Le contenu entre accolades est une expression JavaScript, pas une requête SQL ni un texte à afficher littéralement.

<a id="composants"></a>

## Table, champs et boutons Retool

| Composant | Nom de notre exercice | Valeur ou événement utile |
|---|---|---|
| Table | `tableProduits` | Données et ligne sélectionnée. |
| Text Input | `inputNom` | `inputNom.value`. |
| Number Input | `inputPrix`, `inputStock` | Valeur numérique à contrôler. |
| Select | `selectMarque` | Choix parmi des valeurs connues. |
| Button | `buttonActualiser` | Événement Click. |
| Form | `formProduit` | Événement Submit pour regrouper la saisie. |

Commencez avec les deux lignes de test, dans une requête JavaScript qui retourne ce tableau, pour vérifier la Table indépendamment du réseau. Remplacez ensuite sa source par la lecture Firebase normalisée.

```javascript
// Propriété Data source de tableProduits, après normalisation :
{{ getProduits.data ?? [] }}
// Texte de détail, avec un état sans sélection :
{{ tableProduits.selectedRow?.nom ?? "Sélectionnez un produit" }}
```

Le résultat d’une requête se lit avec `.data`. La Table actuelle expose la ligne choisie par `selectedRow` : ne recopiez pas `selectedRow.data` d’un ancien exemple sans vérifier la référence du composant. `?.` évite de lire une propriété sur une absence ; `??` fournit une valeur de repli lorsque la valeur est null ou undefined, sans remplacer le nombre zéro.

<a id="connexion"></a>

## La ressource Firebase et la requête de lecture

Dans **Resources → Create new → Resource**, choisissez **Firebase**. La connexion Firestore utilise un compte de service Google Cloud autorisé pour le projet. L’enseignant configure la clé JSON dans la ressource Retool puis teste et enregistre la connexion. L’URL Realtime Database n’est requise que si ce service est utilisé : Firestore et Realtime Database ne sont pas le même stockage. [Procédure officielle de connexion](https://docs.retool.com/data-sources/guides/connect/firebase).

Créez `getProduits`, sélectionnez la ressource et l’opération de lecture de collection disponible dans votre version. Ciblez `produits`, exécutez et observez la réponse. Vérifiez ensuite la structure, le nom du champ d’identité et les types avant de l’afficher. Si le résultat est vide, vérifiez projet et collection ; si l’opération échoue, examinez la connexion et les permissions.

Un compte de service utilise les autorisations IAM côté serveur. Ouvrir les règles Firestore à tout le monde ne constitue pas une correction de connexion Retool. Utilisez les autorisations de test prévues par l’enseignant et gardez la clé dans la ressource.

<a id="actions"></a>

## Le formulaire Retool et la création d’un document

Le formulaire recueille un nom, un prix et un stock. Avant l’écriture, vérifiez un nom non vide après `trim`, un prix numérique non négatif et un stock entier non négatif. Un nombre zéro peut être valide ; un champ absent doit être traité selon la règle du formulaire.

```javascript
const produit = {
  nom: inputNom.value.trim(),
  marque: selectMarque.value,
  prix: inputPrix.value,
  stock: inputStock.value,
};
const valide = produit.nom.length > 0
  && Number.isFinite(produit.prix) && produit.prix >= 0
  && Number.isInteger(produit.stock) && produit.stock >= 0;
```

**Sortie attendue :** un objet prêt pour la requête et un booléen de validation. Ces lignes s’exécutent dans une requête JavaScript Retool avec les composants nommés ci-dessus ; ce n’est pas un programme autonome à coller dans une iframe. La requête d’écriture ne doit être déclenchée que si les valeurs passent le contrôle.

Reliez Submit à la création, puis l’événement de réussite de la création à `getProduits.trigger()`. Le formulaire se réinitialise après confirmation, pas avant. Désactivez la soumission pendant l’exécution et affichez une erreur utile si la requête échoue. Évitez de lancer les requêtes d’écriture automatiquement à chaque changement de champ.

## Pour approfondir

- [Composants et expressions dans Classic apps](https://docs.retool.com/apps/concepts/intro).
- [Requêtes et code](https://docs.retool.com/queries/quickstart).
- [Modèle de données Firestore](https://firebase.google.com/docs/firestore/data-model).
