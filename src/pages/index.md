---
layout: "layouts/Layout.astro"
title: "Cours MMI — Apprendre le web"
hidden: true
---

<div class="home">
  <section class="home-creators" aria-label="Créateurs du site">
    <p class="home-eyebrow">Créé par</p>
    <ul>
      <li><strong>Dorian Malizewski</strong><span>Développeur &amp; formateur</span></li>
      <li><strong>Antoine Dominici</strong><span>Développeur &amp; formateur</span></li>
    </ul>
  </section>

  <section class="home-intro" aria-labelledby="home-title">
    <p class="home-eyebrow">BUT MMI</p>
    <h1 id="home-title">Apprendre le web, une séance à la fois.</h1>
    <p class="home-description">Les cours, les exemples à tester et les travaux pratiques, réunis dans un même endroit.</p>
    <a class="home-start" href="#semestres">Choisir mon semestre <span aria-hidden="true">↓</span></a>
  </section>

  <section id="semestres" class="home-section" aria-labelledby="semesters-title">
    <div class="home-section-heading">
      <h2 id="semesters-title">Les semestres</h2>
      <p>Retrouvez votre parcours et les supports de chaque matière.</p>
    </div>
    <div class="home-semesters">
      <article class="home-semester">
        <p class="home-year">Première année</p>
        <h3>Semestre 1</h3>
        <p class="home-semester-description">Les fondations : HTML, CSS, PHP et la réalisation d’un premier site.</p>
        <a class="home-course-link" href="/semestre_1" aria-label="Voir les séances du semestre 1">Voir les séances <span aria-hidden="true">→</span></a>
      </article>
      <article class="home-semester">
        <p class="home-year">Première année</p>
        <h3>Semestre 2</h3>
        <p class="home-semester-description">Des interfaces interactives, des échanges avec le serveur et des sites avec données.</p>
        <a class="home-course-link" href="/semestre_2" aria-label="Voir les séances du semestre 2">Voir les séances <span aria-hidden="true">→</span></a>
      </article>
      <article class="home-semester">
        <p class="home-year">Deuxième année</p>
        <h3>Semestre 3</h3>
        <p class="home-semester-description">Les outils d’interface, la gestion de contenu et le déploiement de services.</p>
        <a class="home-course-link" href="/semestre_3" aria-label="Voir les séances du semestre 3">Voir les séances <span aria-hidden="true">→</span></a>
      </article>
      <article class="home-semester">
        <p class="home-year">Deuxième année</p>
        <h3>Semestre 4</h3>
        <p class="home-semester-description">Approfondir JavaScript, la mise en page et les échanges avec une base de données.</p>
        <ul class="home-supports" aria-label="Supports du semestre 4">
          <li><a href="/semestre_4/js">JavaScript <span aria-hidden="true">→</span></a></li>
          <li><a href="/semestre_4/css/recap">CSS <span aria-hidden="true">→</span></a></li>
          <li><a href="/semestre_4/php/phpsql">PHP et SQL <span aria-hidden="true">→</span></a></li>
        </ul>
      </article>
    </div>
  </section>

  <section class="home-section home-method" aria-labelledby="method-title">
    <div class="home-section-heading">
      <h2 id="method-title">Les supports de cours</h2>
      <p>Des explications techniques, des exemples et leurs résultats.</p>
    </div>
    <ol class="home-steps">
      <li><span class="home-step-number" aria-hidden="true">01</span><div><h3>Apprendre</h3><p>Lire les explications et observer le résultat du code.</p></div></li>
      <li><span class="home-step-number" aria-hidden="true">02</span><div><h3>Tester</h3><p>Modifier un exemple et observer immédiatement son effet.</p></div></li>
      <li><span class="home-step-number" aria-hidden="true">03</span><div><h3>Relier</h3><p>Retrouver les notions précédentes et suivre leur utilisation dans un projet.</p></div></li>
    </ol>
    <p class="home-quiz-note">Pour réviser, les QCM proposés dans les cours peuvent être recommencés, y compris à la maison.</p>
  </section>

  <nav class="home-resources" aria-label="Références utiles">
    <h2>À garder sous la main</h2>
    <div>
      <a href="/semestre_1/integration/htmltd">Structure HTML <span aria-hidden="true">→</span></a>
      <a href="/semestre_1/integration/csstd">CSS et Flexbox <span aria-hidden="true">→</span></a>
      <a href="/extra/git">Git et hébergement <span aria-hidden="true">→</span></a>
    </div>
  </nav>

</div>
