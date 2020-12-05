import {
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  isPlatform
} from '@ionic/react';
import React, { useContext, useState } from 'react';

import { add } from 'ionicons/icons';
import ApartmentCard from '../components/ApartmentCard';
import AddApartmentModal from '../components/AddApartmentModal';
import AppContext from '../data/app-context';
import ResponsiveCol from '../components/ResponsiveCol';
import ResponsiveContent from '../components/ResponsiveContent';
import { useTranslation } from 'react-i18next';

const List: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const appCtx = useContext(AppContext);
  const { t } = useTranslation('general');
  return (
    <IonPage>
      <AddApartmentModal showModal={showModal} setShowModal={setShowModal} />
      <IonHeader>
        <ResponsiveContent>
          <IonToolbar>
            <IonTitle>{t('tabs.list')}</IonTitle>
          </IonToolbar>
        </ResponsiveContent>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid className="ion-no-padding">
          <IonRow>
            <ResponsiveCol>
              <IonGrid>
                <IonRow>
                  {
                    appCtx.apartments.length > 0 ?
                      appCtx.apartments.map((apartment, index) => (
                        <IonCol size="12" sizeSm="6" sizeXl="4" key={index}>
                          <ApartmentCard apartmentId={apartment.id} />
                        </IonCol>
                      ))
                      :
                      <h3 className="ion-text-center">
                        {t('apartment.nothingToShow')}
                      </h3>
                  }
                </IonRow>
              </IonGrid>
            </ResponsiveCol>
          </IonRow>
        </IonGrid>
        <IonFab
          vertical={appCtx.apartments.length > 0 ? "bottom" : "center"}
          horizontal={appCtx.apartments.length === 0 || isPlatform('desktop') ? "center" : "end"}
          style={{ bottom: isPlatform('desktop') ? '20px' : null }}
          slot="fixed">
          <IonFabButton onClick={() => setShowModal(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default List;
