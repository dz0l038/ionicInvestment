import React, { useContext, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

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
import AuthRoutes from './nav/AuthRoutes';
import PrivateRoute from './nav/PrivateRoutes';

// Import translations
import './translations/i18n';

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Switch>
            <PrivateRoute path={ROUTE_TABS_BASE} component={Tabs} />
            <PrivateRoute exact path={`${ROUTE_DETAIL}:id`} component={Details} />
            <Route path="/auth" component={AuthRoutes} />
            <Redirect path="/" to={ROUTE_LIST} />
          </Switch>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
