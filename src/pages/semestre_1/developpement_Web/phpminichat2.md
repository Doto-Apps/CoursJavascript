---
layout: "layouts/Layout.astro"
title: "TP PHP : mini-chat, session et fichier texte"
type: "TP"
order: 6
quizId: "s1-dev-05"
previousSession: "/semestre_1/developpement_Web/phpForm"
---

## Votre projet : une petite messagerie à construire vous-même

Vous avez testé une inscription à un atelier, des préférences de lecture et un carnet de sorties. Ce TP vous demande de **réutiliser ces mécanismes dans un nouveau projet** : une messagerie où plusieurs utilisateurs peuvent se connecter et écrire.

**Nous lisons le sujet ensemble en fin de Dev 05 ; vous réalisez ensuite tout le projet chez vous, seuls, pour la prochaine séance.** Le support vous guide avec des rappels, de petits extraits et des résultats à vérifier. Les conditions, les traitements, les boucles et l’interface restent à écrire et à assembler.

Le QCM ci-dessus sert à réviser le cours. Lors de la dernière séance, vous montrerez votre projet et répondrez à trois questions de compréhension.

<a id="tp-autonome"></a>

## Ce que l’on doit pouvoir faire

Se connecter, voir qui est connecté, envoyer un message, retrouver l’historique partagé et se déconnecter. Chaque message garde son auteur. Une personne non connectée ne peut ni ouvrir la conversation ni enregistrer un message.

Une page PHP classique suffit : l’historique se met à jour après un envoi ou un rechargement. Travaillez d’abord le fonctionnement ; soignez ensuite la présentation et choisissez vos améliorations personnelles.

<a id="organisation"></a>

## 1. Préparer votre projet

Placez un nouveau dossier `mini-chat` dans le dossier **`htdocs` de XAMPP**. Voici une organisation possible :

```text
mini-chat/
  connexion.php       formulaire et vérification du compte
  mini-chat.php       accès, envoi et affichage des messages
  deconnexion.php     retrait de l’identité connectée
  style.css           présentation de votre messagerie
  stockage/           fichier messages.txt, créé au premier envoi
```

Créez le dossier `stockage`. Toutes les pages doivent utiliser les mêmes noms de fichiers, de champs et d’entrées de session. Le dossier de Dev 05 reste disponible à côté pour retrouver les exemples ; il n’est pas votre application terminée.

**À vous :** créez les fichiers et le HTML de vos pages. Dans leur `<head>`, une balise `<link rel="stylesheet" href="style.css">` charge votre feuille CSS.

**Vérifiez :** la page de connexion s’ouvre avec XAMPP et votre CSS est chargé.

<a id="connexion"></a>

## 2. Adapter le formulaire à une connexion

Le formulaire de `inscription.php` envoyait un prénom et un atelier. Ici, `connexion.php` doit recevoir un **identifiant** et un **mot de passe** par POST.

Reprenez la structure d’un formulaire : `action` désigne le destinataire, `name` donne la clé reçue en PHP, et `id` correspond au `for` du libellé. Pour le mot de passe, `type="password"` masque la saisie à l’écran.

Dans `connexion.php`, avant le traitement, définissez ces comptes fictifs :

```php
$comptes = [
    'lea' => ['pseudo' => 'Léa', 'mot_de_passe' => 'atelier'],
    'sam' => ['pseudo' => 'Sam', 'mot_de_passe' => 'campus'],
];
```

Le premier niveau du tableau choisit un compte par son identifiant ; le second contient ses informations. Ces mots de passe de test sont en clair pour réutiliser les comparaisons étudiées ; ce n’est pas une gestion de comptes réels.

**À vous :** écrivez le formulaire avec `name="identifiant"` et `name="mot_de_passe"`. Au début du script, créez une variable d’erreur vide, puis traitez la saisie uniquement quand `$_SERVER['REQUEST_METHOD']` vaut `POST`. Retrouvez les deux valeurs dans `$_POST`, avec une valeur de repli.

Vérifiez qu’il s’agit de chaînes. Nettoyez l’identifiant avec `trim` et refusez un champ vide. Gardez la valeur exacte du mot de passe : ne modifiez pas ses espaces.

Une fois les données vérifiées, cette brique retrouve le compte :

```php
$compte = $comptes[$identifiant] ?? null; // Cherche le compte ou donne null s’il est inconnu.
// TODO : vérifier que le compte existe, puis comparer son mot de passe à la saisie avec ===.
```

Si la comparaison échoue, restez sur la connexion et affichez « Identifiants incorrects ». Ne réaffichez pas le mot de passe.

**Vérifiez :** Léa et Sam sont reconnus avec leurs bons identifiants ; un compte inconnu ou un mauvais mot de passe sont refusés.

Rappel : [formulaire et tableaux associatifs](/semestre_1/developpement_Web/phpForm#formulaire).

<a id="identite"></a>

## 3. Garder l’identité en session et contrôler l’accès

Dans l’espace de lecture, `$_SESSION['preferences']` conservait les choix du visiteur. Pour votre messagerie, choisissez une entrée `utilisateur` contenant seulement l’`identifiant` et le `pseudo` du compte reconnu.

Au début de chaque page qui utilise la session, avant le HTML :

```php
session_start(); // Retrouve les données de la session du navigateur.
```

Dans `connexion.php`, **uniquement après une vérification réussie**, adaptez cette brique :

```php
$_SESSION['utilisateur'] = [
    'identifiant' => $identifiant,
    'pseudo' => $compte['pseudo'], // Le pseudo vient du compte vérifié côté serveur.
];
// TODO : rediriger vers mini-chat.php en GET, puis arrêter le script.
```

En haut de `mini-chat.php`, après le démarrage de la session :

```php
$utilisateur = $_SESSION['utilisateur'] ?? null; // Retrouve l’identité, ou son absence.
// TODO : contrôler l’identité et refuser la suite du traitement si elle n’est pas valide.
```

**À vous :** utilisez `is_array`, `isset` et `is_string` pour vérifier la présence des deux champs attendus. Si l’identité est absente ou incorrecte, redirigez vers `connexion.php` et terminez avec `exit`. Faites ce contrôle **avant** de lire ou d’enregistrer les messages.

L’auteur sera toujours pris dans `$utilisateur['pseudo']`, jamais dans un champ de formulaire qui prétendrait désigner l’auteur.

**Vérifiez :** une visite directe du chat sans connexion renvoie à la connexion. Une connexion reconnue affiche le bon pseudo.

Rappels : [sessions et tableaux imbriqués](/semestre_1/developpement_Web/phpForm#contrat-session) · [redirection et arrêt du script](/semestre_1/developpement_Web/phpForm#redirection).

<a id="envoi"></a>

## 4. Recevoir un message

Dans le HTML de `mini-chat.php`, vous pouvez partir de ce formulaire :

```html
<form method="post" action="mini-chat.php">
  <label for="message">Votre message</label>
  <input id="message" name="message" required>
  <button type="submit">Envoyer</button>
</form>
```

**Avant le HTML**, le traitement doit se déclencher seulement en POST. La lecture de la donnée commence comme ceci :

```php
$brut = $_POST['message'] ?? ''; // Lit la donnée reçue, qui reste à vérifier.
// TODO : contrôler le type, les caractères réservés, puis nettoyer et vérifier le texte.
```

Nous choisissons un format simple : **une ligne de fichier par message, avec le pseudo puis le texte, séparés par une barre verticale**. Exemple : `Léa|Bonjour tout le monde`.

**À vous :** adaptez la validation du carnet :

- Le message doit être une chaîne, non vide après `trim`, de 1120 octets maximum avec `strlen`.
- Refusez `|`, `"\n"` et `"\r"` dans la saisie brute. Le carnet refusait un point-virgule : vous devez adapter ce contrôle au nouveau séparateur.
- En cas de refus, affichez une erreur, gardez le texte utile dans le champ et n’écrivez rien dans le fichier.

**Vérifiez :** un texte valide est accepté ; des espaces seuls ou un caractère réservé donnent une erreur. Une donnée envoyée sous forme de tableau est aussi refusée.

Rappel : [validation du carnet et caractères réservés](/semestre_1/developpement_Web/phpForm#stockage).

<a id="enregistrement"></a>

## 5. Ajouter au fichier sans effacer les anciens messages

Cette étape se place **après** les contrôles de connexion et de message, dans le traitement POST de `mini-chat.php`.

```php
$chemin = __DIR__ . '/stockage/messages.txt'; // Le chemin est fixé par votre code.
$pseudo = $utilisateur['pseudo']; // Retrouve l’auteur depuis la session.
$ligne = $pseudo . '|' . $message . PHP_EOL; // Prépare la ligne au nouveau format.
// TODO : écrire en ajout, vérifier le résultat puis traiter réussite ou échec.
```

`$message` désigne ici le texte que vous avez validé et nettoyé à l’étape précédente. Le point `.` assemble les morceaux ; `PHP_EOL` termine la ligne.

**À vous :** reprenez `file_put_contents` avec `FILE_APPEND | LOCK_EX`. Vérifiez que l’écriture a réussi. Si elle échoue, affichez une erreur et gardez la saisie. Si elle réussit, adaptez la redirection du carnet vers `mini-chat.php` avec le statut 303, puis `exit`.

**Vérifiez :** après deux envois, le fichier contient deux lignes. Actualiser la page après un envoi réussi n’ajoute aucune ligne.

Rappels : [chemins](/semestre_1/developpement_Web/phpForm#chemins) · [ajout et retour de file_put_contents](/semestre_1/developpement_Web/phpForm#ecriture).

<a id="historique"></a>

## 6. Relire et afficher l’historique

À chaque affichage du chat, relisez le fichier : le tableau PHP d’une ancienne requête n’existe plus. Si le fichier est absent au premier lancement, affichez « Aucun message pour le moment ».

**À vous :** adaptez la lecture de `carnet.php` avec `file_exists` et `file`. Un échec de lecture est une erreur à afficher, pas un historique vide normal. Parcourez les lignes avec `foreach`.

À l’intérieur de votre boucle, adaptez le découpage :

```php
$champs = explode('|', $ligne); // Ici, la barre verticale sépare l’auteur du texte.
// TODO : vérifier les deux champs avant de lire les positions 0 et 1.
```

La position `0` contient le pseudo ; la position `1` contient le message. Une ligne incomplète doit être ignorée sans arrêter les suivantes.

Pour produire une bulle, le mécanisme d’affichage reste celui du cours :

```php
<?= htmlspecialchars($texteAAfficher, ENT_QUOTES, 'UTF-8') ?>
```

Remplacez `$texteAAfficher` par la donnée à montrer. Échappez **le pseudo et le message**, puis construisez les éléments HTML de votre conversation. Ne transformez pas le texte en HTML avant de l’enregistrer.

**Vérifiez :** les messages apparaissent dans l’ordre du fichier. Un message comme `<strong>Bonjour</strong>` apparaît avec ses balises visibles, sans être interprété comme une mise en forme.

Rappel : [lecture, découpage et boucle du carnet](/semestre_1/developpement_Web/phpForm#lignes).

<a id="deconnexion"></a>

## 7. Permettre la déconnexion

Le bouton « Oublier mes préférences » retirait une entrée de session. Ici, votre bouton doit retirer **l’identité connectée**.

**À vous :** créez un formulaire POST vers `deconnexion.php`. Dans cette page, reprenez la session, retirez l’entrée `utilisateur` avec `unset`, puis redirigez vers la connexion et arrêtez le script. Ne supprimez pas le fichier de messages.

**Vérifiez :** après déconnexion, un accès direct au chat est refusé. Après reconnexion, les anciens messages sont toujours là.

Rappel : [retirer une entrée de session](/semestre_1/developpement_Web/phpForm#deconnexion).

<a id="presentation"></a>

## 8. Soigner l’interface et choisir vos améliorations

Travaillez le CSS : conversation lisible, auteurs reconnaissables, formulaire facile à utiliser, messages d’erreur compréhensibles. La présentation est évaluée ; elle reste votre création.

**Trois points sont réservés à une ou plusieurs améliorations personnelles que vous choisirez de montrer.** Une idée bien réalisée et expliquée peut suffire : il n’est pas demandé de multiplier les options.

| Piste possible | Pour démarrer votre réflexion |
|---|---|
| Vos messages à droite, les autres à gauche | Comparez l’auteur de la ligne au pseudo de la session, puis choisissez une classe CSS |
| Une image de profil par utilisateur | Préparez des images locales et un tableau qui associe chaque compte à son image |
| La date ou l’heure des messages | Reprenez `date` du carnet et adaptez ensemble le format écrit et sa lecture |
| Une autre idée utile | Expliquez ce qu’elle apporte et montrez son fonctionnement |

Ces pistes ne sont pas des fonctions obligatoires. Si vous ajoutez un champ au fichier, adaptez aussi le découpage et la vérification du nombre de champs. Gardez d’abord une version fonctionnelle du socle.

<a id="tests-livraison"></a>

## 9. Tester et préparer la présentation

| Essai | Résultat attendu |
|---|---|
| Ouvrir le chat ou lui envoyer un POST sans connexion | Accès refusé et aucun enregistrement |
| Envoyer deux messages avec Léa | Deux lignes conservées, signées Léa |
| Utiliser Sam dans une fenêtre privée ou un autre navigateur | Même historique, nouveaux messages signés Sam |
| Actualiser après un envoi réussi | Aucun doublon |
| Envoyer un message vide, trop long ou avec un caractère réservé | Erreur et fichier inchangé |
| Déconnexion puis reconnexion | Messages précédents toujours présents |
| Fichier absent ou ligne abîmée | État vide ou ligne ignorée, sans casser la page |

Les deux utilisateurs doivent utiliser la même application : deux copies sur deux machines ne partagent pas leur fichier.

<details>
<summary><strong>Si vous êtes bloqués</strong></summary>

Avancez dans l’ordre : connexion, session, un message enregistré, puis historique. Comparez chaque mécanisme avec l’exemple du cours qui le montre.

- Une donnée absente dans `$_POST` ? Comparez le `name` du champ et la clé lue par PHP.
- Une session perdue ? Vérifiez `session_start` avant le HTML et les noms des entrées.
- « Headers already sent » ? Cherchez un HTML, un espace ou un `echo` avant le démarrage de la session ou la redirection.
- Un seul message conservé ? Vérifiez `FILE_APPEND`.
- Un fichier introuvable ? Vérifiez le chemin et l’existence du dossier `stockage`.
- Une erreur d’indice ? Vérifiez les champs obtenus avec `explode` avant de les lire.

</details>

**À rendre pour la prochaine séance :** votre projet et un court README indiquant la page à ouvrir avec XAMPP, les comptes de test et les améliorations que vous souhaitez présenter. Le professeur précisera l’échéance et le dépôt. Gardez votre code ouvert pendant la démonstration.

<a id="evaluation"></a>

## Évaluation : projet sur 20 × compréhension

| Critère | Points | Appréciation globale |
|---|---:|---|
| Fonctionnalités PHP du mini-chat | 12 | Connexion, session, accès contrôlé, envoi, historique et déconnexion |
| Beauté et utilisation de l’interface | 5 | Présentation, lisibilité et facilité d’utilisation |
| Améliorations personnelles | 3 | Une ou plusieurs idées utiles, réalisées et expliquées |
| **Note du projet** | **20** | |

Les trois points d’amélioration font partie du total sur 20. Le professeur apprécie globalement votre réalisation, sans imposer une option précise ni un nombre de lignes de code.

Il pose ensuite **trois questions sur votre code** : par exemple le trajet du formulaire, l’identité en session et la conservation dans le fichier.

**Note finale = note du projet × (nombre de questions comprises ÷ 3).**

| Questions comprises | Coefficient | Exemple avec un projet à 18/20 |
|---|---:|---:|
| 0 sur 3 | 0 | 0/20 |
| 1 sur 3 | 1/3 | 6/20 |
| 2 sur 3 | 2/3 | 12/20 |
| 3 sur 3 | 1 | 18/20 |

**Zéro réponse comprise donne zéro, même avec un projet à 20/20.** Utilisez les exemples et les rappels pour comprendre et adapter chaque brique : le TP est conçu pour être réalisable avec ce cours, sans demander une application complète à une IA.
