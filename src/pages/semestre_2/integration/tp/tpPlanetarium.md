---
hidden: true
order: 9
layout: "layouts/Layout.astro"
title: "TP — Planetarium JS avec Three.js"
type: TP
---

## Three.js : scène, caméra et rendu

Three.js permet de représenter une scène 3D dans un canvas. Cette ressource complémentaire utilise des objets, des fonctions et une animation JavaScript ; elle prolonge les [événements](/semestre_2/integration/tp/eventJs), sans supposer qu’une maquette HTML constitue déjà une scène 3D.

| Objet | Rôle |
|---|---|
| Scene | Contient les objets et leurs transformations |
| PerspectiveCamera | Définit le point de vue, le champ et les plans de découpe |
| WebGLRenderer | Produit le rendu dans le canvas |
| Geometry | Forme du maillage |
| Material | Apparence de la surface |
| Mesh | Associe géométrie et matériau |

## Une sphère dans un projet de module

Dans un projet Vite configuré pour JavaScript, installez `three`, notez sa version et conservez le fichier de verrouillage. Le document charge un `main.js` de module. Placez ce code dans ce fichier ; il utilise l’import résolu par l’outil de construction, pas un nom reconnu nativement par le navigateur.

```js
import * as THREE from 'three';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 100);
camera.position.z = 6;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.style.margin = '0';
document.body.append(renderer.domElement);
const astre = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 16),
  new THREE.MeshBasicMaterial({ color: 0xfacc15 })
);
scene.add(astre);
renderer.render(scene, camera);
```

**Résultat attendu dans ce projet :** une sphère jaune au centre d’un fond sombre. Le matériau `MeshBasicMaterial` n’exige pas de lumière ; un matériau éclairé peut rester noir si aucune lumière n’a été ajoutée. Le plan proche, le plan lointain et la position de caméra doivent laisser l’astre dans le volume visible.

## Orbite et temps écoulé

Une orbite circulaire peut être décrite par `x = cos(angle) × rayon` et `z = sin(angle) × rayon`. Remplacez l’unique appel de rendu par une boucle :

```js
renderer.setAnimationLoop((tempsMs) => {
  const angle = tempsMs / 1000;
  astre.position.x = Math.cos(angle) * 2;
  astre.position.z = Math.sin(angle) * 2;
  renderer.render(scene, camera);
});
```

La sphère orbite autour de l’origine ; sa vitesse dépend du temps, pas du nombre d’images affichées. Une rotation propre utilise plutôt `astre.rotation.y` et ne change pas son centre. Pour plusieurs astres, chacun possède son rayon et sa vitesse ; un `Group` peut servir de parent commun pour hiérarchiser les transformations.

## Redimensionnement et interaction

```js
addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
```

La caméra et le canvas suivent les nouvelles dimensions : modifier seulement le canvas peut déformer le rendu. Pour un composant placé dans une page, mesurez plutôt son conteneur. Les contrôles de caméra et le chargement glTF viennent d’extensions importées explicitement dans la même version de Three.js. Un `Raycaster` teste l’intersection entre un rayon issu du pointeur et les maillages pour sélectionner un astre ; le nom et la description sélectionnés peuvent être présentés dans du HTML accessible à côté du canvas.

Le canvas seul n’offre pas un équivalent textuel du système représenté. Conservez une description des astres et un moyen de suspendre le mouvement. La [documentation Three.js](https://threejs.org/manual/#en/fundamentals) décrit les objets de base et leur contexte d’exécution.
