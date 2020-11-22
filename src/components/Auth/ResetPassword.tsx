import React, { useState } from "react";
import firebase from "../../firebase";
import "firebase/auth";
import "firebase/firestore";
import { ROUTE_LOGIN } from "../../nav/Routes";
import { IonAlert, IonButton, IonContent, IonInput, IonItem, IonLabel, IonList, IonPage } from "@ionic/react";
import { useTranslation } from "react-i18next";

const ResetPassword = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [email, setEmail] = useState<string>('');

  const { t } = useTranslation('general');

  const handleSubmit = (event: any) => {
    event?.preventDefault();
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setErrorMessage(t('auth.reset-alert'))
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
              <h1>{t('auth.reset-psw')}</h1>
              <form onSubmit={handleSubmit}>
                <IonList>
                  <IonItem>
                    <IonLabel position="floating">{t('auth.email')}</IonLabel>
                    <IonInput type="text" name="email" value={email} onIonChange={(e) => setEmail(e.detail.value ? e.detail.value : "")}></IonInput>
                  </IonItem>
                </IonList>
                <div style={{ marginTop: "1em" }}>
                  <IonButton expand="full" onClick={handleSubmit}>{t('auth.reset-btn')}</IonButton>
                </div>

                <div>
                  <p style={{ margin: "0", marginTop: "2em" }}>
                    {t('auth.back-login')}
                  </p>
                  <IonButton routerLink={ROUTE_LOGIN} fill="clear">{t('auth.login')}</IonButton>
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