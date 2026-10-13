---
layout: "layouts/Layout.astro"
title: "Complément : une API de devoirs avec Express et MySQL"
hidden: true
---

Cette API transpose le CRUD PHP du S2 à Node.js. Les exemples et leur implémentation complète utilisent Node.js 22+, Express 5 et mysql2 3, avec un serveur MySQL ou MariaDB disponible. La [configuration exécutable](/semestre_3/deploiement_Services/correctionApi) détaille l’installation et les variables d’environnement.

## Modèle et contrat

| Champ | Type et règle | Rôle |
|---|---|---|
| id | Entier positif généré. | Identité stable. |
| nom | Texte non vide, 120 caractères maximum. | Intitulé du devoir. |
| description | Texte non vide, 2000 caractères maximum. | Travail demandé. |
| date_debut | Date réelle année-mois-jour. | Début du travail. |
| date_rendu | Date réelle, pas avant le début. | Échéance. |
| matiere, professeur | Textes non vides, 80 caractères maximum. | Contexte pédagogique. |

| Route | Résultat |
|---|---|
| GET /devoirs | 200 et tableau, vide si aucune ligne. |
| GET /devoirs/:id | 200 et objet, ou 404. |
| POST /devoirs | 201 et objet créé. |
| PUT /devoirs/:id | 200 et objet remplacé : tous les champs sont requis. |
| DELETE /devoirs/:id | 200 et confirmation, ou 404. |

Ici PUT remplace les champs métier complets ; ce n’est pas le PATCH partiel de la Todo List. Une méthode non prévue reçoit 405. Un JSON mal formé reçoit 400 ; des valeurs refusées reçoivent 422. Les écritures exigent un jeton de démonstration configuré côté serveur.

```sql
CREATE TABLE devoir (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(120) NOT NULL,
  description TEXT NOT NULL,
  date_debut DATE NOT NULL,
  date_rendu DATE NOT NULL,
  matiere VARCHAR(80) NOT NULL,
  professeur VARCHAR(80) NOT NULL
);
```

Créez une base de test avec encodage utf8mb4 et exécutez ce schéma. NOT NULL ne refuse pas à lui seul une chaîne vide ; les règles du tableau restent appliquées dans l’API.

## Route, middleware et pool

Une **route** associe méthode, chemin et fonction. Un **middleware** traite la requête avant la route, par exemple pour analyser JSON ou vérifier une permission ; il appelle next pour poursuivre ou termine avec une réponse. Un **pool** gère des connexions réutilisables vers MySQL.

```js
app.post("/devoirs", autoriser, async (req, res) => {
  const devoir = valider(req.body);
  const [resultat] = await pool.execute(
    "INSERT INTO devoir (nom, description, date_debut, date_rendu, matiere, professeur) VALUES (?, ?, ?, ?, ?, ?)",
    Object.values(devoir),
  );
  res.status(201).json({ id: resultat.insertId, ...devoir });
});
```

**Sortie attendue :** un objet JSON avec les six champs validés et un nouvel id. Les points d’interrogation sont des paramètres, pas des guillemets à ajouter manuellement. La validation construit ici l’objet dans l’ordre des colonnes. Dans la correction complète, les valeurs sont explicites pour rendre cette correspondance visible.

Avec Express 5, le rejet d’une fonction de route async est transmis au middleware d’erreur. Ce middleware possède quatre paramètres et doit répondre sans envoyer les identifiants de base au client. Cela ne capture pas n’importe quelle opération détachée : une promesse non attendue reste une erreur de conception.

## Authentification et autorisation : deux questions

L’authentification vérifie l’identité ; l’autorisation vérifie l’opération permise. Cacher un bouton dans Retool ne protège pas une route. Le jeton partagé du complément démontre un contrôle d’écriture mais n’identifie pas chaque étudiant : il n’est pas une gestion de comptes destinée à la production.

L’ancien exercice utilisait JWT et bcrypt. Ces notions restent une **extension** : le serveur conserve des comptes, compare un mot de passe avec son empreinte, émet un jeton signé à durée limitée, vérifie la signature puis les droits pour chaque opération. Un JWT signé n’est pas automatiquement chiffré ; ne placez pas de secret dans son contenu. Les comptes en tableau mémoire disparaissent au redémarrage. Prévoir la persistance et les droits exige un travail distinct du CRUD de base.

## Pour approfondir

- [Routage Express](https://expressjs.com/en/guide/routing.html).
- [Erreurs dans Express 5](https://expressjs.com/en/5x/guide/error-handling/).
- [Paramètres préparés mysql2](https://sidorares.github.io/node-mysql2/docs/documentation/prepared-statements).
- [Présentation de JWT](https://jwt.io/introduction).
