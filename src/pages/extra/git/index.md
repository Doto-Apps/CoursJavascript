---
layout: "layouts/Layout.astro"
title: Introduction au Git CLI
---

Ce cours vous apprend les bases de Git CLI. Nous couvrirons l'installation, la configuration, SSH, les opérations de base, la gestion des conflits, Git Flow et les conventions de commit.

## 1. Installation et Configuration de Git

### 1.1 Installation de Git

Vérifiez l'installation de Git :

```bash
git --version
```

Si Git n'est pas installé, téléchargez-le depuis [le site officiel](https://git-scm.com/).

### 1.2 Configuration de Git

Configurez votre nom et votre email pour les commits :

```bash
git config --global user.name "Votre Nom"
git config --global user.email "votre-email@example.com"
```

### 1.3 Configuration de SSH

Pour utiliser SSH avec Git, générez une clé SSH et ajoutez-la à votre compte Git :

1. **Générer une clé SSH** :

    ```bash
    ssh-keygen -t rsa -b 4096 -C "votre-email@example.com"
    ```

2. **Ajouter la clé SSH à l'agent SSH** :

    ```bash
    eval "$(ssh-agent -s)"
    ssh-add ~/.ssh/id_rsa
    ```

3. **Ajouter la clé SSH à votre compte Git** :

    ```bash
    cat ~/.ssh/id_rsa.pub
    ```

    Collez ce contenu dans la section des clés SSH de votre compte Git (par exemple, [GitHub](https://github.com/settings/keys)).

### Avantages de SSH

- **Sécurité** : Utilise des clés cryptographiques.
- **Confort** : Pas de mot de passe à chaque interaction.
- **Performance** : Opérations plus rapides.

## 2. Opérations de Base

### 2.1 Cloner un Dépôt

Pour cloner un dépôt :

```bash
git clone https://github.com/username/repository.git
```

### 2.2 Fetch

Pour récupérer les dernières modifications du dépôt distant sans les fusionner :

```bash
git fetch origin
```

### 2.3 Pull

Pour récupérer et fusionner les dernières modifications du dépôt distant :

```bash
git pull origin main
```

### 2.4 Ajouter des Fichiers

Pour ajouter des fichiers à la zone de staging :

```bash
git add fichier1 fichier2
```

Pour ajouter tous les fichiers modifiés :

```bash
git add .
```

### 2.5 Commit

Pour valider les modifications :

```bash
git commit -m "Description des modifications"
```

### 2.6 Rebase

Pour réappliquer vos commits sur la dernière version du dépôt distant :

```bash
git rebase origin/main
```

### 2.7 Merge

Pour fusionner une branche dans la branche courante :

```bash
git merge nom-de-la-branche
```

### 2.8 Stash

Pour sauvegarder les modifications non validées :

```bash
git stash
```

Pour récupérer les modifications sauvegardées :

```bash
git stash pop
```

## 3. Gestion des Conflits

### 3.1 Résolution de Conflits lors d'un Rebase

Si des conflits surviennent lors d'un rebase, Git vous indiquera les fichiers concernés. Ouvrez ces fichiers et résolvez les conflits manuellement. Une fois les conflits résolus, ajoutez les fichiers modifiés :

```bash
git add fichier1 fichier2
```

Puis continuez le rebase :

```bash
git rebase --continue
```

### 3.2 Finir un Rebase

Si vous souhaitez abandonner un rebase en cours :

```bash
git rebase --abort
```

## 4. Git Flow et Conventional Commit

### 4.1 Git Flow

Git Flow est une méthode de gestion de branches pour Git qui aide à organiser le développement de logiciels. Elle définit une structure de branches standardisée pour gérer les fonctionnalités, les releases et les hotfixes. Voici les principales branches utilisées dans Git Flow :

- **`main`** : La branche principale qui contient le code stable et prêt à être déployé.
- **`develop`** : La branche de développement où toutes les nouvelles fonctionnalités sont intégrées avant d'être fusionnées dans `main`.
- **`feature/*`** : Les branches de fonctionnalités où chaque nouvelle fonctionnalité est développée indépendamment.
- **`release/*`** : Les branches de release préparées pour une nouvelle version du logiciel.
- **`hotfix/*`** : Les branches de hotfix pour corriger rapidement des bugs critiques dans le code en production.

### 4.2 Conventional Commit

Les commits conventionnels suivent une structure spécifique pour faciliter la lecture et la compréhension des modifications. Cette convention aide à générer automatiquement des journaux de changements et à semaphorer les versions des logiciels. Voici la structure d'un commit conventionnel :

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

- **`type`** : Le type de commit (par exemple, `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`).
- **`scope`** : Le module ou la partie du code affectée par le commit (facultatif).
- **`subject`** : Une description concise des modifications.
- **`body`** : Une description détaillée des modifications (facultatif).
- **`footer`** : Informations supplémentaires, comme les références de bugs (facultatif).

Voici quelques exemples de commits conventionnels :

- `feat(user): ajouter la fonctionnalité de connexion`
- `fix(payment): corriger le bug de paiement`
- `docs(readme): mettre à jour le README`
- `style(button): améliorer l'apparence des boutons`
- `refactor(api): simplifier la logique de l'API`
- `test(user): ajouter des tests pour la fonctionnalité de connexion`
- `chore(deps): mettre à jour les dépendances`

## 5. Récapitulatif des Commandes

### 5.1 Commandes de Base

| Commande            | Description                                      |
|---------------------|--------------------------------------------------|
| `git clone`         | Cloner un dépôt                                  |
| `git fetch`         | Récupérer les dernières modifications            |
| `git pull`          | Récupérer et fusionner les dernières modifications |
| `git add`           | Ajouter des fichiers à la zone de staging        |
| `git commit`        | Valider les modifications                        |
| `git rebase`        | Réappliquer les commits sur la dernière version  |
| `git merge`         | Fusionner une branche dans la branche courante   |
| `git stash`         | Sauvegarder les modifications non validées       |

### 5.2 Commandes Chainées

| Commandes Chainées            | Description                                      |
|-------------------------------|--------------------------------------------------|
| `git fetch && git pull`       | Récupérer et fusionner les dernières modifications |
| `git fetch && git checkout -b nom-de-la-branche origin/nom-de-la-branche && git branch --set-upstream-to=origin/nom-de-la-branche` | Cloner une branche distante et la suivre |

### 5.3 Pourquoi utiliser `origin/main` plutôt que `main` ?

Utiliser `origin/main` spécifie explicitement que vous travaillez avec la branche `main` du dépôt distant `origin`. Cela évite toute ambiguïté et garantit que vous travaillez avec la version la plus récente du dépôt distant.

Pour plus d'informations sur les commandes Git, consultez la [documentation officielle](https://git-scm.com/doc).




