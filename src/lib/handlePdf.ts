let innerDoc: HTMLDoc | undefined = undefined;
export async function tryGetDoc(){
    if(innerDoc)
    return innerDoc;
    const p:Promise<Document> = new Promise((resolve,rejection)=>{
        const interval = setInterval(()=>{
            const x : HTMLDoc = document.querySelector("iframe")?.contentDocument;
            if(!x) return;
            clearInterval(interval);
            resolve(x);
        },500)
    })
    innerDoc = await p;
    return innerDoc as Document;
}

export async function injectEventListener(e:Events,func:(e:EnhancedEvent)=>void){
    const doc = await tryGetDoc();
    doc?.addEventListener(e,func as ()=>void);
}

export async function injectElement(e:HTMLElement){
    const doc = await tryGetDoc();
    doc?.body?.appendChild(e);
}

export async function injectHeader(e:HTMLElement){
    const doc = await tryGetDoc();
    doc?.head?.appendChild(e);
}

export async function HasFile(){
    const doc = await tryGetDoc();
    const pagesContainer = doc?.querySelector("#viewer");
    if(pagesContainer?.children.length)
        return true;
    return false;
}

export async function openFileButton(){
    const doc = await tryGetDoc();
    const openFileBtn = doc?.querySelector("#openFile") as HTMLButtonElement | null | undefined;
    openFileBtn?.click();
}
export async function selectionRetriever(fn:any) {
    const doc = await tryGetDoc() as Document;
    const viewer = doc?.querySelector("#viewer");
    let x:string = "";
    viewer?.addEventListener("mouseup",async ()=>{
        x = doc?.getSelection()?.toString() ?? "";
        fn(x);
    })
}

// type Sel = Prettify<Selection>;

// type Prettify<T> = {
//     [K in keyof T]: T[K];
// } & {};