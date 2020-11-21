import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonRow } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../data/app-context';
import { profitability, totalPrice } from '../helpers/helpers';
import { ROUTE_DETAIL } from '../nav/Routes';
import defaultImg from '../assets/default.png';
import firebase from '../firebase';
import 'firebase/storage';

const ApartmentCard: React.FC<{ apartmentId: string }> = (props) => {
  const appCtx = useContext(AppContext);
  const [profileUrl, setProfileUrl] = useState<string>();

  const apartment = appCtx.apartments.find(apartment => apartment.id === props.apartmentId)
  let priceTotal = 0;
  if (apartment) {
    priceTotal = totalPrice(apartment.price, appCtx.profile.notaryFees, apartment.renovation)
  }

  const updateBase64 = async () => {
    const storage = firebase.storage();
    const storageRef = storage.ref();
    if (!apartment?.pictures || apartment?.pictures.length < 1) return
    storageRef.child(apartment.pictures[0]).getDownloadURL().then(function (url) {
      setProfileUrl(url)
    })
  }

  useEffect(() => {
    updateBase64()
  }, [apartment?.pictures])


  return (
    <React.Fragment>
      {
        apartment &&
        <IonCard routerLink={ROUTE_DETAIL + apartment?.id}>
          <img src={profileUrl ? profileUrl : defaultImg} />
          <IonCardHeader>
            <IonCardSubtitle>
              <IonGrid className="ion-no-padding">
                <IonRow className="ion-justify-content-between">
                  <IonCol size="auto">{apartment?.price}€</IonCol>
                  <IonCol size="auto">{profitability(priceTotal, apartment.rent, apartment.vacancy).toFixed(2)}%</IonCol>
                </IonRow>
              </IonGrid>
            </IonCardSubtitle>
            <IonCardTitle mode="md">{apartment?.address}</IonCardTitle>
            <IonCardSubtitle>{new Date(apartment?.addDate).toDateString()}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            {apartment?.notes}
          </IonCardContent>
        </IonCard>
      }
    </React.Fragment>


  );
};

export default ApartmentCard;
