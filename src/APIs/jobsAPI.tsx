const myHeaders = new Headers();

myHeaders.append("Content-Type","application/json");

const requestOptions : RequestInit = {
    method : "POST",
    headers : myHeaders
}

// const body : any = JSON.stringify({
//     "offset" : 0,
//     "limit" : 10
// })

export const fetchJobsData = async (offset : number, limit : number): Promise<any> => {
    const requestBody = JSON.stringify({ offset, limit });
    const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        { ...requestOptions, body: requestBody }
    )
    console.log('response - ',response)
    if(!response.ok){
        return "Network error in fetching data";
    }
    return response.json();
};



