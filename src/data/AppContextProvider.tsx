import React, { useState, useEffect } from 'react';
import AppContext, { Apartment, Profile, defaultProfile } from './app-context';
import firebase from "../firebase";
import { useTranslation } from 'react-i18next';

const AppContextProvider: React.FC = (props) => {
    const [apartments, setApartments] = useState<Apartment[]>([])
    const [profile, setProfile] = useState<Profile>(defaultProfile)

    // Auth state
    const [user, setUser] = useState(null as firebase.User | null);
    const [loadingAuthState, setLoadingAuthState] = useState(true);

    const { i18n } = useTranslation();

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
                db.collection('Apartments').where("userId", "==", firebaseUser.uid)
                    .orderBy("addDate")
                    .onSnapshot(function (querySnapshot) {
                        let listApartments: Apartment[] = []
                        querySnapshot.forEach(function (doc) {
                            listApartments.push(doc.data() as Apartment);
                        });
                        setApartments(listApartments)
                    });

                /*
                var apartmentsRef = firebase.firestore().ref('Users/' + firebaseUser.uid + '/Apartments');
                apartmentsRef.on("child_added", function (snapshot) {
                    console.log(snapshot)
                });
                */
            }
        });
    }, []);

    const addApartment = async (newapartment: Apartment) => {

        /*
        setApartments((prevState) => {
            let newList = [...prevState];
            newList.unshift(newapartment)
            return newList
        })
        */
    }

    const deleteApartment = (apartment: Apartment) => {
        if (apartment.pictures.length > 0) {
            apartment.pictures.forEach(picture => {
                const storage = firebase.storage();
                const storageRef = storage.ref();
                const imageRef = storageRef.child(picture);
                imageRef.delete()
            });
        }
        const db = firebase.firestore();
        const docRef = db.collection('Apartments').doc(apartment.id);
        db.runTransaction(function (transaction) {
            return transaction.get(docRef).then(function (doc) {
                if (!doc.exists) {
                    console.log("Fail to delete apartment")
                } else {
                    transaction.delete(docRef)
                }
            })
        })
    }

    const updateApartment = (updatedApartment: Apartment) => {
        const db = firebase.firestore();
        const docRef = db.collection('Apartments').doc(updatedApartment.id);
        db.runTransaction(function (transaction) {
            return transaction.get(docRef).then(function (doc) {
                if (!doc.exists) {
                    console.log("Fail to update apartment")
                } else {
                    transaction.update(docRef, updatedApartment)
                }
            })
        })
    }

    const updateProfile = (updatedProfile: Profile) => {
        const db = firebase.firestore();
        const docRef = db.collection('Users').doc(user?.uid);
        db.runTransaction(function (transaction) {
            return transaction.get(docRef).then(function (doc) {
                if (!doc.exists) {
                    console.log("Fail to update profile")
                } else {
                    transaction.update(docRef, updatedProfile)
                }
            })
        })
    }

    const updateLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    }

    return <AppContext.Provider value={{
        apartments,
        addApartment,
        deleteApartment,
        updateApartment,

        profile,
        updateProfile,

        user,
        authenticated: user !== null,
        setUser,
        loadingAuthState,

        updateLanguage
    }}>
        {props.children}
    </AppContext.Provider>
}

export default AppContextProvider