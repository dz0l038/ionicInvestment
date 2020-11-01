import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React, { useContext, useState } from 'react';

import { add } from 'ionicons/icons';
import ApartmentCard from '../components/ApartmentCard';
import AddApartmentModal from '../components/AddApartmentModal';
import AppContext from '../data/app-context';
import ResponsiveContent from '../components/ResponsiveContent';

const List: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const appCtx = useContext(AppContext);
  return (
    <IonPage>
      <AddApartmentModal showModal={showModal} setShowModal={setShowModal} />
      <IonHeader>
        <IonToolbar>
          <IonTitle>List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid className="ion-no-padding">
          <IonRow>
            <ResponsiveContent>
              <IonGrid>
                <IonRow>
                  {
                    appCtx.apartments.map((apartment, index) => (
                      <IonCol size="12" sizeSm="6" sizeXl="4" key={index}>
                        <ApartmentCard apartmentId={apartment.id} />
                      </IonCol>
                    ))
                  }
                </IonRow>
              </IonGrid>
            </ResponsiveContent>
          </IonRow>
        </IonGrid>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setShowModal(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default List;
