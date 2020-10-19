import React, { useState } from 'react';
import AppContext, { Appartment } from './app-context';

const AppContextProvider: React.FC = (props) => {
    const [appartments, setAppartments] = useState<Appartment[]>([])

    const addAppartment = (newAppartment: Appartment) => {

    }

    const deleteAppartment = (id: string) => {

    }

    const updateAppartment = (updateAppartment: Appartment) => {
    }

    return <AppContext.Provider value={{ appartments, addAppartment, deleteAppartment, updateAppartment }}>
        {props.children}
    </AppContext.Provider>
}

export default AppContextProvider