---
layout: "layouts/Layout.astro"
title: "TP : PHP Minichat 1"
type: "TP"
---


---

## Objectifs du TP :
1. Comprendre les bases de PHP (formulaires, sessions, fichiers).
2. Apprendre à stocker des données dans un fichier texte.
3. Développer un chat simple qui permet d'envoyer et afficher des messages.

---

## Étapes du développement

### Étape 1 : Structure de base du projet
Créez un dossier appelé **mini-chat** contenant :
- `index.php` : Page principale pour afficher le chat.
- `chat.php` : Script pour traiter l'envoi des messages.
- `messages.txt` : Fichier pour stocker les messages (vide au départ).

### Étape 2 : Page principale (`index.php`)
Incluez :
- Une section pour afficher les messages stockés.
- Un formulaire pour envoyer un pseudo et un message.

```php
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mini Chat</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .messages { border: 1px solid #ccc; padding: 10px; margin-bottom: 20px; max-height: 300px; overflow-y: auto; }
        .message { margin-bottom: 10px; }
    </style>
</head>
<body>
    <h1>Mini Chat</h1>

    <div class="messages">
        <?php
        if (file_exists('messages.txt')) {
            $messages = file('messages.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($messages as $message) {
                echo '<div class="message">' . htmlspecialchars($message) . '</div>';
            }
        } else {
            echo '<p>Aucun message pour le moment.</p>';
        }
        ?>
    </div>

    <form action="chat.php" method="post">
        <label for="pseudo">Pseudo :</label>
        <input type="text" id="pseudo" name="pseudo" required>
        <br><br>
        <label for="message">Message :</label>
        <input type="text" id="message" name="message" required>
        <br><br>
        <button type="submit">Envoyer</button>
    </form>
</body>
</html>
```

### Étape 3 : Traitement des messages (`chat.php`)
Traitez le formulaire en ajoutant les messages dans le fichier texte et redirigez vers la page principale.

```php
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $pseudo = trim($_POST['pseudo']);
    $message = trim($_POST['message']);

    if (!empty($pseudo) && !empty($message)) {
        $formattedMessage = "[" . date('H:i:s') . "] " . $pseudo . ": " . $message . "\n";
        file_put_contents('messages.txt', $formattedMessage, FILE_APPEND);
    }
}

header('Location: index.php');
exit;
```

### Étape 4 : Gestion des fichiers
Créez un fichier `messages.txt` pour stocker les messages et vérifiez qu'il est accessible en écriture.

---

## Critères d'évaluation et barème

| **Critère**                         | **Description**                                                                                 | **Points** |
|-------------------------------------|-----------------------------------------------------------------------------------------------|-----------|
| **Beauté (CSS)**                    | - Respect de l'esthétique : alignement, couleurs harmonieuses, responsive.                     | 5 points  |
| **Fonctionnalité du chat**          | - Les messages s'affichent correctement.<br>- Les nouveaux messages sont ajoutés.               | 4 points  |
| **Structure du site avec Flexbox**  | - Utilisation de `display: flex` pour organiser les éléments (messages, formulaire, etc.).      | 4 points  |
| **Style par pseudo**                | - Le choix de pouvoir choisir dans quelle couleur s'affichera son message grace a un color pick. ( https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color )    | 2 points  |
| **Animation sur le bouton**         | - Une animation sur le bouton envoyez ou sur un autre element du MiniChat.                                  | 3 points  |
| **Bonus : Fonctionnalités avancées**| - Ajout d'options supplémentaires comme un bouton pour effacer les messages ou limiter l'affichage à 10 messages. | 2 points  |

**Total** : 20 points

---

## Instructions pour les étudiants

1. **Mise en place du projet** : 
   - Placez votre dossier **mini-chat** dans le dossier `htdocs` ou équivalent.
   - Assurez-vous que PHP est bien installé et configuré sur votre environnement (XAMPP, WAMP, ou autre).

2. **Livrable attendu** :
   - Fournissez un dossier compressé contenant votre code source.
   - Indiquez les étapes pour tester votre mini-chat.

3. **Conseils** :
   - N'hésitez pas à consulter la documentation officielle PHP pour les fonctions `file_put_contents` et `file_get_contents`.
   - Faites des essais réguliers pour vérifier que vos modifications fonctionnent.
---
