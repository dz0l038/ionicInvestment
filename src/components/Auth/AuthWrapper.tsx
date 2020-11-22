import React from "react";
import "firebase/auth";
import "firebase/firestore";
import { IonContent, IonPage } from "@ionic/react";
import './AuthWrapper.scss';

const AuthWrapper: React.FC = (props) => {
    return (
        <IonPage id="AuthWrapper">
            <IonContent fullscreen>
                <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
                    <div style={{ flexGrow: 1 }} />
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ flexGrow: 1 }} />
                        <div className="main-content" style={{ textAlign: 'center' }}>
                            {props.children}
                        </div>
                        <div style={{ flexGrow: 1 }} />
                    </div>
                    <div style={{ flexGrow: 1 }} />
                </div>
                <div id="wrapper" />
            </IonContent>
        </IonPage>
    );
}

export default AuthWrapper