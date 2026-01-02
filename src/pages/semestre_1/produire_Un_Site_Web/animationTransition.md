---
layout: "layouts/Layout.astro"
title: "TP 1 : Transitions CSS — Animer en douceur"
type: "TP"
---

## Objectifs du TP (2h)

1. Comprendre le fonctionnement des transitions CSS
2. Maîtriser les propriétés `transition-property`, `transition-duration`, `transition-timing-function` et `transition-delay`
3. Appliquer des transitions sur différents événements (hover, focus, etc.)
4. Créer des effets visuels fluides et professionnels

> **Organisation** : 1h de cours avec démonstrations + 1h d'exercices notés en autonomie

---

## Partie 1 : Cours — Les Transitions CSS

### Qu'est-ce qu'une transition ?

Une **transition CSS** permet de passer **progressivement** d'un état à un autre, plutôt que de manière instantanée. C'est le moyen le plus simple d'ajouter des animations à votre site.

**Sans transition** : Le changement est brutal  
**Avec transition** : Le changement est fluide et agréable

---

### La propriété `transition`

La syntaxe complète de `transition` se compose de 4 sous-propriétés :

```css
transition: [property] [duration] [timing-function] [delay];
```

| Propriété | Description | Exemple |
|-----------|-------------|---------|
| `transition-property` | La propriété CSS à animer | `background-color`, `transform`, `all` |
| `transition-duration` | Durée de l'animation | `0.3s`, `500ms` |
| `transition-timing-function` | Courbe d'accélération | `ease`, `linear`, `ease-in-out` |
| `transition-delay` | Délai avant le démarrage | `0s`, `0.2s` |

---

### Exemple 1 : Transition simple au survol

#### Code CSS

```css
.bouton {
    background-color: #3498db;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    
    /* La transition s'applique sur background-color */
    transition: background-color 0.3s ease;
}

.bouton:hover {
    background-color: #2980b9;
}
```

#### Code HTML

```html
<button class="bouton">Survolez-moi !</button>
```

#### Rendu visuel
<div class="border border-gray-300 p-6 rounded-md flex justify-center">
  <button class="bg-primary text-white px-6 py-3 rounded-lg border-0 cursor-pointer transition-colors duration-300 hover:bg-primary/80">Survolez-moi !</button>
</div>

---

### Exemple 2 : Transitions multiples

On peut animer **plusieurs propriétés** en même temps :

#### Code CSS

```css
.carte {
    background-color: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    
    /* Plusieurs transitions séparées par des virgules */
    transition: transform 0.3s ease,
                box-shadow 0.3s ease;
}

.carte:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
```

#### Code HTML

```html
<div class="carte">
    <h3>Ma carte</h3>
    <p>Survolez pour voir l'effet d'élévation</p>
</div>
```

#### Rendu visuel
<div class="border border-gray-300 p-6 rounded-md flex justify-center bg-gray-100">
  <div class="bg-white p-5 rounded-xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
    <h3 class="text-lg font-bold mb-2">Ma carte</h3>
    <p class="text-gray-600">Survolez pour voir l'effet d'élévation</p>
  </div>
</div>

---

### Les fonctions de timing (easing)

Le `timing-function` définit **comment** la transition progresse dans le temps :

| Valeur | Description |
|--------|-------------|
| `linear` | Vitesse constante du début à la fin |
| `ease` | Démarrage lent, accélération, fin lente (défaut) |
| `ease-in` | Démarrage lent |
| `ease-out` | Fin lente |
| `ease-in-out` | Démarrage et fin lents |
| `cubic-bezier(x1, y1, x2, y2)` | Courbe personnalisée |

#### Code CSS — Comparaison des timings

```css
.boite {
    width: 100px;
    height: 50px;
    background: #3498db;
    margin: 10px 0;
    transition: transform 1s; /* timing par défaut = ease */
}

.boite.linear { transition-timing-function: linear; }
.boite.ease-in { transition-timing-function: ease-in; }
.boite.ease-out { transition-timing-function: ease-out; }
.boite.ease-in-out { transition-timing-function: ease-in-out; }

.container:hover .boite {
    transform: translateX(200px);
}
```

#### Rendu visuel — Survolez le conteneur
<div class="border border-gray-300 p-4 rounded-md bg-gray-50 group cursor-pointer">
  <p class="text-sm text-gray-500 mb-3">Survolez ce conteneur pour voir les différences</p>
  <div class="space-y-2">
    <div class="flex items-center gap-4">
      <span class="w-24 text-sm">linear</span>
      <div class="w-24 h-10 bg-primary rounded transition-transform duration-1000 ease-linear group-hover:translate-x-48"></div>
    </div>
    <div class="flex items-center gap-4">
      <span class="w-24 text-sm">ease-in</span>
      <div class="w-24 h-10 bg-secondary rounded transition-transform duration-1000 ease-in group-hover:translate-x-48"></div>
    </div>
    <div class="flex items-center gap-4">
      <span class="w-24 text-sm">ease-out</span>
      <div class="w-24 h-10 bg-primary rounded transition-transform duration-1000 ease-out group-hover:translate-x-48"></div>
    </div>
    <div class="flex items-center gap-4">
      <span class="w-24 text-sm">ease-in-out</span>
      <div class="w-24 h-10 bg-secondary rounded transition-transform duration-1000 ease-in-out group-hover:translate-x-48"></div>
    </div>
  </div>
</div>

---

### Exemple 3 : Transition avec délai

Le `transition-delay` permet de **retarder** le début de l'animation :

#### Code CSS

```css
.menu-item {
    opacity: 0;
    transform: translateX(-20px);
    transition: opacity 0.3s ease, transform 0.3s ease;
}

/* Chaque élément a un délai différent pour un effet de cascade */
.menu-item:nth-child(1) { transition-delay: 0s; }
.menu-item:nth-child(2) { transition-delay: 0.1s; }
.menu-item:nth-child(3) { transition-delay: 0.2s; }
.menu-item:nth-child(4) { transition-delay: 0.3s; }

.menu:hover .menu-item {
    opacity: 1;
    transform: translateX(0);
}
```

#### Code HTML

```html
<nav class="menu">
    <a class="menu-item" href="#">Accueil</a>
    <a class="menu-item" href="#">À propos</a>
    <a class="menu-item" href="#">Services</a>
    <a class="menu-item" href="#">Contact</a>
</nav>
```

#### Rendu visuel
<div class="border border-gray-300 p-4 rounded-md group cursor-pointer">
  <p class="text-sm text-gray-500 mb-3">Survolez pour voir l'effet cascade</p>
  <nav class="flex flex-col gap-2">
    <a class="opacity-0 -translate-x-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-0 text-primary" href="#">Accueil</a>
    <a class="opacity-0 -translate-x-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-100 text-primary" href="#">À propos</a>
    <a class="opacity-0 -translate-x-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-200 text-primary" href="#">Services</a>
    <a class="opacity-0 -translate-x-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-300 text-primary" href="#">Contact</a>
  </nav>
</div>

---

### Exemple 4 : Transition sur le focus (formulaires)

Les transitions sont très utiles pour améliorer l'UX des formulaires :

#### Code CSS

```css
.input-field {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #ddd;
    border-radius: 8px;
    outline: none;
    font-size: 16px;
    
    transition: border-color 0.3s ease,
                box-shadow 0.3s ease;
}

.input-field:focus {
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

.input-field:valid {
    border-color: #27ae60;
}

.input-field:invalid {
    border-color: #e74c3c;
}
```

#### Code HTML

```html
<input type="email" class="input-field" placeholder="Entrez votre email" required>
```

#### Rendu visuel
<div class="border border-gray-300 p-6 rounded-md">
  <input type="email" class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg outline-none text-base transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/20" placeholder="Cliquez et tapez votre email">
</div>

---

### Exemple 5 : Transform + Transition

La propriété `transform` combinée aux transitions permet des effets visuels puissants :

#### Code CSS

```css
.image-container {
    overflow: hidden;
    border-radius: 12px;
}

.image-zoom {
    width: 100%;
    display: block;
    transition: transform 0.5s ease;
}

.image-container:hover .image-zoom {
    transform: scale(1.1);
}
```

#### Code CSS — Rotation

```css
.icon-rotate {
    display: inline-block;
    font-size: 24px;
    transition: transform 0.3s ease;
}

.bouton:hover .icon-rotate {
    transform: rotate(180deg);
}
```

#### Rendu visuel — Effet zoom
<div class="border border-gray-300 p-4 rounded-md">
  <div class="overflow-hidden rounded-xl w-64 mx-auto">
    <div class="w-full h-40 bg-gradient-to-br from-primary to-secondary transition-transform duration-500 hover:scale-110 flex items-center justify-center text-white font-bold">
      Survolez-moi
    </div>
  </div>
</div>

---

### Propriétés animables

**Toutes les propriétés CSS ne sont pas animables !**

✅ **Animables** :
- `opacity`
- `transform` (translate, rotate, scale, skew)
- `background-color`, `color`
- `width`, `height`, `padding`, `margin`
- `border-color`, `border-radius`
- `box-shadow`
- `top`, `left`, `right`, `bottom`

❌ **Non animables** :
- `display`
- `font-family`
- `background-image` (partiellement)
- `position`

> **Astuce performance** : Privilégiez `transform` et `opacity` qui sont optimisées par le GPU !

---

### Raccourci `transition`

Vous pouvez tout écrire en une seule ligne :

```css
/* Syntaxe longue */
transition-property: all;
transition-duration: 0.3s;
transition-timing-function: ease-in-out;
transition-delay: 0s;

/* Syntaxe raccourcie équivalente */
transition: all 0.3s ease-in-out 0s;

/* Ou plus simplement */
transition: all 0.3s ease-in-out;
```

---

## Partie 2 : Exercices notés (1h)

### Exercice 1 : Boutons interactifs (5 points)

Créez une page `boutons.html` avec **3 boutons** ayant chacun un effet de survol différent :

1. **Bouton 1** : Changement de couleur de fond avec une transition douce
2. **Bouton 2** : Effet d'agrandissement (`scale`) au survol
3. **Bouton 3** : Effet combiné : changement de couleur + légère élévation (`translateY` + `box-shadow`)

**Critères d'évaluation** :
- Structure HTML correcte (1 point)
- Transitions fluides et bien paramétrées (2 points)
- Variété des effets (1 point)
- Code CSS propre et organisé (1 point)

---

### Exercice 2 : Galerie d'images avec overlay (7 points)

Créez une galerie de **4 images** disposées en grille (2x2). Chaque image doit avoir :

1. Un **zoom léger** au survol (scale)
2. Un **overlay sombre** qui apparaît progressivement au survol
3. Un **texte centré** (titre de l'image) qui apparaît avec l'overlay

**Structure HTML suggérée** :

```html
<div class="galerie">
    <div class="image-card">
        <img src="image1.jpg" alt="Image 1">
        <div class="overlay">
            <h3>Titre Image 1</h3>
        </div>
    </div>
    <!-- Répéter pour les 3 autres images -->
</div>
```

> **Astuce** : Utilisez `position: relative` sur `.image-card` et `position: absolute` sur `.overlay`. Jouez avec `opacity` pour faire apparaître l'overlay.

**Critères d'évaluation** :
- Grille CSS fonctionnelle (2 points)
- Effet de zoom sur l'image (1 point)
- Overlay avec transition d'opacité (2 points)
- Texte centré dans l'overlay (1 point)
- Code propre et commenté (1 point)

---

### Exercice 3 : Formulaire stylisé (8 points)

Créez un formulaire de contact avec les champs suivants :
- Nom (input text)
- Email (input email)
- Message (textarea)
- Bouton d'envoi

**Exigences** :

1. **Chaque champ** doit avoir une transition sur le `border` et le `box-shadow` au focus
2. **Les labels** doivent se déplacer au-dessus du champ au focus (effet "floating label")
3. **Le bouton** doit avoir un effet de survol élaboré (couleur + légère transformation)
4. Ajoutez une **validation visuelle** : bordure verte si valide, rouge si invalide

**Structure HTML suggérée** :

```html
<form class="contact-form">
    <div class="form-group">
        <input type="text" id="nom" required>
        <label for="nom">Votre nom</label>
    </div>
    <!-- Autres champs... -->
</form>
```

**Critères d'évaluation** :
- Structure HTML sémantique (1 point)
- Transitions sur les champs au focus (2 points)
- Effet floating label (2 points)
- Effet sur le bouton (1 point)
- Validation visuelle (1 point)
- Design général et cohérence (1 point)

---

## Barème récapitulatif

| Exercice | Points |
|----------|--------|
| Exercice 1 : Boutons interactifs | 5 |
| Exercice 2 : Galerie avec overlay | 7 |
| Exercice 3 : Formulaire stylisé | 8 |
| **Total** | **20** |

---

## Ressources utiles

- [MDN — Utiliser les transitions CSS](https://developer.mozilla.org/fr/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions)
- [Cubic-bezier.com](https://cubic-bezier.com/) — Pour créer vos propres courbes d'animation
- [Easings.net](https://easings.net/) — Visualiser les différentes fonctions de timing

---

## À retenir

1. **`transition`** permet des animations simples entre deux états
2. Spécifiez la **propriété**, la **durée**, le **timing** et éventuellement un **délai**
3. Préférez animer `transform` et `opacity` pour de meilleures performances
4. Les transitions s'appliquent sur l'état **initial**, pas sur l'état `:hover`
5. Utilisez plusieurs transitions séparées par des virgules pour des effets complexes
