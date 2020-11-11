import React, { useState, useEffect, useRef } from 'react';
import AppContext, { Apartment, Profile, defaultProfile } from './app-context';
import firebase from "../firebase";

import { Plugins } from '@capacitor/core'

const { Storage, Filesystem } = Plugins;

const AppContextProvider: React.FC = (props) => {
    const [apartments, setApartments] = useState<Apartment[]>([])
    const [profile, setProfile] = useState<Profile>(defaultProfile)

    // Auth state
    const [user, setUser] = useState(null as firebase.User | null);
    const [loadingAuthState, setLoadingAuthState] = useState(true);

    const didMountRef = useRef(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user: any) => {
            setUser(user);
            setLoadingAuthState(false);
            let firebaseUser = user as firebase.User;
            const db = firebase.firestore();
            if (firebaseUser && firebaseUser.uid) {
                db.collection("Users").doc(firebaseUser.uid)
                    .onSnapshot(function (doc) {
                        const updatedProfile = doc.data() as Profile;
                        console.log("Current data: ", updatedProfile);
                        setProfile(updatedProfile)
                    });
            }
        });
    }, []);

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

    return <AppContext.Provider value={{
        initContext,

        apartments,
        addApartment,
        deleteApartment,
        updateApartment,

        profile,
        updateProfile,

        user,
        authenticated: user !== null,
        setUser,
        loadingAuthState
    }}>
        {props.children}
    </AppContext.Provider>
}

export default AppContextProvider