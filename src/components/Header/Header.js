import React, { Component } from "react";
import { connect } from "react-redux";
import { HeaderContent, HeaderWrap, CurrencyWrap } from "./styled";
import { Icon } from "semantic-ui-react";
import { userInfoRequest, logout } from "../../actions/auth";
import { selectBtc, selectEth } from "../../actions/currency";
import { withRouter } from "react-router-dom";
import Btc from "../Btc/Btc";
import Eth from "../Eth/Eth";
import { getData, getIsLoading } from "../../reducers/user";

export class Header extends Component {
  componentDidMount() {
    const { selectBtc, selectEth, userInfoRequest } = this.props;
    userInfoRequest();
    if (this.props.match.params.cur === "eth") {
      selectEth();
    } else {
      selectBtc();
    }
  }
  componentWillReceiveProps(nextProps) {
    const { selectBtc, selectEth } = this.props;
    if (
      this.props.match.params.cur &&
      this.props.match.params.cur !== nextProps.match.params.cur
    ) {
      if (nextProps.match.params.cur === "eth") {
        selectEth();
      } else {
        selectBtc();
      }
    }
  }
  handleClick = () => {
    const { logout } = this.props;
    logout();
    console.log("logout");
  };

  render() {
    const { currentBtc, currentEth, data } = this.props;
    const { cur } = this.props.match.params;
    return (
      <HeaderContent>
        <HeaderWrap>
          <img
            width="170"
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIxMTcgMzA1IDQ2NiAxOTMuNjY3IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDExNyAzMDUgNDY2IDE5My42Njc7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIHN0eWxlPSJmaWxsOiM2MURBRkI7IiBkPSJNMjMyLjYxNywzNjIuMDYzbDQyLjI2LTI2LjY0N3Y4NC43MjhjMCwwLTEuMjQ5LDM3Ljg4OC0zNy40NzIsMzcuODg4DQoJYy0zOC41ODIsMC0zOS41NTMtMzguMzA0LTM5LjU1My0zOC4zMDR2LTE4LjMxOWgxNy42MjZoOC4wNDlsLTYuMzg0LDE2LjUxNWgxNC41NzJsLTQuODU3LDI0LjAxbDI5LjgzOS0zNS4yNTFoLTE2LjY1NA0KCWwxMC41NDgtMjYuNTA4SDIzMi4yN0wyMzIuNjE3LDM2Mi4wNjN6Ii8+DQo8Zz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTMzNC4xNTQsMzY1LjQzMmg1LjkxNnYxOS44NzljMCwxLjQzNC0wLjI0MywyLjcyMi0wLjcyOSwzLjg2NQ0KCQljLTAuNDg3LDEuMTQ0LTEuMTYxLDIuMTE0LTIuMDIyLDIuOTA5Yy0wLjg2MSwwLjc5NS0xLjg4LDEuNDA0LTMuMDU3LDEuODI0Yy0xLjE3NiwwLjQyMS0yLjQ0OCwwLjYzMi0zLjgxNiwwLjYzMg0KCQljLTEuNDA3LDAtMi42OTgtMC4xNzgtMy44NzYtMC41MzNjLTEuMTc2LTAuMzU1LTIuMTkyLTAuODk3LTMuMDQ3LTEuNjI3Yy0wLjg1NS0wLjcyOS0xLjUyMi0xLjY0OS0yLjAwMS0yLjc2MQ0KCQljLTAuNDgtMS4xMTEtMC43Mi0yLjQyOS0wLjcyLTMuOTU1aDUuOTU2YzAsMC43NzYsMC4wODUsMS40MjcsMC4yNTYsMS45NTJjMC4xNzEsMC41MjcsMC40MTcsMC45NTEsMC43NCwxLjI3Mg0KCQljMC4zMjIsMC4zMjIsMC43MSwwLjU1MywxLjE2MywwLjY5YzAuNDUzLDAuMTM4LDAuOTY0LDAuMjA3LDEuNTI4LDAuMjA3YzEuMTMxLDAsMi4wMzEtMC4zODcsMi43MDItMS4xNjMNCgkJYzAuNjcxLTAuNzc2LDEuMDA2LTEuODgsMS4wMDYtMy4zMTNWMzY1LjQzMnoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTM1NS44NDgsMzg0LjE0OGgtMTEuMTA0di00LjU5NmgxMS4xMDRWMzg0LjE0OHoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTM4Mi40MTMsMzcwLjIyNGgtOC43OTZ2MjMuOTIzSDM2Ny43di0yMy45MjNoLTguNjc3di00Ljc5MmgyMy4zOVYzNzAuMjI0eiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMzk2LjQxNSwzODMuNjM2aC00LjcxNHYxMC41MTJoLTUuOTE3di0yOC43MTVoMTAuNjdjMS42NTcsMCwzLjE0MiwwLjE4Nyw0LjQ1NywwLjU2Mg0KCQljMS4zMTUsMC4zNzQsMi40MjYsMC45MjcsMy4zMzMsMS42NTZjMC45MDgsMC43MywxLjYwNCwxLjYzNCwyLjA5MSwyLjcxMmMwLjQ4NiwxLjA3OCwwLjcyOSwyLjMyOCwwLjcyOSwzLjc0Nw0KCQljMCwxLjA1Mi0wLjExOCwxLjk5NS0wLjM1NSwyLjgzYy0wLjIzNiwwLjgzNS0wLjU3OCwxLjU3OC0xLjAyNSwyLjIyOGMtMC40NDgsMC42NTEtMC45ODcsMS4yMi0xLjYxOCwxLjcwNg0KCQljLTAuNjMxLDAuNDg3LTEuMzQxLDAuOTA4LTIuMTMsMS4yNjNsNi4yMTIsMTEuNzM0djAuMjc2aC02LjM1MUwzOTYuNDE1LDM4My42MzZ6IE0zOTEuNzAyLDM3OC44NDNoNC43NzINCgkJYzAuNzc2LDAsMS40NTYtMC4xMDEsMi4wNDEtMC4zMDZjMC41ODUtMC4yMDMsMS4wNzEtMC40OTMsMS40Ni0wLjg2OGMwLjM4Ny0wLjM3NCwwLjY4LTAuODIxLDAuODc3LTEuMzQxDQoJCWMwLjE5OC0wLjUxOSwwLjI5Ni0xLjEwMSwwLjI5Ni0xLjc0NWMwLTEuMzU0LTAuMzg1LTIuNDE5LTEuMTU0LTMuMTk1cy0xLjk0OS0xLjE2NC0zLjU0LTEuMTY0aC00Ljc1M1YzNzguODQzeiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNNDI3Ljc3NCwzODguMjNINDE3LjRsLTEuOTczLDUuOTE3aC02LjI5bDEwLjY4OS0yOC43MTVoNS40ODJsMTAuNzQ5LDI4LjcxNWgtNi4yOTFMNDI3Ljc3NCwzODguMjMNCgkJeiBNNDE4Ljk5NywzODMuNDM5aDcuMTc5bC0zLjYwOS0xMC43NDlMNDE4Ljk5NywzODMuNDM5eiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNNDM4LjczOCwzOTQuMTQ3di0yOC43MTVoOC44MzVjMS45MzMsMCwzLjcwNSwwLjMzMiw1LjMxNSwwLjk5Ng0KCQljMS42MTEsMC42NjQsMi45OTEsMS41OTcsNC4xNDIsMi44MDFjMS4xNSwxLjIwMywyLjA0OCwyLjY0NiwyLjY5Miw0LjMyOWMwLjY0NCwxLjY4MywwLjk2NiwzLjU1LDAuOTY2LDUuNjAxdjEuMzAyDQoJCWMwLDIuMDUxLTAuMzE5LDMuOTE1LTAuOTU2LDUuNTkxYy0wLjYzOCwxLjY3Ni0xLjUzOSwzLjExNi0yLjcwMiw0LjMxOWMtMS4xNjMsMS4yMDMtMi41NTQsMi4xMzMtNC4xNzEsMi43OTENCgkJYy0xLjYxOCwwLjY1Ny0zLjM5OSwwLjk4Ni01LjM0NSwwLjk4Nkg0MzguNzM4eiBNNDQ0LjY1NSwzNzAuMjI0djE5LjE3aDIuODZjMi4zNCwwLDQuMTIyLTAuNzcyLDUuMzQ1LTIuMzE3DQoJCWMxLjIyMy0xLjU0NSwxLjgzNC0zLjc1LDEuODM0LTYuNjE3di0xLjM0MmMwLTIuOTE5LTAuNjA1LTUuMTMtMS44MTUtNi42MzZjLTEuMjEtMS41MDUtMi45NzgtMi4yNTgtNS4zMDYtMi4yNThINDQ0LjY1NXoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTQ3MS4yNzksMzk0LjE0N2gtNS45MTZ2LTI4LjcxNWg1LjkxNlYzOTQuMTQ3eiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNNTAwLjExMywzOTQuMTQ3aC01LjkxNmwtMTEuNTE4LTE4Ljg5NHYxOC44OTRoLTUuOTE3di0yOC43MTVoNS45MTdsMTEuNTM3LDE4LjkzM3YtMTguOTMzaDUuODk2DQoJCVYzOTQuMTQ3eiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNNTI4LDM5MC41MTljLTAuMzQyLDAuNDA3LTAuODA4LDAuODQ1LTEuNCwxLjMxMWMtMC41OTIsMC40NjYtMS4zMzQsMC45LTIuMjI5LDEuMzAyDQoJCWMtMC44OTQsMC40MDEtMS45NDksMC43MzctMy4xNjUsMS4wMDVjLTEuMjE2LDAuMjY5LTIuNjE0LDAuNDA1LTQuMTkxLDAuNDA1Yy0xLjg1NCwwLTMuNTQ3LTAuMzA2LTUuMDc4LTAuOTE3DQoJCWMtMS41MzItMC42MTEtMi44NDMtMS41MDktMy45MzUtMi42OTNjLTEuMDkxLTEuMTgzLTEuOTM1LTIuNjM2LTIuNTM0LTQuMzU5Yy0wLjU5OC0xLjcyMi0wLjg5OC0zLjY5NC0wLjg5OC01LjkxNnYtMS42OTcNCgkJYzAtMi4yMjEsMC4yODYtNC4xOTcsMC44NTgtNS45MjZjMC41NzItMS43MjksMS4zODEtMy4xODUsMi40MjYtNC4zNjhzMi4zMTEtMi4wODQsMy43OTctMi43MDINCgkJYzEuNDg2LTAuNjE4LDMuMTM2LTAuOTI3LDQuOTUxLTAuOTI3YzEuODY3LDAsMy40ODEsMC4yMzQsNC44NDEsMC43YzEuMzYxLDAuNDY3LDIuNDk5LDEuMTIxLDMuNDEyLDEuOTYyDQoJCWMwLjkxNCwwLjg0MSwxLjYyOCwxLjg0NywyLjE0LDMuMDE3YzAuNTEzLDEuMTcsMC44NDgsMi40NTIsMS4wMDYsMy44NDVoLTUuNzU5Yy0wLjExOC0wLjcyMy0wLjMwMy0xLjM3Ny0wLjU1Mi0xLjk2Mg0KCQljLTAuMjUtMC41ODUtMC41OTItMS4wODUtMS4wMjYtMS40OTljLTAuNDM0LTAuNDE0LTAuOTctMC43MzMtMS42MDctMC45NTdjLTAuNjM3LTAuMjIzLTEuMzk3LTAuMzM1LTIuMjc3LTAuMzM1DQoJCWMtMi4wMjYsMC0zLjU2MywwLjc2Ni00LjYxNSwyLjI5N2MtMS4wNTIsMS41MzItMS41NzgsMy44MDQtMS41NzgsNi44MTR2MS43MzZjMCwzLjAxLDAuNTcxLDUuMjg1LDEuNzE2LDYuODI0DQoJCWMxLjE0NCwxLjUzOCwyLjgyLDIuMzA3LDUuMDI5LDIuMzA3YzAuNzEsMCwxLjMyOC0wLjA0NiwxLjg1NC0wLjEzOGMwLjUyNi0wLjA5MiwwLjk3Ny0wLjIwNywxLjM1MS0wLjM0Ng0KCQljMC4zNzQtMC4xMzgsMC42ODctMC4yODksMC45MzctMC40NTNzMC40NTQtMC4zMjUsMC42MTEtMC40ODN2LTQuOTUxaC01LjM4NHYtNC4zNThINTI4VjM5MC41MTl6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zMzIuODUyLDQzNy41ODdsOC4yMDQtMjMuNjg2aDQuMTQybC0xMC42NSwyOC43MTVoLTMuMzUyTDMyMC41NjUsNDEzLjloNC4xMjJMMzMyLjg1Miw0MzcuNTg3eiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMzUzLjEwNyw0NDIuNjE1aC0zLjc4N1Y0MTMuOWgzLjc4N1Y0NDIuNjE1eiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMzc2LjI2LDQyOS4zNDJoLTEyLjQ0NXYxMC4xNzdoMTQuNDU3djMuMDk2aC0xOC4yNDNWNDEzLjloMTguMDQ1djMuMTE1aC0xNC4yNTl2OS4yM2gxMi40NDUNCgkJVjQyOS4zNDJ6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zODkuMTc3LDQzMy41NjNsMC41NTIsMy43ODZsMC44MDgtMy40MTJsNS42OC0yMC4wMzdoMy4xOTVsNS41NDIsMjAuMDM3bDAuNzg5LDMuNDcxbDAuNjExLTMuODY2DQoJCWw0LjQ1Ny0xOS42NDNoMy44MDdsLTYuOTYyLDI4LjcxNWgtMy40NTFsLTUuOTE3LTIwLjkyNWwtMC40NTMtMi4xODlsLTAuNDUzLDIuMTg5bC02LjEzMywyMC45MjVoLTMuNDUybC02Ljk0Mi0yOC43MTVoMy43ODYNCgkJTDM4OS4xNzcsNDMzLjU2M3oiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTQzNC4xMjQsNDM1LjM1OGMwLTAuNjcxLTAuMTAyLTEuMjYyLTAuMzA2LTEuNzc1Yy0wLjIwNC0wLjUxMy0wLjU2Ni0wLjk4My0xLjA4NC0xLjQxDQoJCWMtMC41Mi0wLjQyNy0xLjIyLTAuODI4LTIuMTAxLTEuMjAzYy0wLjg4MS0wLjM3NC0xLjk5OS0wLjc1OS0zLjM1Mi0xLjE1M2MtMS40Mi0wLjQwOC0yLjcwNi0wLjg3MS0zLjg1Ni0xLjM5MQ0KCQljLTEuMTUtMC41MTgtMi4xMy0xLjExNy0yLjkzOC0xLjc5NGMtMC44MDktMC42NzctMS40My0xLjQ0OS0xLjg2NC0yLjMxN2MtMC40MzQtMC44NjgtMC42NTEtMS44Ni0wLjY1MS0yLjk3OA0KCQljMC0xLjExOCwwLjIzMy0yLjE1MywwLjcwMS0zLjEwNmMwLjQ2Ni0wLjk1MywxLjEyNy0xLjc4MSwxLjk4Mi0yLjQ4NmMwLjg1NS0wLjcwMiwxLjg4LTEuMjUyLDMuMDc2LTEuNjQ2DQoJCWMxLjE5Ny0wLjM5NCwyLjUzMS0wLjU5Miw0LjAwNC0wLjU5MmMxLjYxNywwLDMuMDU3LDAuMjQzLDQuMzE5LDAuNzNjMS4yNjMsMC40ODYsMi4zMjQsMS4xMzEsMy4xODUsMS45MzMNCgkJYzAuODYxLDAuODAyLDEuNTE1LDEuNzI5LDEuOTYyLDIuNzgxYzAuNDQ3LDEuMDUyLDAuNjcxLDIuMTM2LDAuNjcxLDMuMjU0aC0zLjgwN2MwLTAuODAyLTAuMTI4LTEuNTQ1LTAuMzg1LTIuMjI5DQoJCWMtMC4yNTYtMC42ODMtMC42NDgtMS4yNzUtMS4xNzQtMS43NzVjLTAuNTI2LTAuNS0xLjE4My0wLjg4Ny0xLjk3Mi0xLjE2M2MtMC43ODktMC4yNzYtMS43MjMtMC40MTQtMi44MDEtMC40MTQNCgkJYy0xLjAxMywwLTEuODk0LDAuMTE4LTIuNjQzLDAuMzU1Yy0wLjc1LDAuMjM3LTEuMzY4LDAuNTYyLTEuODU0LDAuOTc3Yy0wLjQ4NywwLjQxMy0wLjg0OCwwLjkwNC0xLjA4NSwxLjQ2OQ0KCQljLTAuMjM3LDAuNTY2LTAuMzU1LDEuMTgzLTAuMzU1LDEuODU0YzAsMC42MDUsMC4xMjgsMS4xNTcsMC4zODUsMS42NTdjMC4yNTYsMC41LDAuNjU0LDAuOTYsMS4xOTMsMS4zODENCgkJYzAuNTM5LDAuNDIxLDEuMjMzLDAuODA4LDIuMDgsMS4xNjNjMC44NDgsMC4zNTUsMS44NjQsMC42OTcsMy4wNDgsMS4wMjZjMS42MywwLjQ2LDMuMDM3LDAuOTcsNC4yMiwxLjUyOQ0KCQljMS4xODMsMC41NTgsMi4xNTksMS4xOTMsMi45MjksMS45MDNjMC43NjksMC43MSwxLjM0MSwxLjUwNiwxLjcxNiwyLjM4NmMwLjM3NCwwLjg4MiwwLjU2MSwxLjg4MSwwLjU2MSwyLjk5OA0KCQljMCwxLjE3LTAuMjM2LDIuMjI4LTAuNzEsMy4xNzVjLTAuNDczLDAuOTQ3LTEuMTQ3LDEuNzU1LTIuMDIxLDIuNDI2Yy0wLjg3NCwwLjY3LTEuOTI2LDEuMTg3LTMuMTU1LDEuNTQ4DQoJCWMtMS4yMywwLjM2MS0yLjYwMSwwLjU0My00LjExMiwwLjU0M2MtMC44ODEsMC0xLjc2Mi0wLjA4My0yLjY0My0wLjI0N2MtMC44ODEtMC4xNjQtMS43MjUtMC40MTEtMi41MzQtMC43NA0KCQljLTAuODA5LTAuMzI4LTEuNTU4LTAuNzM2LTIuMjQ5LTEuMjIzYy0wLjY5LTAuNDg2LTEuMjkyLTEuMDUyLTEuODA0LTEuNjk2cy0wLjkxNC0xLjM2OC0xLjIwMy0yLjE3DQoJCWMtMC4yODktMC44MDItMC40MzQtMS42ODMtMC40MzQtMi42NDNoMy44MDdjMCwwLjk4NiwwLjE5MywxLjgzMSwwLjU4MiwyLjUzNGMwLjM4NywwLjcwNCwwLjkwNywxLjI4NiwxLjU1NywxLjc0Ng0KCQljMC42NTEsMC40NiwxLjQsMC43OTgsMi4yNDksMS4wMTZjMC44NDgsMC4yMTcsMS43MzgsMC4zMjUsMi42NzIsMC4zMjVjMS45OTksMCwzLjUzMS0wLjQwNyw0LjU5Ni0xLjIyMw0KCQlDNDMzLjU5MSw0MzcuODc2LDQzNC4xMjQsNDM2Ljc2NCw0MzQuMTI0LDQzNS4zNTh6Ii8+DQo8L2c+DQo8L3N2Zz4NCg==
"
            alt="j-tranding"
          />
          <CurrencyWrap>
            <Btc
              disabled={cur === "btc" || !cur ? true : false}
              price={currentBtc}
              currency="1 BTC"
            />
            <Eth
              disabled={cur === "eth" ? true : false}
              price={currentEth}
              currency="1 ETH"
            />
          </CurrencyWrap>
          <div>
            <span>{data ? data.email : null}</span>
            <span
              style={{ marginLeft: "10px", cursor: "pointer" }}
              onClick={this.handleClick}
            >
              <Icon
                style={{ marginTop: "-2px" }}
                name="user circle outline"
                size="large"
              />
            </span>
          </div>
        </HeaderWrap>
      </HeaderContent>
    );
  }
}
const mapStateToProps = state => ({
  data: getData(state),
  isLoading: getIsLoading(state)
});
const mapDispatchToProps = {
  selectBtc,
  selectEth,
  userInfoRequest,
  logout
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
