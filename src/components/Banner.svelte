<script lang="ts">
    import upload from "/upload.svg";
    import {openFileButton,HasFile} from "../lib/handlePdf";
    import ExaMateLogo from "/ExaMateLogo.svg";
    import { slide } from "svelte/transition";
    export let isChecked:boolean = false;
    export let burgerMenuBtn:HTMLInputElement;
    export let isUploaded:boolean = false;
    export let bannerElement:HTMLElement;

    const stubbornLoad = (fn:()=>Promise<boolean>,gap:number)=>{
      openFileButton();
      let interval = setInterval( async ()=>{
        if(await fn()){
          isUploaded= true;
          clearInterval(interval);
        }
      },gap)
    }
</script>

<div
    bind:this={bannerElement}
    class="bg-black flex flex-row justify-between
            p-3 h-[10%]"
>
    <div class="flex flex-row items-center">
        <div class="p-1 pr-6 border-solid border-[#a43da1] border-r-2 w-[30%]">
            <img src={ExaMateLogo} alt="Logo" />
        </div>
        <label class="ml-6 text-3xl text-[#53c4aa]" for="logo">ExaMate</label>
    </div>
    <div class="flex items-center">

        {#if isChecked}
            <button
            on:click={()=>stubbornLoad(HasFile,1000)}
            transition:slide={{axis:"x"}}
            class="p-3 rounded-2xl mr-10  hidden items-center justify-center
                   text-xl text-white border-solid border-2 border-white 
                 hover:bg-cyan-400 hover:bg-opacity-20 sm:flex"
            >
            <img src={upload} class="mr-3" width="24" height="24" alt="uploadImg">
              Upload</button>
        {/if}
        <label class="burger" for="burger">
            <input type="checkbox" id="burger" bind:this={burgerMenuBtn} on:click={()=>isChecked = !isChecked}>
            <span></span>
            <span></span>
            <span></span>
          </label>
    </div>
</div>
<style>
    .burger {
        margin-right: 50px;
  position: relative;
  width: 40px;
  height: 30px;
  background: transparent;
  cursor: pointer;
  display: block;
}

.burger input {
  display: none;
}

.burger span {
  display: block;
  position: absolute;
  height: 4px;
  width: 100%;
  background: white;
  border-radius: 9px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: .25s ease-in-out;
}

.burger span:nth-of-type(1) {
  top: 0px;
  transform-origin: left center;
}

.burger span:nth-of-type(2) {
  top: 50%;
  transform: translateY(-50%);
  transform-origin: left center;
}

.burger span:nth-of-type(3) {
  top: 100%;
  transform-origin: left center;
  transform: translateY(-100%);
}

.burger input:checked ~ span:nth-of-type(1) {
  transform: rotate(45deg);
  top: 0px;
  left: 5px;
}

.burger input:checked ~ span:nth-of-type(2) {
  width: 0%;
  opacity: 0;
}

.burger input:checked ~ span:nth-of-type(3) {
  transform: rotate(-45deg);
  top: 28px;
  left: 5px;
}
</style>