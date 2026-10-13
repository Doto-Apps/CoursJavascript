---
layout: "layouts/Layout.astro"
title: "Transitions, transformations et apparition au défilement"
type: "TP"
order: 3
quizId: "s2-int-02"
previousSession: "/semestre_2/integration/td/tailwind-composants"
nextSession: "/semestre_2/integration/tp/hover"
---

<a id="comprendre"></a>

## transform, transition et animation

| Outil | Rôle | Déclenchement |
|---|---|---|
| `transform` | Déplacer, tourner ou mettre à l’échelle visuellement. | Une valeur appliquée à l’élément. |
| `transition` | Interpoler le passage entre deux valeurs. | Un changement de propriété, par exemple au survol. |
| `@keyframes` et `animation` | Décrire une suite d’étapes nommée. | Une animation appliquée à l’élément. |

Une transition ne crée pas un changement : `transition: transform 200ms` attend que la valeur de `transform` varie. `translateY(-4px)` déplace l’apparence sans déplacer les voisins dans le flux. Un mouvement peut donc chevaucher un élément voisin si le cadre n’est pas prévu.

```html preview title="État visuel transformé" height=130
<p class="etiquette">Déplacement visuel de 4 pixels</p>
<style>
  .etiquette { padding: 16px; background: #dce9fa; transform: translateY(4px); }
</style>
```

## IntersectionObserver et événement scroll

L’IntersectionObserver utilisé dans la démonstration détecte qu’un élément devient visible ; il déclenche une apparition. Ce n’est pas une animation dont chaque image suit continuellement la position de défilement. Une véritable animation liée au défilement utilise une timeline adaptée, avec un repli lorsque la fonctionnalité n’est pas disponible. Le TP commence par la version d’apparition, plus facile à diagnostiquer.

## prefers-reduced-motion

`prefers-reduced-motion: reduce` indique une préférence de réduction des mouvements. Supprimez les déplacements non nécessaires ou raccourcissez leur rôle sans cacher le contenu. La base doit rester visible si le script d’observation ne s’exécute pas. Une classe initialement transparente sans stratégie de repli pourrait faire disparaître le cours ou le projet pour certains utilisateurs.

Le mouvement accompagne une information : apparition d’un contenu, survol d’une action, changement d’état. Il ne doit pas être l’unique moyen de comprendre la réussite d’une action.

<a id="apprentissage"></a>

## Transitions et animations CSS

Une transition interpole le changement d’une propriété entre deux états. Elle nécessite une valeur de départ et une valeur d’arrivée ; déclarer une durée ne déclenche pas une action. Une animation utilise des étapes nommées avec `@keyframes`. `transform` déplace, fait tourner ou redimensionne visuellement un élément sans réorganiser les boîtes voisines comme le ferait une nouvelle largeur dans le flux.

```css
.carte {
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.carte:hover,
.carte:focus-within {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px #20304733;
}

@media (prefers-reduced-motion: reduce) {
  .carte { transition: none; transform: none; }
}
```

**Lecture :** `200ms` est la durée, `ease` la progression et `transform` la propriété concernée. Le focus d’un lien dans la carte déclenche aussi l’état avec `:focus-within`. Le déplacement de 4 px n’exige pas une nouvelle hauteur pour les cartes voisines.

```html live title="Transition, transformation et apparition"
<style>
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        padding: 20px;
        font-family: system-ui, sans-serif;
        color: #18324c;
        background: #f1f5f9;
      }
      button,
      input,
      select,
      textarea {
        font: inherit;
        max-width: 100%;
      }
      button {
        padding: 8px 12px;
        cursor: pointer;
      }
      input,
      select,
      textarea {
        padding: 8px;
      }
      :focus-visible {
        outline: 3px solid #2563eb;
        outline-offset: 3px;
      }
      article,
      .panel {
        padding: 16px;
        background: white;
        border-radius: 12px;
        min-width: 0;
      }
      .cards {
        display: grid;
        gap: 16px;
      }
      label {
        display: block;
        margin-block: 12px 4px;
      }
      h1 {
        font-size: 1.4rem;
      }
      h2 {
        font-size: 1.15rem;
      }
      p,
      h2,
      a {
        overflow-wrap: anywhere;
      }
      .note {
        font-size: 0.9rem;
      }

      .carte {
        background: #dbeafe;
        transition:
          transform 200ms ease,
          background-color 200ms ease;
      }
      .carte:hover,
      .carte:focus-visible {
        transform: translateY(-5px);
        background: #93c5fd;
      }
      .espace {
        height: 330px;
        padding-top: 90px;
      }
      .apparition {
        transition:
          opacity 500ms ease,
          transform 500ms ease;
      }
      .apparition.attente {
        opacity: 0;
        transform: translateY(24px);
      }
      .apparition.visible {
        opacity: 1;
        transform: translateY(0);
      }
      @media (prefers-reduced-motion: reduce) {
        .carte,
        .apparition {
          transition: none;
          transform: none;
        }
        .apparition.attente {
          opacity: 1;
        }
      }
    </style>

<h1>Une transition et un déclenchement au défilement</h1>
    <button class="carte">Survolez-moi ou donnez-moi le focus</button>
    <p>
      Faites défiler l’aperçu. Les éléments restent lisibles sans JavaScript.
    </p>
    <div class="espace">↓ Une autre carte arrive plus bas.</div>
    <article class="apparition">
      <h2>Une rencontre au campus</h2>
      <p>Apparition déclenchée lorsque la carte entre dans la zone visible.</p>
    </article>

    <script>
      const elements = document.querySelectorAll(".apparition");
      if (
        "IntersectionObserver" in window &&
        !matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        const observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
              }
            }
          },
          { threshold: 0.2 },
        );
        for (const element of elements) {
          element.classList.add("attente");
          observer.observe(element);
        }
      }
    </script>
```

## Apparition liée au défilement

Le laboratoire utilise `IntersectionObserver` pour détecter l’entrée d’une section dans la zone visible et ajouter une classe. C’est une apparition déclenchée au défilement, pas une progression continuellement synchronisée à la position du scroll. Une animation CSS synchronisée peut employer `animation-timeline: view()` si elle est prise en charge ; gardez un contenu visible et une solution de repli.

## Tableau de référence — notions et opérations

| Notion | Règle à retenir |
|---|---|
| <a id="notion-1"></a>Transition | Une transition interpole le changement d'une propriété entre deux états. |
| <a id="notion-2"></a>Durée | 200ms représente deux dixièmes de seconde. |
| <a id="notion-3"></a>Propriété ciblée | transition-property indique les propriétés concernées par la transition. |
| <a id="notion-4"></a>Transform | transform change la représentation visuelle sans réorganiser comme une marge les éléments voisins. |
| <a id="notion-5"></a>Déplacement | translateY(-5px) déplace visuellement l'élément de 5 px vers le haut. |
| <a id="notion-6"></a>Échelle | scale agrandit ou réduit visuellement un élément. |
| <a id="notion-7"></a>Rotation | rotate applique une rotation. |
| <a id="notion-8"></a>Animation | Une animation avec keyframes décrit des étapes nommées. |
| <a id="notion-9"></a>État de survol | :hover correspond au survol du pointeur. |
| <a id="notion-10"></a>Focus dans le composant | :focus-within correspond à la présence du focus dans l'élément ou un descendant. |
| <a id="notion-11"></a>Mouvement réduit | prefers-reduced-motion permet de tenir compte d'une préférence de mouvement réduit. |
| <a id="notion-12"></a>Alternative | Le contenu doit rester visible lorsque les animations sont réduites. |
| <a id="notion-13"></a>Observer | IntersectionObserver observe l'intersection avec une zone de référence. |
| <a id="notion-14"></a>Intersection | entry.isIntersecting indique si l'élément intersecte la zone observée. |
| <a id="notion-15"></a>Seuil | threshold: 0.2 utilise un seuil de 20 % d'intersection. |
| <a id="notion-16"></a>Classe d'état | classList.add('visible') ajoute une classe d'état sans remplacer toutes les classes. |
| <a id="notion-17"></a>Arrêter l'observation | unobserve arrête l'observation d'un élément donné. |
| <a id="notion-18"></a>Déclenchement | Une apparition déclenchée par IntersectionObserver n'est pas une animation continuellement pilotée par la position de défilement. |
| <a id="notion-19"></a>Sans script | Le contenu de base reste visible si JavaScript ne s'exécute pas. |
| <a id="notion-20"></a>Mesure | Les effets doivent être testés au clavier et avec la préférence de mouvement réduit. |

## Exemple court — déplacement visuel et place réservée

La deuxième carte est décalée visuellement ; sa place dans le flux reste celle d’origine. Une transformation ne remplace pas un système de mise en page : elle peut provoquer un chevauchement. L’éditeur permet de comparer transform et margin sur le même exemple.

```html preview title="Une transformation garde la place dans le flux" height=180
<p>Carte A</p>
<p class="decalee">Carte B décalée</p>
<p>Carte C</p>
<style>
  p {
    padding: 8px;
    background: #dce9fa;
  }
  .decalee {
    transform: translateX(20px);
  }
</style>
```
