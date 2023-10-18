<script lang="ts">
    import dropSvg from "/dropSvg.svg";
    import AddFile from "/addFile.svg";
    import {fade} from "svelte/transition";
    import {injectEventListener,HasFile} from './../lib/handlePdf';
    export let hide:boolean = false;
    export let draggedOn:boolean = false;

    const stubbornLoad = (times:number,gap:number)=>
        new Promise((resolve)=>{
            let interval = setInterval( async ()=>{
                console.log(await HasFile());
            if(await HasFile() || times--){
                clearInterval(interval);
                const n = await HasFile();
                resolve(n);
            }
            },gap)
        })

    injectEventListener("dragenter",(e)=>{
        draggedOn = true;
    })

    injectEventListener("dragleave",(e)=>{
        draggedOn = false;
    })

    injectEventListener("drop",async ()=>{
        let x = await stubbornLoad(5,1000);
        hide = x as boolean;
    })

</script>
{#if !hide}
    {#if !draggedOn}
    <main
        transition:fade
    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-10/12 h-[75%] border-dashed border-2 border-red-400
            rounded-3xl flex justify-center flex-col items-center pointer-events-none">

            <p class="text-4xl mb-4">Drop File here:</p>
            <img src={dropSvg} width="400px" alt="addFile">
        </main>
        
        {:else}

        <main 
            transition:fade
        class="absolute bg-[#101010] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-10/12 h-[75%] border-dashed border-4 border-blue-600
        rounded-3xl flex justify-center flex-col items-center pointer-events-none">
        <div class="text-4xl mb-4 italic text-blue-500 flex justify-center
        items-center">
        <p class="mr-3">Add File</p>
                <svg width="36" height="36" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="21" fill="currentColor"/>
                    <g fill="#101010">
                        <path d="M21 14h6v20h-6z"/>
                        <path d="M14 21h20v6H14z"/>
                    </g>
                </svg>
            </div>
            <img src={AddFile} width="400px" alt="addFile">
            
        </main>
        {/if}
    {/if}