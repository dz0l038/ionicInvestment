import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonImg, IonRow } from '@ionic/react';
import React from 'react';
import { APP_DATA } from '../data/appData';
import { ROUTE_DETAIL } from '../nav/Routes';

const ApartmentCard: React.FC<{ apartmentId: string }> = (props) => {
  const apartment = APP_DATA.find(apartment => apartment.id === props.apartmentId)
  return (
    <IonCard routerLink={ROUTE_DETAIL + apartment!.id}>
      <img src={apartment?.pictures[0]} />
      <IonCardHeader>
        <IonCardSubtitle>
          <IonGrid className="ion-no-padding">
            <IonRow className="ion-justify-content-between">
              <IonCol size="auto">{apartment?.price}€</IonCol>
              <IonCol size="auto">{apartment?.profitability}%</IonCol>
            </IonRow>
          </IonGrid>
        </IonCardSubtitle>
        <IonCardTitle mode="md">{apartment?.address}</IonCardTitle>
        <IonCardSubtitle>{apartment?.addDate}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        {apartment?.notes}
      </IonCardContent>
    </IonCard>
  );
};

export default ApartmentCard;
