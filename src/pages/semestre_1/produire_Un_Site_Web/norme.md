---
layout: "layouts/Layout.astro"
title: "Projet : vérifier l’accessibilité et la qualité HTML"
type: "TD"
order: 7
quizId: "s1-site-06"
previousSession: "/semestre_1/produire_Un_Site_Web/responsive"
nextSession: "/semestre_1/produire_Un_Site_Web/finalisation"
---

<a id="comprendre"></a>
## Les éléments HTML natifs et la navigation clavier

L’accessibilité permet de consulter et d’utiliser le site avec des moyens variés. Le choix d’un élément natif fournit déjà un rôle et des comportements : un lien avec `href` navigue ; un bouton réalise une action. Un `div` avec `onclick` ne devient pas automatiquement un bouton accessible.

Tab avance entre les contrôles natifs ; Maj+Tab revient au précédent. Entrée active un lien focalisé. Un bouton peut également être activé avec Espace. L’ordre du DOM doit rester logique ; une réorganisation visuelle avec Grid ne modifie pas automatiquement cet ordre.

```html live title="Navigation au clavier et focus"
<a href="#contenu">Aller au contenu principal</a>
<nav aria-label="Navigation"><a href="#contact">Contact</a></nav>
<main id="contenu" tabindex="-1"><h2>Projets</h2><p>Le contenu principal commence ici.</p></main>
<p id="contact">Coordonnées du créateur.</p>
<style>
  :focus-visible { outline: 3px solid #be123c; outline-offset: 3px; }
</style>
```

Le lien d’évitement rejoint directement le contenu principal pour éviter une navigation répétée. `tabindex="-1"` rend cette destination focalisable sans ajouter un arrêt à la tabulation normale. `outline: none` sans remplacement peut rendre le focus invisible ; un cadre visible doit identifier le contrôle courant.

## Titres, liens et alternatives textuelles

Les titres organisent le document, sa langue est déclarée avec `lang="fr"`, et les liens annoncent leurs destinations. « Voir le projet Photo » reste compréhensible hors contexte, contrairement à plusieurs liens « ici ».

Le texte alternatif d’une image restitue l’information utile dans son contexte ; `alt=""` convient à une décoration. Une légende peut ajouter du contexte, mais ne rend pas systématiquement l’alternative inutile. Une couleur seule ne doit pas signaler une erreur ou une sélection : ajoutez un texte ou un signe compréhensible.

Avant d’ajouter ARIA, choisissez d’abord l’élément HTML natif adapté. ARIA peut compléter son exposition aux technologies d’assistance ; il ne crée pas les interactions clavier manquantes.

## Labels et messages d’erreur

Le `for` du label correspond à l’`id` du champ. Le placeholder disparaît pendant la saisie et ne remplace pas une étiquette persistante. Une aide annonce le format attendu ; une erreur indique le problème et comment le corriger.

```html preview title="Un champ nommé et une aide persistante" height=160
<label for="courriel">Courriel</label>
<input id="courriel" name="courriel" type="email" aria-describedby="aide">
<p id="aide">Exemple de format : prenom@example.org</p>
<style>label { display: block; margin-bottom: 8px; } input { font: inherit; max-width: 100%; }</style>
```

Le clic sur l’étiquette place le focus dans le champ et l’aide reste affichée. Pour un refus de validation, un message comme « Le courriel doit contenir un nom de domaine » décrit une correction, tandis que « Erreur » seul ne suffit pas. La validation serveur reste nécessaire sur une vraie requête.

## Validité HTML, contraste et audit

Un validateur HTML contrôle la conformité de la structure. Un audit automatique détecte certains défauts d’accessibilité ; un score élevé ne garantit pas toute l’accessibilité. La pertinence des textes alternatifs, la clarté des liens et la facilité d’un parcours nécessitent des vérifications manuelles.

| Contrôle | Résultat attendu |
|---|---|
| Parcours avec Tab et Maj+Tab | Contrôles atteignables, ordre logique et focus visible |
| Titres et liens lus isolément | Hiérarchie et destinations compréhensibles |
| Image indisponible | Information essentielle restituée par son alternative |
| Saisie refusée | Champ identifié et correction expliquée |
| Zoom et fenêtre étroite | Contenus accessibles sans coupure arbitraire |
| Contraste texte/fond | Mesure adaptée aux critères applicables, au-delà de l’impression visuelle |

Corrigez une anomalie puis rejouez le même cas et un cas voisin. Les [tutoriels WAI](https://www.w3.org/WAI/tutorials/) approfondissent les contrôles par type de contenu.
