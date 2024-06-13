// firebaseConfig.js

import { initializeApp, getApps } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseBarcodeConfig = {
    apiKey: "TU_API_KEY_DE_BARCODES",
    authDomain: "TU_AUTH_DOMAIN_DE_BARCODES",
    databaseURL: "https://barcodedb-38f77-default-rtdb.firebaseio.com",
    projectId: "barcodedb-38f77",
    storageBucket: "barcodedb-38f77.appspot.com",
    messagingSenderId: "1044231699106",
    appId: "1:1044231699106:web:fc68e341755785d5b635fb",
    measurementId: "G-5QM4YPM0NW"
};

let barcodeApp;
if (!getApps().some(app => app.name === 'barcodeApp')) {
    barcodeApp = initializeApp(firebaseBarcodeConfig, 'barcodeApp');
} else {
    barcodeApp = getApps().find(app => app.name === 'barcodeApp');
}

const database = getDatabase(barcodeApp);

export { database };