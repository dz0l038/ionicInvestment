import { IonCol, IonRow, IonSegment, IonSegmentButton } from '@ionic/react';
import React, { useContext, useState } from 'react';
import fr_flag from '../assets/flags/iconfinder_France_flat_92086.png'
import en_flag from '../assets/flags/iconfinder_United-Kingdom_flat_92402.png'
import AppContext from '../data/app-context';

const SelectLanguage: React.FC = () => {
    const [lng, setLng] = useState<string>('fr')
    const appCtx = useContext(AppContext)

    const updateLng = (newLng: string | undefined) => {
        if (!newLng) return
        appCtx.updateLanguage(newLng)
        setLng(newLng)
    }
    return (
        <IonRow>
            <IonCol sizeSm="10" sizeMd="8" offsetSm="1" offsetMd="2">
                <IonSegment value={lng} onIonChange={e => updateLng(e.detail.value)}>
                    <IonSegmentButton value="fr">
                        <img height="15px" src={fr_flag} />
                    </IonSegmentButton>
                    <IonSegmentButton value="en">
                        <img height="15px" src={en_flag} />
                    </IonSegmentButton>
                </IonSegment>
            </IonCol>
        </IonRow>
    )
}

export default SelectLanguage