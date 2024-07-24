<script>
  import { USD } from '../stores';
  import { tweened } from 'svelte/motion';
  import { cubicIn } from 'svelte/easing';

  import { convertMilliseconds } from '../utils/helper';

  export let asset;
  export let name = 'Miner';
  export let baseIncome = 100;
  export let baseDuration = 5000;
  export let baseCostToUpgrade = 50;

  let level = 1;
  let income = baseIncome;
  let duration = baseDuration;
  let costToUpgrade = baseCostToUpgrade;
  let isActive = false;
  let progress = tweened(0);

  function startJob() {
    if (!isActive) {
      isActive = true;
      progress.set(0, { duration });
      progress.set(1, { duration, easing: cubicIn });

      setTimeout(() => {
        completeJob();
      }, duration);
    }
  }

  function completeJob() {
    if (isActive) {
      isActive = false;
      USD.update((money) => money + income);
      progress.set(0, { duration: 0 });
    }
  }

  function upgradeJob() {
    USD.update((money) => {
      if (money >= costToUpgrade) {
        let newBalance = money - costToUpgrade;
        level += 1;
        income *= 1.2;
        duration *= 0.9;
        costToUpgrade *= 1.5;
        return newBalance;
      }
      return money;
    });
  }
</script>

<div class="job">
  <div class="btn-container">
    <button
      style="background-image: url({asset}); background-size: cover; background-position: center;"
      class="job-btn"
      data-tooltip={name}
      on:click={startJob}
      disabled={isActive}
    ></button>
    <div class="job-level">{level}</div>
  </div>
  <div class="progression">
    <div class="progress-top">
      <div class="job-income">${income.toFixed(2)}</div>
      <progress value={$progress}></progress>
    </div>
    <div class="progress-bot">
      <button
        class="buy"
        on:click={upgradeJob}
        disabled={$USD < costToUpgrade}
      >
        <div>1x buy</div>
        <div>${costToUpgrade.toFixed(2)}</div>
      </button>
      <div class="job-time">{convertMilliseconds(duration)}s</div>
    </div>
  </div>
</div>

<style>
  .job {
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  .btn-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .job-btn {
    background-color: #703d79;
    border: 2px solid black;
    height: 75px;
    width: 75px;
    border-radius: 100px;
    transition: 200ms;
  }

  .job-btn:hover {
    background-color: #5e3166; /* Slightly darker background on hover */
    transform: scale(1.05); /* Slightly scale up to give a hover effect */
  }

  .job-btn:active {
    background-color: #4b2753; /* Even darker background on active */
    transform: scale(0.99); /* Slightly scale down to give a pressed effect */
  }

  .job-level {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    top: -20px;
    background-color: #703d79;
    border: 2px solid black;
    border-radius: 20px;
    color: white;
    width: 70px;
    z-index: 2;
  }

  .progression {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .progress-top {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    position: relative;
  }

  .progress-bot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 2px;
  }

  .job-income {
    z-index: 1;
    position: absolute;
    height: inherit;
    display: flex;
    align-items: center;
  }

  progress {
    width: 230px;
    height: inherit;
    -webkit-appearance: none;
    appearance: none;
  }

  progress::-webkit-progress-bar {
    display: flex;
    align-items: center;
    background-color: #703d79;
    border-left: 3px solid black;
    border: 2px solid black;
    overflow: hidden;
    padding: 4px;
  }

  progress::-webkit-progress-value {
    background-color: #ff4f4f;
  }

  .buy {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 3px;
    border: 2px solid rgb(125, 71, 20);
    background-color: rgb(255, 195, 106);
    font-family: 'Pixelify Sans', sans-serif;
    color: white;
    width: 160px;
    height: 35px;
  }

  .buy:hover {
    background-color: rgb(
      255,
      175,
      76
    ); /* Slightly darker background on hover */
  }

  .buy:active {
    background-color: rgb(255, 145, 46); /* Even darker background on active */
    transform: scale(0.95); /* Slightly scale down to give a pressed effect */
  }

  .buy:disabled {
    background-color: rgb(
      200,
      200,
      200
    ); /* Gray background for disabled state */
    border: 2px solid rgb(150, 150, 150); /* Gray border for disabled state */
    color: rgb(100, 100, 100); /* Gray text for disabled state */
    transform: none; /* Reset any transform */
  }

  .job-time {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #bc7d00e8;
    box-shadow: 0px 0px 5px inset black;
    border-radius: 3px;
    width: 40px;
    height: 35px;
    color: white;
  }
</style>
