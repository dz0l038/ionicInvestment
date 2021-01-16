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
import React, { useContext, useEffect, useState } from 'react';

import { useHistory, useParams } from 'react-router-dom';
import ApartmentInputItems from '../components/ApartmentInputItems';
import ApartmentInputNotes from '../components/ApartmentInputNotes';
import AppContext from '../data/app-context';
import { cashflow, monthLoanPrice, priceM2, profitability, loanAmount, totalPrice } from '../helpers/helpers';
import { ROUTE_LIST } from '../nav/Routes';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import ResponsiveContent from '../components/ResponsiveContent';
import firebase from '../firebase';
import 'firebase/storage';
import defaultPics from '../assets/default.png'
import ResponsiveCol from '../components/ResponsiveCol';
import { Trans, useTranslation } from 'react-i18next';

const { Camera } = Plugins;

const Details: React.FC = () => {
  const history = useHistory();
  const id = useParams<{ id: string }>().id;
  const [showAlert, setShowAlert] = useState(false);
  const [pictureUrl, setPictureUrl] = useState<string>();
  const appCtx = useContext(AppContext)
  const { t } = useTranslation('general');

  const apartment = appCtx.apartments.find(apartment => apartment.id === id)

  let loanTotal = 0;
  let loanPriceMonth = 0;
  let priceTotal = 0;
  if (apartment) {
    loanTotal = loanAmount(apartment.price, appCtx.profile.notaryFees, apartment.renovation, appCtx.profile.contribution)
    loanPriceMonth = monthLoanPrice(loanTotal, appCtx.profile.loanRate, appCtx.profile.insuranceRate, appCtx.profile.loanPeriod)
    priceTotal = totalPrice(apartment.price, appCtx.profile.notaryFees, apartment.renovation)
  }

  const deleteHandler = () => {
    console.log(apartment)
    if (apartment?.id) {
      appCtx.deleteApartment(apartment)
      history.goBack();
    }
  }

  const updateAddess = (newAddress: string) => {
    if (!apartment || !newAddress) return
    let updatedapartment = { ...apartment }
    updatedapartment.address = newAddress;
    appCtx.updateApartment(updatedapartment);
  }

  const updatePictureDisplayed = async () => {
    const storage = firebase.storage();
    const storageRef = storage.ref();
    if (!apartment || apartment.pictures.length < 1) return
    storageRef.child(apartment.pictures[0]).getDownloadURL().then(function (url) {
      console.log(url)
      setPictureUrl(url)
    })
  }

  const takePhotoHandler = async () => {
    const photo = await Camera.getPhoto({
      quality: 80,
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt,
      width: 500,
    });

    if (!photo || !photo.base64String || !apartment || !appCtx.user) return

    const fileName = appCtx.user.uid + '/' + apartment.id + '.jpeg';

    const storage = firebase.storage();
    const storageRef = storage.ref();
    const imageRef = storageRef.child(fileName);
    const uploadTask = await imageRef.putString(photo.base64String, 'base64')
    console.log(uploadTask)

    let updatedApartment = { ...apartment }
    updatedApartment.pictures = [fileName];
    appCtx.updateApartment(updatedApartment)
    updatePictureDisplayed();
  }

  useEffect(() => {
    updatePictureDisplayed()
  }, [apartment?.pictures])

  return (
    <IonPage>
      <IonHeader>
        <ResponsiveContent>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonBackButton defaultHref={ROUTE_LIST} />
            </IonButtons>
            <IonTitle>{apartment?.address}</IonTitle>
          </IonToolbar>
        </ResponsiveContent>
      </IonHeader>

      {apartment &&
        <IonContent className="ion-padding-bottom" >
          <IonSlides pager style={{ backgroundColor: "lightgrey" }}>
            <IonSlide>
              <IonImg style={{ height: "200px" }} src={pictureUrl ? pictureUrl : defaultPics} />
            </IonSlide>
          </IonSlides>

          <IonGrid>
            <IonRow>
              <ResponsiveCol>
                <IonGrid>
                  <IonRow className="ion-align-items-center">
                    <IonCol style={{ color: "grey" }}>
                      {apartment?.pictures.length} {t('apartment.picture')}
                    </IonCol>
                    <IonCol className="ion-text-end">
                      <IonButton onClick={takePhotoHandler} size="small" fill="outline">
                        <IonIcon icon={camera} />
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
                <IonList className="ion-padding-vertical" mode="ios">
                  <IonListHeader>{t('apartment.inputData')}</IonListHeader>
                  <IonItem>
                    <IonLabel onClick={() => setShowAlert(true)}>
                      {apartment?.address}
                    </IonLabel>
                  </IonItem>

                  <ApartmentInputItems field="price" apartment={apartment} friendlyName={t('apartment.price')} unit="€" />
                  <ApartmentInputItems field="surface" apartment={apartment} friendlyName={t('apartment.surface')} unit=" m²" />
                  <ApartmentInputItems field="renovation" apartment={apartment} friendlyName={t('apartment.renovation')} unit="€" />
                  <ApartmentInputItems field="charge" apartment={apartment} friendlyName={t('apartment.charge')} unit="€" />
                  <ApartmentInputItems field="rent" apartment={apartment} friendlyName={t('apartment.rent')} unit="€" />
                  <ApartmentInputItems field="vacancy" apartment={apartment} friendlyName={t('apartment.vacancy')} unit=" month" />
                  <ApartmentInputNotes apartment={apartment} />
                  <IonListHeader className="ion-padding-vertical" >Output data</IonListHeader>

                  <IonItem>
                    <IonLabel>
                      {t('apartment.pricem2buy')}
                    </IonLabel>
                    <IonNote slot="end">{priceM2(apartment.price, apartment.surface).toFixed(2)}€/m²</IonNote>
                  </IonItem>
                  <IonItem>
                    <IonLabel>
                      {t('apartment.pricem2rent')}
                    </IonLabel>
                    <IonNote slot="end">{priceM2(apartment.rent, apartment.surface).toFixed(2)}€/m²</IonNote>
                  </IonItem>
                  <IonItem>
                    <IonLabel>
                      <Trans>{t('apartment.loanAmount')}</Trans>
                      <p><Trans>{t('apartment.loanAmountSubtitle')}</Trans></p>
                    </IonLabel>
                    <IonNote slot="end">{loanTotal.toFixed(2)}€</IonNote>
                  </IonItem>
                  <IonItem>
                    <IonLabel>
                      {t('apartment.loanPrice')}
                    </IonLabel>
                    <IonNote slot="end">{loanPriceMonth.toFixed(2)}€</IonNote>
                  </IonItem>
                  <IonItem>
                    <IonLabel>
                      {t('apartment.profitability')}
                    </IonLabel>
                    <IonNote slot="end">{profitability(priceTotal, apartment.rent, apartment.vacancy, apartment.charge).toFixed(2)}%</IonNote>
                  </IonItem>
                  <IonItem>
                    <IonLabel>
                      {t('apartment.cashflow')}
                    </IonLabel>
                    <IonNote slot="end">{cashflow(loanPriceMonth, apartment.rent, apartment.vacancy, apartment.charge).toFixed(2)}€</IonNote>
                  </IonItem>
                </IonList>
                <IonGrid className="ion-margin-top">
                  <IonRow>
                    <IonCol className="ion-text-center">
                      <IonButton fill="outline" size="small" color="danger" onClick={deleteHandler}>
                        <IonIcon icon={trashOutline} slot="icon-only" />
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </ResponsiveCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      }

      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={'Update Address'}
        inputs={[
          {
            name: 'address',
            type: 'text',
            id: 'address-appart',
            value: apartment?.address,
            placeholder: 'Address'
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
            handler: (inputData) => updateAddess(inputData.address)
          }
        ]}
      />
    </IonPage>
  );
};

export default Details;
