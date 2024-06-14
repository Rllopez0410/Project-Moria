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
    <div class="progress-bar">
        <div class="job-income">${income}</div>
        <progress value={$progress}></progress>
    </div>
</div>

<style>
    button {
        background-image: url(../assets/closetweed.png);
        background-size: cover;
        border: 2px solid rgba(0, 0, 0, 0.408);
        height: 70px;
        width: 70px;
        border-radius: 100px;
        transition: 200ms;
    }

    button:active {
        box-shadow: 0px 0px 8px rgb(216, 205, 255);
    }

    .closet-weed {
        display: flex;
        justify-content: center;
        gap: 5px;
    }

    .progress-bar {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 35px;
        position: relative;
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
</style>