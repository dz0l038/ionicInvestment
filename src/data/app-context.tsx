import React from 'react';
import firebase from "../firebase";

export interface Apartment {
    id: string,
    address: string,
    price: number,
    addDate: string,
    notes: string | undefined,
    pictures: string[],
    surface: number,
    renovation: number,
    rent: number,
    vacancy: number,
    charge: number,
    userId?: string,
}

export interface Profile {
    id: string,
    username: string,
    picture: string | null,
    loanRate: number,
    insuranceRate: number,
    loanPeriod: number,
    notaryFees: number,
    contribution: number,
    lng?: string,
}

export type FinancialInfoFields = "loanRate" | "insuranceRate" | "loanPeriod" | "notaryFees" | "contribution";

export type ApartmentInputFields = "price" | "surface" | "renovation" | "rent" | "vacancy" | "charge";

export const defaultProfile: Profile = {
    id: '0',
    username: "Unknown",
    picture: null,
    loanRate: 2,
    insuranceRate: 0.35,
    loanPeriod: 20,
    notaryFees: 8,
    contribution: 0
}

interface AppContext {
    apartments: Apartment[],
    addApartment: (newApartment: Apartment) => void,
    deleteApartment: (apartment: Apartment) => void,
    updateApartment: (updatedApartment: Apartment) => void,


    profile: Profile,
    updateProfile: (updatedProfile: Profile) => void,

    user: firebase.User | null,
    authenticated: boolean,
    setUser: any,
    loadingAuthState: boolean,

    updateLanguage: (lng: string) => void,
}

const AppContext = React.createContext<AppContext>({
    apartments: [],
    addApartment: () => { },
    deleteApartment: () => { },
    updateApartment: () => { },

    profile: defaultProfile,
    updateProfile: () => { },

    user: null,
    authenticated: false,
    setUser: () => { },
    loadingAuthState: false,

    updateLanguage: () => { },
});

export default AppContext