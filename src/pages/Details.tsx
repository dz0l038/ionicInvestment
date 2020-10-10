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
import { ROUTE_LIST } from '../nav/Routes';

const Details: React.FC = () => {
  const id = useParams<{ id: string }>().id;
  const [showAlert, setShowAlert] = useState(false);

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
      <IonContent className="ion-padding-bottom" >
        <IonSlides pager style={{ backgroundColor: "lightgrey" }}>
          <IonSlide >
            <IonImg style={{ height: "200px" }} src="https://medias-neuf-be.avendrealouer.fr/Image/programme-neuf_5218076_D.jpg?preset=l" />
          </IonSlide>
          <IonSlide>
            <IonImg style={{ height: "200px" }} src="https://www.guidehabitation.ca/wp-content/themes/gh/pub/auto/9339/l-2825d892-bb12-4461-90c7-b305300c18a4.jpg" />
          </IonSlide>
          <IonSlide>
            <IonImg style={{ height: "200px" }} src="https://labordelaise.staticlbi.com/680x680/images/biens/1/fe4ad38359cf7382d53e0156737948f3/original/photo_750ed3f33e9274bcb7bb920c4ae7c3f0.jpg" />
          </IonSlide>
        </IonSlides>
        <IonGrid>
          <IonRow className="ion-align-items-center">
            <IonCol style={{ color: "grey" }}>
              3 pictures
            </IonCol>
            <IonCol className="ion-text-end">
              <IonButton size="small" fill="outline">
                <IonIcon icon={camera} />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonList className="ion-padding">
          <IonListHeader>Input data</IonListHeader>
          <IonItem>
            <IonLabel onClick={() => setShowAlert(true)}>
              Addess detail, 33000 Bordeaux
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              Price
            </IonLabel>
            <IonNote onClick={() => setShowAlert(true)} slot="end">100 000€</IonNote>
          </IonItem>
          <IonItem>
            <IonLabel>
              Surface
            </IonLabel>
            <IonNote onClick={() => setShowAlert(true)} slot="end">30m²</IonNote>
          </IonItem>
          <IonItem>
            <IonLabel>
              Renovation
            </IonLabel>
            <IonNote onClick={() => setShowAlert(true)} slot="end">10 000€</IonNote>
          </IonItem>
          <IonItem>
            <IonLabel>
              Rent (month)
            </IonLabel>
            <IonNote onClick={() => setShowAlert(true)} slot="end">400€</IonNote>
          </IonItem>
          <IonItem>
            <IonLabel>
              Vacancy (month)
            </IonLabel>
            <IonNote onClick={() => setShowAlert(true)} slot="end">2</IonNote>
          </IonItem>


          <IonListHeader className="ion-padding-vertical" >Output data</IonListHeader>
          <IonItem>
            <IonLabel>
              Price per m² (buy)
            </IonLabel>
            <IonNote slot="end">2000€/m²</IonNote>
          </IonItem>
          <IonItem>
            <IonLabel>
              Price per m² (rent)
            </IonLabel>
            <IonNote slot="end">15€/m²</IonNote>
          </IonItem>
          <IonItem>
            <IonLabel>
              Loan price (month)
            </IonLabel>
            <IonNote slot="end">750€</IonNote>
          </IonItem>
          <IonItem>
            <IonLabel>
              Profitability
            </IonLabel>
            <IonNote slot="end">5%</IonNote>
          </IonItem>
          <IonItem>
            <IonLabel>
              Cashflow
            </IonLabel>
            <IonNote slot="end">50€</IonNote>
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
