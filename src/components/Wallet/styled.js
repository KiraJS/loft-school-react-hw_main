import styled from "styled-components";
export const WalletWrap = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  width: 298px;
`;
export const CurrentWallet = styled.div`
  background-color: #414244;
  text-align: center;
  border: 1px solid #000;
  color: #ffffff;
  border-radius: 4px;
  padding: 6px 0;
  -webkit-flex: 1 1 150px;
  -ms-flex: 1 1 150px;
  flex: 1 1 150px;
  margin: 5px 0;
`;
export const NameWallet = styled.p`
  -webkit-flex: 1 1;
  -ms-flex: 1 1;
  flex: 1 1;
  text-align: left;
  margin: 15px 0 0 15px;
`;
export const WalletBlock = styled.span`
  width: 55%;
  display: inline-block;
  text-align: right;
`;
export const WalletSubBlock = styled.span`
  color: #8a8a8a;
  max-width: 78px;
  display: inline-block;
  vertical-align: bottom;
  text-overflow: ellipsis;
  overflow: hidden;
`;
