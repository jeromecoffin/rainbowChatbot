// Load the SDK
let RainbowSDK = require('rainbow-node-sdk');


// Define your configuration
let options = {
    "rainbow": {
        "host": "sandbox",                      
    },
    "credentials": {
        "login": "rainbow.chatbot.camilleleou@gmail.com",  
        "password": "ir6AWPPiJj^5"   
    },
    // Application identifier
    "application": {
        "appID": "675ac1907b0711ea88b46f998ddae648", 
        "appSecret": "7PCkrHyo0SgPeKfOrq8tKBI8EDLTUFcjKWQ7skR4ckGxj7u3paYFMr1tqoGE0rpa", 
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
rainbowSDK.start().then(() => {
    // Do something when the SDK is connected to Rainbow

    rainbowSDK.events.on("rainbow_onmessagereceived", (message) => {

        rainbowSDK.im.markMessageAsRead(message);
        // Check if the message is not from you
        if(!message.fromJid.includes(rainbowSDK.connectedUser.jid_im)) {
            // Check that the message is from a user and not a bot
            if( message.type === "chat") {
                // Answer to this user

                console.log(message);
                rainbowSDK.im.sendMessageToJid("hello! How may I help you?", message.fromJid);
                // Do something with the message sent
                
            }
        }
    });

});

