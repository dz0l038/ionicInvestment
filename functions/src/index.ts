import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

exports.createUserDB = functions.region('europe-west1').auth.user().onCreate(async (user) => {
    const db = admin.firestore();
    const newUser = {
        uid: user.uid,
        email: user.email,
        username: "No username",
        contribution: 0,
        insuranceRate: 0.35,
        loanPeriod: 19,
        loanRate: 2,
        notaryFees: 8,
        picture: null,
        lng: 'fr',
    }
    await db.collection("Users")
        .doc(user.uid)
        .set(newUser)
});


exports.cleanUserOnDelete = functions.region('europe-west1').auth.user().onDelete((user) => {
    // ...
});