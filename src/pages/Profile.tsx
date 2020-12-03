import {
  IonAlert,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
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
import ResponsiveCol from '../components/ResponsiveCol';
import Logout from '../components/Auth/Logout';
import { logOutOutline } from 'ionicons/icons';

import { useTranslation } from 'react-i18next';
import SelectLanguage from '../components/SelectLanguage';

const ProfilePicture = React.lazy(() => import('../components/ProfilePicture'))

const Profile: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const appCtx = useContext(AppContext)
  const { t } = useTranslation('profile');

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
            <IonCol size="12" onClick={() => setShowAlert(true)} className="ion-text-center">{appCtx.profile.username}</IonCol>
            <IonCol size="12" className="ion-text-end ion-padding">
              <Logout>
                <IonButton fill="default"><IonIcon slot="start" icon={logOutOutline} />{t('logout')}</IonButton>
              </Logout>
            </IonCol>
          </IonRow>
          <SelectLanguage />
          <IonRow>
            <ResponsiveCol>
              <IonList className="ion-padding" mode="ios">
                <IonListHeader className="ion-padding-bottom">
                  {t('financial-information')}
                </IonListHeader>
                <FinancialInfoItem field='loanRate' friendlyName={t('loan-rate')} unit="%" />
                <FinancialInfoItem field='insuranceRate' friendlyName={t('insurance-loan-rate')} unit="%" />
                <FinancialInfoItem field='loanPeriod' friendlyName={t('loan-period')} unit=" years" />
                <FinancialInfoItem field='notaryFees' friendlyName={t('notary-fees')} unit="%" />
                <FinancialInfoItem field='contribution' friendlyName={t('contribution')} unit="€" />
              </IonList>
            </ResponsiveCol>
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
