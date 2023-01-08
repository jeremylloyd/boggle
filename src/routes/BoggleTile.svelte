<script>
  export let letter;
  export let state = 'ready';

  const deadzone = 0.25; // percentage of width to ignore
</script>

<div 
  class="tile"
  class:tile--ready={state == 'ready'}
  class:tile--selected={state == 'selected'}
  on:mouseenter
  on:mouseleave
  on:mousedown
  on:mouseup
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
    
    background: rgba(255, 0, 0, 0.2);
    color: grey;

    border: solid 1px black;
    aspect-ratio: 1/1;
    border-radius: 50%;

    transition: 0.2s;
  }

  .tile--selected {
    background: red;
    color: black;
  }

  .tile--ready {
    /* background: rgba(255, 0, 0, 0.4); */
    color: black;
  }
</style>