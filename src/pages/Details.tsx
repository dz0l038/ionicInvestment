import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React from 'react';

import { useParams } from 'react-router-dom';
import { ROUTE_LIST } from '../nav/Routes';

const Details: React.FC = () => {
  const id = useParams<{ id: string }>().id;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref={ROUTE_LIST} />
          </IonButtons>
          <IonTitle>{id}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Details;
