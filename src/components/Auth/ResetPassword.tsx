import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../firebase";
import "firebase/auth";
import "firebase/firestore";
import { ROUTE_LOGIN } from "../../nav/Routes";
import { IonAlert, IonButton, IonContent, IonInput, IonItem, IonLabel, IonList, IonPage } from "@ionic/react";

const ResetPassword = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [email, setEmail] = useState<string>('');

  const history = useHistory();

  const handleSubmit = (event: any) => {
    event?.preventDefault();
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setErrorMessage("An email has been sent to reset your password")
        setShowAlert(true)
      })
      .catch(error => {
        setErrorMessage(error.message)
        setShowAlert(true)
      });
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
          <div style={{ flexGrow: 1 }} />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ flexGrow: 1 }} />
            <div style={{ textAlign: 'center' }}>
              <h1>Reset password</h1>
              <form onSubmit={handleSubmit}>
                <IonList>
                  <IonItem>
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput type="text" name="email" value={email} onIonChange={(e) => setEmail(e.detail.value ? e.detail.value : "")}></IonInput>
                  </IonItem>
                </IonList>
                <div style={{ marginTop: "1em" }}>
                  <IonButton expand="full" onClick={handleSubmit}>Reset</IonButton>
                </div>

                <div>
                  <p style={{ margin: "0", marginTop: "2em" }}>
                    Back to login:
                  </p>
                  <IonButton routerLink={ROUTE_LOGIN} fill="clear">Login</IonButton>
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
export default ResetPassword;