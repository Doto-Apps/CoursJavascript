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
| `pnpm audit:content` | Vérifier séances, QCM, extraits du cours et liens internes |
| `pnpm check:s1-php` | Tester la référence PHP S1 : connexion, session et historique fichier |
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

`quizId`, `previousSession` et `nextSession` sont facultatifs. Les anciens supports de cours marqués `hidden: true` ont été supprimés. Ce marqueur reste sur la page d’accueil, qui ne constitue pas une séance et ne doit pas apparaître dans l’arbre des cours. Les registres `src/data/s1-sessions.json`, `s2-sessions.json` et `s3-sessions.json` fournissent les informations de séance affichées par le site.

Les notions techniques structurent le support. Chaque exemple est accompagné de son résultat. Les blocs `html preview` affichent un rendu fixe ; les blocs `html live` permettent de modifier et d’exécuter du HTML/CSS/JavaScript. PHP et SQL demandent leur propre environnement.

Voir le [guide des démonstrations](docs/exemples-interactifs.md).

## QCM

Les banques locales sont dans `src/data/quizzes/`. Un cours les référence avec `quizId` ; elles sont accessibles à `/quiz/IDENTIFIANT`. Chaque banque définit son mode, le nombre de questions par tentative, le temps par question et les réponses correctes. Les explications et les références au cours sont conservées dans le même JSON.

Les QCM d’entrée révisent le **cours précédent** : `sourceCourse` désigne le support qui justifie les réponses, `targetCourse` la séance où le QCM est proposé. Chaque question conserve une ancre existante et un extrait lisible du passage correspondant. Après une modification, lancer `pnpm audit:content` et relire le cours source avec ses questions : les contrôles automatiques ne décident pas de la pertinence pédagogique. Les anciens identifiants de QCM restent synchronisés avec leur banque canonique.

Le parcours « Produire un site Web » du semestre 1 accompagne la SAE 105 sans QCM. Ses anciennes banques ont été retirées et leurs identifiants ne déclenchent plus de chargement depuis le service distant.

Le [compte rendu de la relecture S1/S2](docs/audit-cours-qcm.md) précise le périmètre et les vérifications effectuées.

Les séances PHP S1 restantes suivent la progression algorithmie/tableaux (4), connexion avec session (5), mini-chat avec historique dans un fichier texte (6). Les exercices autonomes n’incluent pas de code de départ. Le mini-chat doit être terminé pendant les 90 minutes de TP, sans remise différée. Les QCM révisent les notions du cours précédent et n’évaluent pas les montants ou calculs des données d’exemple. La référence exécutable reste dans `docs/corrections-s1/messagerie`, hors des pages et téléchargements étudiants.

Rédiger les QCM avec des phrases courtes et les mots déjà expliqués aux étudiants. Chaque question doit indiquer ce qu’on cherche, avec une seule réponse correcte et des choix faciles à lire. Privilégier « supérieur ou égal à » à « égalité avec une borne basse », « le joueur au meilleur score » à « le candidat retenu ». Conserver les vrais termes techniques lorsqu’ils sont la notion évaluée, et expliquer leur sens dans la correction. Relire les réponses et les explications autant que les énoncés ; la difficulté doit venir de la notion, pas de la formulation.

Chaque question doit vérifier un acquis précis : reconnaître une syntaxe correcte, choisir une fonction, lire un accès de tableau, identifier un opérateur ou expliquer l’effet d’une instruction. Proposer des fragments de code quand la syntaxe est l’acquis visé, avec une seule bonne écriture. Écarter les justifications du scénario (« pourquoi vérifier une quantité avant de calculer un prix »), les choix d’organisation du TP et les conseils généraux de méthode. Ne pas confondre ces questions avec celles qui vérifient une commande ou une fonction de diagnostic réellement enseignée, comme `php -l` ou `var_dump`.

Les identifiants absents des banques locales utilisent le service Google Apps Script configuré dans `src/utils/getQuiz.ts` avec `API_KEY`. La page `/oral` utilise les variables `LLM_*` pour son service de génération.

## Déploiement

Le site utilise un serveur Node, notamment pour les sessions des QCM ; ce n’est pas un export statique GitHub Pages.

```sh
pnpm build
pnpm start
```

`HOST` et `PORT` règlent l’adresse d’écoute du serveur. Le `Dockerfile` et `docker-compose.yml` permettent également le lancement en conteneur. Le workflow `.github/workflows/deploy.yml` construit l’image et déploie sur le serveur configuré lors d’un push sur `main` ; ses secrets doivent être renseignés dans GitHub.
