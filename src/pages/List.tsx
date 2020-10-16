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
import React, { useState } from 'react';

import { add } from 'ionicons/icons';
import ApartmentCard from '../components/ApartmentCard';
import AddApartmentModal from '../components/AddApartmentModal';
import { APP_DATA } from '../data/appData';

const List: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <IonPage>
      <AddApartmentModal showModal={showModal} setShowModal={setShowModal} />
      <IonHeader>
        <IonToolbar>
          <IonTitle>List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol sizeMd="10" offsetMd="1">
              <IonGrid>
                <IonRow>
                  {
                    APP_DATA.map((apartment, index) => (
                      <IonCol size="12" sizeSm="6" sizeMd="4" sizeXl="3" key={index}>
                        <ApartmentCard apartmentId={apartment.id} />
                      </IonCol>
                    ))
                  }
                </IonRow>
              </IonGrid>
            </IonCol>
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
