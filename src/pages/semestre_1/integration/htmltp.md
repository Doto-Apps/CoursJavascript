---
layout: "layouts/Layout.astro"
title: "TP : structurer le site Gamer / Creator"
type: "TP"
order: 6
quizId: "s1-int-05"
previousSession: "/semestre_1/integration/grid"
nextSession: "/semestre_1/integration/csstp"
---

<a id="comprendre"></a>

## La hiérarchie du contenu HTML

Le cahier des charges est une liste de besoins, pas une suite de balises à recopier. Surlignez les contenus, les parcours et les quantités. « Six profils répartis dans deux catégories » impose une répartition ; « navigation vers chaque catégorie » impose des liens et des cibles correspondantes. Une règle doit pouvoir être vérifiée dans le rendu ou le document.

| Besoin | Structure envisageable | Vérification |
|---|---|---|
| Présenter le site. | `header`, titre et paragraphe introductif. | Le visiteur comprend le sujet sans lire tout le catalogue. |
| Accéder aux deux catégories. | `nav` avec deux liens internes. | Chaque lien atteint une cible unique. |
| Décrire un profil autonome. | `article`, titre, image et description. | La fiche garde son sens si on la lit séparément. |
| Identifier la fin du site. | `footer` avec un contact. | Les informations ne sont pas mélangées aux fiches. |

## Les cartes avec article

Une fiche possède des champs communs mais des contenus différents. Validez d’abord un seul `article` : titre au bon niveau, chemin d’image fonctionnel, description utile et lien explicite. Ajoutez ensuite les autres profils avec la même structure. Répéter un identifiant pour copier une carte introduit une erreur : utilisez une classe commune pour les futures règles CSS.

```html preview title="Une fiche autonome" height=170
<article>
  <h3>Studio Pixel</h3>
  <p>Un collectif réalise des affiches pour les associations du campus.</p>
  <a href="https://example.org">Découvrir les projets de Studio Pixel</a>
</article>
```

Le titre `h3` suppose ici que la fiche appartient à une catégorie introduite par `h2`. Utilisée seule dans une autre page, cette fiche peut nécessiter un autre niveau : le contexte du document compte. Le lien de ce rendu fixe est un exemple de syntaxe, pas un parcours à suivre pendant le TP.

## Navigation et ordre de lecture

Lire les titres dans l’ordre permet de repérer une rubrique manquante. Parcourir les liens avec Tab révèle les destinations inutilisables. Désactiver le CSS montre si le contenu reste organisé. Un validateur détecte des défauts d’imbrication, mais ne peut pas décider si la description d’un profil est informative : les tests humains et automatiques se complètent.

## La structure HTML d’une fiche

Avant de produire six fiches, construisons ensemble une seule fiche correcte. L’objectif n’est pas de recopier une page entière : vous devez savoir expliquer chaque zone et reconnaître ce qui peut être répété. Un `article` peut représenter une fiche autonome ; la `section` regroupe plusieurs fiches autour d’un thème nommé par son titre.

```html
<section id="musiciens">
  <h2>Musiciens</h2>
  <article class="profil">
    <h3>Le trio Horizon</h3>
    <p>Trois artistes explorent le jazz et les musiques de film.</p>
    <a href="#contact">Contacter le trio Horizon</a>
  </article>
</section>
```

**Résultat attendu :** une catégorie avec son titre, une fiche avec un sous-titre, un paragraphe et un lien. Même sans couleur ni grille, le lecteur comprend l’organisation. L’identifiant `musiciens` appartient à la section ; la classe `profil` pourra être partagée par les fiches.

```html live title="Lire le document avant sa décoration"
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Une page sémantique</title>
    <style>
      body {
        font-family: system-ui, sans-serif;
        margin: 16px;
        color: #203047;
        background: #f3f6fa;
      }
      nav {
        display: flex;
        gap: 16px;
      }
      article {
        border: 1px solid #bcc7d6;
        padding: 16px;
      }
    </style>
  </head>
  <body>
    <header>
      <p>Atelier Pixel</p>
      <nav aria-label="Principale">
        <a href="#projets">Projets</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
    <main>
      <h1>Nos créations</h1>
      <section id="projets">
        <h2>Projets</h2>
        <article>
          <h3>Affiche Pixel</h3>
          <p>Une exploration typographique.</p>
          <a href="#contact">Discuter de l’affiche Pixel</a>
        </article>
      </section>
      <section id="contact">
        <h2>Contact</h2>
        <p>Données fictives pour cet atelier.</p>
      </section>
    </main>
    <footer><p>Atelier MMI</p></footer>
  </body>
</html>
```

**Erreur à éviter :** dupliquer un `id` avec chaque copie de carte. La classe décrit une famille de composants ; l’identifiant désigne une cible unique.

Le modèle Gamer/Creator ci-dessous illustre une page à deux catégories de trois fiches. Les catégories et les contenus peuvent changer tout en conservant cette structure.

<a id="contrat"></a>

## Le modèle de page à deux catégories

Le site présente une communauté de joueurs et de créateurs. Une page contient : un en-tête avec le nom de la communauté ; une navigation vers les sections ; une présentation avec un titre principal ; deux sections « Gamers » et « Creators » ; trois profils par section ; un pied de page avec un contact. Chaque profil comporte un nom, une image, un texte de présentation et un lien descriptif. Les six profils doivent avoir des contenus distincts.

Le résultat attendu aujourd'hui est une page compréhensible sans CSS. Une belle capture ne compense pas une structure incohérente. Utilisez des images personnelles ou des ressources dont la licence autorise l'utilisation ; notez leur source dans `credits.md`. N'inventez pas un lien de contact fonctionnel : identifiez clairement les données fictives.

<a id="structure"></a>

## Les sections et les articles de la page

`main` contient le contenu principal de la page. Chaque section possède un titre ; chaque profil peut être un `article` car il constitue une unité de contenu. La navigation utilise des liens vers des identifiants uniques. Le titre principal est un `h1`, les catégories des `h2`, les noms des profils des `h3`.

```html
<nav aria-label="Navigation principale">
  <a href="#gamers">Gamers</a>
  <a href="#creators">Creators</a>
</nav>
<main>
  <h1>La communauté Pixel</h1>
  <section id="gamers">
    <h2>Gamers</h2>
    <!-- Ajoutez ici vos trois articles de profil. -->
  </section>
</main>
```

Ce fragment est un point de départ, pas le document complet. Ajoutez le doctype, `html lang="fr"`, `head`, l'encodage UTF-8, la métadonnée viewport et un titre de document pertinent. Les classes servent ensuite à cibler des composants CSS ; elles ne remplacent pas la sémantique.

<a id="contenus"></a>

## Le contenu sémantique d’une carte

Pour une image informative, rédigez un `alt` qui apporte son information utile. Une image purement décorative reçoit `alt=""`. Un lien navigue vers une ressource ; un bouton déclenche une action. Évitez « cliquez ici » : « Voir le portfolio de Léa » reste compréhensible hors contexte. Un `id` ne doit pas être réutilisé sur plusieurs cartes ; une classe peut l'être.

<a id="validation"></a>


La validation du document et la lecture sans CSS vérifient des aspects complémentaires. Le validateur signale les imbrications incorrectes ; la lecture révèle les titres, les catégories et les destinations dans leur ordre réel.

Pour aller plus loin : [liste des balises HTML](https://developer.mozilla.org/fr/docs/Web/HTML/Reference/Elements), [titres](https://developer.mozilla.org/fr/docs/Web/HTML/Element/Heading_Elements), [images accessibles](https://www.w3.org/WAI/tutorials/images/).

## Travail à réaliser et remise

Créez un dossier avec `index.html`, `images/` et `credits.md`. Écrivez le document complet, la navigation et les deux catégories avant de créer les six fiches. Chaque fiche contient un nom distinct, une présentation, un média et un lien dont la destination existe. Si une ressource est fictive, son caractère fictif doit être explicite.

| Contrôle | Attendu |
|---|---|
| Lecture sans style | Un h1, deux catégories h2 et six noms h3 |
| Liens de catégories | Chaque fragment rejoint une seule section |
| Cartes | Trois profils distincts par catégorie |
| Ressources | Chemins exacts, alternatives adaptées, crédits et licences notés |
| Validation HTML | Erreurs de structure corrigées et nouveau contrôle effectué |

Remettez le dossier et un court relevé des vérifications. Le CSS est ajouté à la séance suivante ; la structure doit déjà permettre de comprendre et parcourir la page.
