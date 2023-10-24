<script lang="ts">
  import {tryGetDoc,selectionRetriever,injectElement,injectEventListener, injectHeader} from "./lib/handlePdf"
  import Slider from "./components/slider.svelte";
  import ErrorPopup from "./components/errorPopup.svelte";
  import ExaMateLogo from "./components/logoSvg.svelte";
  import DropHover from "./components/dropHover.svelte";
  import Banner from "./components/Banner.svelte";
  import Pdfreader from "./components/pdfReader.svelte";
  import IframeToolTip from "./components/iframeToolTip.svelte";
  import {siteTitle} from "./lib/handleApi";
  import { onMount } from "svelte";
  
  let isChecked = false;
  let content = "";
  let response:string;
  let toolTip:HTMLElement;
  let styles:any;
  let requestBtn:HTMLButtonElement;
  let burgerMenuBtn:HTMLInputElement;
  let ErrorAccrued:boolean;
  let error:string;
  let isUploaded:boolean = false;
  let assistanceMethod:string;
  let language:string;
  let sliderElement:HTMLElement;
  let bannerElement:HTMLElement;

  selectionRetriever((str:string)=>{
    console.log(str);
    content=str});

  const stubbornLoad = (e:any,times:number,gap:number)=>
    new Promise((resolve) => {
        const interval = setInterval(()=>{
          if(e || !times--){
            clearInterval(interval);
            resolve(e)
          }
        },gap)
    })

    const colorChangerTemp = (el:HTMLElement,color:string,time:number)=>{
      const orgColor = el.style.color;
      el.style.color = color;
      setTimeout(() => {
        el.style.color = orgColor;
      }, time);
    }

    const copyHandler = async (e:Event)=>{
      const el = e.currentTarget as HTMLElement;
      const doc = await tryGetDoc();
      await navigator.clipboard.writeText(content as string);
      colorChangerTemp(el,"lime",1300);
    }


    const aiAssistanceHandler = async ()=>{
      if(!isChecked)
      burgerMenuBtn.click();
      await stubbornLoad(requestBtn,5,300);
    }

    const focusRangeHandler = async ()=>{

      injectEventListener("pointerup",e=>{
      if(isChecked 
      && content == "" 
      && e.target !=toolTip
      && !toolTip.contains(e.target as HTMLElement))
        burgerMenuBtn.click();
      })

    }

    const tooltipInit = async ()=>{
      await stubbornLoad(toolTip,30,300);
      injectElement(toolTip);
      const styleElement = document.createElement("style") as any;
      styleElement.innerHTML = await styles;
      injectHeader(styleElement)
      injectEventListener("mouseup",(event)=>{
        
        const e = event as EnhancedEvent & {currentTarget:Document};
        const tooltip = e.currentTarget.querySelector(".tooltip") as HTMLElement;
        let clickedChild:boolean = false;

        const x =  e.currentTarget.getSelection()?.toString().length;
        if(!x){
          // console.log("no selection");
          tooltip.style.visibility = "hidden";
          return;
        }
        tooltip.style.visibility = "visible";
        
        for(let el of tooltip?.children ?? [] as HTMLElement[])
        if( el.children[0] == e.target) clickedChild = true;
        
        if(e.target == tooltip
          || clickedChild )
        return;

        toolTip.style.top = e.clientY + "px";
        toolTip.style.left = e.clientX + "px";
      })
    }
    
    onMount(tooltipInit as unknown as ()=>void);
    onMount(focusRangeHandler);
</script>

<svelte:head>
  <title>{siteTitle}</title>
</svelte:head>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<main class="felx flex-col flex-grow w-full h-full">
  <Banner
  bind:isUploaded
  bind:burgerMenuBtn
  bind:isChecked
  bind:bannerElement/>
  <DropHover bind:hide={isUploaded} />
  <div class="h-[90%] flex">
  <Pdfreader bind:isUploaded/>
  {#if isChecked}
    <Slider
    bind:sliderElement
    bind:content
    bind:requestBtn 
    bind:ErrorAccrued 
    bind:error
    bind:response
    bind:isUploaded
    bind:assistanceMethod
    bind:language/>
  {/if}
  
  </div>
</main>
<div >
  <IframeToolTip bind:styles bind:This={toolTip}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <span on:click={copyHandler} class="rounded-md hover:opacity-50 z-10">
    <svg width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M8 4v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.242a2 2 0 0 0-.602-1.43L16.083 2.57A2 2 0 0 0 14.685 2H10a2 2 0 0 0-2 2Z"/><path d="M16 18v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2"/></g></svg>
  </span>

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  | <span on:click={aiAssistanceHandler} class="rounded-md hover:opacity-50 z-10">
    <ExaMateLogo width="28px" height="28px" />
  </span>
</IframeToolTip>
</div>
{#if ErrorAccrued}
  <ErrorPopup bind:msg={error} />
{/if}