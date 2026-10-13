---
layout: "layouts/Layout.astro"
title: "Outils web et atelier d’IA locale"
type: "TD"
order: 1
nextSession: "/semestre_1/developpement_Web/PHP_inter"
---

<a id="comprendre"></a>

## Éditeur, fichiers et terminal : trois objets distincts

L’éditeur modifie des fichiers ; il ne publie pas automatiquement une page. Le navigateur affiche la version enregistrée et reçue du serveur. Le terminal exécute une commande dans un **dossier courant**. Si `php` ou `opencode` n’est pas reconnu, le système ne trouve pas l’exécutable : cela ne signifie pas que votre fichier HTML est incorrect.

| Action | Outil | Vérification concrète |
|---|---|---|
| Modifier un titre. | VS Code. | Le fichier est enregistré dans le dossier du projet. |
| Servir un fichier PHP. | Apache/XAMPP ou serveur PHP local. | Une adresse HTTP renvoie le résultat du script. |
| Inspecter ce résultat. | Navigateur et DevTools. | Le titre change après rechargement. |
| Proposer une modification. | OpenCode. | Le changement de fichier est lu et testé. |
| Produire une réponse de modèle. | LM Studio. | Un modèle est chargé et son serveur répond. |

## localhost, ports et adresses locales

`http://127.0.0.1:1234/v1` désigne le serveur de modèle sur votre propre machine. `http://localhost/atelier/index.php` peut désigner Apache. Le **port** distingue les services ; le **chemin** désigne une ressource de ce service. Remplacer 1234 par le port d’Apache ne connecte pas OpenCode à PHP : on change de service.

Sur Windows, un chemin tel que `C:\xampp\htdocs\atelier` désigne un dossier. Sur macOS, le chemin dépend de l’installation PHP choisie. Dans les deux cas, ouvrez le dossier de travail dans VS Code et vérifiez le service avec son adresse HTTP. Un fichier PHP ouvert directement avec une adresse `file://` n’est pas exécuté par le serveur PHP.

## Le modèle local et la vérification du code généré

Le modèle est un ensemble de paramètres chargé en mémoire ; LM Studio l’exécute ; OpenCode lui fournit des instructions et peut proposer des actions sur le projet. Télécharger un modèle n’équivaut pas à démarrer un serveur. Le nom configuré dans OpenCode doit correspondre à l’identifiant réellement annoncé par le serveur de LM Studio.

Une proposition de code peut être syntaxiquement correcte et répondre au mauvais besoin. Demandez une modification limitée — par exemple le titre d’une page —, examinez les lignes modifiées, puis vérifiez le rendu. Si le poste ne permet pas de charger le modèle choisi, travaillez en binôme sur un poste compatible. Ollama est une autre solution de serveur local ; son adresse et sa configuration ne doivent pas être mélangées à celles de LM Studio.

**Erreurs fréquentes :** serveur arrêté, modèle téléchargé mais non chargé, mauvais port, terminal ouvert dans le mauvais dossier, fichier non enregistré, changement validé sans essai dans le navigateur.

## Installation de PHP et des outils

Installez [VS Code](https://code.visualstudio.com/), [XAMPP](https://www.apachefriends.org/fr/index.html) ou un environnement PHP équivalent, [LM Studio](https://lmstudio.ai/) et [OpenCode](https://opencode.ai/docs/). Téléchargez à l'avance un modèle compatible avec votre machine dans LM Studio. Le choix dépend de la mémoire disponible : vérifiez les indications de l'application, sans supposer qu'un modèle imposant fonctionnera sur tous les postes. Un binôme peut travailler sur un seul poste compatible. Aucun compte payant de fournisseur de modèle n'est nécessaire pour cette connexion locale.

Sur les postes de la fac, vérifiez les droits d'installation avec l'enseignant. Sur Windows, PHP de XAMPP se trouve habituellement dans `C:\xampp\php\php.exe` ; sur macOS, utilisez le chemin de votre installation. Ne confondez pas le chemin d'un fichier avec une URL.

## Les outils du développement local

L’éditeur modifie les fichiers, le terminal lance des commandes, le serveur PHP exécute PHP et le navigateur affiche la réponse. Ces outils ont des responsabilités différentes : installer une extension dans VS Code ne démarre pas automatiquement un serveur PHP.

```text
index.php enregistré
        ↓ demande HTTP du navigateur
serveur PHP sur localhost:8000
        ↓ résultat HTML
page affichée dans le navigateur
```

Pour l’IA locale, une autre chaîne intervient : OpenCode envoie une demande au serveur de LM Studio, qui utilise le modèle chargé. Ce serveur n’est pas le serveur PHP. Les ports permettent de joindre ces deux services séparément. `localhost` désigne la machine sur laquelle l’adresse est utilisée ; ce n’est pas une adresse partagée par toute la salle.

## Enregistrement du fichier et actualisation du navigateur

```php
<?php
$atelier = 'Photographie';
?>
<h1><?= htmlspecialchars($atelier, ENT_QUOTES, 'UTF-8') ?></h1>
```

**Sortie attendue, produite par PHP :** un titre « Photographie ». La variable est traitée sur le serveur, puis sa valeur est insérée dans du HTML. L’échappement permet de l’afficher comme texte. Cet exemple s’exécute dans votre environnement PHP, pas dans l’éditeur front-end du cours.

<a id="editeur"></a>

## Le dossier de projet et le terminal

VS Code modifie des fichiers. Ouvrez le dossier complet du projet, pas seulement un fichier isolé. L'explorateur montre son organisation ; le terminal exécute des commandes dans un répertoire courant. `pwd` dans PowerShell ou macOS affiche ce répertoire ; `cd` permet d'en changer. Un fichier non enregistré n'est pas encore celui que le serveur lit.

Créez `atelier/index.php` :

```php
<?php
$message = 'Bonjour MMI';
?>
<!doctype html>
<html lang="fr"><meta charset="utf-8"><title>Atelier</title>
<h1><?= htmlspecialchars($message, ENT_QUOTES, 'UTF-8') ?></h1></html>
```

Les extensions de VS Code peuvent aider à formater ou compléter, mais elles ne remplacent pas PHP. Installez uniquement des extensions dont vous comprenez l'utilité. Le formatage change la présentation du code, pas l'objectif du programme.

<a id="serveur"></a>

## Localhost n'est pas « Internet »

Dans le terminal du dossier `atelier`, lancez le serveur de développement :

```powershell
# Windows, si PHP n’est pas dans PATH :
C:\xampp\php\php.exe -S localhost:8000
```

```sh
# macOS ou Windows avec PHP dans PATH :
php -S localhost:8000
```

Ouvrez `http://localhost:8000`. `localhost` désigne la machine utilisée ; `8000` est le port du serveur PHP. Ouvrir un fichier par `file://` n'exécute pas PHP. Ctrl+C arrête le serveur lancé dans ce terminal. Si le port est occupé, choisissez par exemple 8001 et changez aussi l'URL. Le serveur intégré convient à l'exercice local, pas à une mise en production.

Avec Apache de XAMPP, utilisez plutôt son dossier `htdocs` et son URL locale : choisissez un parcours cohérent, sans lancer deux serveurs pour le même exercice.

<a id="ia"></a>

## Les quatre rôles de l'environnement IA

```text
VS Code → les fichiers que vous lisez et modifiez
OpenCode → assistant qui demande une réponse au modèle
LM Studio → serveur local qui reçoit cette demande
Modèle chargé → produit du texte, éventuellement du code
```

LM Studio expose une API compatible OpenAI, mais cela ne veut pas dire que le modèle est hébergé par OpenAI. Le serveur LM Studio et le serveur PHP sont deux services distincts. Le modèle local peut se tromper ; une réponse plausible n'est pas un test réussi. N'envoyez pas de secrets dans une consigne et contrôlez les changements avant de les conserver.

<a id="connexion"></a>

## Connecter OpenCode à LM Studio

Chargez le modèle dans LM Studio, puis démarrez son serveur local depuis l'onglet Developer. Vérifiez l'adresse et le port affichés. Pour un serveur sur le port 1234, créez **dans votre dossier d'atelier** un `opencode.json` :

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "lmstudio": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "LM Studio (local)",
      "options": { "baseURL": "http://127.0.0.1:1234/v1" },
      "models": { "REMPLACER_PAR_ID_MODELE": { "name": "Mon modèle local" } }
    }
  }
}
```

Remplacez la clé `REMPLACER_PAR_ID_MODELE` par l'identifiant exact du modèle chargé, visible dans LM Studio ou dans la réponse de `http://127.0.0.1:1234/v1/models`. Adaptez le port si nécessaire. Lancez `opencode`, puis `/models` pour sélectionner ce modèle. Si la connexion échoue, vérifiez dans l'ordre : serveur démarré, modèle chargé, URL, identifiant. Un modèle qui ne gère pas les outils demandés peut nécessiter un autre modèle ; ne multipliez pas les installations au hasard.

## Code PHP serveur et réponse HTML

Cette petite page ne nécessite ni PHP ni IA : le navigateur affiche HTML, applique CSS et exécute JavaScript. Changez la couleur puis le message. Dans votre vrai projet, comparez une ouverture de fichier avec une URL servie par XAMPP. Un assistant suggère du code ; il ne remplace pas le serveur.

```html live title="Observer ce que le navigateur exécute"
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

<h1>Mon premier atelier</h1>
<p>HTML donne le contenu, CSS sa présentation.</p>
<button type="button">Tester le comportement</button>
<p id="message" role="status"></p>
<style>
  h1 {
    color: #2457a7;
  }
</style>
<script>
  document.querySelector("button").addEventListener("click", () => {
    document.querySelector("#message").textContent =
      "Le navigateur exécute ce clic.";
  });
</script>
```

**Résultat à observer :** Le titre est bleu ; le bouton affiche un message. Modifier le texte du message change le comportement sans démarrer un modèle.
