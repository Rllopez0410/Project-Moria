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
    <button on:click={increment}>Closet Weed</button>
    <div class="progress-bar">
        <div class="job-income">${income}</div>
        <progress value={$progress}></progress>
    </div>
</div>

<style>
    .closet-weed {
        display: flex;
        justify-content: center;
    }

    .progress-bar {
        display: flex;
        justify-content: center;
        height: 50px;
        border: 1px solid red;
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
        height: inherit;
    }
</style>