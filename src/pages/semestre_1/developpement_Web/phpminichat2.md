---
layout: "layouts/Layout.astro"
title: "TP PHP : un mini-chat persistant en session"
type: "TP"
order: 6
quizId: "s1-dev-05"
previousSession: "/semestre_1/developpement_Web/phpForm"
---

<a id="comprendre"></a>

## Variables de requête et session PHP

Une variable locale PHP disparaît lorsque le script finit. Une **session** permet de retrouver des données côté serveur lors d’une autre requête associée à la même session. Le navigateur conserve habituellement un identifiant de session dans un cookie ; il ne contient pas directement tout l’historique du chat.

`session_start()` initialise ou reprend la session et doit être exécuté avant une sortie qui empêcherait l’envoi des en-têtes. `$_SESSION['messages']` peut contenir un tableau de messages. Cette solution reste un exercice local : l’historique est celui de la session, pas un salon partagé garanti entre tous les étudiants.

## Le cycle POST, redirection, GET

| Étape | Responsabilité | Échec à éviter |
|---|---|---|
| POST | Recevoir le formulaire. | Ajouter un message sur une simple visite GET. |
| Validation | Vérifier les champs. | Conserver une saisie vide ou de mauvais type. |
| Ajout | Ajouter une seule entrée à l’historique. | Réécrire toutes les anciennes entrées. |
| Redirection | Renvoyer vers une page GET. | Relancer l’ajout au rechargement. |
| Affichage | Parcourir puis échapper les textes. | Interpréter une saisie comme du HTML. |

Le schéma **POST → redirection → GET** sépare modification et lecture. `header('Location: ...', true, 303)` demande une nouvelle visite de la page ; `exit` arrête ensuite le script. Sans cet arrêt, des instructions placées après la redirection pourraient continuer à s’exécuter.

## La taille de l’historique en session

Chaque message est un enregistrement, par exemple un pseudo et un texte. Le rendu utilise une boucle commune. Un état vide indique qu’aucun message n’a encore été envoyé : ce n’est pas une panne. Une limite de taille de message et une limite de nombre d’entrées évitent un historique incontrôlé dans cet exercice.

Testez une nouvelle session, l’ajout de deux messages, le rechargement après envoi et une saisie invalide. Une nouvelle session peut avoir un historique vide sans effacer celui d’une autre session. Pour un stockage partagé et durable, une base de données sera utilisée au semestre suivant : ce n’est pas une fonctionnalité cachée de `$_SESSION`.

## La persistance de $_SESSION

Une variable PHP ordinaire existe pendant l’exécution d’une requête. Recharger le script ne conserve pas automatiquement sa valeur. Une session permet de retrouver des données côté serveur grâce à un identifiant habituellement transmis par cookie. Le cookie n’a pas besoin de contenir l’historique complet.

```text
GET : retrouver la session → afficher l’historique
POST : retrouver la session → valider → ajouter le message
       → rediriger vers GET → afficher l’historique
```

La redirection après POST sépare l’enregistrement de l’affichage. Recharger la page affichée répète alors le GET plutôt que d’envoyer de nouveau le formulaire. Cela ne remplace pas la validation ni une protection contre toutes les demandes répétées, mais évite le renvoi accidentel lors d’un rechargement ordinaire.

```php
<?php
session_start();
$_SESSION['messages'] ??= [];
```

**Sortie attendue :** aucune sortie visible pour ces deux lignes ; elles préparent les données. `session_start()` et les en-têtes de redirection doivent intervenir avant l’envoi de HTML. Un espace ou un affichage placé trop tôt peut empêcher l’envoi d’un en-tête.

<a id="session"></a>

## session_start et $_SESSION

Les variables ordinaires d'un script PHP sont recréées à chaque requête. `session_start()` récupère ou crée une session avant toute sortie HTML. `$_SESSION` permet de conserver des données côté serveur entre les requêtes d'une même session. Le navigateur utilise habituellement un cookie d'identification ; ce cookie ne contient pas toute la liste des messages.

```php
<?php
session_start();
$_SESSION['messages'] ??= [];
```

Deux navigateurs différents ont normalement deux sessions distinctes. La durée de conservation dépend de la configuration du serveur et du navigateur. Pour un historique partagé et durable, on choisira une base de données au semestre 2 ; ne confondez pas session et stockage permanent.

<a id="ajout"></a>

## Validation et ajout d’un message

Réutilisez les validations de DEV-05. Enregistrez le texte original validé ; échappez-le lors de l'affichage, afin d'éviter un double échappement.

```php
if ($erreurs === []) {
    $_SESSION['messages'][] = ['pseudo' => $pseudo, 'message' => $message];
    $_SESSION['messages'] = array_slice($_SESSION['messages'], -20);
    header('Location: mini-chat.php', true, 303);
    exit;
}
```

`[]` ajoute un élément en fin de tableau. `array_slice(..., -20)` conserve au plus les vingt derniers messages. Cette limite évite un historique qui grossit sans fin dans l'exercice. Une requête invalide n'ajoute rien et affiche ses erreurs.

<a id="redirection"></a>

## POST, redirection, GET

```text
Envoi du formulaire → POST → validation et ajout
                           → réponse 303 avec Location
Navigateur → GET de la page → historique affiché
```

Après un ajout réussi, la redirection conduit à un GET. Recharger cette page GET n'ajoute pas de nouveau message. `header` doit être appelé avant tout contenu envoyé au navigateur ; `exit` termine le script après la redirection. Ce schéma réduit les doublons de rechargement, mais ne rend pas une requête malveillante impossible. Un service public nécessiterait notamment protections CSRF, authentification et limites adaptées ; le TP reste sur serveur local.

<a id="liste"></a>

## Affichage de l’historique et échappement

Parcourez `$_SESSION['messages']` avec `foreach`. Affichez pseudo et message avec `htmlspecialchars(..., ENT_QUOTES, 'UTF-8')`. Si la liste est vide, affichez « Aucun message ». Gardez un label pour chaque champ et un focus visible pour le bouton.

Téléchargez le [squelette à compléter](/exemples/s1/php/mini-chat-squelette.php) et renommez-le `mini-chat.php`. Le squelette contient les étapes à remplir, pas la correction complète. Faites d'abord fonctionner un ajout, puis la liste, puis la redirection. N'ajoutez pas MySQL à ce TP : son installation détournerait le temps des notions étudiées.

## La durée de vie des données PHP

Cette maquette JavaScript n’utilise pas de cookie : elle illustre seulement les deux durées de vie. Le tableau « session » simulé reste en mémoire lors d’une nouvelle requête simulée, mais disparaît lorsque vous réexécutez l’aperçu. Dans le mini-chat PHP réel, session_start() et le cookie de session relient plusieurs requêtes.

```html live title="Comparer mémoire de requête et session"
<style>
  body {
    margin: 16px;
    font-family: system-ui, sans-serif;
    color: #18324c;
  }
  .cartes {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  article,
  output {
    display: block;
    padding: 16px;
    border: 1px solid #9aaabe;
  }
  button,
  input {
    font: inherit;
    padding: 8px;
  }
  label {
    display: block;
    margin-block: 12px 4px;
  }
  :focus-visible {
    outline: 3px solid #2563eb;
    outline-offset: 3px;
  }
</style>

<h1>Messages et requêtes</h1>
<button id="ajouter" type="button">Ajouter un message</button>
<button id="requete" type="button">Simuler une nouvelle requête</button>
<p id="etat" role="status"></p>
<ol id="messages"></ol>
<script>
  const sessionSimulee = [];
  let variableDeRequete = [];
  function afficher() {
    document.querySelector("#etat").textContent =
      `Requête : ${variableDeRequete.length} ; session simulée : ${sessionSimulee.length}`;
    document.querySelector("#messages").replaceChildren(
      ...sessionSimulee.map((texte) => {
        const li = document.createElement("li");
        li.textContent = texte;
        return li;
      }),
    );
  }
  document.querySelector("#ajouter").addEventListener("click", () => {
    const texte = `Message ${sessionSimulee.length + 1}`;
    variableDeRequete.push(texte);
    sessionSimulee.push(texte);
    afficher();
  });
  document.querySelector("#requete").addEventListener("click", () => {
    variableDeRequete = [];
    afficher();
  });
  afficher();
</script>
```

**Résultat à observer :** Après deux ajouts puis une nouvelle requête simulée : compteur de requête 0, compteur de session 2. Vérifiez ensuite la conservation réelle dans le projet PHP et un autre navigateur.
