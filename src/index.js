import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppRouter from "./components/AppRouter";
import { BrowserRouter } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
    <BrowserRouter>
        <AppRouter />
    </BrowserRouter>,
    document.getElementById("root")
);

