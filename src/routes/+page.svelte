<script>
  import BoggleTile from './BoggleTile.svelte';

  let letters = 'abcdefghijklmnop';

  let currentWord = [];
  let isDragging = false;

  const handleLetter = (event) => {
    if (currentWord.some(tile => tile.id === event.detail.id)) return;
    currentWord.push(event.detail);
    console.log(currentWord.map(obj => obj.letter).join(''));
  }
  
  const handleWord = (event) => {
    let word = currentWord.map(obj => obj.letter).join('');
    console.log(`word created: ${word}`);
    currentWord = [];
  }

  const handleMouseup = (event) => {
    if (!isDragging) {
      console.log(`Not creating word. mouseup did nothing`);
      return;
    }

    handleWord(event);
    isDragging = false;
  }
</script>

<main class="page" on:mouseup={handleMouseup}>
  <header class="page__header">
    <h1 class="page__title">Boggle</h1>
    <nav class="page__nav">

    </nav>
  </header>

  <section class="page__status">
    <div class="page__time">Time: 01:10</div>
    <div class="page__message">No words huh?</div>
    <div class="page__score">Score: 23</div>
  </section>

  <section class="game">
    <div class="game__main">
      <div class="game__current">lea</div>
      <div class="game__board">
        {#each letters as letter, id}
          <BoggleTile
            letter={letter}
            id={id}
            on:addLetterToCurrent={handleLetter}
            bind:isDragging
          />
        {/each}
      </div>
    </div>
    <div class="game__words">
      <div class="game__word">Here's a word</div>
      <div class="game__word">Here's another word</div>
      <div class="game__word">leaf</div>
      <div class="game__word">fred</div>
      <div class="game__word">fred</div>
      <div class="game__word">fred</div>
      <div class="game__word">fred</div>
      <div class="game__word">fred</div>
      <div class="game__word">fred</div>
      <div class="game__word">fred</div>
      <div class="game__word">fred</div>
      <div class="game__word">fred</div>
      <div class="game__word">fred</div>
      <div class="game__word">fred</div>
      <div class="game__word">fred</div>
      <div class="game__word">fred</div>
      <div class="game__word">fred</div>
      <div class="game__word">fred</div>
      <div class="game__word">fred</div>
      <div class="game__word">fred</div>
      <div class="game__word">fred</div>
      <div class="game__word">fred</div>
      <div class="game__word">fred</div>
    </div>
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

  .game__main {
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: dashed 1px orange;
  }

  .game__current {
    text-align: center
  }

  .game {
    border: dashed 1px red;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 10px;

    flex-grow: 1;
    width: 100vw;
    margin-bottom: auto;
    background: var(--greylight);
  }

  .game__board {
    background: var(--greylighter);
    width: min(100vw - 40px, 100vh - 120px);
    gap: 4px;

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
  }

  .page {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-family: 'Segoe UI';

    min-height: 100vh;
    background: var(--grey);
  }

  .page__header {

  }

  .page__message {
    position: absolute;
    text-align: center;
    width: calc(100% - 40px);  /* calculated from page__status padding */
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
    width: 150px;
  }

  .game__words {
    display: flex;
    flex-wrap: wrap;
  }

  @media screen and (min-width: 500px) {
    .game {
      flex-direction: row;
      align-items: flex-start;
    }

    .game__board {
      width: min(60vw - 40px, 100vh - 120px);
      min-width: 300px;
    }
  }
</style>