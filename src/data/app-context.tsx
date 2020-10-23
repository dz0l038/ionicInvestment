import React from 'react';

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
}

export interface Profile {
    id: string,
    username: string,
    picture: string | null,
    loanRate: number,
    insuranceRate: number,
    loanPeriod: number,
    notaryFees: number,
    contribution: number
}

export type FinancialInfoFields = "loanRate" | "insuranceRate" | "loanPeriod" | "notaryFees" | "contribution";

export type ApartmentInputFields = "price" | "surface" | "renovation" | "rent" | "vacancy";

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
    initContext: () => void,
    apartments: Apartment[],
    addApartment: (newApartment: Apartment) => void,
    deleteApartment: (id: string) => void,
    updateApartment: (updatedApartment: Apartment) => void,
    profile: Profile,
    updateProfile: (updatedProfile: Profile) => void
}

const AppContext = React.createContext<AppContext>({
    initContext: () => {},
    apartments: [],
    addApartment: () => { },
    deleteApartment: () => { },
    updateApartment: () => { },
    profile: defaultProfile,
    updateProfile: () => { }
});

export default AppContext