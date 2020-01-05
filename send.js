var admin = require("firebase-admin");
var express = require('express');
var app = express();

var serviceAccount = require("./final-iot-3059e-firebase-adminsdk-aokfo-1afd04a985.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://final-iot-3059e.firebaseio.com"
});

var registrationToken = "<registration token goes here>";

var payload = {
    notification: {
        title: "Timbre",
        body: "Alguien tocó el timbre de tu puerta."
    }
};

var options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
};

// admin.messaging().sendToDevice(registrationToken, payload, options)
//     .then(function (response) {
//         console.log("Successfully sent message:", response);
//     })
//     .catch(function (error) {
//         console.log("Error sending message:", error);
//     });

app.post('/', function (req, res) {
    admin.messaging().send(payload)
        .then(function (response) {
            console.log("Successfully sent message:", response);
        })
        .catch(function (error) {
            console.log("Error sending message:", error);
        });
    res.send('Success!');
});

app.get('/', (req, res) => {
    res.send("Hola mundo");
})

app.listen(3000, function () {
    console.log('Server corriendo');
});