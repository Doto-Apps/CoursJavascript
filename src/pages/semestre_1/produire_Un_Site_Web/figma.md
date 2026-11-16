---
layout: "layouts/Layout.astro"
title: "Lire une maquette et préparer l’intégration"
type: "CM"
order: 2
previousSession: "/semestre_1/produire_Un_Site_Web/projet"
nextSession: "/semestre_1/produire_Un_Site_Web/integration"
---

<a id="comprendre"></a>
## Wireframe, maquette et prototype

Un wireframe décrit la structure et la hiérarchie du contenu. Une maquette visuelle précise la présentation : couleurs, typographie, dimensions et médias. Un prototype simule des parcours et des interactions. Un prototype cliquable n’est pas encore un site HTML/CSS fonctionnel.

| Représentation | Ce qu’elle précise | Ce qu’elle ne prouve pas |
|---|---|---|
| Wireframe | Zones, priorités et organisation | Choix visuels finalisés |
| Maquette | Présentation d’un écran dans un état | Tous les états et toutes les largeurs |
| Prototype | Enchaînement simulé d’actions | Traitement d’un formulaire ou persistance |

Dans Figma, un frame est un conteneur de conception : il peut représenter un écran ou une zone. Un composant regroupe une structure réutilisable ; ses instances peuvent recevoir des contenus différents selon la configuration. Une capture fixe ne décrit pas tous les états d’une interface.

## Les dimensions et les relations de disposition

Pour intégrer une zone, relevez dimensions, espacements, couleurs, typographie et alignements. Une coordonnée x/y dans l’outil ne vous impose pas un positionnement absolu CSS : il faut traduire les relations entre les éléments.

```html preview title="Des règles de disposition plutôt que des coordonnées" height=230
<section><h2>Projets</h2><div class="projets"><article>Photo</article><article>Vidéo</article></div></section>
<style>
  section { max-width: 600px; margin-inline: auto; padding: 24px; border: 2px solid #1d4ed8; }
  .projets { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  article { padding: 16px; background: #dbeafe; }
</style>
```

Cette représentation locale exprime une largeur maximale, un espace intérieur et une gouttière entre deux cartes. Ajouter du texte agrandit leur hauteur sans modifier leurs coordonnées manuellement. La grille traduit un alignement commun observable dans la maquette.

## Composants et valeurs partagées

Plusieurs cartes partageant structure et styles forment un composant réutilisable, même si leurs contenus diffèrent. Un token est une valeur de conception partagée : une couleur accent, une taille de texte ou un espacement. Dans la feuille CSS, une propriété personnalisée peut représenter cette valeur.

| Observation dans la maquette | Règle d’intégration |
|---|---|
| Même bord gauche pour plusieurs zones | Conteneur commun |
| Même distance entre cartes | Gouttière partagée |
| Même structure de fiche | Classe de composant |
| Même accent sur titres et liens | Valeur CSS commune |

## Médias, licences et états manquants

Gardez le texte comme texte et exportez les médias utiles. Une capture globale empêche de sélectionner les textes et d’utiliser leurs liens. SVG convient à de nombreux éléments vectoriels ; les photographies demandent un format et des dimensions adaptés. Conservez les crédits et les licences avec les ressources exportées.

Si un état mobile, vide ou en erreur manque, notez la question et clarifiez le comportement au lieu d’inventer une fonction. Précisez aussi le focus clavier, le texte long et le recadrage des images. Les outils d’inspection disponibles dépendent des permissions et du compte Figma : le fichier doit être consultable, sans supposer un accès payant particulier.

La [structure HTML](integration) décrit ensuite les rôles des zones ; leur apparence sera traitée avec les conteneurs et les composants CSS.

## Relevé d’intégration à produire

À partir de la maquette fournie ou de celle de votre projet, relevez le conteneur, les gouttières, l’espace intérieur d’une carte, la hiérarchie typographique et les couleurs partagées. Pour chaque valeur, notez l’élément concerné et une règle CSS possible. Identifiez au moins un composant répété et ses variantes.

Préparez les médias avec leur source, leur licence, leur format et leur nom de fichier. Ajoutez une liste des états à préciser : petit écran, texte long, survol, focus et éventuelle absence de contenu. Remettez le relevé, les ressources utiles et le parcours simulé ; une capture générale seule ne décrit pas les règles à intégrer.
