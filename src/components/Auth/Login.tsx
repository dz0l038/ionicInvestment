import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../firebase";
import "firebase/auth";
import "firebase/firestore";
import AppContext from "../../data/app-context";
import { ROUTE_LIST, ROUTE_SIGN_UP } from "../../nav/Routes";
import { IonAlert, IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage } from "@ionic/react";
import { logoGoogle } from "ionicons/icons";

interface UserData {
    email: string;
    password: string;
}
const Login: React.FC = () => {
    const appCtx = useContext(AppContext);
    const history = useHistory();
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [values, setValues] = useState<UserData>({
        email: "",
        password: ""
    });

    useEffect(() => {
        if (firebase.auth().currentUser) {
            history.push(ROUTE_LIST);
        }
    }, [appCtx.user])

    const handleClick = () => {
        history.push(ROUTE_SIGN_UP);
    }

    const handleChange = (event: CustomEvent) => {
        const tar = (event.target as HTMLInputElement)
        setValues(values => ({
            ...values,
            [tar.name]: tar.value
        }));
    }

    const handleSubmit = (event: any) => {
        console.log(values)
        event.preventDefault();
        firebase
            .auth()
            .signInWithEmailAndPassword(values.email, values.password)
            .then(res => {
                appCtx.setUser(res);
                console.log(res, 'res')
                history.push(ROUTE_LIST);
            })
            .catch(error => {
                setErrorMessage(error.message)
                setShowAlert(true)
            });
    }

    const handleWithGoogle = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
                    <div style={{ flexGrow: 1 }} />
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ flexGrow: 1 }} />
                        <div style={{ textAlign: 'center' }}>
                            <h1>Login</h1>
                            <form onSubmit={handleSubmit}>
                                <IonList>
                                    <IonItem>
                                        <IonLabel position="floating">Email</IonLabel>
                                        <IonInput type="text" name="email" value={values.email} onIonChange={handleChange}></IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="floating">Password</IonLabel>
                                        <IonInput type="password" name="password" value={values.password} onIonChange={handleChange} ></IonInput>
                                    </IonItem>
                                </IonList>
                                <div style={{ marginTop: "1em" }}>
                                    <IonButton expand="full" onClick={handleSubmit}>Login</IonButton>
                                </div>
                                <div style={{ marginTop: "1em", paddingTop: "1em", borderTop: "1px solid grey" }}>
                                    <IonButton expand="full" color="danger" onClick={handleWithGoogle}>
                                        <IonIcon icon={logoGoogle} slot="start" />
                                        Login with Google
                                        </IonButton>
                                </div>
                                <div>
                                    <p style={{ margin: "0", marginTop: "2em" }}>
                                        Not logged in yet?
                                    </p>
                                    <IonButton onClick={handleClick} fill="clear">SignUp</IonButton>
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

export default Login