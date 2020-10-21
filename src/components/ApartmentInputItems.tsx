import { IonAlert, IonItem, IonLabel, IonNote } from '@ionic/react';
import React, { useContext, useState } from 'react';
import AppContext, { Apartment, ApartmentInputFields } from '../data/app-context';


const ApartmentInputItems: React.FC<{ field: ApartmentInputFields, apartment: Apartment, friendlyName: string, unit: string }> = (props) => {
    const appCtx = useContext(AppContext)
    const [showAlert, setShowAlert] = useState(false);

    const update = (data: number) => {
        let updatedApartment = {...props.apartment }
        updatedApartment[props.field] = +data;
        appCtx.updateApartment(updatedApartment);
    }
    return (
        <IonItem>
            <IonLabel>
                {props.friendlyName}
            </IonLabel>
            <IonNote onClick={() => setShowAlert(true)} slot="end">{props.apartment[props.field]}{props.unit}</IonNote>
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header={props.friendlyName}
                inputs={[
                    {
                        name: props.field,
                        type: 'number',
                        id: `apartment-${props.field}`,
                        value: props.apartment[props.field],
                        placeholder: 'Your ' + props.friendlyName
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
                        handler: (alertData) => update(alertData[props.field])
                    }
                ]} />
        </IonItem>
    )
}

export default ApartmentInputItems