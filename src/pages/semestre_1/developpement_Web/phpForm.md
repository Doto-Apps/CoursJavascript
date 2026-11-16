---
layout: "layouts/Layout.astro"
title: "TP PHP : formulaire de connexion et session"
type: "TP"
order: 5
quizId: "s1-dev-04"
previousSession: "/semestre_1/developpement_Web/phpVarTab"
nextSession: "/semestre_1/developpement_Web/phpminichat2"
---

Une page de connexion reçoit une saisie, vérifie les identifiants puis conserve l’identité reconnue en session. Cette identité sera réutilisée par le mini-chat de la séance 6. Conservez votre travail fonctionnel à la fin de cette séance.

| Temps indicatif | Activité |
|---|---|
| 10 min | QCM sur tableaux, boucles, sélection et affichage |
| 40 min | Formulaires, validation, sessions et navigation entre pages |
| 60 min | Réalisation autonome de la connexion |
| 10 min | Tests et préparation de la réutilisation au prochain cours |

<a id="formulaire"></a>

## action, method, name et label

| Élément | Rôle |
|---|---|
| `action` du formulaire | Adresse du script destinataire |
| `method="post"` | Envoi des champs dans le corps de la requête |
| `name` d’un contrôle | Clé transmise au serveur |
| `id` et `for` du label | Association entre contrôle et étiquette visible |
| Bouton de type submit | Soumission du formulaire |

```html preview title="Un formulaire avec des champs nommés" height=210
<form method="post" action="reception.php">
  <label for="nom">Nom</label><input id="nom" name="nom" required>
  <label for="sujet">Sujet</label><input id="sujet" name="sujet" required>
  <button type="submit">Envoyer</button>
</form>
```

Ce rendu fixe montre des contrôles ; le PHP s’exécute dans votre projet local. `id` ne remplace pas `name`. GET place les paramètres dans l’URL ; POST transmet les champs dans le corps. POST ne chiffre pas le transport : HTTPS remplit ce rôle. Un champ de type password masque visuellement la saisie ; cela ne chiffre pas la requête.

<a id="reception"></a>

## Lire et valider la requête

Une visite de page utilise généralement GET ; le traitement d’un formulaire POST se place dans une branche vérifiant `$_SERVER['REQUEST_METHOD']`. `$_POST` contient ici les champs du formulaire, tandis que `$_GET` contient les paramètres de l’URL.

```php
$valeur = $_POST['sujet'] ?? '';
if (!is_string($valeur)) {
    $erreurs[] = 'Le sujet doit être du texte.';
} else {
    $sujet = trim($valeur);
}
```

`??` fournit une valeur de repli lorsque la clé manque ou vaut null. Vérifiez le type avant d’utiliser une fonction de chaîne : un client peut envoyer un tableau. `trim` retire les espaces aux extrémités, pas ceux au milieu. Pour un mot de passe, conservez la valeur exacte saisie : retirer silencieusement des espaces peut changer le secret.

`required` et les autres contraintes HTML aident la saisie, mais le serveur doit vérifier les données de nouveau. Une chaîne vide, un champ absent et une valeur de mauvais type doivent être traités explicitement. `strlen` compte des octets, pas des caractères Unicode ; annoncez les limites utilisées au lieu de confondre les deux unités.

<a id="identite"></a>

## Vérifier une identité avant de la mémoriser

Une saisie n’est pas une identité vérifiée. Dans l’atelier, un tableau PHP côté serveur associe chaque identifiant à un pseudo et à un mot de passe fictif. On recherche l’entrée correspondante puis on compare le mot de passe reçu avec celui prévu. Une comparaison stricte vérifie valeur et type. Aucun compte n’est créé depuis le formulaire.

Les mots de passe de test sont conservés **en clair dans ce tableau**, pour travailler directement la comparaison stricte `===` déjà vue en séance 2. Le texte saisi doit correspondre exactement au mot de passe du compte sélectionné. Cet exercice réutilise les tableaux, les accès par clé et les conditions.

Un refus affiche un message général d’identifiants incorrects. Il ne crée aucune identité connectée. Ne conservez pas le mot de passe dans la session et ne le réaffichez pas dans le formulaire. Les comptes fixes de cet atelier local servent à comprendre le parcours ; une gestion de comptes réels et le stockage sécurisé des mots de passe seront étudiés séparément.

<a id="session"></a>

## Retrouver des données entre les requêtes

Une variable PHP ordinaire disparaît à la fin de la requête. `session_start()` crée ou reprend une session ; `$_SESSION` permet de retrouver ses données côté serveur lors d’une autre requête. Chaque page qui utilise la session doit la démarrer avant toute sortie HTML.

```php
<?php
session_start();
$_SESSION['preferences'] = ['theme' => 'clair'];
```

Cet exemple conserve une préférence, pas une connexion. Sur une autre page qui reprend la même session, cette valeur peut être relue. Le navigateur transmet habituellement un identifiant de session dans un cookie ; ce cookie ne contient pas directement tout le tableau PHP. Deux navigateurs indépendants peuvent utiliser deux sessions différentes. La durée de conservation dépend de la configuration : une session n’est pas un stockage permanent garanti.

Après la validation d’une connexion, `session_regenerate_id(true)` renouvelle l’identifiant de session. Il s’utilise après `session_start()` et avant la redirection. Une session ne vérifie pas elle-même les identifiants : elle conserve le résultat de la vérification effectuée par le programme. [Manuel PHP](https://www.php.net/manual/fr/function.session-regenerate-id.php).

<a id="contrat-session"></a>

## Le contrat à réutiliser en séance 6

| Donnée | Convention commune aux pages |
|---|---|
| Identité connectée | Entrée `utilisateur` de `$_SESSION` |
| Champs conservés | `identifiant` et `pseudo`, deux chaînes issues du compte vérifié côté serveur |
| Visiteur non connecté | Absence de cette entrée |
| Mot de passe | Jamais conservé dans cette entrée |

Un même nom de clé doit être utilisé par la connexion, la page d’accueil, la déconnexion et le futur mini-chat. La page protégée vérifie l’existence et la forme de l’identité avant de présenter son contenu. Un champ caché ou un pseudo envoyé par le formulaire ne prouve pas la connexion.

| Contrôle PHP | Utilité pour vérifier la forme des données |
|---|---|
| `isset` | Tester si une entrée existe et n’est pas null |
| `is_array` | Vérifier qu’une valeur est un tableau avant d’en lire les champs |
| `is_string` | Vérifier qu’un champ contient du texte |

Il faut combiner les contrôles nécessaires : la présence d’une entrée seule ne prouve pas que ses champs ont la forme attendue.

<a id="redirection"></a>

## POST, redirection, GET

Après une modification réussie, une réponse 303 indique au navigateur de charger une page en GET. Cela évite qu’un rechargement ordinaire renvoie le même formulaire. `header` doit être appelé avant toute sortie ; `exit` termine le script après l’envoi de la redirection.

```php
header('Location: confirmation.php', true, 303);
exit;
```

Ce fragment illustre une redirection ; son adresse doit correspondre à une page réelle du projet. Après un échec, affichez les erreurs et conservez les valeurs utiles, sauf le mot de passe. Une redirection ne remplace ni la validation ni le contrôle d’accès sur la page de destination.

<a id="deconnexion"></a>

## Déconnexion et affichage

`unset` retire une entrée de tableau. Pour déconnecter l’utilisateur selon notre contrat, retirez l’entrée d’identité de la session, puis redirigez vers la connexion. Cela retire l’identité utilisée par l’application, sans prétendre supprimer toutes les autres données possibles de la session. Déclenchez cette action par un formulaire POST.

Tout texte réaffiché dans le HTML, y compris un pseudo provenant de la session, doit être échappé avec `htmlspecialchars(..., ENT_QUOTES, 'UTF-8')`. La validation décide ce qu’on accepte ; l’échappement décide comment on affiche le texte dans ce contexte.

<a id="exercices-autonomes"></a>

## TP autonome — préparer l’accès au mini-chat

Réalisez une page de connexion, une page d’accueil protégée et une déconnexion. Aucun programme de départ n’est fourni. Les exemples du cours illustrent les mécanismes séparément ; vous devez les assembler.

### Comptes fictifs de l’atelier

| Identifiant | Pseudo affiché | Mot de passe de test |
|---|---|---|
| lea | Léa | atelier |
| sam | Sam | campus |

Définissez ces comptes dans un tableau PHP côté serveur. La connexion demande identifiant et mot de passe. Une identité reconnue permet d’atteindre l’accueil ; celui-ci affiche le pseudo et propose une déconnexion. Les identifiants incorrects restent sur la connexion avec un message utile. Une visite directe de l’accueil sans connexion renvoie vers la page de connexion.

Les mots de passe fictifs sont en clair : retrouvez celui du compte demandé et comparez-le à la saisie avec la comparaison stricte étudiée. Il faut vérifier aussi que le compte existe avant d’accéder à ses champs.

Respectez le contrat de session défini plus haut. Le nom des fichiers et l’organisation du traitement vous appartiennent. Le programme ne doit dépendre ni de JavaScript ni d’une base de données.

### Vérifications avant la fin de séance

| Essai | Résultat attendu |
|---|---|
| Visite directe de l’accueil sans connexion | Retour à la connexion |
| Compte connu et bon mot de passe | Accueil et pseudo correspondant au compte |
| Mauvais mot de passe ou identifiant inconnu | Refus ; aucune identité créée |
| Champ absent, espaces seuls ou tableau au lieu du texte | Refus contrôlé, pas d’erreur PHP |
| Rechargement après connexion | Même identité, nouvelle visite GET |
| Déconnexion puis visite directe de l’accueil | Accès refusé |
| Autre navigateur | Session indépendante |

Conservez votre projet : la séance 6 utilisera cette connexion. Vous devrez savoir expliquer la différence entre données reçues, compte reconnu et identité mémorisée en session.
