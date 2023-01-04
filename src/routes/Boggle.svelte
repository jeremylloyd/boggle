<script>
  import BoggleTile from './BoggleTile.svelte';

  let boggleState = {
    'letters': 'abcdefghijklmnop',
    'wordCurrent': [0, 1, 2, 3],
    'possibleWords': ['abc', 'dhgf', 'lkji'],
    'wordsCorrect': [],
    'wordsIncorrect': [],
  }

  let wordCurrent = ''

  const createWord = (tileId) => {
    console.log(`word created, starting with letter ${boggleState.letters[tileId]}`)
    boggleState.wordCurrent = [tileId]
  }

  export const finishWord = () => {
    if (!boggleState.wordCurrent.length > 0) return

    console.log(`word finished: ${wordCurrent}`)
    boggleState.wordCurrent = []
  }

  const handleMouseEnter = (tileId) => {
    if (boggleState.wordCurrent.length > 0) {
      boggleState.wordCurrent.push(tileId)
      // ensure svelte reacts to the change
      boggleState.wordCurrent = boggleState.wordCurrent

      // Log the updated word
      console.log(`word updated: ${wordCurrent}`)
    }
  }

  $: wordCurrent = boggleState.wordCurrent.map((tileId) => boggleState.letters[tileId]).join('');
</script>

<section class="game">
  <div class="game__main">
    <div class="game__current">{wordCurrent}</div>
    <div class="game__board">
      {#each boggleState.letters as letter, id}
        <BoggleTile letter={letter} on:mousedown={() => createWord(id)} on:mouseup={finishWord} on:mouseenter={() => handleMouseEnter(id)}/>
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

<style>
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