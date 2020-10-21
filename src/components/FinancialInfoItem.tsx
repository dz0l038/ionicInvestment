import { IonAlert, IonItem, IonLabel, IonNote } from '@ionic/react';
import React, { useContext, useState } from 'react';
import AppContext, { FinancialInfoFields } from '../data/app-context';


const FinancialInfoItem: React.FC<{ field: FinancialInfoFields, friendlyName: string, unit: string }> = (props) => {
    const appCtx = useContext(AppContext)
    const [showAlert, setShowAlert] = useState(false);

    const update = (data: number) => {
        let updatedProfile = { ...appCtx.profile }
        updatedProfile[props.field] = data;
        appCtx.updateProfile(updatedProfile);
    }
    return (
        <IonItem>
            <IonLabel>
                {props.friendlyName}
            </IonLabel>
            <IonNote onClick={() => setShowAlert(true)} slot="end">{appCtx.profile[props.field]}{props.unit}</IonNote>
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header={props.friendlyName}
                inputs={[
                    {
                        name: props.field,
                        type: 'number',
                        id: `profile-${props.field}`,
                        value: appCtx.profile[props.field],
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

export default FinancialInfoItem