import React, { useState, useEffect } from "react";
import imagen from "./cryptomonedas.png";
import Form from "./components/Form";
import Spinner from "./components/Spinner";
import Quote from "./components/Quote";
import axios from "axios";

function App() {
  const [currency, saveCurrency] = useState("");
  const [cryptoCurrency, saveCryptoCurrency] = useState("");
  const [loading, saveLoading] = useState(false);
  const [result, saveResult] = useState({});

  useEffect(() => {
    const quoteCryptoCurrency = async () => {
      if (currency === "") return;

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrency}&tsyms=${currency}`;

      const result = await axios.get(url);

      saveLoading(true);
      setTimeout(() => {
        saveLoading(false);
        saveResult(result.data.DISPLAY[cryptoCurrency][currency]);
      }, 3000);
    };
    quoteCryptoCurrency();
  }, [currency, cryptoCurrency]);

  const component = loading ? <Spinner /> : <Quote result={result} />;

  return (
    <div className="container">
      <div className="row">
        <div className="one-half column">
          <img src={imagen} className="logotipo" alt="" />
        </div>
        <div className="one-half column">
          <h1>Quotes Cryptocurrencies Instantly</h1>
          <Form
            saveCurrency={saveCurrency}
            saveCryptoCurrency={saveCryptoCurrency}
          />
          {component}
        </div>
      </div>
    </div>
  );
}

export default App;
