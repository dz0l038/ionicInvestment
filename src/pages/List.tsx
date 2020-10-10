import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React, { useState, useRef } from 'react';
import { ROUTE_DETAIL } from '../nav/Routes';

import { add, cameraOutline } from 'ionicons/icons';

const List: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const addressRef = useRef<HTMLIonInputElement>(null);
  const priceRef = useRef<HTMLIonInputElement>(null);
  const surfaceRef = useRef<HTMLIonInputElement>(null);
  const renovationRef = useRef<HTMLIonInputElement>(null);
  const rentRef = useRef<HTMLIonInputElement>(null);
  const vacancyRef = useRef<HTMLIonInputElement>(null);

  return (
    <IonPage>
      <IonModal isOpen={showModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Add new appartment</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList className="ion-padding-bottom">
            <IonItemDivider>Localisation</IonItemDivider>
            <IonItem>
              <IonLabel position="floating">Address</IonLabel>
              <IonInput ref={addressRef}></IonInput>
            </IonItem>

            <IonItemDivider className="ion-margin-top">Financial</IonItemDivider>
            <IonItem>
              <IonLabel position="floating">Price</IonLabel>
              <IonInput type="number" ref={priceRef}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Surface</IonLabel>
              <IonInput type="number" ref={surfaceRef}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Renovation</IonLabel>
              <IonInput type="number" ref={renovationRef}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Rent</IonLabel>
              <IonInput type="number" ref={rentRef}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Vacancy</IonLabel>
              <IonInput type="number" ref={vacancyRef}></IonInput>
            </IonItem>
            <IonItemDivider className="ion-margin-top">Pictures</IonItemDivider>
            <IonButton className="ion-margin"><IonIcon icon={cameraOutline} /></IonButton>
          </IonList>
          <IonGrid>

            <IonRow className="ion-justify-content-between">
              <IonCol size="auto" >
                <IonButton fill="outline" onClick={() => setShowModal(false)}>Cancel</IonButton>
              </IonCol>
              <IonCol size="auto" >
                <IonButton onClick={() => setShowModal(false)}>Save</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>

      </IonModal>
      <IonHeader>
        <IonToolbar>
          <IonTitle>List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard routerLink={ROUTE_DETAIL + 'First Appartment'}>
          <IonImg src="https://medias-neuf-be.avendrealouer.fr/Image/programme-neuf_5218076_D.jpg?preset=l" />
          <IonCardHeader>
            <IonCardSubtitle>
              <IonGrid className="ion-no-padding">
                <IonRow className="ion-justify-content-between">
                  <IonCol size="auto">100 000€</IonCol>
                  <IonCol size="auto">5%</IonCol>
                </IonRow>
              </IonGrid>
            </IonCardSubtitle>
            <IonCardTitle>First Appartment</IonCardTitle>
            <IonCardSubtitle>10/10/2020</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            Some personal notes
          </IonCardContent>
        </IonCard>
        
        <IonCard routerLink={ROUTE_DETAIL + 'Another one'}>
          <IonImg src="https://www.guidehabitation.ca/wp-content/themes/gh/pub/auto/9339/l-2825d892-bb12-4461-90c7-b305300c18a4.jpg" />
          <IonCardHeader>
            <IonCardSubtitle>
              <IonGrid className="ion-no-padding">
                <IonRow className="ion-justify-content-between">
                  <IonCol size="auto">150 000€</IonCol>
                  <IonCol size="auto">3%</IonCol>
                </IonRow>
              </IonGrid>
            </IonCardSubtitle>
            <IonCardTitle>Another one</IonCardTitle>
            <IonCardSubtitle>10/09/2020</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut auctor magna eget odio blandit
          </IonCardContent>
        </IonCard>

        <IonCard routerLink={ROUTE_DETAIL + 'Another one'}>
          <IonImg src="https://labordelaise.staticlbi.com/680x680/images/biens/1/fe4ad38359cf7382d53e0156737948f3/original/photo_750ed3f33e9274bcb7bb920c4ae7c3f0.jpg" />
          <IonCardHeader>
            <IonCardSubtitle>
              <IonGrid className="ion-no-padding">
                <IonRow className="ion-justify-content-between">
                  <IonCol size="auto">200 000€</IonCol>
                  <IonCol size="auto">2%</IonCol>
                </IonRow>
              </IonGrid>
            </IonCardSubtitle>
            <IonCardTitle>Appartment</IonCardTitle>
            <IonCardSubtitle>09/10/2020</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut auctor magna eget odio blandit
          </IonCardContent>
        </IonCard>
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
