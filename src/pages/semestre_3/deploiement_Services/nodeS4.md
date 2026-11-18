---
layout: "layouts/Layout.astro"
title: "Appeler une API de LLM et créer un Alter Ego"
type: "TD"
order: 4
quizId: "s3-post-json"
previousSession: "/semestre_3/deploiement_Services/tpRPG"
nextSession: "/semestre_3/deploiement_Services/nodeS5"
---

<a id="llm-prompt"></a>

## Donner des consignes à un modèle de langage

Un LLM est un modèle de langage capable de produire du texte à partir de ce qu’on lui fournit. Son API reçoit une requête et renvoie un résultat. Un prompt est un texte donné au modèle pour orienter sa réponse.

Les instructions définissent la personnalité et la manière de répondre. Le message utilisateur contient la demande du moment. Par exemple, « Tu es Nila, une bibliothécaire de science-fiction. Réponds en deux phrases et pose une question » peut servir d’instruction. « Tu me conseilles quoi pour ce soir ? » est un message utilisateur. Inventez un personnage et essayez de formuler deux demandes différentes qui lui seraient adressées.

<a id="trajet"></a>

## Faire passer le message par le serveur

Interface HTML → POST vers Express → API OpenAI → Express → interface.

Dans le navigateur, le clic ou la validation du formulaire déclenche un POST avec `{ message }`. Express valide la saisie, appelle l’API et retourne un objet `{ reply }`. Le navigateur lit `reply` et ajoute la réplique à la conversation. Testez ce trajet avec une réplique fixe côté serveur avant d’activer l’appel réel.

<a id="cle-api"></a>

## Configurer la clé côté serveur

Une clé API authentifie les appels auprès du fournisseur. La clé `OPENAI_API_KEY` appartient à l’environnement du serveur. Elle doit rester hors du HTML, du JavaScript chargé par le navigateur, du dépôt, du rendu et des journaux.

Téléchargez le <a href="/exemples/s3/env.example" download=".env.example">fichier .env.example</a>, puis copiez-le sous le nom `.env` à la racine de votre projet. Ajoutez `.env` à votre `.gitignore` avant de renseigner la clé remise par l’enseignant. En Node.js 22 ou plus récent, lancez le serveur avec `node --env-file=.env app.js`. Lisez les valeurs côté serveur via `process.env`. Le SDK OpenAI lit `OPENAI_API_KEY` par défaut.

Pour servir l’interface depuis Express, placez les fichiers du navigateur dans `public/` et ajoutez `app.use(express.static("public"))`. Le navigateur peut alors appeler votre route avec une URL relative.

<a id="appel-modele"></a>

## Appeler le modèle depuis Express

Dans votre projet, installez le SDK avec `npm install openai`. Créez un client OpenAI côté serveur, uniquement en mode réel. Dans un fichier CommonJS, utilisez `const OpenAI = require("openai")` puis `new OpenAI({ timeout: 15000, maxRetries: 0 })`. Placez ce fragment dans une fonction asynchrone appelée par votre route.

```js
const resultat = await client.responses.create({
  model: process.env.OPENAI_MODEL,
  instructions: personnalite,
  input: message,
  reasoning: { effort: "none" },
  max_output_tokens: 180,
  store: false,
});
```

Dans la requête à OpenAI, `instructions` porte la personnalité et `input` porte le message de l’utilisateur. Pour une génération de texte réussie, le SDK expose la réplique dans `resultat.output_text`. Vérifiez que la génération est terminée et que le texte est présent avant d’envoyer `reply`. Commencez par modifier le ton dans vos instructions et observez l’effet sur une même demande lorsque le mode réel est activé.

Le fichier d’exemple propose `gpt-6-luna`, un modèle économique compatible avec Responses et les sorties structurées. Le réglage `reasoning: { effort: "none" }` convient aux réponses courtes du TP. `OPENAI_MODEL` permet de changer le modèle selon les accès du projet. Vérifiez alors les options acceptées par le modèle choisi. [Fiche du modèle et tarifs](https://developers.openai.com/api/docs/models/gpt-6-luna).

Pour activer le mode réel, choisissez `MODE_LLM=reel` dans `.env` et redémarrez Node.js. Votre code doit appeler le fournisseur uniquement avec cette valeur et utiliser la réplique simulée par défaut.

<a id="couts-limites"></a>

## Limiter les appels et gérer les erreurs

Un token est une petite unité de texte. Le fournisseur facture les tokens d’entrée et de sortie selon le tarif du modèle. `max_output_tokens` fixe le budget maximal de sortie pour un appel. Demandez deux phrases et commencez sans historique conversationnel. Si vous ajoutez un historique, limitez le nombre de messages envoyés.

- **Saisie.** Vérifiez côté serveur que le message est un texte non vide après `trim()`, de 500 caractères maximum. Limitez aussi le corps via `express.json({ limit: "4kb" })`.
- **Fréquence.** Autorisez au plus cinq demandes par minute par utilisateur. Pour le TP local, une limite par adresse IP suffit comme approximation. Vous pouvez installer `express-rate-limit` et placer son middleware sur la route avant le traitement qui appelle le fournisseur. Utilisez `windowMs: 60_000` et `limit: 5`.
- **Envoi.** Désactivez le bouton pendant la requête et réactivez-le dans `finally`. Lancez l’appel lors de la soumission du formulaire.
- **Erreur.** Affichez « Trop de demandes, réessayez plus tard » pour une limite de fréquence. Si le fournisseur signale un quota épuisé, affichez « Quota de l’API atteint. Le service est temporairement indisponible. » Journalisez au besoin le statut ou un code d’erreur générique, en laissant les secrets et les détails bruts hors des journaux.
- **Simulation.** Avec `MODE_LLM=simulation`, renvoyez une réplique fixe en gardant le même format `{ reply }`. Ce mode permet de tester le chat sans appel facturé ni clé.

<a id="projet-alter-ego"></a>

## Construire « Mon Alter Ego Numérique »

1. Créez une zone de conversation, un champ et un bouton Envoyer. Distinguez visuellement vos messages et ceux du personnage.
2. Créez le POST dans Express. Faites fonctionner la conversation avec une réponse simulée. Testez un message valide et un message vide.
3. Écrivez le prompt de personnalité dans le serveur. Inventez le pseudonyme, les goûts et le style du personnage. Intégrez ensuite l’appel OpenAI et ajoutez un message lisible si la requête échoue.
4. Testez la limite d’envoi et un double clic. Vérifiez que l’écriture dans le champ ne déclenche aucun appel et que la clé n’apparaît pas dans la requête issue du navigateur.

Vous pouvez ajouter un avatar, un indicateur de chargement, un bouton d’effacement ou un historique court.

**Pour la prochaine rencontre.** Terminez le projet. Préparez un projet Node.js/Express fonctionnel avec un README qui explique l’installation des dépendances, la configuration et le démarrage. Remettez uniquement le fichier d’exemple de configuration. En séance 5, vous montrerez le trajet d’un message, la lecture du corps, le rôle du prompt et l’emplacement de la clé.
