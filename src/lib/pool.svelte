<script>
    import { mining_pool } from "../stores";
    import { tweened } from "svelte/motion";
    import { cubicIn } from "svelte/easing";

    let grow_rate = 5000;
    let income = 100;
    let click = false;

    let progress = tweened(0);

    function increment() {
        if (!click) {
            click = true
            setTimeout(() => {
                mining_pool.update((n) => n + income);
            }, grow_rate);
            progress = tweened(0, {
                duration: grow_rate,
                easing: cubicIn
            });
            progress.set(1);
        }

        setTimeout(() => {
            progress = tweened(0, {
                duration: 1
            });
            progress.set(0);
            click = false;  
        },grow_rate + 1)    
    }
</script>

<div class="mining-pool">
    <div class="btn-container">
        <button class="mining-pool-btn" on:click={increment} disabled={click}></button>
        <div class="job-level">1/10</div>
    </div>
    <div class="progression">
        <div class="progress-top">
            <div class="job-income">${income}</div>
            <progress value={$progress}></progress>
        </div>
        <div class="progress-bot">
            <button class="buy">
                <div>1x buy</div>
                <div>$0</div>
            </button>
            <div class="job-time">0s</div>
        </div>
    </div>
</div>

<style>
    .mining-pool {
        display: flex;
        justify-content: center;
        
        gap: 10px;
    }

    .btn-container {
        display: flex;
        flex-direction: column;
        align-items: center;
       
    }

    .mining-pool-btn {
        background-image: url(../assets/mine-pool-animation.gif);
        background-size: cover;
        background-color: #703d79;
        border: 2px solid black;
        height: 75px;
        width: 75px;
        border-radius: 100px;
        transition: 200ms;
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
        font-family: "Pixelify Sans", sans-serif;
        color: white;
        width: 160px;
        height: 35px;
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