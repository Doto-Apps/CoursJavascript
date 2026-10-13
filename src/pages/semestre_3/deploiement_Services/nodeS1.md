---
layout: "layouts/Layout.astro"
title: "Node.js : créer une API de personnage"
type: "TD"
order: 1
nextSession: "/semestre_3/deploiement_Services/nodeS2"
---

<a id="execution"></a>

## JavaScript dans Node et dans le navigateur

Les exemples utilisent Node.js 22 ou plus récent. Vérifiez l’installation avec `node --version` dans le terminal, puis utilisez des fichiers `.mjs` pour les modules. Ce parcours réutilise les fonctions et objets JavaScript ainsi que les échanges HTTP/JSON du S2.

Dans le navigateur, JavaScript peut manipuler document et les éléments HTML. Dans Node, il peut écouter un port et travailler avec des fichiers. Le langage reste JavaScript ; les fonctions fournies par l’environnement changent. Une API est une interface : elle fixe les adresses, les données attendues et les réponses promises.

| Terme | Sens dans notre projet | Vérification |
|---|---|---|
| Processus | Programme Node en cours d’exécution. | Le terminal reste occupé jusqu’à Ctrl+C. |
| Module | Fichier qui importe ou exporte des fonctions. | L’extension `.mjs` active les imports ECMAScript. |
| Port | Numéro permettant de joindre un service sur une machine. | Ici 3000 ; un autre processus ne peut pas déjà l’occuper. |
| Route | Méthode HTTP et chemin reconnus par le serveur. | GET /health est différent de POST /message. |

Créez `bonjour.mjs`, puis lancez `node bonjour.mjs` dans son dossier :

```js
const personnage = { nom: "A Fata", role: "gardienne du passage" };
console.log(`${personnage.nom} : ${personnage.role}`);
```

**Sortie terminal attendue :** A Fata : gardienne du passage. Aucun navigateur ne s’ouvre automatiquement. Modifiez le rôle et relancez : un fichier modifié ne remplace pas spontanément un processus déjà lancé.

<a id="contrat"></a>

## Les routes et le contrat HTTP/JSON

| Requête | Corps | Réponse attendue |
|---|---|---|
| GET /health | Aucun. | 200, objet avec ok et personnage. |
| POST /message | Objet JSON avec message, texte de 1 à 1000 caractères. | 200, objet avec personnage et reply. |
| POST /message invalide | JSON mal formé ou message invalide. | 400, objet avec error. |
| Autre route | — | 404, objet avec error. |

Le corps et le statut sont deux informations différentes. Un objet avec error envoyé en 200 reste une réussite HTTP : le client ne peut pas utiliser correctement response.ok. Le Content-Type indique ici que le corps est du JSON.

<a id="serveur"></a>

## Le serveur HTTP avec node:http

Copiez ce bloc dans `personnage.mjs`. Il utilise le module HTTP fourni avec Node. Les étapes suivantes remplacent seulement la fonction repondre ; elles conservent le même contrat.

```js
import { createServer } from "node:http";

const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "127.0.0.1";
const personnage = process.env.PERSONNAGE || "A Fata";

function envoyer(response, status, data) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(data));
}

async function lireJSON(request) {
  const morceaux = [];
  let taille = 0;
  for await (const morceau of request) {
    taille += morceau.length;
    if (taille > 65536) throw new Error("Corps trop volumineux");
    morceaux.push(morceau);
  }
  return JSON.parse(Buffer.concat(morceaux).toString("utf8"));
}

async function repondre(message) {
  return `Je suis ${personnage}. J’ai reçu : ${message}`;
}

createServer(async (request, response) => {
  const chemin = new URL(request.url, "http://local").pathname;
  if (request.method === "GET" && chemin === "/health") {
    return envoyer(response, 200, { ok: true, personnage });
  }
  if (request.method !== "POST" || chemin !== "/message") {
    return envoyer(response, 404, { error: "Route inconnue" });
  }

  let data;
  try {
    data = await lireJSON(request);
  } catch {
    return envoyer(response, 400, { error: "Corps JSON illisible ou trop grand" });
  }
  if (!data || typeof data.message !== "string" ||
      !data.message.trim() || data.message.length > 1000) {
    return envoyer(response, 400, { error: "Message requis : 1 à 1000 caractères" });
  }
  try {
    const reply = await repondre(data.message.trim());
    return envoyer(response, 200, { personnage, reply });
  } catch (error) {
    console.error(error.message);
    return envoyer(response, 502, { error: "Service de génération indisponible" });
  }
}).listen(port, host, () => {
  console.log(`API : http://${host}:${port}`);
});
```

La fonction envoyer termine chaque réponse. Le return évite de poursuivre et d’envoyer une deuxième réponse. lireJSON attend les morceaux du corps : un réseau ne garantit pas un seul morceau. La taille est limitée avant le décodage ; la limite de 1000 caractères concerne ensuite le message. Ces deux limites n’ont pas la même unité.

async permet d’utiliser await ; await suspend cette fonction pendant une opération asynchrone. Cela ne transforme pas toutes les opérations en traitements parallèles. Le try/catch de lecture produit une erreur du client ; celui de génération signale une dépendance indisponible.

<a id="tests"></a>

## Tester GET et POST dans le terminal

Lancez `node personnage.mjs`, puis ouvrez `http://127.0.0.1:3000/health`. **Résultat attendu :** un objet JSON avec ok à true. Le navigateur effectue un GET ; il ne teste pas ainsi notre POST. Dans un deuxième terminal :

```sh
curl -i http://127.0.0.1:3000/health
curl -i -X POST http://127.0.0.1:3000/message -H 'Content-Type: application/json' -d '{"message":"Bonjour"}'
```

Sous Windows PowerShell, utilisez ce test POST pour éviter les différences de guillemets et l’alias curl :

```powershell
$body = @{ message = "Bonjour" } | ConvertTo-Json
Invoke-RestMethod -Uri http://127.0.0.1:3000/message -Method Post -ContentType application/json -Body $body
```

**Sortie attendue :** personnage vaut A Fata et reply contient Bonjour. Pour lire les en-têtes sous Windows, `curl.exe -i http://127.0.0.1:3000/health` utilise le véritable programme curl.

## Pour approfondir

- [Modules ECMAScript dans Node](https://nodejs.org/docs/latest-v22.x/api/esm.html).
- [Serveur HTTP et réponse](https://nodejs.org/docs/latest-v22.x/api/http.html).
- [Guide MDN des méthodes HTTP](https://developer.mozilla.org/fr/docs/Web/HTTP/Reference/Methods).
