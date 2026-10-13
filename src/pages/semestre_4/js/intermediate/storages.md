---
layout: "layouts/Layout.astro"
title: "Storage"
type: "tp"
---

## localStorage et sessionStorage

Ces espaces conservent des couples clé/valeur textuels dans le navigateur et sont isolés par origine. `localStorage` persiste généralement après fermeture ; `sessionStorage` est lié à la session d’un onglet et survit à son rechargement. Ils ne constituent ni une base de données serveur ni une synchronisation entre appareils. L’utilisateur ou les réglages de confidentialité peuvent supprimer ou interdire les données.

```js
const favoris = [4, 9];
localStorage.setItem('mmi-favoris', JSON.stringify(favoris));
const sauvegarde = localStorage.getItem('mmi-favoris');
console.log(JSON.parse(sauvegarde)); // [4, 9]
localStorage.removeItem('mmi-favoris');
console.log(localStorage.getItem('mmi-favoris')); // null
```

Ces instructions s’exécutent dans la console d’un site servi par HTTP. L’aperçu de la plateforme possède une origine opaque et ne permet pas de prouver le fonctionnement de Web Storage. `setItem` remplace la valeur de la clé ; `removeItem` retire seulement cette clé. Évitez `clear()`, qui retire aussi les autres données de l’application.

## Lire une sauvegarde et vérifier sa forme

```js
function lireFavoris() {
  try {
    const texte = localStorage.getItem('mmi-favoris');
    if (texte === null) return [];
    const valeurs = JSON.parse(texte);
    return Array.isArray(valeurs) && valeurs.every(Number.isInteger) ? valeurs : [];
  } catch {
    return [];
  }
}
```

Une clé absente donne une liste vide. Une ancienne sauvegarde mal formée ou un stockage refusé donne aussi une liste vide ici. L’écriture doit également gérer un échec, par exemple un quota dépassé ; l’interface peut continuer en mémoire en annonçant que la sélection ne sera pas conservée.

## Cookies et requêtes HTTP

Les cookies sont transmis automatiquement avec les requêtes auxquelles ils correspondent, selon leurs attributs et la politique du navigateur. Web Storage n’est pas transmis automatiquement. Un serveur PHP utilise souvent un cookie d’identifiant pour retrouver une session : les données de la session restent alors côté serveur.

| Mécanisme | Transmission | Usage |
|---|---|---|
| localStorage | Explicite seulement | Préférences et favoris |
| sessionStorage | Explicite seulement | État de l’onglet |
| Cookie de session | Automatique selon ses règles | Session serveur |

`HttpOnly` interdit la lecture du cookie par JavaScript ; `Secure` restreint son transport à HTTPS ; `SameSite` limite certains envois entre sites. Ces attributs se configurent côté serveur pour un cookie d’authentification. Une valeur locale reste modifiable par l’utilisateur et lisible par les scripts autorisés de l’origine : elle ne prouve aucun droit d’accès.
