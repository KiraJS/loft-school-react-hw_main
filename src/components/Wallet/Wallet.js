import React, { Component } from "react";
import { connect } from "react-redux";
import { getCoins } from "../../reducers/wallet";
import {
  WalletWrap,
  CurrentWallet,
  NameWallet,
  WalletBlock
} from "./styled.js";
import "./Wallet.css";

class Wallet extends Component {
  state = {};
  render() {
    const { coins } = this.props;
    return (
      <div>
        <WalletWrap>
          <CurrentWallet>
            <WalletBlock>{coins.usd}</WalletBlock>
          </CurrentWallet>
          <NameWallet>$</NameWallet>
        </WalletWrap>
        <WalletWrap>
          <CurrentWallet>
            <WalletBlock>{coins.btc}</WalletBlock>
          </CurrentWallet>
          <NameWallet>BTC</NameWallet>
        </WalletWrap>
        <WalletWrap>
          <CurrentWallet>
            <WalletBlock>{coins.eth}</WalletBlock>
          </CurrentWallet>
          <NameWallet>ETH</NameWallet>
        </WalletWrap>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  coins: getCoins(state)
});
export default connect(mapStateToProps, null)(Wallet);
