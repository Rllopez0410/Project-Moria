<script>
    import { closetWeed } from "../stores";
    import { tweened } from "svelte/motion";
    import { cubicIn } from "svelte/easing";

    let grow_rate = 5000;
    let click = false;

    let progress = tweened(0);

    function increment() {
        if (!click) {
            setTimeout(() => {
                closetWeed.update((n) => n + 100); 
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
    
    <progress value={$progress}></progress>
</div>

<style>
    .closet-weed {
        display: flex;
        justify-content: center;
    }

    progress {
        height: 50px;
        color: rgb(0, 189, 0);
    }
</style>