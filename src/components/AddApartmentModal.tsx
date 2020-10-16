import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonModal,
    IonRow,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import { cameraOutline } from 'ionicons/icons';
import React, { useRef } from 'react';

const AddApartmentModal: React.FC<{ showModal: boolean, setShowModal: (value: boolean) => void }> = (props) => {
    const addressRef = useRef<HTMLIonInputElement>(null);
    const priceRef = useRef<HTMLIonInputElement>(null);
    const surfaceRef = useRef<HTMLIonInputElement>(null);
    const renovationRef = useRef<HTMLIonInputElement>(null);
    const rentRef = useRef<HTMLIonInputElement>(null);
    const vacancyRef = useRef<HTMLIonInputElement>(null);

    return (
        <IonModal isOpen={props.showModal}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Add new appartment</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol></IonCol>
                    </IonRow>
                </IonGrid>
                <IonList className="ion-padding-bottom" mode="ios">
                    <IonListHeader>
                        Localisation
                    </IonListHeader>
                    <IonItem>
                        <IonLabel position="floating">Address</IonLabel>
                        <IonInput ref={addressRef}></IonInput>
                    </IonItem>
                    <IonListHeader className="ion-margin-top">Financial</IonListHeader>
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
                    <IonListHeader className="ion-margin-top">Pictures</IonListHeader>
                    <IonButton className="ion-margin"><IonIcon icon={cameraOutline} /></IonButton>
                </IonList>
                <IonGrid>
                    <IonRow className="ion-justify-content-between">
                        <IonCol size="auto" >
                            <IonButton fill="outline" onClick={() => props.setShowModal(false)}>Cancel</IonButton>
                        </IonCol>
                        <IonCol size="auto" >
                            <IonButton onClick={() => props.setShowModal(false)}>Save</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonModal>
    );
};

export default AddApartmentModal;
