<script>
    import arrowDown from "/arrow-down-bold.svg";
    import {slide} from "svelte/transition"
    export let value = "Select";
    export let Options = ["option 1","option 2","option 3"];
    let drop = false;
</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="w-full bg-white p-1 cursor-pointer"
    on:click={ e =>drop = !drop}
    >
    <p class="flex justify-between">{value} <img src={arrowDown} width="16px" height="16px" alt="downArrow"></p>
</div>
{#if drop}
    <div
    class="absolute border-solid border-2 border-gray-100 p-2
            translate-y-6 bg-white"
    transition:slide
    >
    <div class="absolute top-0 left-1 w-6 h-6 -translate-y-1/2 
                translate-x-1/2 rotate-45 border-solid border-l-[2px] 
                border-t-[2px] border-gray-100 bg-white -z-10"
                transition:slide={{axis:"y"}}/>
<!-- svelte-ignore a11y-click-events-have-key-events -->
{#each Options as option}
    
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="w-36 p-1 flex justify-center items-center 
                        text-xl hover:bg-gray-300 cursor-pointer
                        "
                on:click={()=>{value = option;drop = !drop}}
                        >
                <p class="pb-2 border-solid border-b-2 border-black">{option}</p>
            </div>
            
{/each}
    </div>
{/if}