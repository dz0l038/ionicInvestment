import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonPage,
  IonRow,
  IonSlide,
  IonSlides,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { camera, trashOutline } from 'ionicons/icons';
import React, { useState } from 'react';

import { useParams } from 'react-router-dom';
import { APP_DATA } from '../data/appData';
import { ROUTE_LIST } from '../nav/Routes';

const Details: React.FC = () => {
  const id = useParams<{ id: string }>().id;
  const [showAlert, setShowAlert] = useState(false);
  const apartment = APP_DATA.find(apartment => apartment.id === id)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref={ROUTE_LIST} />
          </IonButtons>
          <IonTitle>{apartment?.address}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding-bottom" >
        <IonSlides pager style={{ backgroundColor: "lightgrey" }}>
          {
            apartment?.pictures.map((picture, index) => (
              <IonSlide key={index} >
                <IonImg style={{ height: "200px" }} src={picture} />
              </IonSlide>
            ))
          }
        </IonSlides>
        <IonGrid>
          <IonRow>
            <IonCol sizeSm="10" sizeMd="8" offsetSm="1" offsetMd="2">
              <IonGrid>
                <IonRow className="ion-align-items-center">
                  <IonCol style={{ color: "grey" }}>
                    {apartment?.pictures.length} pictures
                </IonCol>
                  <IonCol className="ion-text-end">
                    <IonButton size="small" fill="outline">
                      <IonIcon icon={camera} />
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
              <IonList className="ion-padding-vertical" mode="ios">
                <IonListHeader>Input data</IonListHeader>
                <IonItem>
                  <IonLabel onClick={() => setShowAlert(true)}>
                    {apartment?.address}
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    Price
                  </IonLabel>
                  <IonNote onClick={() => setShowAlert(true)} slot="end">{apartment?.price}€</IonNote>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    Surface
                  </IonLabel>
                  <IonNote onClick={() => setShowAlert(true)} slot="end">{apartment?.surface}m²</IonNote>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    Renovation
                  </IonLabel>
                  <IonNote onClick={() => setShowAlert(true)} slot="end">{apartment?.renovation}€</IonNote>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    Rent (month)
                  </IonLabel>
                  <IonNote onClick={() => setShowAlert(true)} slot="end">{apartment?.rent}€</IonNote>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    Vacancy (month)
                  </IonLabel>
                  <IonNote onClick={() => setShowAlert(true)} slot="end">{apartment?.vacancy}</IonNote>
                </IonItem>
                <IonListHeader className="ion-padding-vertical" >Output data</IonListHeader>
                <IonItem>
                  <IonLabel>
                    Price per m² (buy)
                  </IonLabel>
                  <IonNote slot="end">{apartment?.priceM2}€/m²</IonNote>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    Price per m² (rent)
                  </IonLabel>
                  <IonNote slot="end">{apartment?.priceRentM2}€/m²</IonNote>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    Loan price (month)
                  </IonLabel>
                  <IonNote slot="end">{apartment?.loan}€</IonNote>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    Profitability
                  </IonLabel>
                  <IonNote slot="end">{apartment?.profitability}%</IonNote>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    Cashflow
                  </IonLabel>
                  <IonNote slot="end">{apartment?.cashflow}€</IonNote>
                </IonItem>
              </IonList>
              <IonGrid className="ion-margin-top">
                <IonRow>
                  <IonCol className="ion-text-center">
                    <IonButton fill="outline" size="small" color="danger">
                      <IonIcon icon={trashOutline} slot="icon-only" />
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCol>
          </IonRow>
        </IonGrid>

      </IonContent>

      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={'Update Data'}
        inputs={[
          {
            name: 'data',
            type: 'number',
            id: 'data-id',
            value: 2,
            placeholder: 'Your data'
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
            handler: () => {
              console.log('Confirm Ok');
            }
          }
        ]}
      />
    </IonPage>
  );
};

export default Details;
