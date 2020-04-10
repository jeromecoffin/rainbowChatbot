// Load the SDK
let RainbowSDK = require('rainbow-node-sdk');

// Define your configuration
let options = {
    "rainbow": {
        "host": "sandbox",
    },
    "credentials": {
        "login": "rainbow.chatbot.coffinjerome@gmail.com",
        "password": "*34)\"GNwOy?2"
    },
    // Application identifier
    "application": {
        "appID": "977a1ef07b0411ea88b46f998ddae648",
        "appSecret": "u0ObJJemgJk4pdV2JAkx3N4zAYsi8gIzSwgVkPzg3QClaDDHZnspYnKJPt0MEzrg",
    },
    // Logs options
    "logs": {
        "enableConsoleLogs": true,
        "enableFileLogs": false,
        "file": {
            "path": '/var/tmp/rainbowsdk/',
            "level": 'debug'
        }
    },
    // IM options
    "im": {
        "sendReadReceipt": false
    }
};

// Instantiate the SDK
let rainbowSDK = new RainbowSDK(options);

// Start the SDK
rainbowSDK.start();

rainbowSDK.events.on("rainbow_onmessagereceived", (message) => {
    // Check if the message is not from you
    if(!message.fromJid.includes(rainbowSDK.connectedUser.jid_im)) {
        // Check that the message is from a user and not a bot
        if( message.type === "chat") {
            // Answer to this user
            rainbowSDK.im.sendMessageToJid("hello! How may I help you?", message.fromJid);
            // Do something with the message sent
            ...
        }
    }
});

//if "sendReadReceipt": false
rainbowSDK.events.on('rainbow_onmessagereceived', (message) => {
    // do something with the message received
    ...
    // send manually a 'read' receipt to the sender
    rainbowSDK.im.markMessageAsRead(message);
});
