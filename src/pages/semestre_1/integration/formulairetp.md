---
layout: "layouts/Layout.astro"
title: "TP : Création d'une Page d'Inscription"
type: "TP"
---

## Objectifs

1. Comprendre comment structurer un formulaire HTML.
2. Utiliser Flexbox pour centrer et organiser des éléments dans une page.
3. Appliquer des styles CSS de base pour améliorer l'apparence d'un formulaire.
4. Découvrir et utiliser des transitions CSS pour enrichir l'expérience utilisateur.

---

## Instructions

### Étape 1 : Créer une Page HTML

Créez une page nommée `inscription.html`. Cette page doit contenir un formulaire d'inscription avec les champs suivants :

- **Nom** : champ texte (`type="text"`)
- **Prénom** : champ texte (`type="text"`)
- **Email** : champ email (`type="email"`)
- **Date de naissance** : champ date (`type="date"`)
- **Sexe** : menu déroulant (`<select>`) avec les options "Homme", "Femme", et "Autre".
- **Mot de passe** : champ mot de passe (`type="password"`)
- **Bouton** : bouton pour soumettre le formulaire (`<button>` ou `type="submit"`)

**Consignes :**
- Tous les champs doivent être obligatoires (utilisez `required`).
- Assurez-vous que les `label` soient associés à leurs champs correspondants avec l'attribut `for`.

**Astuce :** Voici un exemple pour le champ "Nom" :
```html
<label for="nom">Nom :</label>
<input type="text" id="nom" name="nom" required>
```

**Documentation :**
- [MDN sur les balises de formulaire HTML](https://developer.mozilla.org/fr/docs/Web/HTML/Element/form).

---

### Étape 2 : Centrer le Formulaire avec Flexbox

Centrez le formulaire au milieu de la page, horizontalement et verticalement, en utilisant **Flexbox**.

**Consignes :**
- Ajoutez une classe ou un ID à l'élément parent contenant le formulaire.
- Utilisez `display: flex` et les propriétés appropriées pour centrer le formulaire.

**Astuce :**
```css
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
```

**Documentation :**
- [MDN sur Flexbox](https://developer.mozilla.org/fr/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox).

---

### Étape 3 : Organiser les Champs du Formulaire avec Flexbox

Ajoutez une mise en page dans le formulaire pour que :
1. Les étiquettes soient positionnées au-dessus des champs.
2. Les champs soient bien espacés verticalement.

**Consignes :**
- Utilisez **Flexbox** pour organiser les champs du formulaire.
- Ajoutez un espace uniforme entre les champs avec `gap`.

**Astuce :**
```css
form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
```

**Questions pour Réfléchir :**
- Quelle propriété CSS permet de définir un espace uniforme entre les éléments d'un conteneur ?

---

### Étape 4 : Styliser le Formulaire (Style Statique)

Ajoutez des styles de base pour améliorer l'apparence du formulaire. 

**Consignes :**
1. Ajoutez une bordure arrondie et une ombre légère autour du formulaire.
2. Appliquez une couleur de fond à la page et une autre au formulaire.
3. Donnez des marges intérieures (`padding`) au formulaire pour qu'il respire.

**Astuce :**
```css
.form-container {
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    max-width: 400px;
}
```

**Documentation :**
- [MDN sur `box-shadow`](https://developer.mozilla.org/fr/docs/Web/CSS/box-shadow).

---

### Étape 5 : Ajouter des Transitions et des États Interactifs

Ajoutez des transitions et des styles d'interaction aux champs du formulaire et au bouton.

**Consignes :**
1. Ajoutez une transition fluide aux champs lorsque l'utilisateur les survole (`hover`) ou les sélectionne (`focus`).
2. Appliquez une couleur différente ou une bordure spéciale lors du survol du bouton.

**Astuce :**
Pour les champs :
```css
input:focus, select:focus {
    border-color: #007BFF;
    outline: none;
    transition: border-color 0.3s ease;
}
```

Pour le bouton :
```css
button:hover {
    background-color: #0056b3;
    transition: background-color 0.3s ease;
}
```

**Questions pour Réfléchir :**
- Quelle propriété CSS permet de contrôler la durée d'une transition ?
- Quelles pseudo-classes CSS sont utilisées pour gérer les interactions utilisateur ?

---

### Étape 6 : Créer une Page de Confirmation

Ajoutez une nouvelle page HTML nommée `confirmation.html`. Cette page doit contenir un message simple, par exemple : "Inscription réussie !".

**Consignes :**
- Configurez le formulaire pour rediriger vers cette page après la soumission (utilisez l'attribut `action`).
- Ajoutez un style minimal pour centrer le message sur la page.

**Astuce pour centrer :**
```css
body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
```

---

## Résultats Attendus

1. Une page d'inscription statique avec un formulaire complet et bien organisé.
2. Un formulaire centré avec Flexbox.
3. Des styles CSS statiques pour améliorer l'apparence.
4. Des transitions fluides sur les champs et le bouton.
5. Une redirection vers une page de confirmation après soumission.

---

## Critères d'Évaluation

1. Le formulaire contient tous les champs requis avec les types appropriés.
2. Le formulaire est centré et organisé avec Flexbox.
3. Les styles statiques sont correctement appliqués.
4. Les transitions CSS sont présentes et fonctionnelles.
5. La page de confirmation est simple et fonctionnelle.

---

## Points de Réflexion

- Comment améliorer encore l'expérience utilisateur ?
- Quels autres styles ou animations pourraient être ajoutés pour rendre le formulaire plus engageant ?
