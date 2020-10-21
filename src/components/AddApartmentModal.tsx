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
    IonTextarea,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import { cameraOutline } from 'ionicons/icons';
import React, { useContext, useRef } from 'react';
import AppContext, { Apartment } from '../data/app-context';

const AddApartmentModal: React.FC<{ showModal: boolean, setShowModal: (value: boolean) => void }> = (props) => {
    const addressRef = useRef<HTMLIonInputElement>(null);
    const priceRef = useRef<HTMLIonInputElement>(null);
    const surfaceRef = useRef<HTMLIonInputElement>(null);
    const renovationRef = useRef<HTMLIonInputElement>(null);
    const rentRef = useRef<HTMLIonInputElement>(null);
    const vacancyRef = useRef<HTMLIonInputElement>(null);
    const noteRef = useRef<HTMLIonTextareaElement>(null);
    const appCtx = useContext(AppContext);

    const addHandler = () => {
        let newApartment: Apartment = {
            id: new Date().toISOString(),
            address: addressRef.current?.value? addressRef.current?.value?.toString(): "Unknown address",
            price: priceRef.current?.value ? +priceRef.current?.value : 0,
            addDate: new Date().toISOString(),
            notes: noteRef.current?.value?.toString(),
            pictures: [],
            surface: surfaceRef.current?.value ? +surfaceRef.current?.value : 0,
            renovation: renovationRef.current?.value ? +renovationRef.current?.value : 0,
            rent: rentRef.current?.value ? +rentRef.current?.value : 0,
            vacancy: vacancyRef.current?.value ? +vacancyRef.current?.value : 0,
        }
        appCtx.addApartment(newApartment)
        props.setShowModal(false)
    }

    return (
        <IonModal isOpen={props.showModal}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Add new apartment</IonTitle>
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
                        <IonInput ref={addressRef} value="New Address"></IonInput>
                    </IonItem>
                    <IonListHeader className="ion-margin-top">Financial</IonListHeader>
                    <IonItem>
                        <IonLabel position="floating">Price</IonLabel>
                        <IonInput type="number" ref={priceRef} value={100000}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Surface</IonLabel>
                        <IonInput type="number" ref={surfaceRef} value={5}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Renovation</IonLabel>
                        <IonInput type="number" ref={renovationRef} value={0}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Rent</IonLabel>
                        <IonInput type="number" ref={rentRef} value={500}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Vacancy</IonLabel>
                        <IonInput type="number" ref={vacancyRef} value={0}></IonInput>
                    </IonItem>
                    <IonItem className="ion-padding-top">
                        <IonTextarea rows={5} placeholder="Enter any notes here..." ref={noteRef}></IonTextarea>
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
                            <IonButton onClick={addHandler}>Save</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonModal>
    );
};

export default AddApartmentModal;
