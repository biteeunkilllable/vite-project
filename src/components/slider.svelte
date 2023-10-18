<script lang="ts">
    import DropDown from "./dropDown.svelte";
    import doubleArrowDown from "/double-arrow-down.svg";
    import upload from "/upload.svg";
    import {openFileButton} from "../lib/handlePdf";
    import doubleArrowUp from "/double-arrow-up.svg";
    import dataHandler from "../lib/handleApi";
    import { slide,fade } from 'svelte/transition';
    
    export let content:string = "";
    export let response:string = "";
    export let error:string = "";
    export let requestBtn:HTMLButtonElement;
    export let ErrorAccrued:boolean = false;

    let isLoadingResponse = false;
    let showResponse = false;
    let language:string;
    let assistanceMethod:string;

    const slideError = (err:Error)=>{
        error = err.message;
        ErrorAccrued = true;
        setTimeout(() => {
            ErrorAccrued = false;
        }, 2000);
    }

    let requestHandler = async (e:Event)=>{
        console.log(content);
        const el = e.currentTarget as HTMLButtonElement;
        el.disabled = true;
        isLoadingResponse = true;
        let data;
        try{
            data = await dataHandler(assistanceMethod,language,content);
        }
        catch(err){
            slideError(err as Error);
            isLoadingResponse = false;
            el.disabled = false;
            return;
        }
        response =
        data?.endpoint 
        + "\n\n"
        + data?.language;
        + "\n\n"
        + (data?.content ?? "no content");
        
        setTimeout(() => {
            isLoadingResponse = false;
            el.disabled = false;
        }, 2000);

    }
</script>


<div class="absolute overflow-hidden flex flex-col right-0 
            h-[90%] bg-white shadow-[-9px_0px_22px_0px_#00000024]
            w-3/4 md:w-1/3 sm:w-1/2 "
transition:slide={{axis:"x",duration:400}}>
{#if !showResponse}
    <div class="flex flex-col right-0 w-full bg-white"
         transition:slide>

        <div class="p-5 text-3xl border-solid border-black border-b-[0.2rem] flex justify-between items-center">
            <p>ExaMate</p>
            <button
            on:click={openFileButton}
            class="p-3 rounded-2xl mr-10 flex items-center justify-center
                   text-xl border-solid border-2 border-black 
                   hover:bg-black hover:bg-opacity-40 sm:hidden"
            >
            <img src={upload} class="mr-3" width="24" height="24" alt="uploadImg">
              Upload</button>
        </div>
        <div class="p-5 pb-12 w-full flex justify-around bg-red-100
        border-solid border-b-[0.20rem] border-b-black">
        <div>
            <p class="text-2xl mb-5">option 1</p>
            <DropDown bind:value={assistanceMethod} />
        </div>
        <div >
            <p class="text-2xl mb-5">option 2</p>
            <DropDown bind:value={language} />
        </div>
    </div>
    
    <div class="p-5">
        <p class="text-2xl mb-4">Content</p>

        <p id="paragraph" class="p-2 w-full h-40 rounded-xl mb-4
                border-solid border-2 border-black
                overflow-x-hidden scrollbar-thumb scrollbar-thin scrollbar-thumb-gray-500"
                contenteditable="true"
            bind:innerText={content}></p>
        <button on:click={requestHandler} 
            bind:this={requestBtn} 
            class="w-full h-12 rounded-xl bg-violet-600 
            hover:bg-violet-950 text-3xl font-semibold text-white
            flex justify-center items-center">
            {#if isLoadingResponse}
            <div class="flex justify-center items-center">
                <svg style="shape-rendering: auto;" height="140px" viewBox="-25 -26 100 100" preserveAspectRatio="xMidYMid">
                        <path fill="none" stroke="currentColor" stroke-width="10" stroke-dasharray="202.70525329589844 53.883674926757806" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z" stroke-linecap="round" style="transform:scale(0.50)">
                        <animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="0.9345794392523364s" keyTimes="0;1" values="0;256.58892822265625"></animate>
                        </path>
                    </svg>
            </div>
            {:else}
            <p>
                value
            </p>
            {/if}
        </button>
    </div>
</div>
    {/if}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="w-full h-5 bg-gray-300 hover:bg-gray-400"
    on:click={()=>showResponse = !showResponse}>
    {#if showResponse}
    <img class="m-auto" in:fade src={doubleArrowDown} width="22px" height="22px" alt="arrow">
    {:else}
    <img class="m-auto" in:fade src={doubleArrowUp} width="22px" height="22px" alt="arrow">
    {/if}
    </div>

    <div class="p-6 w-full flex-grow">
        <p class="text-3xl mb-10">Response</p>
        <div class="w-full h-full flex-grow rounded-xl">
            <p class="p-2 w-full h-5/6 flex-grow rounded-xl 
                    border-solid border-black border-2"
            contenteditable="false"
            bind:innerText={response}
            >
            </p>
        </div>
    </div>

</div>
<style>
    #paragraph::-webkit-scrollbar-thumb{
        border-radius: 100px;
        background-color: lightgray;
    }
</style>