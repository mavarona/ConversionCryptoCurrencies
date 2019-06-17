import React from "react";
import PropTypes from "prop-types";

const Cryptocurrency = ({ cryptocurrency }) => {
  const { FullName, Name } = cryptocurrency.CoinInfo;
  return <option value={Name}> {FullName} </option>;
};

Cryptocurrency.propTypes = {
  cryptocurrency: PropTypes.object.isRequired
};

export default Cryptocurrency;
