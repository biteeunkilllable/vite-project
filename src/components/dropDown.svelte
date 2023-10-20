<script lang="ts">
    import arrowDown from "/arrow-down-bold.svg";
    import {slide} from "svelte/transition"

    export let value = "Select";
    export let Options:string[] = [];
    export let dropBtn:HTMLElement | null = null;
    export let drop = false;
    export let searchElement:HTMLElement | null = null;
    export const dropDownElement: HTMLElement | null = null;
    export let disabled:boolean = false;

    let search:string = "";
</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if disabled}
    <div
    bind:this={dropBtn}
    class="w-full bg-white p-1 cursor-not-allowed border-solid border-gray-400 border-[1px]"
    on:click={ e =>drop = !drop}
    >
    <p class="text-gray-400 flex justify-between">{value}
        <span class="my-auto">
            <svg width="16" height="16" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8l316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496z"/>
            </svg>
        </span>
    </p>
    </div>    
{:else}
    <div 
    bind:this={dropBtn}
class="w-full bg-white p-1 cursor-pointer border-solid border-black border-[1px]"
    on:click={ e =>drop = !drop}
    >
    <p class="flex justify-between">{value} <img src={arrowDown} width="16px" height="16px" alt="downArrow"></p>
</div>
{/if}
{#if drop && !disabled}
    <div
    class="absolute border-solid border-2 border-gray-100 p-2
            translate-y-6 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]
            max-h-48 overflow-y-scroll scrollbar-custom scrollbar-thin"
    transition:slide
    >
    <div class="absolute top-0 left-1 w-6 h-6 -translate-y-1/2 
                translate-x-1/2 rotate-45 border-solid border-l-[2px] 
                border-t-[2px] border-gray-100 bg-white -z-10"
                transition:slide={{axis:"y"}}/>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div bind:this={searchElement} class="w-36 p-1 flex justify-center items-center 
                text-xl cursor-pointer
                "
                >
                <div class="group">
                    <svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
                    <input bind:value={search} placeholder="Search" type="search" class="input">
                </div>
    </div>
                
{#each Options as option}
    {#if option.toLocaleLowerCase().includes(search.toLocaleLowerCase())}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="w-36 p-1 flex justify-center items-center 
                    text-xl hover:bg-gray-300 cursor-pointer"
        on:click={()=>{value = option;drop = !drop}}
        >
            <p class="pb-2 border-solid border-b-2 border-black">{option}</p>
        </div>
        
    {/if}
{/each}
    </div>
{/if}
<style>
    .scrollbar-custom::-webkit-scrollbar{
        display: block;
    }
    .scrollbar-custom::-webkit-scrollbar-thumb{
        border-radius: 1000px;
        background-color: lightgrey;
        width:1px;
        max-width: 4px;
    }
    .scrollbar-custom::-webkit-scrollbar-track{
        width: 1rem;
    }
    .group {
    display: flex;
    line-height: 28px;
    align-items: center;
    position: relative;
    max-width: 190px;
}

.input {
    width: 100%;
    height: 40px;
    line-height: 28px;
    padding: 0 1rem;
    padding-left: 2.5rem;
    border: 2px solid transparent;
    border-radius: 8px;
    outline: none;
    background-color: #f3f3f4;
    color: #0d0c22;
    transition: .3s ease;
}

.input::placeholder {
    color: #9e9ea7;
}

.input:focus, input:hover {
    outline: none;
    border-color: cyan;
    background-color: #fff;
}

.icon {
    position: absolute;
    left: 1rem;
    fill: #9e9ea7;
    width: 1rem;
    height: 1rem;
}
</style>