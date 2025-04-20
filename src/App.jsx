import { useState, useRef, useEffect } from "react";
// import reactLogo from './assets/react.svg'
import viteLogo from "/vite.svg";
import "./App.css";
import useCurrencyData from "./hooks/useCurrencyData.js";

function App() {

  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('inr');
  const currencyData = useCurrencyData(from);
  const optionKeys = Object.keys(currencyData);
  const [amount, setAmount] = useState(0.00);
  
  const cvtdamtref = useRef(0);
  
  
  const [rate, setRate] = useState(0);
  const [convertedAmt, setConvertedAmt] = useState(0.00);
  const exchange = currencyData[to];
  
 useEffect(() => {
  // const exchange = currencyData[to];
  if (typeof exchange === "number") {
    setRate(exchange.toFixed(2));
  }
}, [currencyData, from, to]);

function swapCurrencies(){
  setFrom(to);
  setTo(from);
}


// {(Number.parseFloat() * 0.93).toFixed(2)} 
// function convertedAmount(){
// cvtdamtref.current.innerHTML = (parseFloat(amount) * parseFloat(rate)).toFixed(2);
// }

const handleConvert = () => {
    setConvertedAmt((parseFloat(amount) * parseFloat(rate)).toFixed(2));
  };
 
  return (
    <>
      <div className=" mx-auto flex flex-col items-center py-5 h-screen gap-7.5">
        {/* header */}
        <h1 className="Poppins text-[clamp(1.5rem,5vw,2rem)] font-semibold">
          Currency Converter
        </h1>

        {/* currency box */}
        <div className=" w-[40%] min-w-[320px] h-auto rounded-lg shadow-lg">
          {/* header content */}

          <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-6 rounded-t-lg Poppins">
            <div className="flex gap-2">
              <span className="currency-logo mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                  />
                </svg>
              </span>
              <h2 className="text-2xl font-semibold">Convert Currencies</h2>
            </div>
            <div>
              <p className="text-white/80 text-sm mt-1">
                Get real-time exchange rates
              </p>
            </div>
          </div>

          {/* currency-info */}
          <div className="flex flex-col justify-center">
            <div className="p-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="amount"
                  className="block text-md font-medium text-gray-700 mb-1"
                >
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={e =>{setAmount(e.target.value)}}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter Amount"
                />
              </div>
            </div>

            {/* conversion section */}
            <div className=" p-6 grid grid-cols-[1fr,auto,1fr] gap-2 items-end -mt-7">
              <div className="col-start-1">
                <label
                  htmlFor="from-currency"
                  className="block text-md font-medium text-gray-700 mb-1"
                >
                  From
                </label>

                <select
                  onChange={(e)=> setFrom(e.target.value)}
                  value={from}
                  id="from-currency"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  {optionKeys.map((unit,index) => {
                   return <option className="hover:to-blue-600" key={unit} value={unit}>{unit.toUpperCase()}</option>
                  }
                  )}
                 
                </select>

              </div>

              <div className="flex justify-center mt-6 col-start-2">
                {/* swap feature */}
                <button className="rounded-full h-10 w-10 border border-dashed border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors p-1 hover:scale-105"
                onClick={swapCurrencies}
                >
                  <img
                    width="48"
                    height="48"
                    src="https://img.icons8.com/parakeet-line/48/resize-vertical.png"
                    alt="resize-vertical"
                    className="rotate-90 cursor-pointer hover:scale-105"
                  />
                </button>
              </div>

              <div className="col-start-3">
                <label
                  htmlFor="to-currency"
                  className="block text-md font-medium text-gray-700 mb-1"
                >
                  To
                </label>
                <select
                  id="to-currency"
                  value={to}
                  onChange={e => setTo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                   {optionKeys.map((unit,index) => {
                   return <option className="hover:to-blue-600" key={unit} value={unit}>{unit.toUpperCase()}</option>
                  }
                  )}
                </select>
              </div>
            </div>
           

          {/* Exchange Rate and Result */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Exchange Rate</p>
            <p className="text-lg font-medium">
              1 {from.toUpperCase()} = {rate} {to.toUpperCase()} 
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Converted Amount</p>
            <p className="text-2xl font-bold text-emerald-600">
              {convertedAmt}
            </p>
          </div>
        </div>
      </div>

       {/* Footer */}
      <div className="bg-white pt-4 pb-6 px-6 flex justify-center">
        <button className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          onClick={handleConvert}
        >
          Convert
        </button>
      </div>





          </div>
        </div>
      </div>
    </>
  );
}

export default App;
