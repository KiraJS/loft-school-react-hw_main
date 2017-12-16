import React, { Component } from "react";
import {
  TradingWrap,
  TradeInputWrap,
  TradeInput,
  TradeDesc,
  MainLeft
} from "./styled";
import { Button } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Wallet from "../Wallet/Wallet";
import {
  sellCurrencyRequest,
  buyCurrencyRequest
} from "../../actions/currency";
import "./TradeOperations.css";
class TradeOperations extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      currentInput: "",
      inputFiat: 1,
      inputPurchase: 0,
      inputSell: 0
    };
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.sell !== nextProps.sell &&
      nextProps.sell &&
      this.state.inputFiat === 1
    ) {
      this.setState({ inputSell: nextProps.sell });
    }
    if (
      this.props.purchase !== nextProps.purchase &&
      nextProps.purchase &&
      this.state.inputFiat === 1
    ) {
      this.setState({ inputPurchase: nextProps.purchase });
    }
    if (
      this.props.match.params.cur &&
      this.props.match.params.cur !== nextProps.match.params.cur
    ) {
      this.setState({ inputSell: nextProps.sell });
      this.setState({ inputPurchase: nextProps.purchase });
    }
  }
  renderButtonSell = () => {
    return (
      <Button
        onClick={this.handleBuy}
        className="button"
        content="Купить"
        primary
      />
    );
  };
  renderButtonPurchase = () => {
    return (
      <Button
        onClick={this.handleSell}
        className="button"
        content="Продать"
        secondary
      />
    );
  };
  handleBlur = () => {
    this.setState({ currentInput: "inputFiat" });
  };

  handleFocus = event => {
    this.setState({ currentInput: event.target.name });
  };
  handleChange = event => {
    const { name, value } = event.target;
    const { sell, purchase } = this.props;

    this.setState(state => ({ [name]: value }));
    if (isNaN(event.target.value) || event.target.value === "") return;
    else this.changeInputs(event.target.name, sell, purchase);
  };
  changeInputs(name, sell, purchase) {
    switch (name) {
      case "inputFiat": {
        this.setState(({ inputFiat }) => {
          const parsed = isNaN(inputFiat) ? 0 : parseFloat(inputFiat);
          return {
            inputSell: parsed * sell,
            inputPurchase: parsed * purchase
          };
        });
        break;
      }
      case "inputSell":
        this.setState(({ inputSell }) => {
          const parsedSell = isNaN(inputSell) ? 0 : parseFloat(inputSell);
          const nextFiat = parsedSell / sell;
          return {
            inputFiat: nextFiat,
            inputPurchase: nextFiat * purchase
          };
        });
        break;
      case "inputPurchase":
        this.setState(({ inputPurchase }) => {
          const parsedPurchase = isNaN(inputPurchase)
            ? 0
            : parseFloat(inputPurchase);
          const nextFiat = parsedPurchase / purchase;
          return {
            inputFiat: nextFiat,
            inputSell: nextFiat * sell
          };
        });
        break;
      default:
        break;
    }
  }
  handleSell = event => {
    const { currency } = this.props;
    const { inputFiat } = this.state;
    this.props.sellCurrencyRequest({ currency, value: inputFiat });
  };

  handleBuy = event => {
    const { currency } = this.props;
    const { inputFiat } = this.state;
    this.props.buyCurrencyRequest({ currency, value: inputFiat });
  };
  render() {
    const { inputFiat, inputPurchase, inputSell } = this.state;
    return (
      <MainLeft>
        <h2>Ваш счет</h2>
        <Wallet />
        <TradingWrap>
          <h2>Покупка/продажа</h2>
          <div>
            <TradeInputWrap>
              <TradeInput
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                name="inputFiat"
                value={inputFiat}
              />
              <TradeDesc>{this.props.currency}</TradeDesc>
            </TradeInputWrap>
          </div>
          <div>
            <TradeInputWrap>
              <TradeInput
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                name="inputPurchase"
                value={inputPurchase}
              />
              <TradeDesc>$ </TradeDesc>
            </TradeInputWrap>
            {this.renderButtonPurchase()}
          </div>
          <div>
            <TradeInputWrap>
              <TradeInput
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                name="inputSell"
                value={inputSell}
              />
              <TradeDesc>$ </TradeDesc>
            </TradeInputWrap>
            {this.renderButtonSell()}
          </div>
        </TradingWrap>
      </MainLeft>
    );
  }
}
const mapDispatchToProps = {
  sellCurrencyRequest,
  buyCurrencyRequest
};
export default withRouter(connect(null, mapDispatchToProps)(TradeOperations));
