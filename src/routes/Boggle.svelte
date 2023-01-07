<script>
  import BoggleTile from './BoggleTile.svelte';

  let boggleState = {
    'letters': 'abcdefghijklmnop',
    'wordCurrent': [],
    'tiles': [
      {
        letter: 'a',
        state: 'disabled',
      },
      {
        letter: 'b',
        state: 'selected',
      },
      {
        letter: 'c',
        state: 'disabled',
      },
      {
        letter: 'd',
        state: 'disabled',
      },
      {
        letter: 'e',
        state: 'disabled',
      },
      {
        letter: 'f',
        state: 'disabled',
      },
      {
        letter: 'g',
        state: 'disabled',
      },
      {
        letter: 'h',
        state: 'disabled',
      },
      {
        letter: 'i',
        state: 'disabled',
      },
      {
        letter: 'j',
        state: 'disabled',
      },
      {
        letter: 'k',
        state: 'disabled',
      },
      {
        letter: 'l',
        state: 'disabled',
      },
      {
        letter: 'm',
        state: 'disabled',
      },
      {
        letter: 'n',
        state: 'disabled',
      },
      {
        letter: 'o',
        state: 'disabled',
      },
      {
        letter: 'p',
        state: 'disabled',
      },
    ],
    'possibleWords': new Set(['abc', 'dhgf', 'lkji']),
    'wordsCorrect': new Set(['abc', 'dhgf', 'lkji']),
    'wordsIncorrect': new Set(),
  }

  let words = new Set([1, 2, 3])
  const minWordLength = 4;

  let wordCurrent;
  let status = '';

  const tileIsDisabled = (tileId) => {
    if (boggleState.wordCurrent.length === 0) return true

    // Check if the tile is a neighbour of the previous tile
    if (boggleState.wordCurrent.length > 0) {
      if (!neighbours(4, boggleState.wordCurrent[boggleState.wordCurrent.length - 1]).includes(tileId)) return true
    }

    return false
  }

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

  const createWord = (tileId) => {
    console.log(`word created, starting with letter ${boggleState.letters[tileId]}`)
    boggleState.wordCurrent = [tileId]
  }

  export const finishWord = () => {
    
    console.log(`word finished: ${wordCurrent}`)
    if (boggleState.wordCurrent.length > 0 && boggleState.wordCurrent.length >= minWordLength) {
      boggleState.wordsCorrect.add(wordCurrent);
    }
    boggleState.wordCurrent = []
  }

  const handleMouseEnter = (tileId) => {
    if (!boggleState.wordCurrent.length > 0) return
    // Ensure the mouse entered a neighbour of the previous tile
    if (!neighbours(4, boggleState.wordCurrent[boggleState.wordCurrent.length - 1]).includes(tileId)) return
    // Ensure the tile isn't already in the word
    if (boggleState.wordCurrent.includes(tileId)) return
    
    boggleState.wordCurrent.push(tileId)
    // ensure svelte reacts to the change
    boggleState.wordCurrent = boggleState.wordCurrent

    // Log the updated word
    console.log(`word updated: ${wordCurrent}`)
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
        <BoggleTile {...tile} on:mousedown={() => createWord(id)} on:mouseup={finishWord} on:mouseenter={() => handleMouseEnter(id)}/>
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