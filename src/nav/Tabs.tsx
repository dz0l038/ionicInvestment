import React from 'react';
import { Redirect, Route} from 'react-router-dom';
import {
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs
} from '@ionic/react';

import { list, personCircleOutline, trophyOutline } from 'ionicons/icons'
import List from '../pages/List';
import Profile from '../pages/Profile';
import { ROUTE_LIST, ROUTE_PROFILE, ROUTE_TABS_BASE } from './Routes';

const Tabs: React.FC = () => (
    <IonTabs>
        <IonRouterOutlet>
            <Route path={ROUTE_LIST} component={List} exact />
            <Route path={ROUTE_PROFILE} component={Profile} exact />
            <Redirect path={ROUTE_TABS_BASE} exact to={ROUTE_LIST} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
            <IonTabButton tab="List" href={ROUTE_LIST}>
                <IonIcon icon={list} />
                <IonLabel>List</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Profile" href={ROUTE_PROFILE}>
                <IonIcon icon={personCircleOutline} />
                <IonLabel>Profile</IonLabel>
            </IonTabButton>
        </IonTabBar>
    </IonTabs>
);

export default Tabs;
