import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../firebase";
import "firebase/auth";
import "firebase/firestore";
import { ROUTE_LOGIN } from "../../nav/Routes";
import { IonAlert, IonButton, IonContent, IonPage } from "@ionic/react";
import Logout from "./Logout";
import { Trans, useTranslation } from "react-i18next";

const MailConfirmation: React.FC = () => {
    const history = useHistory();
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();
    const { t } = useTranslation('general');

    useEffect(() => {
        sendVerificationEmail()
    }, [])

    const sendVerificationEmail = () => {
        const userCredential = firebase.auth().currentUser;
        if (!userCredential) { history.push(ROUTE_LOGIN); return }
        userCredential.sendEmailVerification().then(() => {
            setErrorMessage(t('auth.email-sent'))
            setShowAlert(true)
        }).catch((error) => {
            setErrorMessage(error.message)
            setShowAlert(true)
        })
    }

    const handleClick = () => {
        sendVerificationEmail()
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
                    <div style={{ flexGrow: 1 }} />
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ flexGrow: 1 }} />
                        <div style={{ textAlign: 'center' }}>
                            <h1><Trans>{t('auth.email-sent-title')}</Trans></h1>
                            <form>
                                <Logout>
                                    <IonButton>{t('auth.login')}</IonButton>
                                </Logout>
                                <div>
                                    <p style={{ margin: "0", marginTop: "2em" }}>
                                        {t('auth.didnt-receive')}
                                    </p>

                                    <IonButton onClick={handleClick} fill="clear">{t('auth.send-again')}</IonButton>
                                </div>
                            </form>
                        </div>
                        <div style={{ flexGrow: 1 }} />
                    </div>
                    <div style={{ flexGrow: 1 }} />
                </div>
            </IonContent>
            <IonAlert
                isOpen={showAlert}
                header={errorMessage}
                onDidDismiss={() => { setErrorMessage(""); setShowAlert(false) }}
                buttons={[
                    {
                        text: 'Ok'
                    }
                ]}
            />
        </IonPage>
    );
}

export default MailConfirmation