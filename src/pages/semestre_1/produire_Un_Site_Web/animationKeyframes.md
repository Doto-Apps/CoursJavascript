---
layout: "layouts/Layout.astro"
title: "TP 2 : Animations CSS avec @keyframes"
type: "TP"
---

## Objectifs du TP (2h)

1. Comprendre la différence entre **transitions** et **animations**
2. Maîtriser la règle `@keyframes` pour créer des animations multi-étapes
3. Utiliser les propriétés `animation-*` pour contrôler le comportement
4. Créer des animations complexes, en boucle et avec des effets avancés

> **Organisation** : 1h de cours avec démonstrations + 1h d'exercices notés en autonomie

---

## Partie 1 : Cours — Les Animations CSS

### Transition vs Animation : quelle différence ?

| Critère | Transition | Animation |
|---------|------------|-----------|
| Déclencheur | Nécessite un événement (hover, focus, etc.) | Peut démarrer automatiquement |
| États | 2 états (début → fin) | Plusieurs étapes (keyframes) |
| Répétition | Non | Oui, peut boucler à l'infini |
| Contrôle | Limité | Total (pause, direction, etc.) |

**En résumé** :
- **Transition** = animation simple entre A et B, déclenchée par l'utilisateur
- **Animation** = séquence complexe, peut démarrer seule et se répéter

---

### La règle `@keyframes`

La règle `@keyframes` permet de définir les **étapes** d'une animation :

```css
@keyframes nomDeLAnimation {
    0% {
        /* État initial */
    }
    50% {
        /* État intermédiaire */
    }
    100% {
        /* État final */
    }
}
```

On peut aussi utiliser `from` et `to` pour les cas simples :

```css
@keyframes fondu {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
```

---

### Appliquer une animation

Pour appliquer une animation à un élément, utilisez la propriété `animation` :

```css
.element {
    animation: nomDeLAnimation 2s ease infinite;
}
```

#### Toutes les sous-propriétés :

| Propriété | Description | Valeurs courantes |
|-----------|-------------|-------------------|
| `animation-name` | Nom de l'animation (@keyframes) | `monAnimation` |
| `animation-duration` | Durée totale | `1s`, `500ms` |
| `animation-timing-function` | Courbe d'accélération | `ease`, `linear`, `ease-in-out` |
| `animation-delay` | Délai avant démarrage | `0s`, `0.5s` |
| `animation-iteration-count` | Nombre de répétitions | `1`, `3`, `infinite` |
| `animation-direction` | Sens de lecture | `normal`, `reverse`, `alternate` |
| `animation-fill-mode` | État avant/après | `none`, `forwards`, `backwards`, `both` |
| `animation-play-state` | Contrôle lecture | `running`, `paused` |

---

### Exemple 1 : Animation de fondu (fade-in)

#### Code CSS

```css
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in {
    animation: fadeIn 0.6s ease forwards;
}
```

#### Code HTML

```html
<div class="fade-in">
    <h2>Bienvenue !</h2>
    <p>Ce contenu apparaît en fondu</p>
</div>
```

#### Rendu visuel
<div class="border border-gray-300 p-6 rounded-md">
  <div class="animate-fade-in-up">
    <h2 class="text-xl font-bold text-primary">Bienvenue !</h2>
    <p class="text-gray-600">Ce contenu apparaît en fondu (rechargez pour revoir)</p>
  </div>
</div>

<style>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up { animation: fadeInUp 0.6s ease forwards; }
</style>

---

### Exemple 2 : Animation en boucle infinie

#### Code CSS

```css
@keyframes pulse {
    0% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(52, 152, 219, 0.7);
    }
    50% {
        transform: scale(1.05);
        box-shadow: 0 0 0 10px rgba(52, 152, 219, 0);
    }
    100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(52, 152, 219, 0);
    }
}

.bouton-pulse {
    background: #3498db;
    color: white;
    padding: 15px 30px;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    
    animation: pulse 2s ease infinite;
}
```

#### Code HTML

```html
<button class="bouton-pulse">Cliquez-moi !</button>
```

#### Rendu visuel
<div class="border border-gray-300 p-6 rounded-md flex justify-center">
  <button class="bg-primary text-white px-8 py-4 border-0 rounded-full cursor-pointer animate-pulse-custom">Cliquez-moi !</button>
</div>

<style>
@keyframes pulseCustom {
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(var(--color-primary-rgb, 59, 130, 246), 0.7); }
  50% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(var(--color-primary-rgb, 59, 130, 246), 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(var(--color-primary-rgb, 59, 130, 246), 0); }
}
.animate-pulse-custom { animation: pulseCustom 2s ease infinite; }
</style>

---

### Exemple 3 : Animation multi-étapes (bounce)

#### Code CSS

```css
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-30px);
    }
    60% {
        transform: translateY(-15px);
    }
}

.bounce {
    display: inline-block;
    animation: bounce 1s ease infinite;
}
```

#### Code HTML

```html
<span class="bounce">⬇️</span>
<p>Scrollez vers le bas</p>
```

#### Rendu visuel
<div class="border border-gray-300 p-6 rounded-md text-center">
  <span class="inline-block text-4xl animate-bounce-custom">⬇️</span>
  <p class="text-gray-600 mt-2">Scrollez vers le bas</p>
</div>

<style>
@keyframes bounceCustom {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-30px); }
  60% { transform: translateY(-15px); }
}
.animate-bounce-custom { animation: bounceCustom 1s ease infinite; }
</style>

---

### Exemple 4 : Rotation continue

#### Code CSS

```css
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.loader {
    width: 50px;
    height: 50px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    
    animation: spin 1s linear infinite;
}
```

#### Code HTML

```html
<div class="loader"></div>
```

#### Rendu visuel
<div class="border border-gray-300 p-6 rounded-md flex justify-center">
  <div class="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
</div>

---

### Exemple 5 : Animation avec `animation-direction`

La propriété `animation-direction` contrôle le sens de lecture :

| Valeur | Comportement |
|--------|--------------|
| `normal` | 0% → 100% à chaque itération |
| `reverse` | 100% → 0% à chaque itération |
| `alternate` | Alterne entre normal et reverse |
| `alternate-reverse` | Commence par reverse, puis alterne |

#### Code CSS

```css
@keyframes slide {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(200px);
    }
}

.slide-alternate {
    width: 50px;
    height: 50px;
    background: #e74c3c;
    border-radius: 8px;
    
    animation: slide 1s ease-in-out infinite alternate;
}
```

#### Rendu visuel — Mode `alternate`
<div class="border border-gray-300 p-6 rounded-md">
  <p class="text-sm text-gray-500 mb-3">La boîte fait des allers-retours</p>
  <div class="w-12 h-12 bg-secondary rounded-lg animate-slide-alternate"></div>
</div>

<style>
@keyframes slideAlternate {
  from { transform: translateX(0); }
  to { transform: translateX(200px); }
}
.animate-slide-alternate { animation: slideAlternate 1s ease-in-out infinite alternate; }
</style>

---

### Exemple 6 : `animation-fill-mode`

Cette propriété définit l'état de l'élément **avant** et **après** l'animation :

| Valeur | Comportement |
|--------|--------------|
| `none` | Revient à l'état initial après l'animation |
| `forwards` | Conserve l'état final (100%) |
| `backwards` | Applique l'état initial (0%) pendant le délai |
| `both` | Combine forwards et backwards |

#### Code CSS

```css
@keyframes apparition {
    from {
        opacity: 0;
        transform: scale(0.5);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

/* Sans forwards : l'élément disparaît après l'animation */
.sans-forwards {
    animation: apparition 1s ease;
}

/* Avec forwards : l'élément reste visible */
.avec-forwards {
    animation: apparition 1s ease forwards;
}
```

> **Important** : Utilisez `forwards` pour que l'élément garde son état final !

---

### Exemple 7 : Animation au survol (combiné avec hover)

#### Code CSS

```css
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.shake-on-hover {
    display: inline-block;
    padding: 10px 20px;
    background: #9b59b6;
    color: white;
    border-radius: 8px;
    cursor: pointer;
}

.shake-on-hover:hover {
    animation: shake 0.5s ease;
}
```

#### Code HTML

```html
<button class="shake-on-hover">Erreur ! 🚫</button>
```

#### Rendu visuel
<div class="border border-gray-300 p-6 rounded-md flex justify-center">
  <button class="px-5 py-3 bg-purple-600 text-white rounded-lg cursor-pointer hover:animate-shake-custom">Erreur ! 🚫</button>
</div>

<style>
@keyframes shakeCustom {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}
.hover\:animate-shake-custom:hover { animation: shakeCustom 0.5s ease; }
</style>

---

### Exemple 8 : Animation de texte — Effet machine à écrire

#### Code CSS

```css
@keyframes typing {
    from {
        width: 0;
    }
    to {
        width: 100%;
    }
}

@keyframes blink-caret {
    from, to {
        border-color: transparent;
    }
    50% {
        border-color: #333;
    }
}

.typewriter {
    overflow: hidden;
    border-right: 3px solid #333;
    white-space: nowrap;
    font-family: monospace;
    font-size: 1.5rem;
    
    animation: 
        typing 3s steps(30, end) forwards,
        blink-caret 0.75s step-end infinite;
}
```

#### Code HTML

```html
<p class="typewriter">Bienvenue sur mon portfolio...</p>
```

#### Rendu visuel
<div class="border border-gray-300 p-6 rounded-md">
  <p class="overflow-hidden border-r-4 border-gray-800 whitespace-nowrap font-mono text-2xl animate-typewriter">Bienvenue sur mon portfolio...</p>
</div>

<style>
@keyframes typingAnim {
  from { width: 0; }
  to { width: 100%; }
}
@keyframes blinkCaret {
  from, to { border-color: transparent; }
  50% { border-color: #333; }
}
.animate-typewriter {
  animation: typingAnim 3s steps(30, end) forwards, blinkCaret 0.75s step-end infinite;
}
</style>

---

### Exemple 9 : Animations multiples sur un élément

On peut appliquer **plusieurs animations** séparées par des virgules :

#### Code CSS

```css
@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}

@keyframes glow {
    0%, 100% { box-shadow: 0 0 5px rgba(52, 152, 219, 0.5); }
    50% { box-shadow: 0 0 20px rgba(52, 152, 219, 0.8); }
}

.floating-card {
    padding: 20px;
    background: white;
    border-radius: 12px;
    
    animation: 
        float 3s ease-in-out infinite,
        glow 2s ease-in-out infinite;
}
```

#### Rendu visuel
<div class="border border-gray-300 p-8 rounded-md flex justify-center bg-gray-100">
  <div class="p-5 bg-white rounded-xl animate-float-glow">
    <p class="font-bold text-primary">Carte flottante</p>
    <p class="text-sm text-gray-600">Je flotte et je brille !</p>
  </div>
</div>

<style>
@keyframes floatAnim {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
@keyframes glowAnim {
  0%, 100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.5); }
  50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.8); }
}
.animate-float-glow {
  animation: floatAnim 3s ease-in-out infinite, glowAnim 2s ease-in-out infinite;
}
</style>

---

### Contrôler l'animation avec JavaScript (bonus)

Vous pouvez mettre en pause ou relancer une animation via CSS et JavaScript :

```css
.paused {
    animation-play-state: paused;
}
```

```javascript
const element = document.querySelector('.animated');

// Mettre en pause
element.classList.add('paused');

// Reprendre
element.classList.remove('paused');
```

---

## Partie 2 : Exercices notés (1h)

### Exercice 1 : Loader personnalisé (5 points)

Créez une page `loader.html` avec **3 loaders différents** :

1. **Loader spinner** : Un cercle qui tourne (comme l'exemple du cours)
2. **Loader points** : 3 points qui rebondissent avec un délai décalé
3. **Loader barre** : Une barre de progression qui se remplit en boucle

**Code HTML suggéré pour le loader points** :

```html
<div class="loader-dots">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
</div>
```

> **Astuce** : Utilisez `animation-delay` pour décaler les animations des points.

**Critères d'évaluation** :
- Les 3 loaders fonctionnent (3 points)
- Animations fluides et bien paramétrées (1 point)
- Créativité et design (1 point)

---

### Exercice 2 : Page d'accueil animée (7 points)

Créez une page `accueil.html` avec une **hero section** animée contenant :

1. Un **titre principal** qui apparaît avec un effet de fade-in depuis le bas
2. Un **sous-titre** qui apparaît après le titre (avec un délai)
3. Un **bouton CTA** (Call To Action) qui pulse pour attirer l'attention
4. Une **flèche** qui indique de scroller, avec une animation de rebond

**Structure suggérée** :

```html
<section class="hero">
    <h1 class="titre-anime">Bienvenue sur mon site</h1>
    <p class="sous-titre-anime">Découvrez mes projets et compétences</p>
    <button class="cta-pulse">Voir plus</button>
    <div class="scroll-indicator">
        <span class="fleche-bounce">↓</span>
    </div>
</section>
```

**Critères d'évaluation** :
- Animation du titre (1.5 points)
- Animation du sous-titre avec délai (1.5 points)
- Bouton qui pulse (1.5 points)
- Flèche qui rebondit (1.5 points)
- Cohérence visuelle et timing (1 point)

---

### Exercice 3 : Menu de navigation animé (8 points)

Créez une page `menu.html` avec un **menu de navigation** qui comporte :

1. **5 liens** disposés horizontalement
2. Au survol de chaque lien :
   - Une **barre colorée** qui apparaît en dessous (de gauche à droite)
   - Un léger **effet de scale** sur le texte
3. Au chargement de la page, les liens apparaissent **un par un** avec un effet cascade (décalage de 0.1s entre chaque)
4. **Bonus** : Ajoutez un hamburger menu animé (3 barres qui se transforment en X au clic)

**Structure suggérée** :

```html
<nav class="main-nav">
    <a href="#" class="nav-link">Accueil</a>
    <a href="#" class="nav-link">À propos</a>
    <a href="#" class="nav-link">Services</a>
    <a href="#" class="nav-link">Portfolio</a>
    <a href="#" class="nav-link">Contact</a>
</nav>
```

**Astuce pour la barre au survol** : Utilisez un pseudo-élément `::after` avec `transform: scaleX(0)` par défaut, et `scaleX(1)` au hover.

```css
.nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: #3498db;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
}

.nav-link:hover::after {
    transform: scaleX(1);
}
```

**Critères d'évaluation** :
- Structure HTML correcte (1 point)
- Animation d'apparition cascade (2 points)
- Effet de survol avec barre (2 points)
- Animation de scale au survol (1 point)
- Hamburger menu animé - bonus (2 points)

---

## Barème récapitulatif

| Exercice | Points |
|----------|--------|
| Exercice 1 : Loaders personnalisés | 5 |
| Exercice 2 : Page d'accueil animée | 7 |
| Exercice 3 : Menu de navigation animé | 8 |
| **Total** | **20** |

---

## Ressources utiles

- [MDN — Utiliser les animations CSS](https://developer.mozilla.org/fr/docs/Web/CSS/CSS_Animations/Using_CSS_animations)
- [Animista](https://animista.net/) — Bibliothèque d'animations CSS prêtes à l'emploi
- [CSS Tricks — A Guide to CSS Animation](https://css-tricks.com/almanac/properties/a/animation/)
- [Keyframes.app](https://keyframes.app/) — Outil visuel pour créer des keyframes

---

## À retenir

1. **`@keyframes`** définit les étapes d'une animation avec des pourcentages
2. **`animation`** applique l'animation à un élément (nom, durée, timing, répétition...)
3. `animation-iteration-count: infinite` pour boucler indéfiniment
4. `animation-direction: alternate` pour des allers-retours
5. `animation-fill-mode: forwards` pour garder l'état final
6. Combinez plusieurs animations avec des virgules
7. Les animations peuvent démarrer automatiquement, contrairement aux transitions
8. Utilisez `animation-delay` pour créer des effets de cascade
