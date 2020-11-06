import React from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../firebase";
import "firebase/firestore";
import { ROUTE_LOGIN } from "../../nav/Routes";

const Logout: React.FC = (props) => {
    const history = useHistory();
    const handleClick = (event: any) => {
        event.preventDefault();

        firebase
            .auth()
            .signOut()
            .then(res => {
                history.push(ROUTE_LOGIN);
            })
    }
    return (
        <div onClick={handleClick}>
            {props.children}
        </div>
    );
}
export default Logout;