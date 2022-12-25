<script>
  export let letter;
  export let id;
  export let selected = false;
  export let isDragging = false;

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const deadzone = 0.25; // percentage of width to ignore
  let tile;

  const createWord = () => {
    isDragging = true;
    console.log('Started creating word');
    addLetter();
  }

  const stopCreatingWord = () => {
    isDragging = false;
    console.log('Stopped creating word');
  }

  const move = (event) => {
    // console.log(`Moved mouse over letter ${letter}, id ${id}`);
    // console.log(`This tile starts at x: ${tile.getBoundingClientRect().x}`);
    // console.log(event);
  }

  const addLetter = () => {
    if (!isDragging) return;
    dispatch('addLetterToCurrent', {'id': id, 'letter': letter});
  }
</script>

<div 
  class="tile"
  class:tile--selected={selected}
  on:mousemove={move}
  on:mouseenter={() => {selected = true; addLetter()}}
  on:mouseleave={() => selected = false}
  on:mousedown={createWord}
  on:mouseup
  bind:this={tile}
>
  {letter}
</div>

<style>
  .tile {
    display: flex;
    justify-content: center;
    align-items: center;
    
    font-size: min(8vw, 8vh);
    text-transform: uppercase;
    user-select:none;
    
    background: red;
    border: solid 1px black;
    aspect-ratio: 1/1;
    border-radius: 15%;
  }

  .tile--selected {
    background: lime;
  }
</style>