---
layout: "layouts/Layout.astro"
title: "Consolider HTML et CSS : lire, tester, corriger"
type: "CM"
order: 4
quizId: "s1-int-03"
previousSession: "/semestre_1/integration/csstd"
nextSession: "/semestre_1/integration/grid"
---

<a id="comprendre"></a>

## Code source, DOM et styles calculés

Le fichier enregistré est le texte que vous avez écrit. Le **DOM** est l’organisation d’éléments construite par le navigateur ; celui-ci peut corriger certains défauts d’imbrication. Le style calculé est la valeur effectivement utilisée après la cascade. Ces trois vues répondent à des questions différentes : « qu’ai-je écrit ? », « quelle structure existe ? », « quelle règle s’applique ? ».

| Symptôme | Vérification prioritaire | Pourquoi |
|---|---|---|
| Aucun style ne semble chargé. | Onglet Réseau et chemin de `style.css`. | Une règle correcte ne sert pas si son fichier manque. |
| Une seule carte reste différente. | Attribut `class` de cette carte. | Le sélecteur peut ne pas lui correspondre. |
| Une déclaration est barrée. | Règle gagnante dans Styles. | Une autre déclaration a été retenue. |
| La boîte dépasse. | Largeur calculée, padding, bordure et contenu. | La largeur déclarée n’explique pas seule la taille extérieure. |

## La cascade et la spécificité CSS

Dans les exemples du cours, les règles proviennent du même fichier, sans couche CSS ni `!important`. Un sélecteur de classe est plus spécifique qu’un sélecteur de balise. À spécificité égale, la déclaration située plus tard gagne pour la même propriété. Cette règle ne signifie pas « la dernière règle gagne toujours ».

```css
p { color: navy; }
.alerte { color: firebrick; }
p { color: green; }
```

Pour `<p class="alerte">Attention</p>`, la couleur reste `firebrick` : la classe l’emporte sur les deux sélecteurs `p`. Une autre propriété non concurrencée reste applicable. Ne recopiez pas toute la règle pour réparer une seule propriété.

`inherit` demande la valeur héritée ; une valeur définie directement sur l’enfant l’emporte sur une valeur simplement héritée. `!important` n’est pas une solution de diagnostic : il peut masquer une organisation incorrecte et rendre les modifications suivantes plus difficiles.

**Démarche reproductible :** enregistrer, recharger, inspecter le bon élément, relever la valeur calculée, désactiver une déclaration dans DevTools puis modifier le fichier source. Les modifications temporaires dans DevTools ne sont pas enregistrées automatiquement dans votre CSS.

## Les outils de développement du navigateur

Un style absent peut venir de trois endroits différents : la ressource ne charge pas, le sélecteur ne correspond pas, ou une autre déclaration gagne dans la cascade. Ajouter une nouvelle règle sans identifier la cause risque de masquer le problème. L’inspecteur sert à observer ce que le navigateur a effectivement compris.

| Observation | Hypothèse | Vérification |
|---|---|---|
| Toute la page perd ses styles | Feuille absente | Statut et URL dans Réseau |
| Une carte seule est incorrecte | Classe ou sélection différente | HTML et règles correspondantes |
| Une déclaration est barrée | Une autre gagne | Déclaration retenue et cascade |
| Une image manque après transfert | Chemin ou casse différente | Nom exact et base de l’URL |

```html live title="Observer les règles concurrentes"
<style>
      body {
        font-family: system-ui, sans-serif;
        margin: 16px;
        color: #203047;
        background: #f3f6fa;
      }
      p {
        color: #334155;
      }
      .message {
        color: #9f1239;
      }
      .message {
        color: #3730a3;
      }
      #important {
        color: #205b32;
      }
      .carte a {
        text-decoration-thickness: 3px;
      }
      .carte > a {
        color: #954300;
      }
    </style>

<h1>Quelle règle gagne ?</h1>
    <p>Un paragraphe ordinaire.</p>
    <p class="message">Même classe, dernière règle de même spécificité.</p>
    <p id="important" class="message">Un identifiant plus spécifique.</p>
    <div class="carte">
      <a href="#fin">Lien enfant direct</a>
      <p><a href="#fin">Lien descendant plus profond</a></p>
    </div>
    <p id="fin">Destination des liens.</p>
```

**Lecture accompagnée :** les deux règles `.message` ont la même spécificité. Dans ce fichier, sans couche particulière ni `!important`, la dernière déclaration de couleur applicable gagne. Le sélecteur `#important` est plus spécifique ; cela ne signifie pas que le nom « important » possède un pouvoir spécial.

**Méthode à réutiliser :** symptôme → hypothèse → test → correction → nouveau test. Notez l’hypothèse, même lorsqu’elle était fausse : vous apprenez à expliquer une cause, pas seulement à obtenir une capture acceptable.

<a id="organisation"></a>

## Les fichiers HTML et CSS

```text
profils/
  index.html
  css/style.css
  images/avatar.svg
```

Dans `index.html`, `href="css/style.css"` charge la feuille depuis le dossier `css`. Dans une feuille CSS, un chemin `url(...)` est résolu par rapport au fichier CSS. Les noms de fichiers et leur casse doivent correspondre à leur utilisation. `head` contient les métadonnées, tandis que `main` appartient au `body`. `title` nomme l'onglet ; `h1` nomme le contenu principal visible. Un fichier HTML bien structuré ne dépend pas des couleurs pour exprimer le rôle des sections.

<a id="cascade"></a>

Plusieurs éléments peuvent partager une classe, mais chaque `id` doit être unique dans le document. Il désigne notamment la cible d’un lien de fragment et peut aussi servir dans un sélecteur CSS.

## La priorité entre les règles CSS

```css
p { color: #334155; }
.message { color: #9f1239; }
.message { color: #3730a3; }
```

Pour des règles normales de la même origine et du même niveau de couche, la spécificité participe au choix de la règle appliquée. Un sélecteur d'identifiant est plus spécifique qu'un sélecteur de classe ; une classe est plus spécifique qu'un sélecteur de balise. À spécificité égale, la dernière déclaration rencontrée gagne. L'ordre des classes dans l'attribut `class` ne détermine pas cet ordre : c'est l'ordre des règles qui compte.

Certaines propriétés, comme `color` et `font-family`, peuvent être héritées du parent. `margin` n'est pas héritée. Évitez `!important` comme premier réflexe : cherchez la règle concurrente dans l'inspecteur. Le sélecteur descendant `.carte a` cible les liens dans une carte, même imbriqués plus profondément. Le sélecteur enfant `.carte > a` cible uniquement ses liens enfants directs.


**Prédisez**, puis exécutez : quelle couleur a le message ? Inversez les deux règles `.message`. Ajoutez un lien dans un paragraphe de la carte et comparez les deux combinateurs.

<a id="diagnostic"></a>

## Inspecteur, console et panneau Réseau

Inspectez un élément pour voir le HTML courant, les règles appliquées et les styles calculés. Le panneau Réseau permet de vérifier le chargement de la feuille CSS et son statut HTTP. Une ressource CSS en `404` invite d'abord à vérifier son chemin. Une propriété CSS invalide est généralement ignorée ; elle ne bloque pas toute la page.

Une modification dans l'inspecteur change la page courante, mais n'enregistre pas votre fichier source. Recopiez la modification utile dans le projet, puis rechargez pour vérifier qu'elle persiste. Si une règle n'a aucun effet, vérifiez d'abord le chargement du fichier, le sélecteur et la validité de la déclaration, avant sa spécificité.

```css
/* Incorrect : le nom de propriété n'existe pas */
.message { text-color: blue; }
/* Correct */
.message { color: blue; }
```

<a id="etats"></a>

## Pseudo-classes et dimensions des images

`:hover` cible le survol ; `:focus-visible` rend visible la prise de focus au clavier selon le comportement du navigateur. Un lien doit rester reconnaissable et utilisable au clavier. `max-width: 100%` limite une image à la largeur de son conteneur ; `height: auto` préserve ses proportions. Masquer un élément avec `display: none` retire aussi l'espace qu'il occupait.

## Exemple court — une classe l’emporte sur une balise

Ce paragraphe est rouge : dans ce même fichier, la classe est plus spécifique que le sélecteur p. Déplacez les règles dans le laboratoire du cours pour vérifier que l’ordre seul ne suffit pas à inverser ce résultat.

```html preview title="La classe détermine la couleur" height=130
<p class="alerte">Attention au chemin du fichier.</p>
<style>
  .alerte {
    color: firebrick;
  }
  p {
    color: navy;
  }
</style>
```

## Pour approfondir

- [Cascade, spécificité et héritage — MDN](https://developer.mozilla.org/fr/docs/Learn_web_development/Core/Styling_basics/Handling_conflicts).
- [Référence des pseudo-classes — MDN](https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Selectors/Pseudo-classes).
- [Liste des propriétés CSS — MDN](https://developer.mozilla.org/fr/docs/Web/CSS/Reference).

## Atelier de diagnostic

Reprenez une page avec sa feuille CSS. Prédisez la couleur d’un paragraphe portant une classe et un id, puis vérifiez la règle gagnante. Introduisez successivement un mauvais chemin de feuille, une classe mal orthographiée et une déclaration concurrente plus spécifique. Rétablissez chaque défaut avant de passer au suivant.

| Défaut introduit | Preuve à relever | Correction attendue |
|---|---|---|
| Mauvais chemin CSS | Adresse et statut 404 dans Réseau | Adresse correspondant au fichier enregistré |
| Classe différente | Aucun sélecteur attendu dans Styles | Même nom dans HTML et CSS |
| Règles concurrentes | Déclaration barrée et valeur calculée | Règle expliquée selon la cascade |

Remettez la page corrigée et trois diagnostics « symptôme, cause, test, correction ». Une modification faite uniquement dans l’inspecteur doit être reportée dans le fichier, puis vérifiée après rechargement.
