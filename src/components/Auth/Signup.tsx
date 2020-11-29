import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../firebase";
import "firebase/auth";
import "firebase/firestore";
import { ROUTE_LIST, ROUTE_LOGIN } from "../../nav/Routes";
import { IonAlert, IonButton, IonInput, IonItem, IonLabel, IonList } from "@ionic/react";
import { useTranslation } from "react-i18next";
import AppContext from '../../data/app-context';

interface FormItems {
    email: string;
    password: string;
}
const SignUp = () => {
    const appCtx = useContext(AppContext);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [values, setValues] = useState({
        email: "",
        password: "",
    } as FormItems);
    const { t } = useTranslation('general');

    const history = useHistory();
    const handleClick = () => {
        history.push(ROUTE_LOGIN)
    }

    const checkUserExist: (userId: string) => Promise<boolean> = async (userId: string) => {
        console.log("checking user " + userId)
        const db = firebase.firestore();
        const doc = await db.collection("Users").doc(userId).get()
        //const profile = doc.data() as Profile;
        if (doc.exists) {
            console.log("User created")
            return true
        } else {
            console.log("Don't know this user")
            return false
        }
    }

    const loadUntilFound = async (userId: string) => {
        function sleep(ms: number) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        setIsLoading(true)
        let userExist = await checkUserExist(userId)
        if (!userExist) {
            await sleep(2000);
            loadUntilFound(userId);
        } else {
            setIsLoading(false)
            history.push(ROUTE_LIST);
        }
    }


    const handleSubmit = (event: any) => {
        event?.preventDefault();
        firebase
            .auth()
            .createUserWithEmailAndPassword(values.email, values.password)
            .then((userCredential: firebase.auth.UserCredential) => {
                appCtx.setUser(userCredential);
                loadUntilFound(userCredential.user!.uid)
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
        <div>
            <h1>{t('auth.sign-up')}</h1>
            <form onSubmit={handleSubmit}>
                <IonList>
                    <IonItem>
                        <IonLabel position="floating">{t('auth.email')}</IonLabel>
                        <IonInput disabled={isLoading} type="text" name="email" value={values.email} onIonChange={handleChange}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">{t('auth.password')}</IonLabel>
                        <IonInput disabled={isLoading} type="password" name="password" value={values.password} onIonChange={handleChange} ></IonInput>
                    </IonItem>
                </IonList>
                <div style={{ marginTop: "1em" }}>
                    <IonButton disabled={isLoading} expand="full" onClick={handleSubmit}>{t('auth.sign-up')}</IonButton>
                </div>

                <div>
                    <p style={{ margin: "0", marginTop: "2em" }}>
                        {t('auth.already-have-account')}
                    </p>
                    <IonButton disabled={isLoading} onClick={handleClick} fill="clear">{t('auth.login')}</IonButton>
                </div>
                <p></p>
            </form>
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
        </div>
    );
}
export default SignUp;