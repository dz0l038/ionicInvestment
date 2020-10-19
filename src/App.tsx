import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Details';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/theme.css';

/* Routes */
import { ROUTE_DETAIL, ROUTE_LIST, ROUTE_TABS_BASE } from './nav/Routes';
import Details from './pages/Details';
import Tabs from './nav/Tabs';
import AppContextProvider from './data/AppContextProvider';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <AppContextProvider>
        <IonRouterOutlet>
          <Route path={ROUTE_TABS_BASE} component={Tabs} />
          <Route exact path={`${ROUTE_DETAIL}:id`} component={Details} />
          <Redirect path="/" exact to={ROUTE_LIST} />
        </IonRouterOutlet>
      </AppContextProvider>
    </IonReactRouter>
  </IonApp>
);

export default App;
