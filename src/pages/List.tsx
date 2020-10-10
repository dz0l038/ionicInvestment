import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React from 'react';
import { ROUTE_DETAIL } from '../nav/Routes';


const List: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton routerLink={ROUTE_DETAIL + '2'}>Item</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default List;
