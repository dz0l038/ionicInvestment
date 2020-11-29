import {
    IonAlert,
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
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
import React, { useContext, useRef, useState } from 'react';
import AppContext, { Apartment } from '../data/app-context';
import AddPictureNewApartment, { Picture } from './AddPictureNewApartment';
import { v4 as uuidv4 } from 'uuid';
import firebase from "../firebase";
import 'firebase/storage';

const AddApartmentModal: React.FC<{ showModal: boolean, setShowModal: (value: boolean) => void }> = (props) => {
    const [address, setAddress] = useState<string>("New Address")
    const [surface, setSurface] = useState<number>(50)
    const [price, setPrice] = useState<number>(100000)
    const [renovation, setRenovation] = useState<number>(1000)
    const [rent, setRent] = useState<number>(500)
    const [vacancy, setVacancy] = useState<number>(0)
    const [note, setNote] = useState<string>("")
    const appCtx = useContext(AppContext);
    const [picture, setPicture] = useState<Picture>();
    const apartUuid = useRef<string>(uuidv4())
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();

    const resetModal = () => {
        setPicture(undefined)
        apartUuid.current = uuidv4();
    }

    const addHandler = async () => {
        if (!appCtx.user?.uid) return
        // Save picture on firebase
        let pictures: string[] = [];
        if (picture && picture.base64) {
            const newPictureName = appCtx.user.uid + '/' + apartUuid.current + '.jpeg';
            const storage = firebase.storage();
            const storageRef = storage.ref();
            const imageRef = storageRef.child(newPictureName);
            await imageRef.putString(picture.base64, 'base64')
            pictures.push(newPictureName)
        }

        let newApartment: Apartment = {
            id: apartUuid.current,
            userId: appCtx.user?.uid,
            address: address ? address.toString() : "Unknown address",
            price: price ? +price : 0,
            addDate: new Date().toISOString(),
            notes: note.toString(),
            pictures: pictures,
            surface: surface? +surface : 0,
            renovation: renovation ? +renovation : 0,
            rent: rent ? +rent : 0,
            vacancy: vacancy ? +vacancy : 0,
        }

        const db = firebase.firestore();
        await db.collection(`Apartments`)
            .doc(newApartment.id)
            .set(newApartment)
            .then(() => {
                props.setShowModal(false)
            })
            .catch(error => {
                setErrorMessage(error.message)
                setShowAlert(true)
            });
    }

    const updatePicture = (newPicture: Picture) => {
        setPicture(newPicture)
    }

    return (
        <IonModal isOpen={props.showModal} onDidPresent={resetModal}>
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
                        <IonInput onIonChange={(e) => {if (e.detail.value) setAddress(e.detail.value)}} value={address}></IonInput>
                    </IonItem>
                    <IonListHeader className="ion-margin-top">Financial</IonListHeader>
                    <IonItem>
                        <IonLabel position="floating">Price</IonLabel>
                        <IonInput value={price} onIonChange={(e) => {if (e.detail.value) setPrice(+e.detail.value)}} type="number"></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Surface</IonLabel>
                        <IonInput value={surface} onIonChange={(e) => {if (e.detail.value) setSurface(+e.detail.value)}} type="number" ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Renovation</IonLabel>
                        <IonInput value={renovation} onIonChange={(e) => {if (e.detail.value) setRenovation(+e.detail.value)}} type="number"></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Rent</IonLabel>
                        <IonInput value={rent} onIonChange={(e) => {if (e.detail.value) setRent(+e.detail.value)}} type="number"></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Vacancy</IonLabel>
                        <IonInput value={vacancy} onIonChange={(e) => {if (e.detail.value) setVacancy(+e.detail.value)}} type="number"></IonInput>
                    </IonItem>
                    <IonItem className="ion-padding-top">
                        <IonTextarea value={note} onIonChange={(e) => {if (e.detail.value) setNote(e.detail.value)}} rows={5} placeholder="Enter any notes here..."></IonTextarea>
                    </IonItem>
                    <AddPictureNewApartment updatePicture={updatePicture} />
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
            <IonAlert
                isOpen={showAlert}
                header={errorMessage}
                onDidDismiss={() => { setErrorMessage(""); setShowAlert(false) }}
                buttons={[
                    {
                        text: 'Ok'
                    }
                ]}
            />
        </IonModal>
    );
};

export default AddApartmentModal;
