---
layout: "layouts/Layout.astro"
title: "TP PHP : mini-chat, session et fichier texte"
type: "TP"
order: 6
quizId: "s1-dev-05"
previousSession: "/semestre_1/developpement_Web/phpForm"
---

Cette dernière séance assemble les acquis : formulaires, contrôle d’accès, session, tableaux, boucles et affichage. Une nouvelle notion permet de conserver un historique commun : la lecture et l’écriture d’un fichier texte côté serveur.

Utilisez PHP 8.0 ou plus pour les fonctions présentées, notamment `str_contains`. Reprenez l’environnement PHP local déjà utilisé ; les aperçus HTML du site de cours ne constituent pas un serveur PHP.

| Temps | Activité |
|---|---|
| 10 min | QCM sur la connexion et les sessions vues en séance 5 |
| 20 min | Fonctions de fichiers et format des données |
| 90 min | Mini-chat autonome, tests compris, à terminer avant la fin de séance |

Le mini-chat doit fonctionner à la fin des 90 minutes. Ce travail se réalise pendant la séance ; aucune remise différée n’est demandée. Préparez la connexion de la séance précédente avant de commencer.

<a id="stockage"></a>

## Session personnelle et historique partagé

La session indique qui est connecté grâce à l’entrée `utilisateur` créée en séance 5. Le fichier texte contient les messages, indépendamment de la session qui les a envoyés. Une déconnexion retire l’identité de cette session ; elle n’efface pas l’historique commun.

Deux navigateurs qui accèdent à la même application peuvent lire le même historique tout en utilisant des identités distinctes. Deux copies de l’application sur deux ordinateurs ne partagent pas automatiquement leurs fichiers locaux. Après un rechargement, le programme doit relire le fichier : l’ancien tableau PHP en mémoire n’existe plus.

<a id="chemins"></a>

## Emplacement et accès aux fichiers

Un chemin de fichier côté PHP désigne un emplacement sur le serveur, pas une URL. `__DIR__` désigne le dossier du script dans lequel il est écrit. Utiliser un chemin fixe calculé depuis ce dossier évite de dépendre du répertoire courant. Le visiteur ne choisit jamais le chemin du fichier de stockage.

Organisez le projet avec un dossier public pour les pages et un dossier de stockage voisin. Lancez le serveur PHP avec le dossier public comme racine Web. Le stockage reste alors accessible au PHP, sans être une page téléchargeable par son URL. Le dossier de stockage doit exister et le processus PHP doit pouvoir y écrire.

```text
atelier/
  public/       Pages PHP accessibles par le navigateur
  stockage/     Fichiers texte accessibles au PHP
```

Depuis le dossier `atelier`, lancez `php -S localhost:8080 -t public` puis ouvrez une page avec `http://localhost:8080`. Sous Windows avec XAMPP, remplacez `php` par `C:\xampp\php\php.exe` si nécessaire. L’option `-t` choisit la racine publique ; ouvrir un fichier avec `file://` n’exécute pas PHP. Vous pouvez réorganiser les pages de la séance 5 sans modifier le nom de la clé de session commune.

| Fonction | Question à laquelle elle répond |
|---|---|
| `file_exists` | Le chemin existe-t-il ? |
| `is_readable` | Le fichier est-il accessible en lecture ? |
| `is_writable` | Le fichier ou le dossier est-il accessible en écriture ? |
| `file_get_contents` | Quel est le contenu complet, sous forme d’une chaîne ? |
| `file` | Quelles sont les lignes, sous forme d’un tableau ? |

Un fichier absent au premier lancement peut représenter un historique encore vide. Un fichier existant mais illisible représente un échec à signaler. Ne présentez pas une panne de lecture comme une liste vide normale. Le résultat des fonctions de lecture se vérifie avant de le parcourir.

<a id="lignes"></a>

## Lire des lignes puis découper des champs

```php
$chemin = __DIR__ . '/../stockage/couleurs.txt';
$lignes = file($chemin, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
if ($lignes === false) {
    echo 'Lecture impossible';
}
```

Cet exemple suppose un fichier de couleurs existant. `file` renvoie un tableau de lignes, ou `false` si la lecture échoue. `FILE_IGNORE_NEW_LINES` retire les fins de ligne ; `FILE_SKIP_EMPTY_LINES` ignore les lignes vides. `|` combine ici des options ; ce n’est pas le séparateur des données. [Documentation de file](https://www.php.net/manual/fr/function.file.php).

Une ligne peut contenir plusieurs champs avec un séparateur convenu. `explode` transforme une chaîne en tableau de morceaux. Le séparateur est une chaîne exacte ; son choix et l’ordre des champs font partie du format.

```php
$ligne = 'bleu;#2457a7';
$champs = explode(';', $ligne);
echo $champs[0];
```

**Résultat :** le nom de la couleur. Le deuxième champ contient sa valeur hexadécimale. Vérifiez le nombre de morceaux avant d’accéder à une position. Une ligne mal formée ne doit pas provoquer de lecture d’indice absent. `implode` fait l’opération inverse : il réunit des éléments avec un séparateur. [Documentation de explode](https://www.php.net/manual/fr/function.explode.php).

Un retour à la ligne sépare les enregistrements ; un caractère à l’intérieur d’une ligne sépare leurs champs. Si une saisie peut contenir ces caractères réservés, le format devient ambigu. Dans ce premier format, on refuse ces caractères dans les champs, avec une erreur compréhensible. `str_contains` teste la présence d’une chaîne ; valider avant `trim` évite de faire disparaître un retour à la ligne interdit placé à une extrémité.

<a id="ecriture"></a>

## Écrire, ajouter et contrôler le résultat

```php
$chemin = __DIR__ . '/../stockage/visites.txt';
$octets = file_put_contents($chemin, 'Une visite' . PHP_EOL, FILE_APPEND | LOCK_EX);
if ($octets === false) {
    echo 'Enregistrement impossible';
}
```

`file_put_contents` écrit une chaîne et renvoie le nombre d’octets écrits, ou `false` en cas d’échec. Sans `FILE_APPEND`, le contenu existant est remplacé ; avec cette option, le texte est ajouté à la fin. Le fichier peut être créé, mais son dossier parent doit déjà exister. `PHP_EOL` ajoute un retour à la ligne adapté au serveur.

`LOCK_EX` demande un verrou exclusif pendant l’écriture afin de coordonner les écritures qui utilisent ce verrou. Il ne verrouille pas automatiquement une lecture faite par `file`. Pour une lecture coordonnée avec les écritures, `fopen`, `flock` avec `LOCK_SH`, `fgets` puis `fclose` permettent d’encadrer le parcours. Ce parcours bas niveau est un approfondissement ; le TP utilise la lecture simple d’un petit fichier et vérifie ses lignes. [Documentation de file_put_contents](https://www.php.net/manual/fr/function.file-put-contents.php).

Un échec d’enregistrement ne doit pas être annoncé comme un envoi réussi. Conservez la saisie et affichez une erreur. Les données validées sont écrites brutes ; l’échappement HTML intervient lors de leur affichage, pas lors de l’enregistrement.

<a id="reutilisation"></a>

## Réutiliser la connexion et les acquis

La page de chat commence par reprendre la session et contrôler l’identité selon le contrat de la séance 5. Le pseudo de l’auteur vient du compte connecté côté serveur, jamais d’un champ de formulaire prétendant désigner l’auteur. Une requête sans identité valide n’ajoute aucun message, même si elle est envoyée directement.

GET affiche l’état de la page ; POST représente une demande d’ajout à valider. Après une écriture réussie, le schéma POST, redirection 303 puis GET évite le renvoi accidentel du formulaire lors d’un rechargement. `header` et `exit` ont été expliqués en séance 5.

Pour le rendu, chaque message lu devient un enregistrement à présenter avec une structure HTML commune. Réutilisez `foreach` et `htmlspecialchars` de la séance 4. Une saisie ressemblant à du HTML doit apparaître comme texte. La déconnexion ne doit pas supprimer les messages du fichier.

<a id="tp-autonome"></a>

## TP autonome — mini-chat en 1 h 30

Vous disposez de votre projet de connexion et des supports de cours. Aucun programme de chat ni squelette à compléter n’est fourni. Organisez vous-même les fichiers, les traitements et les vérifications. L’objectif est un parcours fonctionnel à montrer avant la fin de séance, pas une maquette d’écran.

### Fonctionnalités attendues

Le visiteur se connecte avec un compte de test de la séance 5. Le chat affiche l’identité reconnue, l’historique et un formulaire d’envoi ; il propose aussi une déconnexion. Une visite non connectée renvoie vers la connexion et ne permet aucune écriture.

Un utilisateur connecté peut envoyer un message non vide. Chaque message est ajouté à un fichier texte commun, sans remplacer les précédents. Les messages sont relus depuis ce fichier et affichés dans leur ordre d’enregistrement. L’auteur affiché est celui de la session au moment de l’envoi.

### Format et règles à respecter

| Élément | Règle du TP |
|---|---|
| Stockage | Un fichier texte côté serveur, hors du dossier public |
| Enregistrement | Une ligne par message |
| Champs d’une ligne | Pseudo, puis texte du message, séparés par le caractère barre verticale |
| Message accepté | Chaîne non vide après suppression des espaces de bord, au plus 1120 octets |
| Caractères réservés | Barre verticale, retour chariot et saut de ligne refusés dans le message brut |
| Auteur | Pseudo issu de la session de connexion, pas d’une saisie supplémentaire |
| Premier lancement | Historique vide compréhensible si le fichier n’existe pas encore |
| Erreur de fichier | Message d’échec, aucune fausse confirmation |
| Ligne mal formée | Ignorée sans erreur d’indice et sans effacer les autres messages |
| Affichage | Texte échappé ; historique conservé après rechargement et déconnexion |

Les pseudos des deux comptes de test respectent déjà le format. Le fichier est petit pour cet atelier. Vous n’avez à ajouter ni inscription, ni base SQL, ni JavaScript, ni suppression de messages pour terminer le socle.

### Organisation suggérée des 90 minutes

| Temps | Jalon observable |
|---|---|
| 0–15 min | Connexion précédente réutilisable et accès au chat contrôlé |
| 15–40 min | Un message valide enregistré sans écraser l’historique |
| 40–65 min | Historique relu, champs retrouvés et rendu correct |
| 65–90 min | Validation, erreurs et parcours de vérification complet |

### Tests à effectuer avant la fin

| Situation | Résultat attendu |
|---|---|
| Visite ou POST sans connexion | Aucun accès au chat, aucune écriture |
| Léa puis Sam, dans deux sessions | Chaque message garde son auteur ; même historique sur la même application |
| Rechargement après un envoi réussi | Aucun message ajouté une seconde fois |
| Déconnexion puis nouvelle connexion | Messages précédents toujours présents |
| Message vide, trop long ou contenant un caractère réservé | Refus avec saisie conservée ; fichier inchangé |
| Texte ressemblant à une balise | Texte visible, aucune interprétation HTML |
| Faux pseudo ajouté à la requête | Auteur pris dans la session |
| Fichier absent, vide, illisible ou ligne mal formée | Comportement conforme aux règles ci-dessus |

Montrez le parcours complet et expliquez où l’identité et les messages sont conservés. La validation du TP se fait pendant la séance.
