import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../firebase";
import "firebase/auth";
import "firebase/firestore";
import AppContext from "../../data/app-context";
import { ROUTE_LIST, ROUTE_LOGIN } from "../../nav/Routes";
import { IonAlert, IonButton, IonContent, IonInput, IonItem, IonLabel, IonList, IonPage } from "@ionic/react";
import { useTranslation } from "react-i18next";
interface FormItems {
    username: string;
    email: string;
    password: string;
}
const SignUp = () => {
    const appCtx = useContext(AppContext);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
    } as FormItems);
    const { t } = useTranslation('general');

    const history = useHistory();
    const handleClick = () => {
        history.push(ROUTE_LOGIN)
    }

    const handleSubmit = (event: any) => {
        event?.preventDefault();
        firebase
            .auth()
            .createUserWithEmailAndPassword(values.email, values.password)
            .then((userCredential: firebase.auth.UserCredential) => {
                appCtx.setUser(userCredential);
                const newUser = {
                    uid: userCredential.user!.uid,
                    email: values.email,
                    username: values.username,
                    contribution: 0,
                    insuranceRate: 0.35,
                    loanPeriod: 19,
                    loanRate: 2,
                    notaryFees: 8,
                    picture: null,
                    lng: 'en',
                }
                const db = firebase.firestore();
                db.collection("Users")
                    .doc(userCredential.user!.uid)
                    .set(newUser)
                    .then(() => {
                        history.push(ROUTE_LIST);
                    })
                    .catch(error => {
                        setErrorMessage(error.message)
                        setShowAlert(true)
                    });
            })
            .catch(error => {
                setErrorMessage(error.message)
                setShowAlert(true)
            });
    }

    const handleChange = (event: CustomEvent) => {
        const tar = (event.target as HTMLInputElement)
        setValues(values => ({
            ...values,
            [tar.name]: tar.value
        }));
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
                    <div style={{ flexGrow: 1 }} />
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ flexGrow: 1 }} />
                        <div style={{ textAlign: 'center' }}>
                            <h1>{t('auth.sign-up')}</h1>
                            <form onSubmit={handleSubmit}>
                                <IonList>
                                    <IonItem>
                                        <IonLabel position="floating">{t('auth.username')}</IonLabel>
                                        <IonInput type="text" name="username" value={values.username} onIonChange={handleChange}></IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="floating">{t('auth.email')}</IonLabel>
                                        <IonInput type="text" name="email" value={values.email} onIonChange={handleChange}></IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="floating">{t('auth.password')}</IonLabel>
                                        <IonInput type="password" name="password" value={values.password} onIonChange={handleChange} ></IonInput>
                                    </IonItem>
                                </IonList>
                                <div style={{ marginTop: "1em" }}>
                                    <IonButton expand="full" onClick={handleSubmit}>{t('auth.sign-up')}</IonButton>
                                </div>

                                <div>
                                    <p style={{ margin: "0", marginTop: "2em" }}>
                                        {t('auth.already-have-account')}
                                    </p>
                                    <IonButton onClick={handleClick} fill="clear">{t('auth.login')}</IonButton>
                                </div>
                                <p></p>
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
export default SignUp;