import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AuthWrapper from "../components/Auth/AuthWrapper";
import Login from "../components/Auth/Login";
import MailConfirmation from "../components/Auth/MailConfirmation";
import ResetPassword from "../components/Auth/ResetPassword";
import SignUp from "../components/Auth/Signup";
import { ROUTE_AUTH_BASE, ROUTE_AUTH_MAIL_CONFIRM, ROUTE_LOGIN, ROUTE_RESET_PSW, ROUTE_SIGN_UP } from "./Routes";
export const AuthRoutes: React.FC = () => {
    return (
        <AuthWrapper>
            <Switch>
                <Route exact path={ROUTE_LOGIN} component={Login} />
                <Route exact path={ROUTE_SIGN_UP} component={SignUp} />
                <Route exact path={ROUTE_AUTH_MAIL_CONFIRM} component={MailConfirmation} />
                <Route exact path={ROUTE_RESET_PSW} component={ResetPassword} />
                <Redirect to={ROUTE_LOGIN} from={ROUTE_AUTH_BASE} />
            </Switch>
        </AuthWrapper>
    )
}

export default AuthRoutes