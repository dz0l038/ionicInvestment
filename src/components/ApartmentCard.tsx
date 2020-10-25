import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonImg, IonRow } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../data/app-context';
import { profitability, totalPrice } from '../helpers/helpers';
import { ROUTE_DETAIL } from '../nav/Routes';
import defaultImg from '../assets/default.png';
import { Plugins, FilesystemDirectory } from '@capacitor/core';

const { Filesystem } = Plugins;

const ApartmentCard: React.FC<{ apartmentId: string }> = (props) => {
  const appCtx = useContext(AppContext);
  const [pictureBase64, setPictureBase64] = useState<string>();

  const apartment = appCtx.apartments.find(apartment => apartment.id === props.apartmentId)
  let priceTotal = 0;
  if (apartment) {
    priceTotal = totalPrice(apartment.price, appCtx.profile.notaryFees, apartment.renovation)
  }

  const updateBase64 = async () => {
    if (apartment?.pictures !== undefined && apartment?.pictures?.length > 0) {
      const file = await Filesystem.readFile({
        path: apartment.pictures[0],
        directory: FilesystemDirectory.Data
      })
      setPictureBase64('data:image/jpeg;base64,' + file.data)
    } else {
      setPictureBase64(undefined)
    }
  }

  useEffect(() => {
    updateBase64()
  }, [apartment?.pictures])


  return (
    <React.Fragment>
      {
        apartment &&
        <IonCard routerLink={ROUTE_DETAIL + apartment?.id}>
          <img src={pictureBase64 ? pictureBase64 : defaultImg} />
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
