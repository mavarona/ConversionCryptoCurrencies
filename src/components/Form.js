import React, { useState, useEffect } from "react";
import Cryptocurrency from "./Cryptocurrency";
import Error from "./Error";
import axios from "axios";
import PropTypes from "prop-types";

const Form = ({ saveCurrency, saveCryptoCurrency }) => {
  const [cryptoCurrencies, saveCryptoCurrencies] = useState([]);
  const [quoteCurrency, saveQuoteCurrency] = useState("");
  const [quoteCrypto, saveQuoteCrypto] = useState("");
  const [error, saveError] = useState(false);
  useEffect(() => {
    const searchCryptoAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const result = await axios.get(url);
      saveCryptoCurrencies(result.data.Data);
    };
    searchCryptoAPI();
  }, []);

  const quoteCurrencySubmit = e => {
    e.preventDefault();
    if (quoteCurrency === "" || quoteCrypto === "") {
      saveError(true);
      return;
    }
    saveError(false);
    saveCurrency(quoteCurrency);
    saveCryptoCurrency(quoteCrypto);
  };

  const component = error ? <Error message="All fields are required" /> : null;

  return (
    <form onSubmit={quoteCurrencySubmit}>
      {component}
      <div className="row">
        <label>Choose the Currency</label>
        <select
          className="u-full-width"
          onChange={e => saveQuoteCurrency(e.target.value)}
        >
          <option value="">- Select the Currency</option>
          <option value="USD">- Dolar</option>
          <option value="MXN">- Peso Mx</option>
          <option value="GBP">- Pound</option>
          <option value="EUR">- Euro</option>
        </select>
      </div>
      <div className="row">
        <label>Choose the CryptoCurrency</label>
        <select
          className="u-full-width"
          onChange={e => saveQuoteCrypto(e.target.value)}
        >
          <option value="">- Select the Cryptocurrency</option>
          {cryptoCurrencies.map(cryptocurrency => (
            <Cryptocurrency
              key={cryptocurrency.CoinInfo.Id}
              cryptocurrency={cryptocurrency}
            />
          ))}
        </select>
      </div>
      <input
        type="submit"
        className="button-primary u-full-width"
        value="Calculate"
      />
    </form>
  );
};

Form.propTypes = {
  saveCurrency: PropTypes.func.isRequired,
  saveCryptoCurrency: PropTypes.func.isRequired
};

export default Form;
