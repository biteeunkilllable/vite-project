<script lang="ts">
    import DropDown from "./dropDown.svelte";
    import doubleArrowDown from "/double-arrow-down.svg";
    import {HasFile, openFileButton} from "../lib/handlePdf";
    import doubleArrowUp from "/double-arrow-up.svg";
    import dataHandler from "../lib/handleApi";
    import { slide,fade } from 'svelte/transition';
    import {Languages,aiAssistanceMethods} from "../lib/handleApi";
    import { onMount } from "svelte";
    
    export let content:string = "";
    export let response:string = "";
    export let error:string = "";
    export let requestBtn:HTMLButtonElement;
    export let ErrorAccrued:boolean = false;
    export let isUploaded:boolean = false;
    export let language:string;
    export let assistanceMethod:string;
    export let sliderElement:HTMLElement;
    
    let aiDrop:HTMLElement;
    let langDrop:HTMLElement;
    let showMethods:boolean;
    let showLangs:boolean;
    let isLoadingResponse = false;
    let showResponse = false;
    let languages:HTMLElement | null;
    let aiAssistanceElement:HTMLElement | null;
    let searchMethods:HTMLElement;
    let searchLanguages:HTMLElement;

    const slideError = (err:Error)=>{
        error = err.message;
        ErrorAccrued = true;
        setTimeout(() => {
            ErrorAccrued = false;
        }, 2000);
    }

    let requestHandler = async (e:Event)=>{
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
        response = data;

        isLoadingResponse = false;
        el.disabled = false;
        showResponse = true;
    }

    const stubbornLoad = (fn:()=>Promise<boolean>,gap:number)=>{
        openFileButton();
        let interval = setInterval( async ()=>{
        if(await fn()){
            isUploaded= true;
            clearInterval(interval);
            }
        },gap)
    }

    const init = ()=>{
        sliderElement.addEventListener("click",e =>{
            if(e.target != aiDrop
            && !aiDrop.contains(e.target as Node)
            && showMethods
            && e.target !=searchMethods
            && searchMethods.contains(e.target as Node))
            return aiDrop.click();

            if(e.target != langDrop
            && !langDrop.contains(e.target as Node)
            && showLangs
            && e.target !=searchLanguages
            && searchLanguages.contains(e.target as Node))
            return langDrop.click();
        })

    }

    onMount(init);
</script>

<div class="absolute overflow-hidden flex flex-col right-0 
            h-[90%] bg-white shadow-[-9px_0px_22px_0px_#00000024]
            w-[320px] md:w-[425px] sm:w-[345px]"
        id="slider"
        bind:this={sliderElement}
        transition:slide={{axis:"x",duration:400}}>
{#if !showResponse}
    <div class="flex flex-col right-0 w-full bg-white"
         transition:slide>

        <div class="p-5 text-3xl border-solid border-black border-b-2 flex justify-between items-center">
            <p class="text-[20px] font-extrabold">ExaMate</p>
            <button
            on:click={()=>stubbornLoad(HasFile,1000)}
            class="p-3 rounded-2xl mr-2 md:mr-10 flex items-center justify-center
                   text-xl border-solid border-2 border-black 
                   hover:bg-black hover:bg-opacity-40 sm:hidden"
            >
            <svg width="24" class="mr-3" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m14-7l-5-5l-5 5m5-5v12"/>
            </svg>
              Upload</button>
        </div>
        <div class="p-5 pb-12 w-full flex justify-around
        border-solid border-b-2 border-b-black">
        <div>
            <p class="text-lg mb-5">Assistance</p>
            <DropDown
            bind:drop={showMethods}
            bind:dropBtn={aiDrop}
            bind:dropDownElement={aiAssistanceElement}
            Options={aiAssistanceMethods} 
            bind:value={assistanceMethod}
            bind:searchElement={searchMethods}/>
        </div>
        <div >
            <p class="text-lg mb-5">Languages</p>
            <DropDown
            bind:dropBtn={langDrop}
            bind:dropDownElement={languages}
            Options={Languages}
            bind:value={language}
            bind:drop={showLangs}
            bind:searchElement={searchLanguages}/>
        </div>
    </div>
    
    <div class="p-5">
        <p class="text-xl font-semibold mb-4">Content</p>

        <p id="paragraph" class="p-2 w-full h-40 rounded-xl mb-4
                border-solid border-2 border-black
                overflow-x-hidden scrollbar-thumb scrollbar-thin scrollbar-thumb-gray-500"
                contenteditable="true"
                bind:innerText={content}></p>
        <button on:click={requestHandler} 
            bind:this={requestBtn} 
            class="w-full h-12 rounded-xl bg-violet-600 
            hover:bg-violet-950 text-xl font-semibold text-white
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
                {assistanceMethod}
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
        <p class="text-xl font-semibold mb-10">Response</p>
        <div class="w-full h-full flex-grow rounded-xl">
            <p class="p-2 w-full h-5/6 flex-grow rounded-xl 
                    border-solid border-black border-2"
            contenteditable="false"
            bind:innerHTML={response}
            >
            </p>
        </div>
    </div>

</div>
<style>
    #slider{
        font-family: Tahoma,'Segoe UI', Geneva, Verdana, sans-serif;
    }
    #paragraph::-webkit-scrollbar-thumb{
        border-radius: 100px;
        background-color: lightgray;
    }
</style>