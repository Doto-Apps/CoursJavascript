# Rédiger un cours et ses démonstrations

Les fichiers Markdown de `src/pages` contiennent les explications et les exemples du support. Les titres annoncent les notions techniques ; les déroulements minutés et les rubriques de préparation de l’enseignant restent hors du cours.

Relier chaque notion à sa syntaxe, à un exemple court et à son résultat. Renvoyer aux supports précédents lorsque la notion a déjà été enseignée.

## Rendu fixe : html preview

````md
```html preview title="Un titre bleu" height=140
<h2>Bonjour MMI !</h2>
<style>h2 { color: #1d4ed8; }</style>
```
````

Le code est affiché puis suivi de son rendu. Le titre et la hauteur sont facultatifs. La hauteur est bornée entre 120 et 600 px. Ce mode accepte HTML/CSS et refuse les scripts. `xml preview` est un alias.

## Exemple modifiable : html live

````md
```html live title="Un clic modifie le texte"
<button type="button">Afficher</button>
<p role="status"></p>
<script>
  document.querySelector('button').addEventListener('click', () => {
    document.querySelector('p').textContent = 'Bonjour MMI !';
  });
</script>
```
````

Le même code est lisible, modifiable et exécuté dans un aperçu isolé. `xml live` est un alias HTML. Les blocs `css live` et `js live` utilisent un document de base contenant un titre, un paragraphe, un bouton et une carte ; préférer `html live` lorsque la structure précise fait partie de l’exemple.

L’éditeur se charge à proximité de la zone visible ou à son activation. Il permet d’exécuter, copier, réinitialiser et modifier la largeur de l’aperçu. La console expose les sorties et erreurs JavaScript. Les modifications ne sont pas sauvegardées entre les visites.

## Contexte d’exécution

Un bloc sans `preview` ni `live` reste un extrait de code classique. Réserver les modes de démonstration aux exemples autonomes et préférer un fragment à un document HTML complet lorsque cela suffit.

PHP et SQL ne s’exécutent pas dans l’éditeur. Indiquer leur contexte réel et leurs sorties attendues. Une simulation JavaScript doit être annoncée comme telle ; elle ne prouve ni un appel serveur ni une écriture en base.

Les aperçus sont isolés et refusent les appels réseau. Web Storage ne peut pas y démontrer une persistance normale. Un formulaire interactif de démonstration doit intercepter sa soumission pour traiter les valeurs localement.

Les ressources locales `/vendor/tailwind/`, `/vendor/swiper/` et `/images/learning/` sont utilisées par les cours : conserver ces fichiers et leurs licences. Le compilateur Tailwind fourni dans les aperçus sert aux essais ; un projet livré doit compiler sa feuille CSS.

## QCM et navigation

Conserver les métadonnées du cours et les liens de progression. Lorsqu’une notion change, relire les questions correspondantes dans `src/data/quizzes/`, y compris leur explication, leur `sourceSection` et leur extrait `evidence`. Une référence de section correspond à une ancre `<a id="nom"></a>` dans le support source.

## Fichiers du moteur

`src/markdown/remark-live-code.mjs` transforme les blocs Markdown. `src/scripts/liveCode.ts` charge l’éditeur à la demande ; `src/scripts/liveCodeEditor.ts` gère le code et son aperçu. Les styles communs sont dans `src/styles/live-code.css`.
