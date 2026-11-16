---
layout: "layouts/Layout.astro"
title: "Intégrer un carrousel avec Swiper"
type: "TP"
order: 6
quizId: "s2-int-05"
previousSession: "/semestre_2/integration/tp/dropdown"
nextSession: "/semestre_2/integration/tp/eventJs"
---

<a id="comprendre"></a>

## HTML, CSS et JavaScript d’un carrousel

| Partie | Rôle | Symptôme si elle manque |
|---|---|---|
| CSS du plugin. | Disposition et styles nécessaires. | Les diapositives peuvent s’empiler. |
| JavaScript du plugin. | Création du comportement. | Le constructeur n’est pas disponible. |
| Structure HTML. | Éléments attendus par le plugin. | Les contrôles ou diapositives ne sont pas trouvés. |

Le cours utilise une copie locale de Swiper 11.2.10. Le projet doit utiliser des fichiers de cette même version ou une installation clairement documentée. Changer seulement le JavaScript sans vérifier le CSS et les options peut rendre l’exemple incohérent.

## Chargement du DOM et initialisation de Swiper

Le constructeur reçoit un sélecteur ou un élément ainsi qu’un objet d’options. La structure doit exister lors de cette initialisation. Si une page possède deux carrousels, des sélecteurs trop généraux peuvent relier les boutons du premier au second. Donnez un contexte précis à chaque instance.

`slidesPerView` décrit combien de diapositives sont visibles ; l’espace entre elles relève d’une autre option. Les boutons précédent/suivant, les indicateurs et les conditions de largeur ont des rôles distincts. Activez les fonctionnalités nécessaires, puis vérifiez leur effet au lieu d’accumuler toutes les options disponibles.

## Clavier, navigation et mouvement du carrousel

Une lecture automatique n’est pas obligatoire. Un carrousel dont le contenu change trop vite peut gêner la lecture ; la version de base utilise des commandes explicites. Les boutons doivent posséder un nom compréhensible et rester atteignables au clavier. Les images ont toujours besoin d’alternatives adaptées.

Testez la première diapositive, la dernière et la largeur étroite. Le contenu doit rester utilisable sans dépendre d’un geste tactile. Une bibliothèque n’exonère pas de vérifier les états et les parcours du composant final.

<a id="apprentissage"></a>

## La configuration du carrousel Swiper

Un plugin apporte une fonctionnalité et une API de configuration. Vous restez responsable des contenus, du clavier et des ressources. Le carrousel utilise ici **Swiper 11.2.10**, fourni localement avec sa licence. La version est fixée pour garder l’exemple reproductible ; les URL CDN d’un autre tutoriel peuvent fournir une API différente.

```html
<div class="swiper" aria-label="Sélection de projets">
  <div class="swiper-wrapper">
    <article class="swiper-slide">Premier projet</article>
    <article class="swiper-slide">Deuxième projet</article>
  </div>
  <button class="swiper-button-prev" aria-label="Projet précédent"></button>
  <button class="swiper-button-next" aria-label="Projet suivant"></button>
  <div class="swiper-pagination"></div>
</div>
```

```js
const carrousel = new Swiper('.swiper', {
  slidesPerView: 1,
  spaceBetween: 16,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  pagination: { el: '.swiper-pagination', clickable: true },
  keyboard: { enabled: true, onlyInViewport: true },
  a11y: { enabled: true }
});
```

**Lecture :** chargez d’abord CSS et script de la bibliothèque, puis initialisez après le HTML. `slidesPerView` décrit combien de diapositives sont affichées ; `spaceBetween` règle leur espacement. Les sélecteurs de navigation doivent viser les boutons de cet exemple, pas une autre galerie.

```html live title="Configurer et manipuler un vrai carrousel Swiper"
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

      .swiper {
        width: 100%;
        padding-bottom: 35px;
      }
      .swiper-slide {
        min-height: 130px;
      }
      .swiper:not(.swiper-initialized) .swiper-wrapper {
        display: block;
      }
      .swiper:not(.swiper-initialized) .swiper-slide {
        margin-bottom: 12px;
      }
    </style>
    <link rel="stylesheet" href="/vendor/swiper/swiper-bundle.min.css" />

<h1>Carrousel sans défilement automatique</h1>
    <div class="swiper">
      <div class="swiper-wrapper">
        <article class="swiper-slide">
          <h2>Photo</h2>
          <p>Explorer l’image.</p>
        </article>
        <article class="swiper-slide">
          <h2>Musique</h2>
          <p>Composer une rencontre.</p>
        </article>
        <article class="swiper-slide">
          <h2>Sport</h2>
          <p>Préparer un tournoi.</p>
        </article>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <button class="precedent" type="button" hidden aria-label="Diapositive précédente">
      Précédent
    </button>
    <button class="suivant" type="button" hidden aria-label="Diapositive suivante">Suivant</button>
    <p class="note">
      Bibliothèque Swiper 11.2.10 locale, licence MIT. Sans JS, les trois
      contenus restent visibles.
    </p>
    <script src="/vendor/swiper/swiper-bundle.min.js"></script>

    <script>
      // Wait for the iframe's first layout: its width can be zero during parsing.
      if (typeof Swiper !== "undefined")
        requestAnimationFrame(() => {
          window.carrousel = new Swiper(".swiper", {
            slidesPerView: 1,
            spaceBetween: 16,
            speed: matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 300,
            navigation: { nextEl: ".suivant", prevEl: ".precedent" },
            pagination: { el: ".swiper-pagination", clickable: true },
            keyboard: { enabled: true, onlyInViewport: true },
            a11y: {
              enabled: true,
              prevSlideMessage: "Diapositive précédente",
              nextSlideMessage: "Diapositive suivante",
            },
          });
          document.querySelector(".precedent").hidden = false;
          document.querySelector(".suivant").hidden = false;
        });
    </script>
```

## Tableau de référence — notions et opérations

| Notion | Règle à retenir |
|---|---|
| <a id="notion-1"></a>Bibliothèque | Swiper est une bibliothèque de carrousel JavaScript. |
| <a id="notion-2"></a>Version | Le TP fixe Swiper à la version 11.2.10. |
| <a id="notion-3"></a>Conteneur | Le conteneur principal porte la classe swiper. |
| <a id="notion-4"></a>Wrapper | swiper-wrapper contient les diapositives. |
| <a id="notion-5"></a>Slide | Chaque diapositive porte swiper-slide. |
| <a id="notion-6"></a>Initialisation | new Swiper initialise le composant sur un sélecteur. |
| <a id="notion-7"></a>Ordre | Le script de la bibliothèque doit être chargé avant l'initialisation. |
| <a id="notion-8"></a>Styles | La feuille CSS de Swiper accompagne son script. |
| <a id="notion-9"></a>Nombre visible | slidesPerView: 1 prévoit une diapositive visible. |
| <a id="notion-10"></a>Espacement | spaceBetween: 16 règle l'espace de 16 px entre slides. |
| <a id="notion-11"></a>Bouton suivant | navigation.nextEl pointe vers le contrôle suivant. |
| <a id="notion-12"></a>Bouton précédent | navigation.prevEl pointe vers le contrôle précédent. |
| <a id="notion-13"></a>Pagination | pagination.el désigne le conteneur des repères de pagination. |
| <a id="notion-14"></a>Repères cliquables | pagination.clickable: true permet de choisir une diapositive par son repère. |
| <a id="notion-15"></a>Clavier | keyboard.enabled: true active le module clavier. |
| <a id="notion-16"></a>Visibilité | keyboard.onlyInViewport limite le contrôle clavier au carrousel dans la zone visible. |
| <a id="notion-17"></a>Accessibilité | a11y.enabled active le module d'accessibilité de Swiper. |
| <a id="notion-18"></a>Sans lecture automatique | Le modèle ne configure pas de défilement automatique. |
| <a id="notion-19"></a>Dégradation | Sans JavaScript, le contenu reste lisible dans le modèle. |
| <a id="notion-20"></a>Licence | La version locale de Swiper est conservée avec sa licence MIT. |

## Installer la même version dans votre projet

Installez `swiper@11.2.10` avec npm ou récupérez ses fichiers de distribution et sa licence. Copiez le CSS et le JavaScript du bundle dans votre projet, puis liez ces fichiers avant l’initialisation. Le chemin `/vendor/swiper/` appartient au site de cours ; adaptez les chemins au dossier que vous remettrez. La [distribution officielle de Swiper 11.2.10](https://github.com/nolimits4web/swiper/tree/v11.2.10) permet d’identifier la version enseignée.

## Travail à réaliser

Créez un carrousel de trois projets avec leurs titres, boutons précédent/suivant et pagination. Activez clavier et accessibilité, sans lecture automatique. Sans initialisation, affichez les trois contenus dans le flux et cachez les commandes qui ne fonctionnent pas. Testez le début, la fin, le clavier, une largeur étroite, puis le chargement sans JavaScript. Remettez les fichiers de la bibliothèque, la licence, votre configuration et les observations ; expliquez le rôle de chaque option retenue.
