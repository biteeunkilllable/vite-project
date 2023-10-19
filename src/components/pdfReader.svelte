<script lang="ts">
  import {injectEventListener,HasFile} from '../lib/handlePdf';
  export let isUploaded = false;

  const stubbornLoad = (times:number,gap:number)=>{
      let interval = setInterval( async ()=>{
        if(await HasFile() || times--){
          isUploaded= await HasFile();
          clearInterval(interval);
        }
      },gap)
    }

  injectEventListener("drop",async ()=>stubbornLoad(5,1000));
</script>
<div class="w-full h-full {isUploaded ? "opacity-100" : "opacity-0"}">
  <div class="absolute w-full h-9 {isUploaded ? "hidden" : "block"} "></div>
  <iframe title="pdfView" src="/vscode-pdfviewer/web/viewer.html" width="100%" height="100%" frameborder="0"></iframe>
</div>