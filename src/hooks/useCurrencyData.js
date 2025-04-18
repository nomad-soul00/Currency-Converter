import {useEffect,useState} from "react";

function useCurrencyData(currency){
    const [data, setData] = useState({});

    useEffect(()=>{
        if(!currency) return;

        console.log("Data fetched");
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
        .then((res) =>res.json())
        .then((res) => setData(res[currency]))
        .catch((err)=> console.log("Cant reach Api"))
    },[currency]);

    return data;
}

export default useCurrencyData;


// import { useEffect, useState } from "react";

// function useCurrencyInfo(currency) {
//   const [data, setData] = useState({});

//   useEffect(() => {
//     if (!currency) return;

//     fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
//       .then((res) => res.json())
//       .then((res) => setData(res[currency]))
//       .catch((err) => console.error("Error fetching currency:", err));
//   }, [currency]);

//   return data;
// }

// export default useCurrencyInfo;
