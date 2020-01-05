var admin = require("firebase-admin");
var express = require('express');
var cors = require('cors')
var app = express();
app.use(cors());
var serviceAccount = require("./final-iot-3059e-firebase-adminsdk-aokfo-1afd04a985.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://final-iot-3059e.firebaseio.com"
});

var registrationToken = "dbeRQk-3EUM:APA91bHVIo_cLjaO8GRqqI-xFbeshrhqmhYINuVyoZsuqw4Ke00JwxDyWEEam6OhVaju66Y-r4kgyJM-HW4kT6o00DwGThwK7fJdGZNiS8pggzm6ZOvnyUvmHXtMcug8XPuvoqEoRuaj";

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



app.post('/timbre', function (req, res) {
    // admin.messaging().send(payload)
    //     .then(function (response) {
    //         console.log("Successfully sent message:", response);
    //     })
    //     .catch(function (error) {
    //         console.log("Error sending message:", error);
    //     });
    admin.messaging().sendToDevice(registrationToken, payload, options)
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

app.listen(process.env.PORT || 3000, function () {
    console.log('Server corriendo');
});