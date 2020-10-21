import { IonAlert, IonItem, IonLabel, IonNote } from '@ionic/react';
import React, { useContext, useState } from 'react';
import AppContext, { Apartment } from '../data/app-context';


const ApartmentInputNotes: React.FC<{ apartment: Apartment }> = (props) => {
    const appCtx = useContext(AppContext)
    const [showAlert, setShowAlert] = useState(false);

    const update = (data: string) => {
        let updatedApartment = { ...props.apartment }
        updatedApartment.notes = data;
        appCtx.updateApartment(updatedApartment);
    }
    return (
        <IonItem className="ion-margin-bottom">
            <IonLabel onClick={() => setShowAlert(true)}>
                <p>{props.apartment.notes}</p>
            </IonLabel>
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header='Notes'
                inputs={[
                    {
                        name: 'notes',
                        type: 'textarea',
                        id: `apartment-notes`,
                        value: props.apartment.notes,
                        placeholder: 'Your notes'
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
                        handler: (alertData) => update(alertData['notes'])
                    }
                ]} />
        </IonItem>
    )
}

export default ApartmentInputNotes