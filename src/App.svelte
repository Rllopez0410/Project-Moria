<script>
  import { closetWeed } from "./stores";
  import Closet from "./lib/closet.svelte";
  
  let num = 0;
  
  closetWeed.subscribe((value) => {
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
    <Closet />
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    height: 100dvh;
    border: 1px solid red;
  }
  header {
    display: flex;
    padding: 5px;
    background-color: rgba(0, 0, 0, 0.58);
    z-index: 1;
  }
  .profile-pic {
    background-color: rgb(84, 147, 255);
    height: 80px;
    width: 80px;
    border-radius: 5px;
  }
  .earnings {
    font-size: 32px;
    color: white;
  }
</style>