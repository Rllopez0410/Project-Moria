<script>
    import { closetWeed } from "../stores";
    import { tweened } from "svelte/motion";
    import { cubicIn } from "svelte/easing";

    let grow_rate = 5000;
    let income = 100;
    let click = false;

    let progress = tweened(0);

    function increment() {
        if (!click) {
            setTimeout(() => {
                closetWeed.update((n) => n + income); 
                click = true
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

<div class="closet-weed">
    <button class="closet-btn" on:click={increment}></button>
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
    .closet-btn {
        background-image: url(../assets/closetweed.png);
        background-size: cover;
        border: 2px solid rgba(0, 0, 0, 0.408);
        height: 70px;
        width: 70px;
        border-radius: 100px;
        transition: 200ms;
    }

    .closet-btn:active {
        box-shadow: 0px 0px 8px rgb(216, 205, 255);
    }

    .closet-weed {
        display: flex;
        justify-content: center;
    }

    .progression {
        border: 1px solid red;
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
        background-color: #bc7d00e8;
        box-shadow: inset 0px 0px 6px black;
        border-radius: 10px;
        overflow: hidden;
    }

    progress::-webkit-progress-value {
        background-color: #0eff8f;
        box-shadow: 3px 0px 3px rgba(177, 247, 255, 0.662);
        border-radius: 5px;
    }

    .buy {
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-radius: 8px;
        border: 2px solid rgb(146, 81, 20);
        background-color: rgb(253, 141, 36);
        font-family: "Gloria Hallelujah", cursive;
        color: white;
        width: 170px;
        height: 35px;
    }

    .job-time {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #bc7d00e8;
        box-shadow: 0px 0px 5px inset black;
        border-radius: 10px;
        width: 40px;
        height: 35px;
        color: white;
    }
</style>