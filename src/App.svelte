<script>
  import { mining_pool } from './stores';
  import Pool from './components/pool.svelte';
  import Job from './components/job.svelte';

  import { jobs } from './testJobs.js';

  mining_pool.subscribe((value) => {
    console.log(value);
  });
</script>

<div class="container">
  <header>
    <div class="profile-pic"></div>
    <div class="earnings">${$mining_pool.toFixed(2)}</div>
  </header>

  <div class="jobs">
    {#each jobs as job}
      <Job {...job} />
    {/each}
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    height: 100dvh;
    background-image: url(./assets/newBackground.png);
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
    background-color: #703d79;
    border: 2px solid black;
    background-size: contain;
    height: 80px;
    width: 80px;
  }
  
  .earnings {
    font-size: 32px;
    color: white;
  }
</style>
