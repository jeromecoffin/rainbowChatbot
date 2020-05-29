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

//Instantiate a dialogflow client
const dialogflow = require('dialogflow');
//project id
const projectID = 'small-talks-ysnuou';

async function runSample(projectID, query, message){
    const sessionID = '123458';
    const languageCode = 'en-US';
    const credentials_fil_path ='C:\\Users\\camil\\Downloads\\small-talks-ysnuou-7bed293dbf2a.json';
    const sessionClient = new dialogflow.SessionsClient({
        projectID,
        keyFilename: credentials_fil_path,
    })
    console.log("-----------------------------------request agent-----------------------------");
    console.log("Message à envoyer à agnetl DialogFlow");
    console.log(query);
    console.log("projectID");
    console.log(projectID);
    console.log("sessionID");
    console.log(sessionID);
    console.log("credential_file_path");
    console.log(credentials_fil_path);
    console.log("sessionClient");
    console.log(sessionClient);

    const sessionPath = sessionClient.sessionPath(projectID, sessionID);

    const request = {
        session: sessionPath,

        queryInput: {
            text: {
                text: query,
                languageCode: 'en-US',
            },
        },
    };

    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent by agent dialogflow and answer');
    console.log(responses);
    const result = responses[0].queryResult;
    console.log(`query: ${result.queryText}`);
    console.log(`response: ${result.fulfillmentText}`);
    if(result.intent) {
        console.log(`Intent: ${result.intent.displayName}`);
    }
    else {
        console.log(`No intent matched`);
    }

}

runSample(projectID,"Camille", "");