---
layout: "layouts/Layout.astro"
title: "Forms"
type: "tp"
---

## FormData : les valeurs d’un formulaire

`FormData` rassemble les couples nom/valeur des contrôles qui participent à l’envoi. La clé vient de `name`, pas de `id`. Un contrôle désactivé ou une case non cochée n’est pas inclus ; une valeur textuelle reste une chaîne, même pour `input type="number"`.

```html live title="Lire une saisie sans envoi réseau"
<form>
  <label for="titre">Titre du projet</label>
  <input id="titre" name="titre" required>
  <label for="annee">Année</label>
  <input id="annee" name="annee" type="number" value="2026" required>
  <button type="submit">Afficher les valeurs</button>
</form>
<pre role="status"></pre>
<script>
  const form = document.querySelector('form');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    document.querySelector('pre').textContent =
      `Titre : ${data.get('titre')}\nAnnée : ${data.get('annee')}\nType : ${typeof data.get('annee')}`;
  });
</script>
```

Avec « Affiche », le résultat contient `Titre : Affiche`, `Année : 2026`, puis `Type : string`. Le formulaire reste sur place ; aucun serveur n’a reçu ni enregistré ces données. Le navigateur contrôle les champs `required` avant de déclencher une soumission valide.

## get, getAll, append et set

`get('titre')` renvoie la première valeur, ou `null` si la clé est absente. `getAll('technologies')` récupère toutes les valeurs de ce nom. `append` ajoute une valeur, même si la clé existe déjà ; `set` remplace les valeurs de cette clé. Pour traiter un nombre, vérifiez la présence et le vide avant `Number`, puis contrôlez `Number.isFinite` et les limites métier.

## Fichiers et envoi au serveur

Un `input type="file" name="image"` fournit un objet `File`. Pour transmettre données et fichiers, passez directement le `FormData` à `fetch` :

```js
// Dans un projet servi par HTTP, avec form existant et une vraie route serveur.
const response = await fetch('/api/projets.php', {
  method: 'POST',
  body: new FormData(form)
});
if (!response.ok) throw new Error(`HTTP ${response.status}`);
```

Ne fixez pas manuellement `Content-Type` : le navigateur produit `multipart/form-data` avec la frontière nécessaire. Côté PHP, les textes arrivent dans `$_POST` et les fichiers dans `$_FILES`. Cela diffère d’un corps JSON lu via `php://input`. La validation serveur doit contrôler taille, type et destination des fichiers ; le nom proposé par le client ne constitue pas une destination fiable. L’envoi réseau est étudié dans [fetch](/semestre_4/js/intermediate/fetch).
