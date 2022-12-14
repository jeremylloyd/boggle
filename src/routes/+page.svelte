<main class="page">
  <header class="page__header">
    <h1 class="page__title">Joeggle</h1>
    <nav class="page__nav">

    </nav>
  </header>

  <section class="page__status">
    <div class="page__time">Time: 01:10</div>
    <div class="page__message">a message</div>
    <div class="page__score">Score: 23</div>
  </section>

  <section class="game">
    <section class="game__board">
    </section>
    <section class="game__words">
      <div class="game__word">Here's a word</div>
    </section>
  </section>
</main>

<style>
  /* http://meyerweb.com/eric/tools/css/reset/ 
    v2.0 | 20110126
    License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  input {
    font-size: inherit;
    font-family: inherit;
  }

  * {
    box-sizing: border-box;
  }

  :root {
    --greylighter: hsl(0, 0%, 95%);
    --greylight: hsl(0, 0%, 90%);
    --grey: hsl(0, 0%, 75%);
  }

  .game {
    display: flex;
    flex-direction: column;
    gap: 20px;

    width: 100%;
    padding: 20px;
    background: var(--greylight);
  }

  .game__board {
    background: var(--greylighter);
    min-height: 300px;
  }

  .page {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    font-family: 'Segoe UI';

    min-height: 100vh;
    width: 100%;
    background: var(--grey);
    border: none;
  }

  .page__header {

  }

  .page__message {
    position: absolute;
    text-align: center;
    width: calc(100% - 40px);
  }

  .page__nav {

  }

  .page__score {

  }

  .page__status {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    padding: 0px 20px;
  }

  .page__time {

  }

  .page__title {
    font-size: 2rem;
  }

  .game__word {

  }

  .game__words {

  }
</style>