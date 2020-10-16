import {
  IonAlert,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonPage,
  IonRow,
} from '@ionic/react';
import React, { useState } from 'react';
import './Profile.scss';

import profile from '../assets/profile_lowDef.jpg';

const Profile: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  return (
    <IonPage id="Profile">
      <IonContent>
        <IonGrid className="ion-no-padding">
          <IonRow id="headerRow" className="ion-justify-content-around ion-align-items-center">
            <IonCol size="6" sizeSm="5" sizeMd="3" sizeLg="2" className="ion-text-center ion-padding">
              <IonImg className="profile-picture" onClick={() => setShowAlert(true)} src={profile} alt="profile" />
            </IonCol>
            <IonCol size="12"onClick={() => setShowAlert(true)} className="ion-text-center ion-padding-bottom">Yann</IonCol>
          </IonRow>
          <IonRow>
            <IonCol sizeSm="10" sizeMd="8" offsetSm="1" offsetMd="2">
              <IonList className="ion-padding" mode="ios">
                <IonListHeader className="ion-padding-bottom">
                  Financial Information
                </IonListHeader>
                <IonItem>
                  <IonLabel>
                    Loan rate
                  </IonLabel>
                  <IonNote onClick={() => setShowAlert(true)} slot="end">2%</IonNote>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    Insurance loan rate
                  </IonLabel>
                  <IonNote onClick={() => setShowAlert(true)} slot="end">0.3%</IonNote>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    Loan period
                  </IonLabel>
                  <IonNote onClick={() => setShowAlert(true)} slot="end">15 years</IonNote>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    Notary fees
                  </IonLabel>
                  <IonNote onClick={() => setShowAlert(true)} slot="end">8%</IonNote>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    Contribution
                  </IonLabel>
                  <IonNote onClick={() => setShowAlert(true)} slot="end">1000€</IonNote>
                </IonItem>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={'Update Data'}
        inputs={[
          {
            name: 'data',
            type: 'number',
            id: 'data-id',
            value: 2,
            placeholder: 'Your data'
          }
        ]}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Confirm Cancel');
            }
          },
          {
            text: 'Ok',
            handler: () => {
              console.log('Confirm Ok');
            }
          }
        ]}
      />
    </IonPage>
  );
};

export default Profile;
