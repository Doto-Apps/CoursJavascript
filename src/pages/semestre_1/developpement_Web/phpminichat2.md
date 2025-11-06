---
layout: "layouts/Layout.astro"
title: "TP : PHP Minichat 2"
type: "TP"
---

---

## Objectifs du TP 2

1. Améliorer l’apparence du mini-chat (mise en page, couleurs, structure des messages).
2. Enrichir les informations stockées pour chaque message (pseudo, image de profil, couleur, message…).
3. Manipuler des chaînes de caractères en PHP (découper une ligne en plusieurs morceaux, les mettre dans un tableau).
4. Réutiliser vos connaissances sur les fichiers **sans qu’on vous donne tout le code**.

> ⚠️ Vous partez de votre **TP Minichat 1** : on ne recommence pas de zéro, on améliore.

---

## Partie 1 : Refonte visuelle du mini-chat (CSS & Flexbox)

### Étape 1 : Mise en page générale avec Flexbox

Réorganisez votre page `index.php` pour que le mini-chat soit plus agréable à utiliser :

- Utilisez `display: flex` pour organiser :
  - La zone des messages.
  - Le formulaire d’envoi.
- Vous pouvez par exemple :
  - Mettre le chat dans un conteneur centré et limité en largeur.
  - Placer les messages au-dessus et le formulaire en dessous.
  - Ou bien placer les messages à gauche et le formulaire à droite (2 colonnes).

Idées à explorer :

- Créer un conteneur principal :

  - Avec une largeur max (ex : `max-width: 800px;`).
  - Centré avec `margin: 0 auto;`.

- Faire en sorte que la zone de messages occupe la majorité de l’espace vertical.
- Utiliser un fond différent pour la zone de chat (gris clair, par exemple).
- Penser aux marges, aux espacements et aux bordures arrondies.

Vous êtes libres pour la mise en page, mais **l’utilisation de Flexbox est obligatoire** pour au moins une partie de la structure.

---

### Étape 2 : Style par pseudo, couleur et avatar

Vous allez enrichir le formulaire pour que chaque message ait :

- Un **pseudo**.
- Une **image de profil (avatar)** : URL d’une image (depuis le web, par exemple).
- Une **couleur de message** : choisie avec un `input type="color"`.
- Un **message**.

Ajoutez dans le formulaire (dans `index.php`) les champs :

- `avatar` : URL de l’image de profil.
- `color` : couleur du texte ou de la bulle du message.

Exemple **possible** de structure (à adapter à votre code) :

```html
<form action="chat.php" method="post">
    <label for="pseudo">Pseudo :</label>
    <input type="text" id="pseudo" name="pseudo" required>

    <label for="avatar">URL de votre avatar :</label>
    <input type="url" id="avatar" name="avatar" placeholder="https://exemple.com/monimage.png">

    <label for="color">Couleur du texte :</label>
    <input type="color" id="color" name="color" value="#000000">

    <label for="message">Message :</label>
    <input type="text" id="message" name="message" required>

    <button type="submit">Envoyer</button>
</form>
```

> 💡 Dans `chat.php`, vous devrez **adapter** le traitement pour utiliser ces nouveaux champs. On ne vous donne pas tout, mais vous avez déjà l’exemple du TP 1 pour récupérer et enregistrer des données.

---

## Partie 2 : Structurer les données dans le fichier texte

Actuellement, chaque ligne de votre `messages.txt` contient probablement quelque chose du genre :

```txt
[12:35:02] Toto: Bonjour
```

L’objectif maintenant est de **structurer** davantage chaque message, par exemple en stockant :

- L’heure.
- Le pseudo.
- L’URL de l’avatar.
- La couleur.
- Le message.

Vous allez définir votre propre format de stockage texte. Par exemple :

```txt
heure;pseudo;avatar;couleur;message
```

Mais vous pouvez choisir une autre structure (ordre différent, séparateur différent) à condition que :

- Le même format soit utilisé **pour écrire** dans le fichier.
- Le même format soit utilisé **pour lire et afficher** les messages.

### 1. Adaptation de `chat.php` (écriture dans le fichier)

Dans `chat.php` :

1. Récupérez tous les champs envoyés par le formulaire (`pseudo`, `avatar`, `color`, `message`).
2. Générez une heure au moment de l’enregistrement (par exemple avec `date('H:i:s')`).
3. Construisez une **chaîne unique** de ce type :

   ```txt
   heure;pseudo;avatar;couleur;message
   ```

4. Ajoutez cette ligne au fichier `messages.txt` avec `file_put_contents(..., FILE_APPEND)` comme dans le TP 1.

> ℹ️ On ne vous redonne pas le code complet de `chat.php`. À vous de modifier progressivement le TP 1 :
>
> - Ajoutez de nouveaux champs.
> - Ajoutez vos nouvelles variables.
> - Construisez la nouvelle chaîne à écrire.

---

### 2. Adaptation de `index.php` (lecture & affichage)

Dans `index.php` :

- Vous avez déjà un code qui lit le fichier ligne par ligne (TP 1).
- Vous allez maintenant **découper** chaque ligne en plusieurs morceaux pour récupérer :
  - l’heure,
  - le pseudo,
  - l’avatar,
  - la couleur,
  - le message.

L’idée générale :

1. Lire le fichier et obtenir chaque ligne sous forme de chaîne.
2. Pour chaque ligne, utiliser une fonction PHP qui découpe la chaîne en tableau (voir mini-atelier juste après).
3. Récupérer les éléments du tableau (par exemple `$infos[0]`, `$infos[1]`, etc.).
4. Les afficher dans votre HTML, par exemple :

   - Avatar à gauche (`<img src="..." alt="avatar">`).
   - Pseudo en gras.
   - Heure à côté du pseudo ou en plus petit.
   - Message en dessous.
   - Couleur appliquée soit au texte, soit à la bulle du message (`style="color: ..."` ou `style="background-color: ..."`).

👉 Le code de lecture du fichier existe déjà dans votre TP 1 : **réutilisez-le** et adaptez-le pour tenir compte de votre nouveau format.

---

## Mini-atelier PHP : découper une chaîne (exemple en dehors du mini-chat)

Pour vous aider à comprendre comment découper une ligne en plusieurs morceaux, voici un exemple qui ne concerne pas le mini-chat, mais des informations d’étudiant.

On part d’une ligne de texte :

```txt
Durand;Lucie;21;Informatique
```

On veut obtenir : nom, prénom, âge, filière.

En PHP :

```php
$ligne = "Durand;Lucie;21;Informatique";

// On découpe la chaîne à chaque point-virgule
$infos = explode(";", $ligne);

// $infos est maintenant un tableau
// $infos[0] -> "Durand"
// $infos[1] -> "Lucie"
// $infos[2] -> "21"
// $infos[3] -> "Informatique"

$nom = $infos[0];
$prenom = $infos[1];
$age = $infos[2];
$filiere = $infos[3];
```

À retenir :

- `explode(";", $ligne)` découpe la chaîne `$ligne` en morceaux, chaque fois qu’il trouve un `;`.
- Le résultat est un **tableau** PHP.

Vous pouvez appliquer **exactement la même logique** à vos lignes de `messages.txt`, par exemple :

```txt
12:35:02;Toto;https://exemple.com/avatar.png;#ff0000;Bonjour à tous !
```

> 💡 À vous de choisir :
> - L’ordre des éléments.
> - Le séparateur (point-virgule `;`, pipe `|`, etc.).
        > - La façon dont vous utilisez ces éléments pour construire l’affichage du message.

---

## Partie 3 : Aller plus loin avec PHP (fonctionnalités avancées)

Choisissez au moins **une** des fonctionnalités suivantes (ou proposez la vôtre) pour enrichir le mini-chat. Le but est de vous faire pratiquer un peu plus le PHP.

### Idée 1 : Mémoriser le pseudo et/ou la couleur (sessions)

Objectif : que le pseudo (et éventuellement la couleur) soit mémorisé entre deux envois de messages.

- Utilisez les **sessions** PHP.

Exemple de départ (à adapter à votre mini-chat) :

```php
// À mettre tout au début de index.php (avant tout HTML)
session_start();

// Quand le formulaire est soumis (dans chat.php par exemple)
if (!empty($_POST['pseudo'])) {
    $_SESSION['pseudo'] = $_POST['pseudo'];
}

// Dans index.php, avant d’afficher le formulaire
session_start();
$pseudo = $_SESSION['pseudo'] ?? "";
```

Dans le formulaire HTML, vous pouvez faire :

```html
<input type="text" id="pseudo" name="pseudo" value="<?php echo htmlspecialchars($pseudo); ?>">
```

Vous pouvez faire la même chose pour la couleur choisie.

---

### Idée 2 : Limiter la longueur des messages

Objectif : empêcher l’envoi de messages trop longs.

- Dans `chat.php`, avant d’écrire le message dans le fichier, testez la longueur du texte :
  - Utilisez par exemple `strlen($message)`.
  - Décidez d’une limite (ex : 200 caractères).
- Si le message est trop long :
  - soit vous le tronquez,
  - soit vous refusez de l’enregistrer et affichez un message d’erreur (par exemple avec une redirection et un paramètre GET ou en stockant un message d’erreur en session).

---

### Idée 3 : Filtrer des mots interdits

Objectif : créer une version simplifiée de filtre de contenu.

- Définissez un tableau de mots interdits, par exemple :

  ```php
  $motsInterdits = ["grosmot1", "grosmot2", "grosmot3"];
  ```

- Pour chaque mot interdit trouvé dans le message, remplacez-le par `***` (ou autre).
- Vous pouvez utiliser par exemple `str_ireplace()` pour faire un remplacement insensible à la casse.

---

### Idée 4 : Compter le nombre de messages par pseudo (version simple)

Objectif : afficher, de manière approximative, combien de messages un pseudo a envoyés.

- Quand vous lisez les messages dans `index.php`, vous pouvez :
  - parcourir toutes les lignes,
  - compter combien de fois chaque pseudo apparaît,
  - stocker ces informations dans un tableau associatif (par exemple `$compteurs["Toto"] = 3;`).
- Ensuite, pour chaque message, vous pouvez afficher quelque part :  
  `Toto (3 messages)`.

> 📌 Il ne s’agit pas ici d’un système parfait de statistiques, mais d’un exercice pour manipuler des tableaux en PHP.

---

## Nouveau barème (TP Minichat 2) — /20

| **Critère**                                      | **Description**                                                                                                                                             | **Points** |
|--------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------:|
| **Mise en page & beauté (CSS + Flexbox)**        | Utilisation de Flexbox, mini-chat lisible et bien structuré, couleurs harmonieuses, messages bien visibles, interface globale soignée.                     |       6 pts |
| **Structuration des messages (fichier + parsing)** | Les messages sont stockés dans un format structuré (heure, pseudo, avatar, couleur, message). Les données sont correctement découpées et réutilisées.      |       8 pts |
| **Contenu du message**                           | Affichage clair et séparé : avatar, pseudo, heure et message. Pseudo et message bien distingués, avatar correctement affiché, couleur appliquée.           |       2 pts |
| **Fonctionnalités PHP avancées**                 | Au moins **une** fonctionnalité avancée correctement implémentée (session, limite de longueur, filtre de mots, compteur de messages ou idée personnelle).   |       3 pts |
| **Qualité globale du code**                      | Indentation, commentaires, noms de variables, respect des consignes, absence d’erreurs bloquantes.                                                         |       1 pt |

**Total : 20 points**

---

## N'oublier pas que l'on evaluera aussi votre compréhension
