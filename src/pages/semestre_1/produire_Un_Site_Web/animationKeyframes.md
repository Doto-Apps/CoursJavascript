---
hidden: true
order: 6
layout: "layouts/Layout.astro"
title: "TP 2 : Animations CSS avec @keyframes"
type: "TP"
---

## Les animations CSS avec @keyframes

Une transition relie des états ; une animation définit une séquence de valeurs au cours du temps. `@keyframes` nomme cette séquence ; `animation-name` l’associe à un élément. Une durée positive est nécessaire pour voir un mouvement.

## Définir les étapes

```html live title="Une animation en trois étapes"
<div class="point">A</div>
<style>
  .point { width: 40px; padding: 12px; background: #dbeafe; animation: trajet 3s linear infinite; }
  @keyframes trajet {
    0% { transform: translateX(0); }
    50% { transform: translateX(120px); }
    100% { transform: translateX(0); }
  }
  @media (prefers-reduced-motion: reduce) { .point { animation: none; } }
</style>
```

La boîte part de sa position initiale, atteint 120 px au milieu des trois secondes, puis revient. `0%` et `100%` peuvent s’écrire `from` et `to`. Les pourcentages désignent la progression dans la durée, pas la largeur du conteneur. L’animation se répète avec `infinite` sauf si une réduction du mouvement est demandée.

## Les propriétés animation

| Propriété | Fonction | Exemple |
|---|---|---|
| `animation-name` | Nom des étapes | `trajet` |
| `animation-duration` | Durée d’un cycle | `3s` |
| `animation-timing-function` | Progression entre étapes | `linear`, `ease-in-out` |
| `animation-delay` | Attente avant départ | `500ms` |
| `animation-iteration-count` | Nombre de cycles | `2`, `infinite` |
| `animation-direction` | Sens des cycles | `normal`, `reverse`, `alternate` |
| `animation-fill-mode` | Valeurs appliquées hors de la durée active | `none`, `forwards`, `backwards`, `both` |
| `animation-play-state` | Lecture ou pause | `running`, `paused` |

Le raccourci `animation: trajet 3s linear 500ms 2 alternate` combine ces réglages. Une liste séparée par des virgules applique plusieurs animations ; si elles modifient la même propriété, leur composition demande une attention supplémentaire. Commencez par une animation par propriété.

## alternate et animation-play-state

```html live title="Un aller-retour que l’on peut suspendre"
<div class="zone" tabindex="0"><span>Survol ou focus : pause</span></div>
<style>
  .zone { padding: 12px; min-height: 65px; border: 2px dashed #1d4ed8; }
  span { display: inline-block; padding: 8px; background: #dbeafe; animation: aller 2s ease-in-out infinite alternate; }
  @keyframes aller { to { transform: translateX(80px); } }
  .zone:hover span, .zone:focus-within span { animation-play-state: paused; }
  @media (prefers-reduced-motion: reduce) { span { animation: none; } }
</style>
```

Le premier cycle va vers la droite et le suivant revient. Le survol ou le focus du cadre suspend le mouvement à sa position courante. Retirer `animation-name` puis le remettre redémarrerait plutôt la séquence : une pause est un état différent.

## fill-mode et état final

`forwards` conserve les valeurs de la dernière étape applicable après une animation finie ; il ne modifie pas la règle CSS de base. `backwards` applique les valeurs de départ pendant le délai. `both` combine les deux. Le sens et le nombre de cycles déterminent quelle étape est finale.

```html live title="Un état conservé après une animation finie"
<div class="carte">Apparition</div>
<style>
  .carte { padding: 16px; background: #dbeafe; animation: apparition 2s ease-out 1 both; }
  @keyframes apparition { from { opacity: 0; } to { opacity: 1; } }
  @media (prefers-reduced-motion: reduce) { .carte { animation: none; } }
</style>
```

La carte devient visible puis le reste. La réinitialisation du bloc rejoue l’exemple. L’opacité de base n’est pas forcée à zéro : si les animations sont désactivées, le contenu reste lisible.

## Animation et information essentielle

La rotation d’un indicateur peut signaler une attente, mais un texte doit aussi annoncer l’état. Un mouvement permanent nécessite une possibilité d’arrêt adaptée au contexte. Un effet d’écriture lettre par lettre ne doit pas retarder l’accès au texte ni produire une succession d’annonces inutiles pour les technologies d’assistance. Les états chargement, succès et erreur sont définis par l’application, pas déduits du mouvement.
