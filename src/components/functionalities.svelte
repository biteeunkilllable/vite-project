<script lang="ts">
    import {slide} from 'svelte/transition';
    let slider = true;
</script>
<main class="">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="h-full w-4 bg-gray-400 bg-opacity-50 hover:bg-opacity-100 flex items-center justify-center cursor-pointer"
     on:click={()=>slider =! slider}>
        ||</div>
    {#if slider}
    <div class="bg-red-200 w-full" transition:slide={{axis:"x"}}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero soluta aperiam voluptas provident molestiae at debitis maxime, illum odit natus cumque vel non, voluptatem, neque tempora ad molestias hic perferendis.
    </div>
    {/if}
</main>