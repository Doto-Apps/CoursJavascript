# Cours BUT MMI

Plateforme de cours pour les semestres 1 à 4 du BUT MMI, construite avec Astro, React et Tailwind CSS. Les supports sont rédigés en Markdown, avec des exemples interactifs et des QCM.

## Démarrer

Node.js 22 et pnpm 9.10.0 sont nécessaires.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Ouvrir [localhost:4321](http://localhost:4321).

La configuration facultative des services externes est décrite dans `.env.dist`. Copier ce fichier en `.env` pour utiliser ces services. Les cours et les QCM locaux fonctionnent sans eux. Le fichier `.env` reste hors du dépôt.

## Commandes

| Commande | Utilisation |
|---|---|
| `pnpm dev` | Développement local |
| `pnpm build` | Compilation du site |
| `pnpm preview` | Aperçu après compilation |
| `pnpm start` | Serveur de production après compilation |
| `pnpm format` | Formatage du projet |

## Organisation

```text
src/
  pages/          Cours Markdown et routes du site
  data/           Registres des semestres et banques de QCM
  components/     Composants de navigation et de quiz
  layouts/        Mise en page commune
  markdown/       Traitement des blocs de démonstration
  scripts/        Éditeur interactif chargé dans le navigateur
  styles/         Styles de l’accueil et des démonstrations
  utils/          Fonctions utilisées par le site
public/
  exemples/       Projets de départ et téléchargements étudiants
  images/         Illustrations des cours
  vendor/         Bibliothèques locales et leurs licences
docs/
  exemples-interactifs.md
  corrections-s1/
  corrections-s2/
```

Les corrections sont des ressources enseignant ; elles ne sont pas publiées comme pages du site. Les applications PHP/MySQL se lancent séparément d’Astro, selon leur notice.

## Modifier les cours

Ajouter ou modifier un fichier `.md` dans `src/pages`. Son chemin définit son URL. L’en-tête conserve les informations du cours :

```yaml
---
layout: "layouts/Layout.astro"
title: "Les sélecteurs CSS"
type: "TD"
order: 3
quizId: "s1-int-02"
previousSession: "/semestre_1/integration/htmltd"
nextSession: "/semestre_1/integration/html"
---
```

`quizId`, `previousSession` et `nextSession` sont facultatifs. `hidden: true` masque une ressource de la barre latérale tout en conservant son URL. Les registres `src/data/s1-sessions.json`, `s2-sessions.json` et `s3-sessions.json` fournissent les informations de séance affichées par le site.

Les notions techniques structurent le support. Chaque exemple est accompagné de son résultat. Les blocs `html preview` affichent un rendu fixe ; les blocs `html live` permettent de modifier et d’exécuter du HTML/CSS/JavaScript. PHP et SQL demandent leur propre environnement.

Voir le [guide des démonstrations](docs/exemples-interactifs.md).

## QCM

Les banques locales sont dans `src/data/quizzes/`. Un cours les référence avec `quizId` ; elles sont accessibles à `/quiz/IDENTIFIANT`. Chaque banque définit son mode, le nombre de questions par tentative, le temps par question et les réponses correctes. Les explications et les références au cours sont conservées dans le même JSON.

Les identifiants absents des banques locales utilisent le service Google Apps Script configuré dans `src/utils/getQuiz.ts` avec `API_KEY`. La page `/oral` utilise les variables `LLM_*` pour son service de génération.

## Déploiement

Le site utilise un serveur Node, notamment pour les sessions des QCM ; ce n’est pas un export statique GitHub Pages.

```sh
pnpm build
pnpm start
```

`HOST` et `PORT` règlent l’adresse d’écoute du serveur. Le `Dockerfile` et `docker-compose.yml` permettent également le lancement en conteneur. Le workflow `.github/workflows/deploy.yml` construit l’image et déploie sur le serveur configuré lors d’un push sur `main` ; ses secrets doivent être renseignés dans GitHub.
