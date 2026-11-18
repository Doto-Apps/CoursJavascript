---
layout: "layouts/Layout.astro"
title: "Créer un assistant de recommandations culturelles"
type: "TP"
order: 6
quizId: "s3-correction-alter-ego"
previousSession: "/semestre_3/deploiement_Services/nodeS5"
---

## Projet « Mon conseiller culturel »

Construisez une petite application de recommandations de films, séries, animés ou jeux vidéo. Le formulaire transmet des préférences à Express. Le serveur interroge le modèle et renvoie une recommandation affichée sous forme de carte.

### 1. Envoyer les préférences

Préparez quatre champs avec des libellés. Proposez une catégorie, un genre, une ambiance et quelques mots décrivant la recherche. Utilisez les valeurs du formulaire pour construire un objet. Par exemple, un champ doté de `name="ambiance"` se lit avec `new FormData(formulaire).get("ambiance")`.

La soumission déclenche `POST /recommandation` avec un corps JSON. Vérifiez les champs côté serveur. Par exemple, une catégorie doit appartenir à la liste proposée et la description peut être limitée à 250 caractères. Essayez une saisie valide puis une catégorie absente.

### 2. Simuler une recommandation

Créez la route dans Express. Faites-lui renvoyer d’abord un objet fixe contenant `titre`, `categorie`, `description` et `justification`. Reprenez l’exemple de la séance 5 pour vérifier le trajet, l’affichage des erreurs et le comportement du bouton avant d’utiliser le modèle.

### 3. Demander une sortie structurée

Construisez les instructions côté serveur. Demandez une recommandation adaptée aux quatre préférences et une justification courte. Avec Responses, la configuration `text.format` peut demander une sortie conforme à un schéma JSON.

```js
const format = {
  type: "json_schema",
  name: "recommandation",
  strict: true,
  schema: {
    type: "object",
    properties: {
      titre: { type: "string" },
      // Déclarez les trois autres propriétés attendues.
    },
    required: ["titre"], // Ajoutez ici les trois autres noms.
    additionalProperties: false,
  },
};
```

Après avoir complété le schéma, passez `text: { format }` dans l’appel serveur. Lorsque la génération est terminée et fournit le JSON attendu, convertissez `output_text` avec `JSON.parse()`. Vérifiez les champs avant de répondre au navigateur. Traitez une réponse incomplète, un refus ou une erreur de transport comme un échec lisible dans l’interface. Conservez les limites de saisie, de fréquence et de sortie de l’Alter Ego. [Sorties structurées dans l’API OpenAI](https://developers.openai.com/api/docs/guides/structured-outputs).

### 4. Afficher la carte et refaire un essai

Affichez séparément le titre, la catégorie, la description et la justification avec `textContent`. Utilisez une illustration locale ou [l’illustration générique](/images/learning/landscape.svg) si vous souhaitez ajouter une image. Le modèle fournit des informations textuelles.

Faites deux soumissions successives avec des préférences différentes. Chaque réponse valide doit remplacer la carte précédente et le formulaire doit rester utilisable après une erreur. Testez aussi le mode simulation sans clé.

**Bonus.** Proposez une autre recommandation, affichez un historique ou enregistrez cet historique avec `localStorage`.
