---
hidden: true
order: 7
layout: "layouts/Layout.astro"
title: "TP : Héberger un Site Web sur GitHub Pages"
type: "TP"
---

## Hébergement statique et hébergement PHP

Un hébergement met des fichiers ou un programme à disposition à une adresse joignable. Les fichiers HTML/CSS du S1 peuvent être publiés sur un hébergement statique. Les pages PHP nécessitent un interpréteur côté serveur ; les données MySQL nécessitent aussi un service SQL et une configuration adaptée.

| Projet | Services nécessaires | Ce que reçoit le navigateur |
|---|---|---|
| Site HTML/CSS | Serveur de fichiers statiques | HTML, CSS et médias |
| Page PHP | Serveur avec PHP | Sortie produite par PHP |
| API PHP/MySQL | PHP et base SQL | Réponse JSON ou HTML selon la route |

## Publication et chemins

Le [guide GitHub Pages](/extra/git/githubpage) détaille la publication d’un site statique et les commandes Git. Avant l’envoi, vérifiez `index.html`, la présence des médias et les chemins relatifs. La casse qui semblait tolérée localement peut devenir significative sur l’hébergement.

Exemple : la page charge `css/styles.css`, et cette feuille charge `../images/fond.jpg`. Le premier chemin part du HTML ; le second part de la feuille CSS. **Résultat attendu après publication :** les deux ressources répondent avec un statut de réussite dans Réseau et la page possède le même contenu que la version locale.

## Vérifier la version accessible

Ouvrez l’adresse publique dans une fenêtre privée. Testez les liens internes, les pages secondaires et la lecture sur une fenêtre étroite. Un fichier présent dans le dossier local mais absent du commit ne peut pas apparaître en ligne. Une publication réussie n’implique pas que tous les chemins de la page sont corrects.

Pour une application serveur, la configuration SQL appartient au serveur et ne doit pas être transmise au navigateur. Le passage du local à l’hébergement demande aussi de vérifier l’origine des appels API, les journaux et les droits d’accès aux données ; ces points seront approfondis au S2 et au S3.
