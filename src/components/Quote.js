import React from "react";
import PropTypes from "prop-types";

const Quote = ({ result }) => {
  if (Object.keys(result).length === 0) return null;
  return (
    <div className="resultado">
      <h2>Result</h2>
      <p className="precio">
        The price is <span>{result.PRICE}</span>{" "}
      </p>

      <p>
        Highest price of the day: <span>{result.HIGHDAY}</span>{" "}
      </p>
      <p>
        Lowest price of the day: <span>{result.LOWDAY}</span>{" "}
      </p>
      <p>
        Variation last 24 hours: <span>{result.CHANGEPCT24HOUR}%</span>{" "}
      </p>
      <p>
        Last update: <span>{result.LASTUPDATE}</span>{" "}
      </p>
    </div>
  );
};

Quote.propTypes = {
  result: PropTypes.object.isRequired
};

export default Quote;
