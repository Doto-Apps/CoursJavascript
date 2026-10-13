---
layout: "layouts/Layout.astro"
title: "Le Web : du navigateur au serveur"
type: "CM"
order: 1
nextSession: "/semestre_1/integration/htmltd"
---

<a id="comprendre"></a>

## Fichier HTML, navigateur et serveur

Un **navigateur** est un logiciel client : il demande des ressources et les présente. Un **serveur** est un programme qui attend des demandes et produit des réponses. Ces rôles ne désignent pas nécessairement deux machines : votre ordinateur peut exécuter les deux pendant un TP. Internet est le réseau qui transporte les échanges ; le Web est un service utilisant notamment HTTP sur ce réseau.

| Terme | Exemple | Ce que cela signifie |
|---|---|---|
| Protocole | `https` | Les règles de l’échange, avec chiffrement du transport. |
| Nom d’hôte | `doto.ovh` | Le nom du serveur demandé, traduit en adresse IP par le DNS. |
| Chemin | `/semestre_1/integration/web` | La ressource demandée à ce serveur. |
| Paramètre | `?theme=photo` | Une donnée transmise dans l’adresse ; sa signification dépend du serveur. |
| Fragment | `#programme` | Un repère traité par le navigateur, non envoyé dans la requête HTTP. |

Pour afficher une page, le navigateur résout l’hôte, établit une connexion et demande le document. Il lit ensuite le HTML. Une référence à une feuille CSS ou à une image peut provoquer une autre requête : un document HTML et ses ressources ne sont pas un fichier unique. Le cache peut éviter certains téléchargements ; l’onglet Réseau permet de voir ce qui a réellement été demandé.

```text
Navigateur  → GET /index.html → serveur
Navigateur  ← HTML + statut 200 ← serveur
Navigateur  → GET /style.css → serveur
Navigateur  ← CSS + statut 200 ← serveur
```

Le **statut HTTP** décrit le résultat d’une requête. Un `404` pour `style.css` ne signifie pas que le document HTML est absent : celui-ci peut rester visible sans sa mise en forme. Un `500` indique une erreur du serveur ; ce n’est pas une erreur de couleur ou de police. Un script PHP est exécuté côté serveur : le navigateur reçoit son résultat, pas son code source PHP.

**Méthode de diagnostic :** relever la ressource en échec, son adresse et son statut avant de modifier le code. Une URL correcte dans l’éditeur peut rester incorrecte sur un serveur dont les noms de fichiers sont sensibles à la casse.

## La réponse du serveur et le document HTML

Quand vous ouvrez une page, vous ne recevez pas « un site » comme une photographie unique. Le navigateur demande un document, le lit, puis demande les ressources référencées : feuille de style, image, script. Un serveur est un programme qui répond aux demandes ; il peut fonctionner sur une machine distante ou sur votre propre ordinateur. Le navigateur est ici le client. Internet transporte les échanges ; le Web désigne le service fondé notamment sur les URL et HTTP.

## HTML, CSS et JavaScript

| Couche | Ce qu’elle décrit | Exemple observable |
|---|---|---|
| HTML | Le contenu et sa structure | Un titre et un bouton existent. |
| CSS | La présentation | Le titre devient bleu. |
| JavaScript | Les réactions programmées | Le bouton fait apparaître un message. |

```html live title="Contenu, présentation et réaction"
<style>
      body {
        font-family: system-ui, sans-serif;
        margin: 16px;
        color: #203047;
        background: #f3f6fa;
      }
      h1 {
        color: #2457a7;
      }
      button {
        padding: 12px;
      }
    </style>

<h1>HTML structure cette page</h1>
    <p>CSS donne au titre sa couleur. JavaScript réagit au bouton.</p>
    <button type="button">Afficher un message</button>
    <p id="resultat" role="status"></p>
    <script>
      document.querySelector("button").addEventListener("click", () => {
        document.querySelector("#resultat").textContent =
          "Le clic a déclenché du JavaScript.";
      });
    </script>
```

**Lecture accompagnée :** repérez le `h1` dans le HTML, la déclaration `color` dans le CSS et le gestionnaire de clic dans le script. Le bouton reste présent quand on retire le script ; son comportement change. Le titre reste un titre quand on retire sa couleur.

**Erreur à discuter :** « mon navigateur exécute PHP ». Dans cette architecture, PHP produit une réponse sur le serveur ; le navigateur reçoit le résultat. Il ne lit pas les instructions PHP comme il lit le JavaScript de la page.

<a id="reseau"></a>

## Internet et le Web

Internet est le réseau qui relie des machines. Le Web est un service utilisant ce réseau pour consulter des ressources liées entre elles. Le courrier électronique utilise aussi Internet, mais n'est pas une page Web. Tim Berners-Lee a proposé le Web au CERN en 1989 : son idée centrale est de relier des documents par des liens hypertextes.

Le navigateur est le logiciel client qui demande une ressource et affiche une page. Un serveur Web reçoit des requêtes et renvoie des réponses. Le même ordinateur peut jouer les deux rôles pendant le développement. `localhost` désigne votre propre machine : votre voisin possède son propre `localhost`.

**Image mentale :** le navigateur est le lecteur, le serveur est le bibliothécaire, l'URL est l'adresse du livre. Cette comparaison aide à comprendre la demande, mais un serveur ne fait pas seulement chercher un fichier : il peut aussi fabriquer une réponse.

<a id="url"></a>

## La structure d’une URL

```text
https://cours.example:443/profils.html?theme=clair#equipe
│       │             │              │           └ fragment dans la page
│       │             │              └ paramètres de requête
│       │             └ chemin de la ressource
│       └ nom d'hôte et port
└ protocole
```

HTTPS chiffre les échanges entre le client et le serveur. Le nom d'hôte identifie la machine à contacter ; DNS permet de retrouver son adresse IP. Le chemin désigne la ressource demandée. Le port identifie un service sur une machine. Le fragment après `#` est utilisé par le navigateur pour atteindre une partie de la page et n'est pas envoyé dans la requête HTTP.

Les paramètres après `?` transmettent des valeurs dans l'URL. Une URL relative comme `images/avatar.svg` est résolue par rapport à l'adresse de la page courante. Une URL absolue fournit notamment le protocole et le nom d'hôte.

<a id="http"></a>

## La requête et la réponse HTTP

```text
Navigateur → DNS : où se trouve cours.example ?
Navigateur → serveur : GET /profils.html
Serveur → navigateur : statut 200 + contenu HTML
Navigateur → serveur : GET /styles.css, GET /images/avatar.svg
Navigateur : construit la page et applique les styles
```

HTTP organise l'échange sous forme de requête puis réponse. `GET` demande une ressource. Le statut `200` indique une requête réussie ; `404` indique que la ressource n'a pas été trouvée. Une réponse contient des informations d'en-tête et peut contenir un corps, par exemple le document HTML. Une page peut déclencher plusieurs requêtes pour ses images et sa feuille CSS. Le cache peut réutiliser une ressource déjà reçue et éviter certains transferts.

**Manipulation :** ouvrez les outils de développement (F12 ou le menu Inspecter), choisissez Réseau, puis rechargez une page. Cliquez sur la requête du document. Repérez URL, méthode, statut et type de contenu. Comparez avec une requête d'image. Cherchez la ressource concernée lorsqu'un chargement échoue.

<a id="langages"></a>

## Les rôles de HTML, CSS et JavaScript

HTML décrit la structure et le sens du contenu. CSS définit sa présentation. JavaScript peut modifier la page et gérer des interactions. PHP s'exécute côté serveur et peut produire le HTML envoyé au navigateur. Une page statique peut être envoyée telle quelle ; une page dynamique peut être construite à partir de données. Le navigateur reçoit le résultat du PHP, pas son code source serveur.


**Essayez :** changez le texte du titre, puis la couleur de fond. Nommez le langage modifié à chaque étape. Désactivez le CSS en supprimant temporairement le contenu du bloc `style` : le contenu reste présent. Réinitialisez ensuite l'exemple.

## Pour approfondir

- [Fonctionnement du Web — MDN](https://developer.mozilla.org/fr/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works).
- [Référence HTTP et statuts — MDN](https://developer.mozilla.org/fr/docs/Web/HTTP).
- [Histoire du Web — CERN](https://home.cern/science/computing/the-birth-of-the-web/).
