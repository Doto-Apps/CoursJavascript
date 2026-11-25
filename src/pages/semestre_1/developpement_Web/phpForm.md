---
layout: "layouts/Layout.astro"
title: "PHP : formulaires, sessions et fichiers texte"
type: "TD"
order: 5
quizId: "s1-dev-04"
previousSession: "/semestre_1/developpement_Web/phpVarTab"
nextSession: "/semestre_1/developpement_Web/phpminichat2"
---

Aujourd’hui, nous allons apprendre **trois choses** :

1. Recevoir un formulaire et comprendre les tableaux `$_POST` et `$_SERVER`.
2. Conserver des préférences entre deux pages avec `$_SESSION`.
3. Ajouter et relire des données dans un fichier texte.

Nous travaillerons sur **trois sujets différents**. Chaque exemple ci-dessous est complet : copiez-le dans le fichier indiqué, testez-le, puis modifiez-le pour comprendre ce qui change.

**Pour les essais :** placez un dossier `ateliers-php` dans le dossier **`htdocs` de XAMPP**. Vous pouvez y créer les quatre fichiers au fil du cours, ou <a href="/exemples/s1/ateliers-php.zip" download>télécharger les exemples prêts à essayer</a>. Les fichiers PHP s’exécutent dans XAMPP ; les blocs du site affichent leur code.

<a id="formulaire"></a>

## 1. Formulaires et tableaux PHP — une inscription à un atelier

Un formulaire rassemble des champs et les envoie au serveur. Ici, on indique un prénom et on choisit un atelier photo ou dessin.

| Élément HTML | Rôle |
|---|---|
| `action` du formulaire | Adresse du script destinataire |
| `method="post"` | Envoi des champs dans le corps de la requête |
| `name` d’un contrôle | Clé transmise au serveur |
| `id` et `for` du label | Association entre le champ et son étiquette |
| Bouton `type="submit"` | Déclenche la soumission |

Le `label` permet de nommer un champ. Son `for="prenom"` correspond à l’`id="prenom"` du champ ; cliquer sur le libellé permet de sélectionner ce champ. Le `name` a une autre fonction : il détermine le nom reçu par PHP.

### À copier dans `inscription.php`

```php
<?php
$erreur = '';
$confirmation = '';
$prenom = '';
$ateliers = ['photo' => 'Photo', 'dessin' => 'Dessin'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') { // Ne traite que les envois du formulaire.
    $valeur = $_POST['prenom'] ?? ''; // La clé correspond au name du champ.
    $choix = $_POST['atelier'] ?? '';
    if (!is_string($valeur) || !is_string($choix)) { // Vérifie les types avant de les utiliser.
        $erreur = 'Les champs doivent contenir du texte.';
    } else {
        $prenom = trim($valeur); // Retire les espaces aux extrémités.
        $atelier = $ateliers[$choix] ?? null; // Cherche la clé choisie dans le tableau.
        if ($prenom === '' || $atelier === null) {
            $erreur = 'Indiquez un prénom et un atelier proposé.';
        } else {
            $confirmation = $prenom . ' est inscrit à l’atelier ' . $atelier . '.';
        }
    }
}
$informations = [ // Quelques données de $_SERVER à observer.
    'REQUEST_METHOD' => $_SERVER['REQUEST_METHOD'],
    'SCRIPT_NAME' => $_SERVER['SCRIPT_NAME'],
];
?>
<!doctype html>
<html lang="fr">
<head><meta charset="utf-8"><title>Inscription à un atelier</title></head>
<body>
<h1>Inscription à un atelier</h1>
<form method="post" action="inscription.php">
    <label for="prenom">Prénom</label>
    <input id="prenom" name="prenom" required value="<?= htmlspecialchars($prenom, ENT_QUOTES, 'UTF-8') ?>">
    <label for="atelier">Atelier</label>
    <select id="atelier" name="atelier">
        <option value="photo">Photo</option>
        <option value="dessin">Dessin</option>
    </select>
    <button type="submit">M’inscrire</button>
</form>
<p role="alert"><?= htmlspecialchars($erreur, ENT_QUOTES, 'UTF-8') ?></p>
<p><?= htmlspecialchars($confirmation, ENT_QUOTES, 'UTF-8') ?></p>
<h2>Contenu de $_POST</h2>
<pre><?= htmlspecialchars(print_r($_POST, true), ENT_QUOTES, 'UTF-8') ?></pre>
<h2>Quelques entrées de $_SERVER</h2>
<pre><?= htmlspecialchars(print_r($informations, true), ENT_QUOTES, 'UTF-8') ?></pre>
</body>
</html>
```

<a id="reception"></a>

### Qu’y a-t-il dans ces tableaux ?

Un **tableau associatif** retrouve ses valeurs avec des clés nommées. Au lieu de lire la case `0`, on peut lire une case appelée `prenom`. La forme `'prenom' => 'Nora'` associe la clé `prenom` à la valeur `Nora`.

PHP prépare automatiquement plusieurs tableaux, disponibles dans vos scripts :

| Tableau | Contenu dans cet exemple |
|---|---|
| `$_POST` | Les champs envoyés par le formulaire POST |
| `$_SERVER` | Des informations sur la requête et le script exécuté |
| `$ateliers` | Notre propre tableau, qui associe un code d’atelier à son intitulé |

**Lors de la première visite**, le navigateur demande la page en GET : `$_POST` est vide. **Après l’envoi**, il contient par exemple :

```text
Array
(
    [prenom] => Nora
    [atelier] => photo
)
```

`$_POST['prenom']` lit la valeur envoyée par le champ `name="prenom"`. `$_SERVER['REQUEST_METHOD']` contient la méthode de la requête, par exemple `GET` ou `POST`. `$_SERVER['SCRIPT_NAME']` indique le chemin du script demandé.

`print_r` montre les clés et les valeurs d’un tableau. Avec `true` en deuxième argument, il renvoie une chaîne qu’on peut afficher. La balise `<pre>` conserve les retours à la ligne de cet affichage. Nous montrons seulement deux entrées de `$_SERVER` pour garder l’observation lisible. [Manuel de $_POST](https://www.php.net/manual/fr/reserved.variables.post.php) · [Manuel de $_SERVER](https://www.php.net/manual/fr/reserved.variables.server.php).

### Comprendre les vérifications

- `$_POST['prenom'] ?? ''` fournit une chaîne vide si la clé manque ou vaut null.
- `is_string` vérifie qu’une valeur est du texte avant de la manipuler.
- `trim` retire les espaces au début et à la fin, pas ceux au milieu.
- `$ateliers[$choix] ?? null` recherche une clé dans notre tableau ; une clé inconnue donne ici `null`.
- `===` compare la valeur et le type ; `=` affecte une valeur à une variable.
- `htmlspecialchars` permet d’afficher le texte sans interpréter ses caractères comme des balises HTML. `<?= ... ?>` affiche le résultat de l’expression.

Le navigateur utilise `required` pour aider la saisie. La validation PHP reste nécessaire : une requête peut être envoyée sans passer par le formulaire. Dans cet exemple, GET affiche la page et POST déclenche le traitement. POST ne chiffre pas les données ; HTTPS assure le chiffrement du transport.

### À essayer ensemble

1. Ouvrez la page, puis envoyez votre prénom. Comparez la méthode et le contenu de `$_POST` avant et après.
2. Changez le `name` du champ en `participant`, en gardant son `id`. Regardez le tableau reçu, puis adaptez la clé lue dans le PHP.
3. Ajoutez un champ « Ville ». Retrouvez sa nouvelle entrée dans `$_POST`, puis utilisez-la dans la confirmation.
4. Essayez un prénom composé uniquement d’espaces et un texte ressemblant à une balise : observez la différence entre validation et affichage.

<a id="session"></a>

## 2. Les sessions — retrouver ses préférences de lecture

Une variable PHP ordinaire disparaît à la fin de la requête. `session_start()` crée ou reprend une session ; `$_SESSION` permet de retrouver ses données côté serveur lors d’une autre requête. Chaque page qui utilise la session doit la démarrer avant toute sortie HTML.

Nous allons choisir un prénom et une ambiance sur une page, puis les retrouver sur une autre. Ce sont **deux fichiers différents à copier dans le même dossier**.

### À copier dans `preferences.php`

```php
<?php
session_start(); // Toujours avant d’envoyer du HTML.
$erreur = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $prenom = $_POST['prenom'] ?? '';
    $theme = $_POST['theme'] ?? '';
    if (!is_string($prenom) || !is_string($theme)) {
        $erreur = 'Valeurs incorrectes.';
    } else {
        $prenom = trim($prenom);
        if ($prenom === '' || ($theme !== 'clair' && $theme !== 'sombre')) {
            $erreur = 'Indiquez un prénom et un thème proposé.';
        } else {
            $_SESSION['preferences'] = [ // Choisit les informations à conserver.
                'prenom' => $prenom,
                'theme' => $theme,
            ];
            header('Location: lecture.php', true, 303); // Ouvre la seconde page en GET.
            exit; // Arrête le traitement après la redirection.
        }
    }
}
?>
<!doctype html>
<html lang="fr">
<head><meta charset="utf-8"><title>Mes préférences de lecture</title></head>
<body>
<h1>Préparer mon espace de lecture</h1>
<form method="post" action="preferences.php">
    <label for="prenom">Prénom</label>
    <input id="prenom" name="prenom" required>
    <label for="theme">Ambiance</label>
    <select id="theme" name="theme">
        <option value="clair">Claire</option>
        <option value="sombre">Sombre</option>
    </select>
    <button type="submit">Conserver mes choix</button>
</form>
<p role="alert"><?= htmlspecialchars($erreur, ENT_QUOTES, 'UTF-8') ?></p>
<a href="lecture.php">Voir l’espace de lecture</a>
</body>
</html>
```

### À copier dans `lecture.php`

```php
<?php
session_start(); // Retrouve la session commencée sur preferences.php.

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    unset($_SESSION['preferences']); // Retire seulement cette entrée de la session.
    header('Location: preferences.php', true, 303);
    exit;
}
$preferences = $_SESSION['preferences'] ?? []; // Une absence donne un tableau vide.
$valide = is_array($preferences)
    && isset($preferences['prenom'], $preferences['theme'])
    && is_string($preferences['prenom']) && is_string($preferences['theme']);
$theme = 'clair';
if ($valide) {
    $theme = $preferences['theme'];
}
?>
<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8"><title>Mon espace de lecture</title>
    <style>
        body { font-family: sans-serif; padding: 24px; }
        .sombre { background: #172235; color: #f4f7ff; }
        .sombre a { color: #bfdbfe; }
    </style>
</head>
<body class="<?= htmlspecialchars($theme, ENT_QUOTES, 'UTF-8') ?>">
<h1>Mon espace de lecture</h1>
<?php if ($valide): ?>
    <p>Bienvenue <?= htmlspecialchars($preferences['prenom'], ENT_QUOTES, 'UTF-8') ?>.</p>
    <p>Votre thème est <?= htmlspecialchars($theme, ENT_QUOTES, 'UTF-8') ?>.</p>
<?php else: ?>
    <p>Aucune préférence enregistrée.</p>
<?php endif; ?>
<h2>Contenu de $_SESSION</h2>
<pre><?= htmlspecialchars(print_r($_SESSION, true), ENT_QUOTES, 'UTF-8') ?></pre>
<a href="preferences.php">Modifier mes choix</a>
<form method="post" action="lecture.php">
    <button type="submit">Oublier mes préférences</button>
</form>
</body>
</html>
```

<a id="contrat-session"></a>

### Qu’a-t-on conservé ?

`$_SESSION` est un tableau associatif. Dans notre exemple, sa clé `preferences` contient elle-même un tableau avec les clés `prenom` et `theme`.

```text
Array
(
    [preferences] => Array
        (
            [prenom] => Nora
            [theme] => sombre
        )
)
```

`$_SESSION['preferences']['theme']` lit le thème enregistré dans ce tableau. La première paire de crochets choisit les préférences ; la seconde choisit le thème.

| Vérification | Rôle |
|---|---|
| `isset` | Tester si une entrée existe et n’est pas null |
| `is_array` | Vérifier qu’une valeur est un tableau avant de lire ses champs |
| `is_string` | Vérifier qu’un champ contient du texte |

Les données reçues dans `$_POST` ne sont pas automatiquement copiées dans `$_SESSION`. C’est notre programme qui choisit quoi conserver **après validation**.

Le navigateur transmet habituellement un identifiant de session dans un cookie ; les données restent côté serveur. Deux onglets du même navigateur partagent généralement la session. Une fenêtre privée ou un autre navigateur permet de tester une session distincte. La session n’est pas un stockage permanent garanti. [Manuel de $_SESSION](https://www.php.net/manual/fr/reserved.variables.session.php).

<a id="redirection"></a>

### Pourquoi une redirection ?

`header('Location: lecture.php', true, 303)` demande au navigateur de visiter `lecture.php` en GET après l’envoi POST. `exit` arrête le script après la redirection. Ces instructions doivent précéder le HTML.

Le trajet est donc : **POST vers les préférences → mémorisation → redirection → GET vers la lecture**. Actualiser la page de lecture ne renvoie pas le formulaire.

<a id="deconnexion"></a>

### Retirer une donnée de la session

`unset($_SESSION['preferences'])` retire cette entrée du tableau. Le bouton « Oublier mes préférences » envoie un POST à `lecture.php`, qui effectue ce retrait puis redirige.

Tout texte réaffiché dans le HTML doit être échappé avec `htmlspecialchars(..., ENT_QUOTES, 'UTF-8')`. La même règle s’applique aux données reçues, aux données de session et aux données relues d’un fichier.

### À essayer ensemble

1. Choisissez une ambiance sombre, puis actualisez `lecture.php` : le choix reste présent sans nouvel envoi du formulaire.
2. Ouvrez `lecture.php` dans un autre onglet, puis dans une fenêtre privée : comparez le contenu de `$_SESSION`.
3. Ajoutez une préférence « taille de texte ». Adaptez le formulaire, l’enregistrement en session et la lecture sur la seconde page.
4. Utilisez « Oublier mes préférences », puis retournez à la page de lecture : l’entrée a disparu.

<a id="stockage"></a>

## 3. Les fichiers — un carnet d’idées de sorties

Une session conserve des données liées à un visiteur. Un **fichier texte** permet de conserver des informations communes, indépendamment de la session.

Ici, nous allons noter des idées de sorties. Le programme ajoute une ligne au fichier `idees.txt`, puis relit ce fichier pour afficher le carnet.

### À copier dans `carnet.php`

```php
<?php
$chemin = __DIR__ . '/idees.txt'; // Le fichier est placé à côté de ce script.
$erreur = '';
$idee = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $valeur = $_POST['idee'] ?? '';
    if (!is_string($valeur)) {
        $erreur = 'L’idée doit être du texte.';
    } else {
        $idee = trim($valeur);
        if ($idee === '' || strlen($idee) > 300) {
            $erreur = 'Écrivez une idée non vide, de 300 octets maximum.';
        } elseif (str_contains($valeur, ';') || str_contains($valeur, "\n") || str_contains($valeur, "\r")) {
            $erreur = 'Écrivez sur une ligne, sans point-virgule.';
        } else {
            $ligne = date('Y-m-d') . ';' . $idee . PHP_EOL; // Une ligne : date ; idée.
            $octets = file_put_contents($chemin, $ligne, FILE_APPEND | LOCK_EX);
            if ($octets === false || $octets !== strlen($ligne)) {
                $erreur = 'Enregistrement impossible.';
            } else {
                header('Location: carnet.php', true, 303);
                exit;
            }
        }
    }
}
$lignes = []; // Le premier affichage est vide si le fichier n’existe pas encore.
if (file_exists($chemin)) {
    $lecture = file($chemin, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if ($lecture === false) {
        $erreur = 'Lecture impossible.';
    } else {
        $lignes = $lecture;
    }
}
?>
<!doctype html>
<html lang="fr">
<head><meta charset="utf-8"><title>Idées de sorties</title></head>
<body>
<h1>Mon carnet d’idées de sorties</h1>
<form method="post" action="carnet.php">
    <label for="idee">Une idée, sur une seule ligne</label>
    <input id="idee" name="idee" required value="<?= htmlspecialchars($idee, ENT_QUOTES, 'UTF-8') ?>">
    <button type="submit">Ajouter au carnet</button>
</form>
<p role="alert"><?= htmlspecialchars($erreur, ENT_QUOTES, 'UTF-8') ?></p>
<?php if ($lignes === [] && $erreur === ''): ?><p>Aucune idée pour le moment.</p><?php endif; ?>
<ul>
<?php foreach ($lignes as $ligne): ?>
    <?php
    $champs = explode(';', $ligne); // Sépare la date de l’idée.
    if (count($champs) !== 2 || $champs[0] === '' || trim($champs[1]) === '') {
        continue; // Ignore une ligne abîmée sans arrêter les suivantes.
    }
    ?>
    <li>
        <?= htmlspecialchars($champs[0], ENT_QUOTES, 'UTF-8') ?> :
        <?= htmlspecialchars($champs[1], ENT_QUOTES, 'UTF-8') ?>
    </li>
<?php endforeach; ?>
</ul>
</body>
</html>
```

<a id="chemins"></a>

### Où se trouve le fichier ?

`__DIR__` est le dossier du script. Le point `.` assemble des chaînes. Ainsi, `__DIR__ . '/idees.txt'` désigne le fichier `idees.txt` à côté de `carnet.php`, quel que soit le dossier courant.

Le chemin désigne un emplacement sur le serveur ; ce n’est pas une URL. Il est fixé dans le code, pas choisi par le formulaire.

<a id="ecriture"></a>

### Ajouter une ligne

`file_put_contents` écrit une chaîne et renvoie le nombre d’octets écrits, ou `false` en cas d’échec.

| Élément du code | Rôle |
|---|---|
| `FILE_APPEND` | Ajouter à la fin au lieu de remplacer le contenu existant |
| `PHP_EOL` | Ajouter un retour à la ligne |
| `LOCK_EX` | Demander un verrou pendant l’écriture pour coordonner les écritures qui l’utilisent |
| `FILE_APPEND \| LOCK_EX` | Combiner les deux options |
| `strlen` | Compter des octets, ce qui peut différer du nombre de caractères visibles |

Le fichier est créé au premier ajout si PHP peut écrire dans ce dossier. Après une écriture réussie, le programme redirige vers le carnet : actualiser ne réenregistre pas la même idée. Un échec reste une erreur, sans fausse confirmation. [Manuel de file_put_contents](https://www.php.net/manual/fr/function.file-put-contents.php).

<a id="lignes"></a>

### Relire et découper

Chaque ligne contient une date et une idée, séparées par un point-virgule. Par exemple : `2026-11-26;Visiter une exposition photo`. `date('Y-m-d')` construit la date au format année-mois-jour.

- `file_exists` indique si le fichier existe. Une absence au premier lancement donne ici un carnet vide.
- `file` renvoie un tableau de lignes ou `false` si la lecture échoue.
- `FILE_IGNORE_NEW_LINES` retire les fins de ligne ; `FILE_SKIP_EMPTY_LINES` ignore les lignes vides.
- `explode` découpe une chaîne selon un séparateur ; `count` compte les éléments du tableau.
- `foreach` parcourt les lignes ; `continue` passe à la suivante si la ligne actuelle est mal formée.

`str_contains` teste si une chaîne apparaît dans un texte. On refuse ici le point-virgule et les retours à la ligne dans la saisie, car ils servent à séparer les données du fichier. `"\n"` désigne un saut de ligne et `"\r"` un retour chariot. Le contrôle porte sur le texte brut avant `trim`.

La validation précède l’enregistrement ; `htmlspecialchars` intervient lors de l’affichage. [Manuel de file](https://www.php.net/manual/fr/function.file.php) · [Manuel de explode](https://www.php.net/manual/fr/function.explode.php).

### À essayer ensemble

1. Ajoutez deux idées puis ouvrez `idees.txt` dans l’éditeur : retrouvez les deux lignes.
2. Actualisez la page et vérifiez que le fichier n’a pas changé.
3. Faites l’essai sans `FILE_APPEND` sur ce carnet de test : observez le remplacement du contenu, puis remettez l’option.
4. Ajoutez à la main une ligne incomplète dans le fichier. Elle doit être ignorée sans casser l’affichage des autres.
5. Changez le séparateur du carnet : adaptez l’écriture, `explode` et le contrôle des caractères réservés.

**En fin de cours :** nous lirons le [sujet de la séance 6](/semestre_1/developpement_Web/phpminichat2). Ce sera un nouveau projet à réaliser chez vous, en adaptant les notions vues sur ces trois exemples.
