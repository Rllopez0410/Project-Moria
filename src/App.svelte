<script>
  import { mining_pool } from "./stores";
  import Pool from "./lib/pool.svelte";
  
  let num = 0;
  
  mining_pool.subscribe((value) => {
    num = value;
  })
  
  $: money = num.toLocaleString();
</script>

<div class="container">
  <header>
    <div class="profile-pic"></div>
    <div class="earnings">${money}</div>  
  </header>
  
  <div class="jobs">
    <Pool />
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    height: 100dvh;
    background-image: url(./assets/background.png);
    background-size: cover;
    background-repeat: no-repeat;
  }
  header {
    display: flex;
    padding: 5px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: rgba(0, 0, 0, 0.553);
    z-index: 1;
  }
  .profile-pic {
    background: url(./assets/character.gif);
    background-size: contain;
    height: 80px;
    width: 80px;
    border-radius: 5px;
  }
  .earnings {
    font-size: 32px;
    color: white;
  }
</style>