import { useState } from "react";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import InputBox from './components/InputBox';

function App() {
  //variable set
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("bdt");
  const [convertedAmount, setConvertedAmount] = useState(0);

  //api set by hook
  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  //swap set

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  // final result show

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url("https://media.istockphoto.com/id/1250581414/photo/blue-double-exposure-of-money-coins-stacking-with-bar-graph-for-financial-and-investment.jpg?b=1&s=612x612&w=0&k=20&c=GJ8fODec4CpPE2gvkNq7b1dvM899Pnj7ChLXuMXS0P8=")`,
      }}
    >
      
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox 
              label="From"
              amount={amount}
              onAmountChange={(amount)=>setAmount(amount)}
              currencyOptions={options}
              onCurrencyChange={(currency)=> setFrom(currency)}
              selectCurrency={from}

              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"

                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency)=> setTo(currency)}
              selectCurrency={to}
              amountDisable
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
