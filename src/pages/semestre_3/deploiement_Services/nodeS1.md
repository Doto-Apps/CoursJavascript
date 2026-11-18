---
layout: "layouts/Layout.astro"
title: "Introduction à Node.js et Express"
type: "TD"
order: 1
nextSession: "/semestre_3/deploiement_Services/nodeS2"
---

Ce support reprend la séance du matin du 18 novembre 2026. Retrouvez les commandes du terminal et le premier exemple de serveur Express qui renvoie la valeur d’une constante.

<a id="terminal"></a>

## Se déplacer dans le terminal

- `cd` signifie *Change Directory*. Cette commande change le répertoire courant du terminal.
- `mkdir` signifie *Make Directory*. Cette commande crée un répertoire.

```sh
mkdir premier-serveur
cd premier-serveur
```

La première commande crée le dossier `premier-serveur` et la seconde vous place à l’intérieur. Vous pouvez alors créer les fichiers du projet dans ce dossier. Pour revenir au dossier parent, utilisez `cd ..`.

<a id="execution"></a>

## Exécuter JavaScript avec Node.js

Node.js est un environnement qui exécute JavaScript hors du navigateur, notamment côté serveur. Comme pour un script PHP exécuté côté serveur, le programme tourne sur la machine qui héberge le service. Un programme Node.js peut aussi simplement afficher du texte dans le terminal.

Enregistrez ce fragment dans un fichier `app.js`.

```js
const message = "Bonjour depuis Node.js";
console.log(message);
```

Depuis le répertoire du fichier, exécutez `node app.js` pour lancer `app.js` avec Node.js. La commande suit la forme `node fichier.js`, où `fichier.js` est le nom du fichier à exécuter. Le message s’affiche dans le terminal. Changez sa valeur et relancez la commande pour voir le résultat.

Si le fichier exécuté contient le code de démarrage d’un serveur, cette commande lance ce serveur.

<a id="dependances"></a>

## Initialiser le projet et installer une bibliothèque

Une bibliothèque JavaScript rassemble des fonctions écrites pour être réutilisées dans d’autres projets. Vous écrivez la logique de votre application en JavaScript et vous pouvez utiliser des bibliothèques pour des tâches courantes, comme gérer des requêtes HTTP. npm sert notamment à déclarer et installer ces bibliothèques dans un projet.

- `npm init` initialise un projet Node.js et crée le fichier `package.json` après les questions de configuration.
- `npm install nom-du-paquet` installe une dépendance. Pour installer Express, utilisez `npm install express`.
- `package.json` contient les informations du projet, ses dépendances et ses scripts npm.

```sh
npm init
npm install express
```

Exécutez les commandes dans le dossier du projet. Après l’installation, ouvrez `package.json` et repérez `express` dans `dependencies`.

<a id="scripts-npm"></a>

## Lancer une commande avec un script npm

Un script npm associe un nom à une commande. Voici un exemple de section `scripts` dans `package.json`.

```json
{
  "scripts": {
    "serveur": "node app.js"
  }
}
```

Ajoutez l’entrée `serveur` dans la section `scripts` du fichier existant. Pour exécuter un script défini dans `package.json`, utilisez `npm run nom-du-script`. Ici, `npm run serveur` lance `node app.js`. Si vous utilisez encore le premier exemple, le même message s’affiche dans le terminal.

<a id="express"></a>

## Créer une application avec Express

Node.js exécute le code JavaScript. Express est une bibliothèque JavaScript qui facilite la création de serveurs HTTP et d’API.

```js
const express = require("express");
const app = express();
```

Dans cet exemple, `require("express")` charge la dépendance installée, puis `express()` crée l’application. La variable `app` permet de déclarer des routes et de démarrer l’écoute du serveur. Cet extrait utilise le format CommonJS dans `app.js`. Si le projet est déclaré avec `"type": "module"` dans `package.json`, utilisez `import express from "express"` à la place de la ligne avec `require`.

<a id="routes"></a>

## Renvoyer une constante sur une route

Une route Express associe une méthode HTTP et un chemin d’URL à une fonction de traitement. Le navigateur joue le rôle du client. Il envoie une requête et le serveur lui renvoie une réponse.

Dans l’exemple suivant, la méthode est `GET` et le chemin est `/message`. Quand une requête correspond, Express appelle la fonction. `res.send(message)` envoie la valeur de la constante au client.

```js
const message = "Bonjour depuis Express";
app.get("/message", (req, res) => {
  res.send(message);
});
```

`app.get()` déclare une route pour la méthode HTTP GET. Express propose aussi `app.put()` pour déclarer une route qui répond à une requête PUT.

<a id="ecoute"></a>

## Démarrer et relancer le serveur

`app.listen(port)` démarre l’écoute du serveur sur le port indiqué afin qu’il puisse recevoir des requêtes HTTP. Le port sert à joindre le bon service sur la machine.

```js
const port = 3000;
app.listen(port);
```

Placez les extraits Express, route et écoute dans cet ordre dans `app.js`. Lancez le fichier avec `node app.js` ou avec le script npm. Ouvrez `http://localhost:3000/message`. Le navigateur affiche `Bonjour depuis Express`. Essayez une autre valeur pour la constante. Avec le lancement simple, arrêtez le serveur avec `Ctrl+C`, relancez-le puis actualisez la page.

Le rechargement automatique surveille les fichiers du projet et redémarre le processus Node.js lorsqu’un fichier change. Actualiser l’onglet renvoie une requête au serveur.

<a id="client-serveur"></a>

## Récupérer la réponse depuis une page HTML

Dans la page `index.html` de la séance, `fetch()` sert à envoyer une requête HTTP depuis le JavaScript du navigateur. Le navigateur peut ainsi récupérer le message du serveur pour l’afficher dans la page. La séance suivante consacrée à `fetch()` détaillera la lecture de la réponse.

L’origine d’une URL combine le protocole, le nom d’hôte et le port. Par exemple, une page servie sur `http://localhost:5500` et l’API sur `http://localhost:3000` ont des origines différentes. Les règles CORS déterminent si le navigateur laisse le JavaScript de la page accéder à la réponse de l’API.

Le paquet `cors` s’installe avec `npm install cors`. Dans cet exemple, le serveur autorise l’origine de la page. Placez ce réglage après la création de `app` et avant les routes, puis adaptez l’origine à l’adresse depuis laquelle votre page est servie.

```js
const cors = require("cors");
app.use(cors({ origin: "http://localhost:5500" }));
```

Dans un projet en modules ECMAScript, chargez le paquet avec `import cors from "cors"`. Depuis la page servie à l’origine autorisée, le navigateur peut lire le texte renvoyé par `/message`.
