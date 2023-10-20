export const siteTitle:string = "ExaMate";
export const stringReturnMethods:string[]=[
    "translate",
    "explain",
    "summarize"
];
export const lstReturnMethods:string[]=[
    "highlight",
];
export const aiAssistanceMethods = [
    ...stringReturnMethods,
    ...lstReturnMethods,
];
const baseRoute = prompt("insert the base url (testing purposes only!)");

export const Languages = [
    "English",
    "Spanish",
    "Mandarin",
    "Hindi",
    "Arabic",
    "Bengali",
    "Portuguese",
    "Russian",
    "Japanese",
    "German",
    "Javanese",
    "Wu Chinese",
    "Telugu",
    "Marathi",
    "Turkish",
    "Tamil",
    "French",
    "Urdu",
    "Korean",
    "Italian",
    "Punjabi",
    "Hausa",
    "Thai",
    "Gujarati",
    "Kannada",
    "Oriya",
    "Malayalam",
    "Sundanese",
    "Polish",
    "Burmese",
    "Ukrainian",
    "Bhojpuri",
    "Tagalog",
    "Yoruba",
    "Maithili",
    "Uzbek",
    "Sindhi",
    "Amharic",
    "Fula",
    "Romanian",
    "Oromo",
    "Igbo",
    "Azerbaijani",
    "Awadhi",
    "Gan Chinese",
    "Cebuano",
    "Dutch",
    "Kurdish",
    "Serbo-Croatian",
    "Malagasy",
    "Saraiki",
    "Nepali",
    "Sinhalese",
    "Chittagonian",
    "Zhuang",
    "Khmer",
    "Turkmen",
    "Assamese",
    "Madurese",
    "Somali",
    "Marwari",
    "Magahi",
    "Haryanvi",
    "Hungarian",
    "Chhattisgarhi",
    "Greek",
    "Chewa",
    "Deccan",
    "Akan",
    "Kazakh",
    "Azerbaijani",
    "Sylheti",
    "Zulu",
    "Czech",
    "Kinyarwanda",
    "Dhundhari",
    "Haitian Creole",
    "Eastern Min",
    "Ilocano",
    "Quechua",
    "Kirundi",
    "Swedish",
    "Hmong",
    "Shona",
    "Uyghur",
    "Hiligaynon",
    "Mossi",
    "Xhosa",
    "Belarusian",
    "Balochi",
    "Konkani",
    "Yoruba",
];


async function requestTemplate(endpoint:string,lang:string,text:string){
    let bodyContent = new FormData();
    bodyContent.append("lang", lang);
    bodyContent.append("text", text);
    
    let response = await fetch(baseRoute+endpoint, { 
        method: "POST",
        body: bodyContent,
    });
    return await response.text();
}

function highlightText(content:string,highlighted:string[]) {
    let str = content
    
    for( let i of highlighted)
        str.replace(i,`<mark>${i}</mark>`)
    return str;
    // return "<mark>Hola Mundo</mark>";
}

export default async (endpoint:string,language:string,content:string)=>{
    if( endpoint == "Select"
      ||language == "Select"
      ||!content.length)
        throw new Error("please Select actual Data")
        const data = await requestTemplate(endpoint,language,content);
        if(data[0] == "[")
            return highlightText(content,JSON.parse(data))
        else
            return data;
};