---
layout: "layouts/Layout.astro"
title: "Configurer les services et connecter un modèle local"
type: "TD"
order: 2
quizId: "s3-node-chatbot"
previousSession: "/semestre_3/deploiement_Services/nodeS1"
nextSession: "/semestre_3/deploiement_Services/tpRPG"
---

<a id="adresses"></a>

## 127.0.0.1, adresse réseau et 0.0.0.0

| Valeur | Usage | Erreur à éviter |
|---|---|---|
| 127.0.0.1 ou localhost | Joindre sa propre machine. | Donner localhost à un camarade : il joindrait son propre PC. |
| 0.0.0.0 dans HOST | Écouter sur les interfaces réseau du serveur. | L’utiliser comme adresse à distribuer aux clients. |
| Adresse IP du poste dans la salle | Joindre le poste depuis une autre machine autorisée. | Confondre cette IP avec celle d’un autre réseau. |
| Port 3000 | API du personnage. | Appeler le port du modèle à la place. |
| Port 1234 | Serveur LM Studio par défaut. | Penser qu’installer LM Studio suffit à lancer ce serveur. |

Deux services sur la même machine ont besoin de ports distincts. Sur deux machines, le même numéro peut être utilisé. Le pare-feu et le réseau de la salle doivent autoriser les échanges : vérifiez avec l’enseignant, sans désactiver globalement le pare-feu.

<a id="configuration"></a>

## process.env et le fichier .env

Créez `.env` à côté de personnage.mjs. Les valeurs ci-dessous sont des exemples à adapter : LM_MODEL est l’identifiant du modèle réellement chargé, pas une famille approximative.

```ini
PORT=3000
HOST=127.0.0.1
PERSONNAGE=A Fata
MODE=simulation
LM_BASE_URL=http://127.0.0.1:1234/v1
LM_MODEL=identifiant-du-modele-charge
```

Lancez `node --env-file=.env personnage.mjs` avec Node 22+. process.env contient des textes : le port est converti avec Number. Relancez le processus après modification. Pour un essai réseau, HOST devient 0.0.0.0 et le binôme appelle votre IP réelle. Pour un modèle hébergé sur un autre poste, LM_BASE_URL doit aussi employer son IP.

N’ajoutez pas un véritable secret au dépôt ou au rapport. Une configuration ne remplace pas un contrôle d’accès ; cette API pédagogique vise le réseau de la salle, pas une exposition publique.

<a id="modele"></a>

## L’appel HTTP au modèle local

Dans LM Studio, chargez le modèle, ouvrez l’espace Developer et démarrez le serveur. Vérifiez l’adresse et la liste des modèles. Remplacez **uniquement repondre** du squelette par cette fonction :

```js
async function repondre(message) {
  if (process.env.MODE !== "modele") {
    return `Je suis ${personnage}. J’ai reçu : ${message}`;
  }
  const base = (process.env.LM_BASE_URL || "http://127.0.0.1:1234/v1").replace(/\/$/, "");
  const response = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal: AbortSignal.timeout(30000),
    body: JSON.stringify({
      model: process.env.LM_MODEL,
      messages: [
        {
          role: "system",
          content: `Tu incarnes ${personnage}, dans un conte corse. Réponds en français en deux phrases.`,
        },
        { role: "user", content: message },
      ],
      temperature: 0.7,
      max_tokens: 120,
    }),
  });
  if (!response.ok) throw new Error(`Modèle : HTTP ${response.status}`);
  const data = await response.json();
  const texte = data.choices?.[0]?.message?.content;
  if (typeof texte !== "string" || !texte.trim()) {
    throw new Error("Réponse du modèle sans texte");
  }
  return texte.trim();
}
```

**Résultat attendu :** POST /message conserve personnage et reply. Seule la fabrication de reply change. Le serveur personnage transforme les erreurs du modèle en réponse 502 ; le client n’a pas à connaître choices. La limite d’attente de 30 secondes évite une requête suspendue sans fin ; elle ne garantit pas une génération aussi rapide.

| Message envoyé au modèle | Rôle |
|---|---|
| system | Contexte et consignes de personnage. |
| user | Réplique reçue dans cet échange. |
| assistant | Réponse du modèle ; utile dans un historique si on l’ajoute. |

Ce code n’enregistre pas d’historique entre les requêtes. Fournir un contexte n’entraîne pas le modèle et ne modifie pas ses poids. Les réponses peuvent varier : un test vérifie la structure et les limites, pas une phrase exacte.

<a id="diagnostic"></a>

## Les erreurs entre client, API et modèle

| Test | Conclusion si réussite | Prochain contrôle si échec |
|---|---|---|
| health sur son poste | L’API écoute localement. | Processus, port, erreur terminal. |
| health depuis le binôme | Le trajet réseau vers l’API fonctionne. | IP, HOST, réseau, pare-feu autorisé. |
| message en simulation | Lecture, validation et contrat fonctionnent. | Corps JSON et route. |
| message en mode modèle | L’API atteint le modèle et lit son texte. | Serveur LM, adresse, modèle chargé, statut et délai. |

health ne contacte pas le modèle : une API saine peut avoir une dépendance en panne. Un échange Node → Node n’est pas soumis au CORS du navigateur. Si on ajoute une interface Web d’origine différente, il faut traiter cette frontière séparément.

## Pour approfondir

- [Variables d’environnement de Node](https://nodejs.org/docs/latest-v22.x/api/cli.html#--env-filefile).
- [API Chat Completions de LM Studio](https://lmstudio.ai/docs/developer/openai-compat/chat-completions).
- [AbortSignal et limite d’attente](https://nodejs.org/docs/latest-v22.x/api/globals.html#static-method-abortsignaltimeoutdelay).
