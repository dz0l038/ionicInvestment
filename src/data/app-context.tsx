import React from 'react';

export interface Appartment {
    id: string,
    address: string,
    price: number,
    profitability: number,
    addDate: string,
    notes: string,
    pictures: string[],
    surface: number,
    renovation: number,
    rent: number,
    vacancy: number,
    priceM2: number,
    priceRentM2: number,
    loan: number,
    cashflow: number
}

export interface Profil {
    id: string,
    username: string,
}

interface AppContext {
    appartments: Appartment[],
    addAppartment: (newAppartment: Appartment) => void,
    deleteAppartment: (id: string) => void,
    updateAppartment: (updatedAppartment: Appartment) => void
}

const AppContext = React.createContext<AppContext>({
    appartments: [],
    addAppartment: () => { },
    deleteAppartment: () => { },
    updateAppartment: () => { }
});

export default AppContext