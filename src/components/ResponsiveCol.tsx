import { IonCol } from '@ionic/react';
import React from 'react';

const ResponsiveCol: React.FC = (props) => (
    <IonCol sizeSm="10" sizeMd="8" offsetSm="1" offsetMd="2">
        {props.children}
    </IonCol>
)

export default ResponsiveCol