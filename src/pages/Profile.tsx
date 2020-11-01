import {
  IonAlert,
  IonCol,
  IonContent,
  IonGrid,
  IonList,
  IonListHeader,
  IonPage,
  IonRow,
  IonSpinner,
} from '@ionic/react';
import React, { Suspense, useContext, useState } from 'react';
import './Profile.scss';

import AppContext from '../data/app-context';
import FinancialInfoItem from '../components/FinancialInfoItem';
import ResponsiveContent from '../components/ResponsiveContent';

const ProfilePicture = React.lazy(() => import('../components/ProfilePicture'))

const Profile: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const appCtx = useContext(AppContext)

  const updateUsername = (newUsername: string) => {
    let updatedProfile = { ...appCtx.profile }
    updatedProfile.username = newUsername;
    appCtx.updateProfile(updatedProfile);
  }

  return (
    <IonPage id="Profile">
      <IonContent>
        <IonGrid className="ion-no-padding">
          <IonRow id="headerRow" className="ion-justify-content-around ion-align-items-center">
            <Suspense fallback={<IonSpinner />}>
              <ProfilePicture />
            </Suspense>
            <IonCol size="12" onClick={() => setShowAlert(true)} className="ion-text-center ion-padding-bottom">{appCtx.profile.username}</IonCol>
          </IonRow>
          <IonRow>
            <ResponsiveContent>
              <IonList className="ion-padding" mode="ios">
                <IonListHeader className="ion-padding-bottom">
                  Financial Information
                </IonListHeader>
                <FinancialInfoItem field='loanRate' friendlyName='Loan rate' unit="%" />
                <FinancialInfoItem field='insuranceRate' friendlyName='Insurance loan rate' unit="%" />
                <FinancialInfoItem field='loanPeriod' friendlyName='Loan period' unit=" years" />
                <FinancialInfoItem field='notaryFees' friendlyName='Notary fees' unit="%" />
                <FinancialInfoItem field='contribution' friendlyName='Contribution' unit="€" />
              </IonList>
            </ResponsiveContent>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={'Username'}
        inputs={[
          {
            name: 'usernameInput',
            type: 'text',
            id: 'profile-username',
            value: appCtx.profile.username,
            placeholder: 'Your username'
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
            handler: (alertData) => updateUsername(alertData.usernameInput)
          }
        ]}
      />
    </IonPage>
  );
};

export default Profile;
