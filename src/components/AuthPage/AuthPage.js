import React, { Component } from "react";
import {
  Wrap,
  FormWrap,
  AuthWrap,
  Form,
  BottomWrap,
  FormContent,
  InputWrap
} from "./styled";
import { Icon, Input } from "semantic-ui-react";
import Particles from "react-particles-js";
import ParticlesParams from "../../particles-params";
import { connect } from "react-redux";

import { authLoginRequest, authRegistrationRequest } from "../../actions/auth";
import {
  getIsAuthorized,
  getLoginError,
  getRegistrationError
} from "../../reducers/auth";

import "./AuthPage.css";

export class AuthPage extends Component {
  state = {
    email: "",
    password: "",
    isLogin: true,
    error: null
  };

  switchForm = () => {
    this.setState({ isLogin: !this.state.isLogin });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    const { isLogin, email, password } = this.state;
    const { authLoginRequest, authRegistrationRequest } = this.props;
    if (isLogin) {
      authLoginRequest({ email, password });
    } else {
      authRegistrationRequest({ email, password });
    }
  };
  render() {
    const { isLogin } = this.state;
    const { loginError, registationError } = this.props;
    return (
      <Wrap>
        <FormWrap>
          <AuthWrap>
            <img
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIxMTcgMzA1IDQ2NiAyMjMiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMTE3IDMwNSA0NjYgMjIzOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Y2lyY2xlIHN0eWxlPSJmaWxsOiMyOTI5Mjk7IiBjeD0iMjMwLjY4NiIgY3k9IjQyMC4zNTMiIHI9IjcwLjAyIi8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTIyNS44MjMsNDAyLjExMWwyMy4yNTQtMTQuNjYzdjQ2LjYyM2MwLDAtMC42ODcsMjAuODQ5LTIwLjYxOSwyMC44NDkNCgljLTIxLjIzLDAtMjEuNzY1LTIxLjA3OC0yMS43NjUtMjEuMDc4di0xMC4wODFoOS42OTloNC40MjlsLTMuNTEzLDkuMDg4aDguMDE5bC0yLjY3MywxMy4yMTJsMTYuNDE5LTE5LjM5OGgtOS4xNjRsNS44MDQtMTQuNTg2DQoJaC0xMC4wODFMMjI1LjgyMyw0MDIuMTExeiIvPg0KPGc+DQoJPHBhdGggZD0iTTM0Ni41OTEsMzgyLjIzOGg2LjIxOHYyMC44OTRjMCwxLjUwNy0wLjI1NiwyLjg2LTAuNzY3LDQuMDYzYy0wLjUxMiwxLjIwMi0xLjIyLDIuMjIyLTIuMTI1LDMuMDU4DQoJCXMtMS45NzYsMS40NzYtMy4yMTMsMS45MTdjLTEuMjM2LDAuNDQyLTIuNTczLDAuNjY0LTQuMDExLDAuNjY0Yy0xLjQ3OSwwLTIuODM2LTAuMTg4LTQuMDczLTAuNTYxDQoJCWMtMS4yMzYtMC4zNzMtMi4zMDQtMC45NDItMy4yMDItMS43MWMtMC44OTgtMC43NjctMS42LTEuNzMzLTIuMTA0LTIuOTAxYy0wLjUwNS0xLjE2OC0wLjc1Ny0yLjU1My0wLjc1Ny00LjE1Nmg2LjI2DQoJCWMwLDAuODE1LDAuMDksMS41LDAuMjcsMi4wNTJjMC4xOCwwLjU1NCwwLjQzOCwwLjk5OSwwLjc3NywxLjMzN2MwLjMzOSwwLjMzOSwwLjc0NiwwLjU4MSwxLjIyMywwLjcyNg0KCQljMC40NzcsMC4xNDYsMS4wMTMsMC4yMTgsMS42MDYsMC4yMThjMS4xODgsMCwyLjEzNS0wLjQwNywyLjg0LTEuMjIzczEuMDU4LTEuOTc2LDEuMDU4LTMuNDgyVjM4Mi4yMzh6Ii8+DQoJPHBhdGggZD0iTTM2OS4zOTIsNDAxLjkwOWgtMTEuNjd2LTQuODNoMTEuNjdWNDAxLjkwOXoiLz4NCgk8cGF0aCBkPSJNMzk3LjMxMiwzODcuMjc1aC05LjI0NHYyNS4xNDNoLTYuMjE5di0yNS4xNDNoLTkuMTJ2LTUuMDM3aDI0LjU4M1YzODcuMjc1eiIvPg0KCTxwYXRoIGQ9Ik00MTIuMDI4LDQwMS4zN2gtNC45NTR2MTEuMDQ4aC02LjIxOXYtMzAuMThoMTEuMjE0YzEuNzQxLDAsMy4zMDMsMC4xOTcsNC42ODUsMC41OTFjMS4zODIsMC4zOTQsMi41NSwwLjk3NCwzLjUwMywxLjc0MQ0KCQljMC45NTQsMC43NjcsMS42ODYsMS43MTcsMi4xOTcsMi44NWMwLjUxMSwxLjEzMywwLjc2NywyLjQ0NiwwLjc2NywzLjkzOGMwLDEuMTA2LTAuMTI0LDIuMDk3LTAuMzczLDIuOTc1DQoJCWMtMC4yNDgsMC44NzgtMC42MDcsMS42NTgtMS4wNzcsMi4zNDJjLTAuNDcxLDAuNjg1LTEuMDM3LDEuMjgyLTEuNywxLjc5M2MtMC42NjMsMC41MTItMS40MDksMC45NTQtMi4yMzgsMS4zMjdsNi41MjksMTIuMzMzDQoJCXYwLjI5aC02LjY3NUw0MTIuMDI4LDQwMS4zN3ogTTQwNy4wNzQsMzk2LjMzM2g1LjAxNmMwLjgxNSwwLDEuNTMtMC4xMDYsMi4xNDYtMC4zMjFjMC42MTUtMC4yMTQsMS4xMjYtMC41MTksMS41MzQtMC45MTINCgkJYzAuNDA3LTAuMzk0LDAuNzE1LTAuODYzLDAuOTIyLTEuNDA5YzAuMjA4LTAuNTQ2LDAuMzEyLTEuMTU3LDAuMzEyLTEuODM0YzAtMS40MjMtMC40MDQtMi41NDItMS4yMTMtMy4zNTgNCgkJcy0yLjA0OS0xLjIyMy0zLjcyMS0xLjIyM2gtNC45OTVWMzk2LjMzM3oiLz4NCgk8cGF0aCBkPSJNNDQ0Ljk4Niw0MDYuMTk5aC0xMC45MDNsLTIuMDczLDYuMjE5aC02LjYxMWwxMS4yMzQtMzAuMThoNS43NjJsMTEuMjk3LDMwLjE4aC02LjYxMkw0NDQuOTg2LDQwNi4xOTl6IE00MzUuNzYyLDQwMS4xNjMNCgkJaDcuNTQ1bC0zLjc5My0xMS4yOTdMNDM1Ljc2Miw0MDEuMTYzeiIvPg0KCTxwYXRoIGQ9Ik00NTYuNTEsNDEyLjQxOHYtMzAuMThoOS4yODZjMi4wMzEsMCwzLjg5NCwwLjM0OSw1LjU4NiwxLjA0N2MxLjY5MywwLjY5OCwzLjE0NCwxLjY3OSw0LjM1NCwyLjk0Mw0KCQljMS4yMDksMS4yNjQsMi4xNTIsMi43ODEsMi44MjksNC41NDljMC42NzcsMS43NjksMS4wMTYsMy43MzEsMS4wMTYsNS44ODd2MS4zNjhjMCwyLjE1NS0wLjMzNSw0LjExNC0xLjAwNSw1Ljg3Ng0KCQljLTAuNjcxLDEuNzYyLTEuNjE3LDMuMjc1LTIuODQsNC41MzljLTEuMjIzLDEuMjY1LTIuNjg1LDIuMjQyLTQuMzg0LDIuOTM0Yy0xLjcsMC42OS0zLjU3MiwxLjAzNi01LjYxNywxLjAzNkg0NTYuNTF6DQoJCSBNNDYyLjcyOSwzODcuMjc1djIwLjE0OGgzLjAwNmMyLjQ1OSwwLDQuMzMyLTAuODEyLDUuNjE3LTIuNDM2czEuOTI4LTMuOTQxLDEuOTI4LTYuOTU0di0xLjQxYzAtMy4wNjctMC42MzYtNS4zOTItMS45MDctNi45NzUNCgkJYy0xLjI3MS0xLjU4Mi0zLjEzLTIuMzc0LTUuNTc2LTIuMzc0SDQ2Mi43Mjl6Ii8+DQoJPHBhdGggZD0iTTQ5MC43MTEsNDEyLjQxOGgtNi4yMTh2LTMwLjE4aDYuMjE4VjQxMi40MTh6Ii8+DQoJPHBhdGggZD0iTTUyMS4wMTYsNDEyLjQxOGgtNi4yMThsLTEyLjEwNS0xOS44NTd2MTkuODU3aC02LjIxOXYtMzAuMThoNi4yMTlsMTIuMTI2LDE5Ljg5OHYtMTkuODk4aDYuMTk3VjQxMi40MTh6Ii8+DQoJPHBhdGggZD0iTTU1MC4zMjUsNDA4LjYwNGMtMC4zNTksMC40MjgtMC44NSwwLjg4OC0xLjQ3MiwxLjM3OHMtMS40MDIsMC45NDYtMi4zNDMsMS4zNjhjLTAuOTM5LDAuNDIyLTIuMDQ5LDAuNzc0LTMuMzI2LDEuMDU3DQoJCWMtMS4yNzgsMC4yODMtMi43NDcsMC40MjYtNC40MDUsMC40MjZjLTEuOTQ4LDAtMy43MjgtMC4zMjEtNS4zMzctMC45NjRjLTEuNjEtMC42NDMtMi45ODgtMS41ODYtNC4xMzYtMi44Mw0KCQljLTEuMTQ2LTEuMjQzLTIuMDM0LTIuNzcxLTIuNjYzLTQuNTgxYy0wLjYyOS0xLjgxLTAuOTQzLTMuODgzLTAuOTQzLTYuMjE4di0xLjc4M2MwLTIuMzM0LDAuMzAxLTQuNDExLDAuOTAxLTYuMjI4DQoJCWMwLjYwMi0xLjgxNywxLjQ1MS0zLjM0OCwyLjU1LTQuNTkxczIuNDI5LTIuMTksMy45OS0yLjg0czMuMjk2LTAuOTc0LDUuMjAzLTAuOTc0YzEuOTYyLDAsMy42NTgsMC4yNDYsNS4wODgsMC43MzYNCgkJYzEuNDMxLDAuNDkxLDIuNjI2LDEuMTc4LDMuNTg2LDIuMDYzYzAuOTYxLDAuODg0LDEuNzExLDEuOTQxLDIuMjQ5LDMuMTcxYzAuNTM5LDEuMjMsMC44OTIsMi41NzcsMS4wNTgsNC4wNDJoLTYuMDUzDQoJCWMtMC4xMjQtMC43Ni0wLjMxOC0xLjQ0Ny0wLjU4LTIuMDYyYy0wLjI2My0wLjYxNS0wLjYyMi0xLjE0LTEuMDc4LTEuNTc2Yy0wLjQ1Ni0wLjQzNS0xLjAyLTAuNzctMS42ODktMS4wMDUNCgkJYy0wLjY3LTAuMjM0LTEuNDY4LTAuMzUyLTIuMzk0LTAuMzUyYy0yLjEyOSwwLTMuNzQ1LDAuODA1LTQuODUxLDIuNDE1Yy0xLjEwNSwxLjYxLTEuNjU4LDMuOTk4LTEuNjU4LDcuMTYydjEuODI0DQoJCWMwLDMuMTY0LDAuNjAxLDUuNTU1LDEuODA0LDcuMTcyYzEuMjAyLDEuNjE2LDIuOTY0LDIuNDI1LDUuMjg1LDIuNDI1YzAuNzQ2LDAsMS4zOTYtMC4wNDgsMS45NDgtMC4xNDVzMS4wMjYtMC4yMTgsMS40Mi0wLjM2Mw0KCQljMC4zOTQtMC4xNDUsMC43MjItMC4zMDQsMC45ODQtMC40NzdzMC40NzgtMC4zNDIsMC42NDMtMC41MDh2LTUuMjAzaC01LjY1OHYtNC41OGgxMS44NzdWNDA4LjYwNHoiLz4NCgk8cGF0aCBkPSJNMzQ1LjIyMyw0NTguMDczbDguNjIyLTI0Ljg5NWg0LjM1NGwtMTEuMTkzLDMwLjE4aC0zLjUyM2wtMTEuMTczLTMwLjE4aDQuMzMyTDM0NS4yMjMsNDU4LjA3M3oiLz4NCgk8cGF0aCBkPSJNMzY2LjUxMSw0NjMuMzU4aC0zLjk4di0zMC4xOGgzLjk4VjQ2My4zNTh6Ii8+DQoJPHBhdGggZD0iTTM5MC44NDUsNDQ5LjQwOGgtMTMuMDh2MTAuNjk2aDE1LjE5NHYzLjI1NGgtMTkuMTc0di0zMC4xOGgxOC45NjZ2My4yNzRoLTE0Ljk4NnY5LjcwMWgxMy4wOFY0NDkuNDA4eiIvPg0KCTxwYXRoIGQ9Ik00MDQuNDIxLDQ1My44NDVsMC41OCwzLjk3OWwwLjg1LTMuNTg2bDUuOTctMjEuMDZoMy4zNThsNS44MjQsMjEuMDZsMC44MjksMy42NDhsMC42NDMtNC4wNjNsNC42ODUtMjAuNjQ1aDQuMDAxDQoJCWwtNy4zMTcsMzAuMThoLTMuNjI3bC02LjIxOS0yMS45OTJsLTAuNDc3LTIuMzAxbC0wLjQ3NywyLjMwMWwtNi40NDYsMjEuOTkyaC0zLjYyOGwtNy4yOTYtMzAuMThoMy45NzlMNDA0LjQyMSw0NTMuODQ1eiIvPg0KCTxwYXRoIGQ9Ik00NTEuNjYsNDU1LjczYzAtMC43MDUtMC4xMDctMS4zMjYtMC4zMjEtMS44NjVjLTAuMjE1LTAuNTM5LTAuNTk1LTEuMDMzLTEuMTQtMS40ODJjLTAuNTQ3LTAuNDQ4LTEuMjgyLTAuODctMi4yMDgtMS4yNjUNCgkJYy0wLjkyNi0wLjM5NC0yLjEwMS0wLjc5OC0zLjUyMy0xLjIxMmMtMS40OTItMC40MjktMi44NDQtMC45MTUtNC4wNTMtMS40NjJjLTEuMjA5LTAuNTQ1LTIuMjM4LTEuMTc0LTMuMDg4LTEuODg2DQoJCWMtMC44NTEtMC43MTItMS41MDMtMS41MjMtMS45NTktMi40MzZzLTAuNjg1LTEuOTU1LTAuNjg1LTMuMTNzMC4yNDUtMi4yNjMsMC43MzYtMy4yNjVjMC40OS0xLjAwMiwxLjE4NS0xLjg3MiwyLjA4My0yLjYxMg0KCQljMC44OTgtMC43MzgsMS45NzYtMS4zMTUsMy4yMzMtMS43M2MxLjI1OC0wLjQxNCwyLjY2LTAuNjIyLDQuMjA4LTAuNjIyYzEuNjk5LDAsMy4yMTMsMC4yNTYsNC41MzksMC43NjgNCgkJYzEuMzI3LDAuNTExLDIuNDQyLDEuMTg4LDMuMzQ4LDIuMDMxczEuNTkzLDEuODE3LDIuMDYzLDIuOTIzczAuNzA1LDIuMjQ1LDAuNzA1LDMuNDJoLTQuMDAxYzAtMC44NDMtMC4xMzUtMS42MjQtMC40MDQtMi4zNDMNCgkJYy0wLjI3LTAuNzE4LTAuNjgxLTEuMzQtMS4yMzMtMS44NjVzLTEuMjQzLTAuOTMzLTIuMDcyLTEuMjIzcy0xLjgxMS0wLjQzNi0yLjk0My0wLjQzNmMtMS4wNjQsMC0xLjk5LDAuMTI0LTIuNzc3LDAuMzczDQoJCWMtMC43ODgsMC4yNDktMS40MzgsMC41OTEtMS45NDgsMS4wMjZjLTAuNTEyLDAuNDM1LTAuODkyLDAuOTUtMS4xNDEsMS41NDRjLTAuMjQ5LDAuNTk1LTAuMzczLDEuMjQzLTAuMzczLDEuOTQ4DQoJCWMwLDAuNjM2LDAuMTM1LDEuMjE2LDAuNDA0LDEuNzQxczAuNjg4LDEuMDA5LDEuMjU0LDEuNDUxczEuMjk2LDAuODUsMi4xODcsMS4yMjNjMC44OTIsMC4zNzMsMS45NTksMC43MzIsMy4yMDMsMS4wNzgNCgkJYzEuNzEzLDAuNDgzLDMuMTkxLDEuMDIsNC40MzYsMS42MDZjMS4yNDMsMC41ODcsMi4yNywxLjI1NCwzLjA3OCwyczEuNDA5LDEuNTgzLDEuODA0LDIuNTA4YzAuMzk0LDAuOTI3LDAuNTksMS45NzcsMC41OSwzLjE1MQ0KCQljMCwxLjIyOS0wLjI0OCwyLjM0Mi0wLjc0NiwzLjMzN2MtMC40OTcsMC45OTUtMS4yMDUsMS44NDUtMi4xMjQsMi41NWMtMC45MTksMC43MDQtMi4wMjQsMS4yNDctMy4zMTYsMS42MjcNCgkJYy0xLjI5MywwLjM4LTIuNzMzLDAuNTctNC4zMjIsMC41N2MtMC45MjYsMC0xLjg1Mi0wLjA4Ny0yLjc3Ny0wLjI2cy0xLjgxMy0wLjQzMi0yLjY2My0wLjc3Nw0KCQljLTAuODUxLTAuMzQ1LTEuNjM4LTAuNzczLTIuMzYzLTEuMjg1Yy0wLjcyNi0wLjUxMS0xLjM1Ny0xLjEwNS0xLjg5Ni0xLjc4MnMtMC45NjEtMS40MzgtMS4yNjUtMi4yOHMtMC40NTYtMS43NjktMC40NTYtMi43NzcNCgkJaDQuMDAxYzAsMS4wMzYsMC4yMDMsMS45MjUsMC42MTEsMi42NjNjMC40MDcsMC43NCwwLjk1MywxLjM1MiwxLjYzNywxLjgzNWMwLjY4NSwwLjQ4MywxLjQ3MiwwLjgzOSwyLjM2MywxLjA2Nw0KCQljMC44OTIsMC4yMjgsMS44MjcsMC4zNDIsMi44MDksMC4zNDJjMi4xMDEsMCwzLjcxMS0wLjQyOCw0LjgzLTEuMjg1QzQ1MS4xMDEsNDU4LjM3Nyw0NTEuNjYsNDU3LjIwOSw0NTEuNjYsNDU1LjczeiIvPg0KPC9nPg0KPC9zdmc+DQo="
              alt=""
            />
            <Form>
              <FormContent>
                <InputWrap>
                  <Input
                    icon={<Icon name="user" size="large" />}
                    iconPosition="left"
                    placeholder="Email"
                    name="email"
                    size="large"
                    onChange={this.handleChange}
                    value={this.state.email}
                  />
                  {isLogin && loginError ? (
                    <p className="error-block">{loginError}</p>
                  ) : null}
                  {!isLogin && registationError ? (
                    <p className="error-block">{registationError}</p>
                  ) : null}
                </InputWrap>
                <InputWrap>
                  <Input
                    icon={<Icon name="unlock alternate" size="large" />}
                    iconPosition="left"
                    placeholder="Password"
                    size="large"
                    name="password"
                    type="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                  />
                </InputWrap>
                <button className="btn" onClick={this.handleSubmit}>
                  {isLogin ? "Войти " : "Зарегистрироваться"}
                </button>
              </FormContent>
            </Form>
            <BottomWrap>
              {isLogin ? (
                <p>
                  Впервые на сайте?{" "}
                  <span className="link" onClick={this.switchForm}>
                    Регистрация
                  </span>
                </p>
              ) : (
                <p>
                  Уже зарегистрированы?{" "}
                  <span className="link" onClick={this.switchForm}>
                    Войти
                  </span>
                </p>
              )}
            </BottomWrap>
          </AuthWrap>
        </FormWrap>
        <Particles params={ParticlesParams} />
      </Wrap>
    );
  }
}

const mapStateToProps = state => ({
  isAuthorized: getIsAuthorized(state),
  loginError: getLoginError(state),
  registationError: getRegistrationError(state)
});
const mapDispatchToProps = {
  authLoginRequest,
  authRegistrationRequest
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
