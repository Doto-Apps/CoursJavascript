---
layout: "layouts/Layout.astro"
title: "Présentation et évaluation de la SAE 105"
type: "CM"
order: 1
nextSession: "/semestre_1/produire_Un_Site_Web/figma"
---

## La SAE 105 en bref

La **SAE 105 — Produire un site Web** consiste à concevoir, intégrer et publier votre **portfolio personnel**. Le détail des attentes a été présenté oralement en cours : cette page sert de **mémo**. Le document de cadrage officiel reste la référence.

Vous devrez réaliser une maquette, puis un site statique en **HTML5 et CSS**, sans JavaScript, avec une navigation et un **formulaire de contact** (sans envoi fonctionnel exigé). Votre code doit respecter les standards du W3C et votre site doit être publié en ligne, notamment avec **GitHub Pages**. **Le responsive n'est pas obligatoire à ce stade.**

## Critères de notation

Chaque critère reçoit une **note sur 20**, pondérée par son coefficient. **Total des coefficients : 20.**

| Critère | Ce qui sera évalué | Coeff. | Modalité |
|:---|:---|:---:|:---|
| **C1 — Deux pages Web avec interaction** (AC 14.02) | Créer deux pages HTML/CSS reliées entre elles, avec balises HTML5 sémantiques, titres, paragraphes, liens et sélecteurs CSS adaptés. | **4** | **10 min**, présentiel, sans IA ni Internet |
| **C2 — CSS structuré** (AC 14.03) | À partir d'un site fourni, identifier les classes, mutualiser les styles des boutons et utiliser plusieurs classes lorsque nécessaire. | **4** | **10 min**, présentiel |
| **C4 — Maîtrise des outils** (AC 14.01) | **Développement :** préparer un projet HTML/CSS, utiliser l'éditeur, un plugin, les raccourcis et exécuter le site. **Figma :** configurer un projet, créer un composant avec auto-layout et le présenter en direct. | **6** | **20 min**, présentiel |
| **C6 — Hébergement** (AC 14.04) | Publier le portfolio sur **GitHub Pages** et communiquer son URL. | **2** | Remise sur l'ENT |
| **C7 — Journal d'IA générative** | Qualité et précision de la documentation des interactions avec l'IA, des problèmes identifiés et des corrections personnelles. | **4** | Remise sur l'ENT |

**Calcul de la note finale :** somme des notes pondérées par leurs coefficients, divisée par **20**.

## IA générative : règles et journal obligatoire

L'**IA est autorisée après un travail personnel**, mais **tout usage doit être documenté et expliqué**. Elle peut notamment aider à relire ou critiquer une maquette et une intégration. Elle ne doit pas réaliser à votre place la première maquette ni la vue du formulaire de contact. L'épreuve **C1 se déroule sans IA**.

Le **journal d'IA générative** est un **PDF séparé de 6 pages minimum**. Il doit montrer **ce que vous avez demandé, ce que l'IA a répondu, les erreurs repérées, vos corrections et leur justification**. Ce n'est pas une simple compilation de captures d'écran.

| Pour chaque tâche documentée | À fournir |
|:---|:---|
| **1. Contexte** | Tâche, date, temps consacré et gain de temps estimé |
| **2. Demande à l'IA** | Prompt exact envoyé |
| **3. Réponse de l'IA** | Réponse ou code brut, captures et problèmes identifiés |
| **4. Corrections personnelles** | Version corrigée, modifications et raisons techniques ou éthiques |
| **5. Bilan** | Résultat obtenu et estimation du temps gagné |

Sur la **première page** du journal : nom, prénom, filière, année universitaire et **URL du portfolio**. Les extraits de code doivent être **intégrés directement dans le PDF en blocs de code lisibles** (police monospace, indentation conservée), pas uniquement sous forme de captures d’écran. En **dernière page** : nombre total de tâches, gain de temps total, nombre de bugs corrigés et lien GitHub.

## Modèle à suivre pour le journal IA

Pour **chaque tâche** réalisée avec l’aide d’une IA, utilisez la structure suivante. Le code proposé par l’IA et votre code corrigé doivent apparaître **dans le PDF sous forme de blocs de code lisibles**, avec une police monospace et l’indentation conservée.

**TÂCHE #__ :** _______________________________

**Date :** ___/___/___ — **Temps total :** ___ h — **Gain de temps :** ___ h (par rapport à un travail manuel)

### 1. Demande à l’IA

*Recopiez exactement ce que vous avez demandé (prompt).* 

> ____________________________________________________________
>
> ____________________________________________________________

### 2. Réponse de l’IA

*Insérez la réponse brute : texte, code complet dans un bloc de code ou capture d’écran.*

**Problèmes repérés :**

- [ ] _______________________________
- [ ] _______________________________

### 3. Mes corrections

*Présentez le code final qui fonctionne dans un second bloc de code.*

**Modifications expliquées :**

- [ ] _______________________________
- [ ] _______________________________

### 4. Résultat

**Temps avec IA :** ___ min — **Temps sans IA (estimé) :** ___ min — **Gain :** ___ %

**Autres améliorations :**

- [ ] _______________________________

## Exemple fourni dans le document de cadrage

**TÂCHE #2 :** Création de la table `social_media`  
**Date :** 12/03/2026 — **Temps total :** 45 min — **Gain de temps :** 40 min

### 1. Demande à l’IA

> Génère table MySQL social_media avec id, twitter, facebook, instagram

### 2. Réponse de l’IA

```sql
CREATE TABLE social_media (
  id INT PRIMARY KEY,
  twitter VARCHAR,
  facebook VARCHAR
);
```

**Problèmes repérés :**

- `VARCHAR` sans taille.
- Absence du moteur `InnoDB`.
- Absence d’index pour les recherches.

### 3. Mes corrections

```sql
CREATE TABLE social_media (
  id INT PRIMARY KEY AUTO_INCREMENT,
  twitter VARCHAR(255) DEFAULT NULL,
  facebook VARCHAR(255) DEFAULT NULL,
  INDEX idx_twitter(twitter)
) ENGINE=InnoDB;
```

**Modifications expliquées :**

- Taille `VARCHAR(255)` définie pour les champs.
- `InnoDB` spécifié pour les transactions.
- Index ajouté pour les recherches sur `twitter`.

### 4. Résultat

**Temps avec IA :** 2 min — **Temps sans IA (estimé) :** 45 min — **Gain annoncé dans l’exemple :** 86 %

**Autre amélioration :** `DEFAULT NULL` pour autoriser l’absence de valeur.

Cet exemple illustre **la méthode de présentation du journal**, même si votre SAE porte sur un site HTML/CSS et non sur une base MySQL. Pour vos propres tâches, documentez vos interactions réelles et vos corrections personnelles.

## Rendu à déposer

Déposez **uniquement ces deux éléments** sur l’**ENT (cours B1MS15, onglet Travaux)** :

1. **Le lien public de votre portfolio publié en ligne** (GitHub Pages, par exemple).
2. **Votre journal d’IA générative au format PDF** (6 pages minimum, avec les blocs de code et vos explications).

**Aucune archive ZIP ni dossier de code source à déposer.** Vérifiez que le site est accessible à partir du lien communiqué. Respectez la date limite indiquée sur l’ENT ; aucun dépôt par mail n’est accepté.

**Pour toute question sur la SAE :** Laurent Capocchi — capocchi@univ-corse.fr.

**À conserver :** le document de cadrage complet, qui détaille les consignes et les critères. Le prochain [support de cours sur Figma](figma) présente la première étape de conception.
