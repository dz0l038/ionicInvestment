import { IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import ResponsiveCol from './ResponsiveCol';

const ResponsiveContent: React.FC = (props) => (
    <IonGrid className="ion-no-padding">
        <IonRow>
            <ResponsiveCol>
                {props.children}
            </ResponsiveCol>
        </IonRow>
    </IonGrid>
)

export default ResponsiveContent