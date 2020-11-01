import React, { useState, useEffect, useRef } from 'react';
import AppContext, { Apartment, Profile, defaultProfile } from './app-context';

import { Plugins } from '@capacitor/core'

const { Storage, Filesystem } = Plugins;

const AppContextProvider: React.FC = (props) => {
    const [apartments, setApartments] = useState<Apartment[]>([])
    const [profile, setProfile] = useState<Profile>(defaultProfile)
    const didMountRef = useRef(false);

    useEffect(() => {
        if (didMountRef.current) {
            console.log(profile)
            Storage.set({ key: 'profile', value: JSON.stringify(profile) })
            Storage.set({ key: 'apartments', value: JSON.stringify(apartments) })
        } else {
            didMountRef.current = true;
        }
    }, [profile, apartments])

    const addApartment = (newapartment: Apartment) => {
        setApartments((prevState) => {
            let newList = [...prevState];
            newList.unshift(newapartment)
            return newList
        })
    }

    const deleteApartment = (id: string) => {
        const index = apartments.map(el => el.id).indexOf(id)
        setApartments((prevState) => {
            let newList = [...prevState];
            newList.splice(index, 1)
            return newList
        })
    }

    const updateApartment = (updateApartment: Apartment) => {
        const index = apartments.map(el => el.id).indexOf(updateApartment.id)
        setApartments((prevState) => {
            let newList = [...prevState];
            newList.splice(index, 1, updateApartment)
            return newList
        })
    }

    const updateProfile = (updateProfile: Profile) => {
        setProfile(updateProfile)
    }

    const initContext = async () => {
        const profileData = await Storage.get({ key: 'profile' })
        const apartmentsData = await Storage.get({ key: 'apartments' })
        const storedProfile = profileData.value ? JSON.parse(profileData.value) : defaultProfile;
        const storedApartments = apartmentsData.value ? JSON.parse(apartmentsData.value) : [];
        didMountRef.current = false;
        setProfile(storedProfile)
        setApartments(storedApartments)
    }

    return <AppContext.Provider value={{ initContext, apartments, profile, updateProfile, addApartment, deleteApartment, updateApartment }}>
        {props.children}
    </AppContext.Provider>
}

export default AppContextProvider