<script>
  import BoggleTile from './BoggleTile.svelte';

  export let dictionary;

  let wordCurrent;
  let status = '';

  const neighbours = (gridSize, cell) => {
    let neighbours = []

    // Check left
    if (cell % gridSize !== 0) {
      neighbours.push(cell - 1)
    }

    // Check right
    if (cell % gridSize !== gridSize - 1) {
      neighbours.push(cell + 1)
    }

    // Check up
    if (cell - gridSize >= 0) {
      neighbours.push(cell - gridSize)
    }

    // Check down
    if (cell + gridSize < gridSize * gridSize) {
      neighbours.push(cell + gridSize)
    }

    // Check up-left
    if (cell - gridSize - 1 >= 0 && cell % gridSize !== 0) {
      neighbours.push(cell - gridSize - 1)
    }

    // Check up-right
    if (cell - gridSize + 1 >= 0 && cell % gridSize !== gridSize - 1) {
      neighbours.push(cell - gridSize + 1)
    }

    // Check down-left
    if (cell + gridSize - 1 < gridSize * gridSize && cell % gridSize !== 0) {
      neighbours.push(cell + gridSize - 1)
    }

    // Check down-right
    if (cell + gridSize + 1 < gridSize * gridSize && cell % gridSize !== gridSize - 1) {
      neighbours.push(cell + gridSize + 1)
    }

    return neighbours
  }

  const checkWordTree = (prefixIds, letters, possibleWords = null) => {
    let words = new Set();
    let newWords;

    let prefix = prefixIds.map(id => letters[id]).join('');

    if (possibleWords === null) {
      possibleWords = dictionary;
    } else {
      possibleWords = possibleWords.filter(word => word.startsWith(prefix));
    }

    let isWord = possibleWords.includes(prefix);
    if (isWord) words.add(prefix);

    // if the number of words in the dictionary starting with these characters is positive, checkWordTree for wordStart + each of the boggle neighbours
    let moreWordsStartWithPrefix = possibleWords.filter(word => word.startsWith(prefix)).length > 0 + isWord;
    
    if (moreWordsStartWithPrefix) {
      let neighboursToTest = neighbours(4, prefixIds[prefixIds.length - 1]).filter(neighbour => !prefixIds.includes(neighbour));

      neighboursToTest.forEach(neighbour => {
        newWords = checkWordTree([...prefixIds, neighbour], letters, possibleWords);
        newWords.forEach(word => words.add(word));
      })
    }

    return words;
  }

  const getPossibleWords = (letters, minLength = 4) => {
    let words = new Set();

    for (let i = 0; i < letters.length; i++) {
      let newWords = checkWordTree([i], letters);
      newWords.forEach(word => {
        if (word.length >= minLength) words.add(word)
      });
    }

    return words
  }

  const buildBoggleState = (letters, minWordLength) => {
    let state = {
      'letters': letters,
      'minWordLength': minWordLength,
      'possibleWords': getPossibleWords(letters, minWordLength),
      'wordCurrent': [],
      'wordsCorrect': new Set(),
      'tiles': letters.split('').map(letter => {
        return {
          letter: letter,
          state: 'disabled',
        }
      })
    }
    console.log('Board generated. Possible words: ', state.possibleWords);
    return state
  }

  let boggleState = buildBoggleState('awofpobketruvmfe', 4);

  const tileIsDisabled = (tileId) => {
    if (boggleState.wordCurrent.length === 0) return true

    // Check if the tile is a neighbour of the previous tile
    if (boggleState.wordCurrent.length > 0) {
      if (!neighbours(4, boggleState.wordCurrent[boggleState.wordCurrent.length - 1]).includes(tileId)) return true
    }

    return false
  }

  const createWord = (tileId) => {
    boggleState.wordCurrent = [tileId];
    updateStatus();
  }

  const updateStatus = () => {
    status = boggleState.wordCurrent.map(id => boggleState.letters[id]).join('');
  }

  export const finishWord = () => {    
    let isBlank = boggleState.wordCurrent.length === 0;
    if (isBlank) return
    
    let isTooShort = boggleState.wordCurrent.length < boggleState.minWordLength;
    let isNotInDictionary = !boggleState.possibleWords.has(wordCurrent);

    console.log(`word finished: ${wordCurrent}`)
    if (isTooShort) {
      status = `${wordCurrent} is less than ${boggleState.minWordLength} letters long`
    } else if (isNotInDictionary) {
      status = `${wordCurrent} is not a word`
    } else {
      boggleState.wordsCorrect.add(wordCurrent)
    }

    boggleState.wordCurrent = []
  }
  
  const handleMouseEnter = (tileId) => {
    if (!boggleState.wordCurrent.length > 0) return
    // Ensure the mouse entered a neighbour of the previous tile
    if (!neighbours(4, boggleState.wordCurrent[boggleState.wordCurrent.length - 1]).includes(tileId)) return
    // Ensure the tile isn't already in the word
    if (boggleState.wordCurrent.includes(tileId)) return
    
    boggleState.wordCurrent.push(tileId);
    
    boggleState.wordCurrent = boggleState.wordCurrent;
    updateStatus()
  }

  $: wordCurrent = boggleState.wordCurrent.map((tileId) => boggleState.letters[tileId]).join('');
  
  // update tile state in boggleState
  $: boggleState.tiles = boggleState.tiles.map((tile, id) => {
    if (boggleState.wordCurrent.includes(id)) {
      tile.state = 'selected'
    } else if (tileIsDisabled(id)) {
      tile.state = 'disabled'
    } else {
      tile.state = 'ready'
    }

    return tile
  })
</script>

<section class="game">
  <div class="game__main">
    <div class="game__current">{status}</div>
    <div class="game__board">
      {#each boggleState.tiles as tile, id}
        <BoggleTile {...tile} on:mousedown={() => createWord(id)} on:mouseenter={() => handleMouseEnter(id)} on:mouseup={finishWord}/>
      {/each}
    </div>
  </div>
  <div class="game__words">
    {#each [...boggleState.wordsCorrect] as word}
      <div class="game__word">{word}</div>
    {/each}
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
    text-align: center;
    min-height: 1rem;
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