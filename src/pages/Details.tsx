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
import React, { useContext, useState } from 'react';

import { useHistory, useParams } from 'react-router-dom';
import ApartmentCard from '../components/ApartmentCard';
import ApartmentInputItems from '../components/ApartmentInputItems';
import ApartmentInputNotes from '../components/ApartmentInputNotes';
import AppContext from '../data/app-context';
import { cashflow, monthLoanPrice, priceM2, profitability, loanAmount, totalPrice } from '../helpers/helpers';
import { ROUTE_LIST } from '../nav/Routes';

const Details: React.FC = () => {
  const history = useHistory();
  const id = useParams<{ id: string }>().id;
  const [showAlert, setShowAlert] = useState(false);
  const appCtx = useContext(AppContext)
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
      appCtx.deleteApartment(apartment.id)
      history.goBack();
    }
  }

  const updateAddess = (newAddress: string) => {
    if (!apartment || !newAddress) return
    let updatedapartment = { ...apartment }
    updatedapartment.address = newAddress;
    appCtx.updateApartment(updatedapartment);
  }

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

      {apartment &&
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
                  <ApartmentInputNotes apartment={apartment} />
                  <ApartmentInputItems field="price" apartment={apartment} friendlyName="Price" unit="€" />
                  <ApartmentInputItems field="surface" apartment={apartment} friendlyName="Surface" unit=" m²" />
                  <ApartmentInputItems field="renovation" apartment={apartment} friendlyName="Renovation" unit="€" />
                  <ApartmentInputItems field="rent" apartment={apartment} friendlyName="Rent" unit="€" />
                  <ApartmentInputItems field="vacancy" apartment={apartment} friendlyName="Vacancy" unit=" month" />
                  
                  <IonListHeader className="ion-padding-vertical" >Output data</IonListHeader>
                  <IonItem>
                    <IonLabel>
                      Price per m² (buy)
                  </IonLabel>
                    <IonNote slot="end">{priceM2(apartment.price, apartment.surface).toFixed(2)}€/m²</IonNote>
                  </IonItem>
                  <IonItem>
                    <IonLabel>
                      Price per m² (rent)
                  </IonLabel>
                    <IonNote slot="end">{priceM2(apartment.rent, apartment.surface).toFixed(2)}€/m²</IonNote>
                  </IonItem>
                  <IonItem>
                    <IonLabel>
                      Loan amount (price + notary fees + renovation - contribution)
                  </IonLabel>
                    <IonNote slot="end">{loanTotal.toFixed(2)}€</IonNote>
                  </IonItem>
                  <IonItem>
                    <IonLabel>
                      Loan price (month)
                  </IonLabel>
                    <IonNote slot="end">{loanPriceMonth.toFixed(2)}€</IonNote>
                  </IonItem>
                  <IonItem>
                    <IonLabel>
                      Profitability
                  </IonLabel>
                    <IonNote slot="end">{profitability(priceTotal, apartment.rent, apartment.vacancy).toFixed(2)}%</IonNote>
                  </IonItem>
                  <IonItem>
                    <IonLabel>
                      Cashflow
                  </IonLabel>
                    <IonNote slot="end">{cashflow(loanPriceMonth, apartment.rent, apartment.vacancy).toFixed(2)}€</IonNote>
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
              </IonCol>
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
