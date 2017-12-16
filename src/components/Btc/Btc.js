import React from "react";
import { withState, compose, pure, lifecycle } from "recompose";
import { Link } from "react-router-dom";
import "../MainPage/MainPage.css";
import { CurrencyLink } from "./styled";

const Btc = ({ disabled, price, currency, cur }) => (
  <div>
    {!disabled ? (
      <Link className="toggle-cur" to="/trade/btc">
        <CurrencyLink>
          {cur}
          <b>1 BTC</b>
        </CurrencyLink>
      </Link>
    ) : (
      <CurrencyLink>
        {cur}
        <b>1 BTC</b>
      </CurrencyLink>
    )}
  </div>
);
const enhance = compose(
  withState("cur", "setCurrency", "00.00"),
  lifecycle({
    componentWillReceiveProps(nexpProps) {
      if (this.props.price !== nexpProps.price && nexpProps.price) {
        this.props.setCurrency(nexpProps.price);
      }
    }
  }),
  pure
);
export default enhance(Btc);
