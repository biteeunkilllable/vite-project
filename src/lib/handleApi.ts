export default async (endpoint:string,language:string,content:string)=>{
    if(!endpoint.length
      ||!language.length
      ||!content.length)
        throw new Error("please Select actual Data")
    const obj = {
        method:"POST",
        body:{
            text:content,
            language,
        }
    }
    // const response = await fetch("www.example/"+endpoint,obj as ResponseInit)
    // const result =  await response.json();
    // ! for testing Only
    const result = {
        endpoint,
        content,
        language,
    };
    return result;
};