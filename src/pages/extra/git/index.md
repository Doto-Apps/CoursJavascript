---
order: 1
layout: "layouts/Layout.astro"
title: Introduction au Git CLI
---

## Git : versions locales et dépôt distant

Git enregistre des versions d’un projet. Un dépôt contient son historique dans `.git` ; les fichiers ordinaires forment le répertoire de travail. GitHub héberge des dépôts distants et des outils de collaboration : Git fonctionne aussi sans compte GitHub.

## Configurer l’auteur et créer un dépôt

```sh
git config --global user.name "Votre nom"
git config --global user.email "votre-adresse@example.org"
git init
git status
```

Ces commandes s’exécutent dans le dossier du projet. Nom et adresse identifient l’auteur des commits ; ils ne connectent pas à GitHub. `status` indique la branche et les fichiers suivis, modifiés ou non suivis. Sa formulation peut dépendre de la langue et de la version installées.

## Répertoire de travail, index et commit

```sh
git add index.html
git diff --cached
git commit -m "Ajoute la page d’accueil"
git log --oneline -3
```

`add` prépare la version actuelle du fichier dans l’index. `diff --cached` montre ce qui sera enregistré. `commit` crée une version locale ; il n’envoie rien sur GitHub. Si le fichier est à nouveau modifié après `add`, cette nouvelle modification doit être ajoutée avant le commit pour y figurer. Un identifiant de commit varie selon son contenu : ne cherchez pas à reproduire un hash donné dans un exemple.

Ajoutez un `.gitignore` avant de préparer des fichiers générés ou privés : `node_modules/`, `.env` et les sorties de compilation sont des cas fréquents. Un fichier déjà suivi ne devient pas non suivi par simple ajout à `.gitignore`. Vérifiez le diff avant chaque commit.

## clone, remote, fetch, pull et push

| Commande | Effet |
|---|---|
| `git clone URL` | Crée une copie locale d’un dépôt et configure généralement `origin` |
| `git remote -v` | Affiche les dépôts distants configurés |
| `git fetch origin` | Récupère l’historique distant sans intégrer ses changements à la branche courante |
| `git pull --ff-only` | Récupère et avance la branche uniquement si aucun rapprochement divergent n’est nécessaire |
| `git push` | Envoie les commits de la branche vers le distant configuré |

`origin/main` est une référence locale à l’état distant connu lors du dernier échange ; `main` est une branche locale. Leur nom ne prouve pas que leurs contenus sont identiques. L’authentification HTTPS ou SSH donne accès au distant ; une clé privée SSH reste sur le poste et seule la clé publique est enregistrée sur le service.

## Branches et fusion

```sh
git switch -c navigation
# Modifier les fichiers puis préparer et enregistrer le changement.
git add index.html
git commit -m "Ajoute la navigation"
git switch main
git merge navigation
```

Une branche est un nom mobile qui désigne une suite de commits. La fusion intègre l’autre branche dans celle où vous vous trouvez. Elle peut être une simple avance ou produire un commit de fusion selon l’historique.

## Conflits et rebase

Un conflit demande de choisir le contenu à conserver dans les fichiers signalés. Les marqueurs `<<<<<<<`, `=======` et `>>>>>>>` délimitent les versions en concurrence. Après correction, vérifiez le résultat, ajoutez les fichiers puis terminez l’opération. `git merge --abort` annule une fusion non terminée ; `git rebase --abort` annule un rebase en cours.

Un rebase rejoue des commits sur une nouvelle base et change leurs identifiants. Évitez de réécrire une branche déjà utilisée par d’autres sans coordination. `stash` met temporairement de côté des changements locaux ; vérifiez ce qui a été conservé avant de compter dessus, notamment pour les fichiers non suivis.

## Historique et conventions

Un message de commit décrit un changement cohérent, par exemple « Corrige le lien de contact ». Conventional Commits ajoute des préfixes tels que `fix:` et `feat:` quand le projet suit cette convention. Git Flow est une organisation possible des branches, pas une obligation de Git. Pour un petit projet étudiant, une branche principale stable et des branches de travail courtes peuvent suffire.
