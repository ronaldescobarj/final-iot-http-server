var admin = require("firebase-admin");

var serviceAccount = require("./final-iot-3059e-firebase-adminsdk-aokfo-1afd04a985.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://final-iot-3059e.firebaseio.com"
});

var registrationToken = "<registration token goes here>";

var payload = {
    notification: {
        title: "Account Deposit",
        body: "A deposit to your savings account has just cleared."
    }
};

var options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
};

admin.messaging().sendToDevice(registrationToken, payload, options)
    .then(function (response) {
        console.log("Successfully sent message:", response);
    })
    .catch(function (error) {
        console.log("Error sending message:", error);
    });

admin.messaging().send()