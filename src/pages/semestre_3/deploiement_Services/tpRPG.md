---
layout: "layouts/Layout.astro"
title: "RPG tactique : Client MJ & Interface Joueur personnalisée"
type : "tp"
---

## Contexte du TP

Dans ce TP, vous n'êtes **pas** en train de coder le jeu lui-même :  
le **Maître du Jeu (MJ)** tourne déjà sur la machine de l’enseignant et gère toute la logique (cartes, monstres, tours, déplacements…).

Votre mission est de créer **votre propre interface de joueur**, en personnalisant le client fourni (`client.js` + page HTML générée), pour qu’elle tourne autour de **votre personnage inspiré de la mythologie corse**.

Exemples :

- Un orque corse → interface sombre, verts mousse, ambiance forêt / maquis.
- Une créature comme *U Bufonu*, *E Calcagnette*, *A Dentilonga*, etc.  
- Image personnalisée de votre personnage affichée dans l’interface.

Vous devrez également intégrer des éléments **audio** (Text-To-Speech, voire Speech-To-Text) pour rendre les échanges avec le MJ plus vivants.

---

## Objectifs pédagogiques

À la fin de ce TP, vous serez capable de :

- Consommer un flux **Server-Sent Events** (SSE) pour suivre en temps réel l’état d’un jeu.
- Interpréter un **snapshot JSON** de l’état du jeu (joueurs, cartes, monstres, items).
- Construire une interface centrée sur un personnage :
  - fiche de personnage (PV, SP, ATK, position, pseudo),
  - inventaire,
  - vue de la grille.
- Personnaliser le thème graphique d’une application web en fonction d’un univers (ici : mythologie corse).
- Utiliser une API Web de **Text-To-Speech** (et éventuellement Speech-To-Text).

---

## 1. Architecture générale du système

Deux programmes Node.js sont fournis :

### 1.1. Le Maître du Jeu (MJ)

- Fichier : `mj.js`
- L’enseignant le lance sur sa machine.
- Il expose notamment :

  - `GET /state` : renvoie un **snapshot JSON** de la partie.
  - `GET /events` : flux SSE d’événements, dont :
    - `state` : nouvel état complet,
    - `chat`  : messages et narration,
    - `turn`  : changement de tour.
  - `POST /join` : permet à un joueur de rejoindre une partie.
  - `POST /chat` : message d’un joueur (texte) envoyé au MJ, qui le transmet au LLM pour décider de l’action.

Vous **ne modifiez pas** ce fichier.

### 1.2. Le client joueur

- Fichier : `client.js`
- Chaque étudiant lance son propre client avec des variables d’environnement, par exemple :

```bash
MJ_BASE_URL=http://ADRESSE_DU_MJ:4000 
PLAYER_ID=p1 
CLIENT_PORT=4101 
node client.js
```

- Ce client expose une page web sur :  
  `http://localhost:CLIENT_PORT/` (par exemple `http://localhost:4101/`).
- Cette page :

  - se connecte au MJ via `/events` (SSE),
  - affiche une grille 20x20,
  - affiche une zone de chat,
  - permet d’envoyer du texte avec un formulaire.

Dans ce TP, vous allez **modifier la partie HTML / CSS / JavaScript du client** (dans la réponse HTML de la route `app.get('/', ...)` de `client.js`).

---

## 2. Les données accessibles côté client

Quand votre page reçoit l’événement :

```js
es.addEventListener('state', ev => {
  snapshot = JSON.parse(ev.data);
  draw();
});
```

La variable `snapshot` ressemble à ceci (simplifié) :

```js
{
  started: true,
  turnOrder: ["p1","p2","p3"],
  active: "p2",               // id du joueur dont c'est le tour
  config: { maxStep: 1 },

  players: [
    {
      id: "p1",
      name: "Slot 1",
      cls: "Classe",
      hp: 35,
      sp: 20,
      atk: 3,
      x: 1,
      y: 1,
      mapId: "map1",
      inv: ["Arbousier", "Épée courte"],
      joined: true
    },
    ...
  ],

  maps: [
    {
      id: "map1",
      name: "Le debut du sentier",
      background: "/assets/level1.png",
      grid: [ [".",".","#",...], ... ],         // 20x20
      decor: [ { x:5, y:8, type:"wall", blocking:true }, ... ],
      items: [
        { id:"it1", name:"Arbousier", icon:"/assets/items/arbousier.png", x:14, y:2 },
        ...
      ],
      monsters: [
        { id:"m1", name:"U Bufonu", hp:8, icon:"/assets/monsters/bufonu.png", x:6, y:9 },
        ...
      ],
      exits: [ { x:19, y:11, to:"map2" } ],
      requireAllMonstersDead: true
    },
    ...
  ]
}
```

### 2.1. Vos informations de joueur

Depuis `snapshot`, vous pouvez récupérer **votre** joueur avec :

```js
const me = snapshot.players.find(p => p.id === PLAYER_ID);
```

Vous avez accès à :

- `me.name` : votre pseudo.
- `me.cls` : votre classe (texte).
- `me.hp`, `me.sp`, `me.atk` : points de vie, points spirituels, attaque.
- `me.x`, `me.y` : position sur la carte.
- `me.mapId` : identifiant de la carte.
- `me.inv` : tableau de chaînes de caractères représentant les noms des objets.

### 2.2. Les autres joueurs

Vous pouvez récupérer les autres joueurs sur la même carte :

```js
const friends = snapshot.players.filter(p =>
  p.joined &&
  p.mapId === me.mapId &&
  p.id !== PLAYER_ID
);
```

Vous pourrez ainsi **afficher leur position** sur la grille et dans votre UI.

---

## 3. Mise en place du TP

### 3.1. Récupération des fichiers

L’enseignant vous fournit :

- `mj.js`
- `client.js`
- un dossier `public/` avec les images de base (maps, items, monstres)
- un fichier `levels.json`

Le MJ est lancé **par l’enseignant**.  
Vous, vous lancez **votre client** sur **votre propre machine**.

### 3.2. Lancer votre client

Installez les dépendances :

```bash
npm install
```

Puis lancez votre client en adaptant l’adresse du MJ et votre ID joueur :

```bash
MJ_BASE_URL=http://ADRESSE_DU_MJ:4000 
PLAYER_ID=p1 
CLIENT_PORT=4101 
node client.js
```

Ensuite, ouvrez votre navigateur sur :  
`http://localhost:4101/`

---

## 4. Partie 1 — Fiche personnage et thème graphique

### 4.1. Choisir votre créature / personnage

Choisissez **un monstre / créature issu de la mythologie corse** ou inspiré de celle-ci.  
Par exemple :

- une variante personnelle d’**U Bufonu** ;
- une créature inspirée d’**E Calcagnette** ;
- une version stylisée d’**A Dentilonga** ;
- ou une nouvelle créature que vous inventez dans l’esprit de ces mythes.

Créez :

- un **nom** pour votre personnage (affiché en gros dans l’interface) ;
- un **visuel** (image PNG/JPG) que vous placez dans un dossier (par exemple `public/personnages/monstre.png` à adapter à votre structure).

### 4.2. Thème graphique

Modifiez le HTML/CSS généré dans `client.js` pour que toute l’interface tourne autour de votre personnage :

- couleurs générales (fond de page, titres, boutons) ;
- éventuellement une **texture de fond** (image de maquis, forêt sombre, grotte, etc.) ;
- typographie, bordures, ombres, etc.

Vous pouvez par exemple :

- afficher votre **image de personnage** en haut de l’interface ;
- entourer la fiche de perso avec un cadre qui rappelle son univers (mousse, pierre, feu, etc.).

**Consigne :**  
Le thème doit être **cohérent** et **lisible** (contraste suffisant).

---

## 5. Partie 2 — Fiche de personnage dynamique

Dans la partie `<script>` de la page HTML (générée par `client.js`), vous avez déjà un code similaire à :

```js
function draw() {
  if (!snapshot) return;

  const me = snapshot.players.find(p => p.id === PLAYER_ID);
  stats.innerHTML = me
    ? `<b>${me.name}</b> [${me.cls}] — HP:${me.hp} SP:${me.sp} — Pos (${me.x},${me.y})`
    : 'Non rejoint';

  // ...
}
```

### 5.1. Affichage joli des PV / SP / ATK

Transformez cette ligne en une **vraie fiche** :

- PV sous forme de cœurs, barres ou orbes.
- SP sous forme de cristaux, flamme, gouttes, etc.
- ATK affiché clairement avec une icône d’arme.

Par exemple :

- une **barre de vie** dont la longueur dépend de `me.hp` ;
- une couleur qui change si les PV sont bas ;
- des **icônes** pour HP / SP (images ou emojis).

### 5.2. Afficher pseudo, classe et position

Affichez dans votre fiche :

- le **pseudo** (`me.name`) ;
- la **classe** (`me.cls`) ;
- la **position** (`(x, y)`) sous une forme lisible (ex. “Position : (12, 5)”).

---

## 6. Partie 3 — Inventaire du joueur

Vous avez déjà côté client :

```js
me.inv  // ex: ["Arbousier", "Épée courte"]
```

### 6.1. Affichage basique

Créez dans votre HTML un bloc “Inventaire” et affichez :

- la liste des objets sous forme de liste (ul/li) ou de cartes.

### 6.2. Affichage amélioré (recommandé)

- Associer une **icône** à certains objets connus (`"Arbousier"`, `"Potion de vie"`, `"Épée courte"`, etc.).
- Afficher des **infobulles** (tooltip) au survol avec un texte explicatif (par exemple : “Arbousier : restaure un peu de vie”).

*(Vous ne modifiez pas la logique de jeu : c’est le MJ qui décide des effets.)*

---

## 7. Partie 4 — Position sur la grille et amis

Le code fourni affiche déjà une grille 20x20 et montre :

- les murs / décor,
- les items,
- les monstres,
- les joueurs (classe `player`).

### 7.1. Mettre en avant votre personnage

Modifiez le CSS/JS pour que **votre** personnage soit :

- visuellement différencié des autres joueurs (couleur, halo, sprite, etc.) ;
- idéalement, utiliser **l’image de votre personnage** à la position `(me.x, me.y)` sur la carte.

Vous pouvez par exemple :

- ajouter une classe spécifique à la cellule où se trouve `me` ;
- changer `background-image` de cette cellule pour votre sprite.

### 7.2. Afficher vos amis

Utilisez :

```js
const friends = snapshot.players.filter(p =>
  p.joined &&
  p.mapId === me.mapId &&
  p.id !== PLAYER_ID
);
```

Sur la grille, mettez une icône différente pour ces amis (couleur ou petit symbole), et éventuellement listez-les dans un encadré “Alliés proches”.

---

## 8. Partie 5 — Text-To-Speech (TTS) pour la voix du MJ

Nous allons utiliser l’API **SpeechSynthesis** disponible dans la plupart des navigateurs modernes.

### 8.1. Principe

Quand un événement `chat` arrive :

```js
es.addEventListener('chat', ev => {
  const msg = JSON.parse(ev.data);
  logChat(msg);
});
```

La fonction `logChat` reçoit un objet de la forme :

```js
{
  from: "p1",
  text: "Je frappe le monstre",
  narrative: "Tu abats ton arme sur la créature qui vacille.",
  decision: { ... },
  ts: 1730000000000
}
```

Vous pouvez utiliser `narrative` pour faire parler le MJ.

### 8.2. Implémentation simple

Dans votre `<script>`, ajoutez une fonction :

```js
function speak(text) {
  if (!('speechSynthesis' in window)) return; // pas supporté
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'fr-FR';
  window.speechSynthesis.speak(utterance);
}
```

Puis modifiez `logChat` pour que **seulement les messages du MJ** soient lus à voix haute.  
Ici, on considère que tout `narrative` est la voix du MJ :

```js
function logChat(m) {
  const who = m.from === PLAYER_ID ? 'Vous' : m.from;
  const cls = m.from === PLAYER_ID ? 'mine' : 'other';
  const line = document.createElement('div');
  line.innerHTML =
    '<span class="' + cls + '"><b>' + who + '</b>:</span> ' +
    (m.text || '') +
    (m.narrative ? '<br><small>' + m.narrative + '</small>' : '');
  chat.appendChild(line);
  chat.scrollTop = chat.scrollHeight;

  if (m.narrative) {
    speak(m.narrative);
  }
}
```

*(Vous pouvez affiner en ne lisant que quand c’est un autre joueur ou le MJ, etc.)*

---

## 9. Partie 6 — Text-To-Speech pour votre personnage

Vous pouvez également faire parler **votre propre personnage** quand vous envoyez un message.

### 9.1. Lecture à l’envoi

Dans le gestionnaire du formulaire :

```js
form.onsubmit = async (e) => {
  e.preventDefault();
  const text = msg.value.trim();
  if (!text) return;
  msg.value = '';

  // Faire parler votre personnage
  speak(text);

  const r = await fetch('/say', {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ text })
  });
  if (!r.ok) alert(await r.text());
};
```

Vous pouvez utiliser une voix différente (si le navigateur en propose plusieurs) pour distinguer :

- la voix du MJ,
- la voix de votre personnage.

---

## 10. Bonus — Speech-To-Text (optionnel)

Pour aller plus loin, vous pouvez essayer d’utiliser **SpeechRecognition** (API Web Speech) pour permettre :

- au joueur de **parler dans son micro**,
- de convertir sa voix en texte,
- de remplir automatiquement le champ `input` avec le résultat.

*Attention : cette API est expérimentale et mieux supportée sur certains navigateurs (Chrome, versions Desktop, etc.).*

Idée de démarche :

1. Ajouter un bouton “🎙 Parler”.
2. Au clic, lancer la reconnaissance vocale.
3. Quand un résultat est reçu, l’afficher dans `msg.value`.
4. Laisser l’utilisateur corriger ou envoyer.

---

## 11. Récapitulatif des exigences

**Obligatoire :**

1. Connexion au MJ via votre client (`client.js`) et affichage d’une interface web.
2. Choix d’un **personnage inspiré de la mythologie corse** :
   - nom,
   - image affichée dans l’interface.
3. Thème graphique cohérent avec ce personnage (couleurs, ambiance).
4. Affichage clair de :
   - pseudo,
   - classe,
   - PV, SP, ATK,
   - position `(x, y)`.
5. Affichage de l’**inventaire** du joueur (`me.inv`).
6. Mise en avant de la **position de votre personnage** sur la grille.
7. Affichage des **amis** (autres joueurs) sur la carte.
8. **Text-To-Speech** pour lire au moins la **narration du MJ**.

**Fortement recommandé :**

- Text-To-Speech pour les messages de votre personnage.
- Inventaire “joli” (icônes, mise en forme).
- Indication visuelle claire lorsqu’**c’est votre tour** (`active === PLAYER_ID`).

**Bonus possibles :**

- Speech-To-Text (micro → champ texte).
- Animation CSS / effets visuels (par exemple halo vert autour de votre personnage quand c’est votre tour).
- Thème dynamique en fonction des PV (interface qui devient plus sombre quand vous êtes proche de la mort…).

---

## 12. Questions / pistes de réflexion

- Comment votre interface aide-t-elle à **comprendre l’état du jeu** sans lire tout le texte ?
- Comment pourriez-vous rendre votre client plus **accessible** (ex. pour des joueurs malvoyants) grâce à la voix ?
- Comment découperiez-vous cette interface si vous deviez la réécrire dans un framework moderne (React, Vue, etc.) ?

Lorsque vous aurez terminé, préparez une **courte démonstration** :  
montrez votre interface, expliquez votre personnage et justifiez vos choix graphiques / techniques.
