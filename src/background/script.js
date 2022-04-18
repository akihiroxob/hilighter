import Evernote from 'evernote';

global.Evernote = Evernote;
global.startOauth = () => {
    const callbackUrl = chrome.extension.getURL('callback.html');
    const client = new Evernote.Client({
        consumerKey: 'aokayama',
        consumerSecret: 'b6abf69881b8f6bd',
        sandbox: true
    });

    client.getRequestToken(callbackUrl, function(
        error,
        oauthToken,
        oauthTokenSecret
    ) {
        if (error) {
            // do your error handling here
            console.log(error);
        }

        const authUrl = client.getAuthorizeUrl(oauthToken); // send the user to Evernote
        window.localStorage.setItem(
            'token',
            JSON.stringify({oauthToken, oauthTokenSecret})
        );
        console.log(window.location.origin);
        console.log(window.localStorage);
        console.log(authUrl);
        window.open(authUrl, '_blank');
    });
};

global.getAccessToken = function(oauth_verifier) {
    const str = window.localStorage.getItem('token');
    const token = JSON.parse(str);
    console.log(token);

    const client = new Evernote.Client({
        consumerKey: 'aokayama',
        consumerSecret: 'b6abf69881b8f6bd',
        sandbox: true
    });

    client.getAccessToken(
        token.oauthToken,
        token.oauthTokenSecret,
        oauth_verifier,
        function(error, oauthToken, oauthTokenSecret, results) {
            if (error) {
                // do your error handling
                console.log(error);
            } else {
                console.log(results);
                window.localStorage.setItem('oauth_token', oauthToken);
                global.getNoteList(oauthToken);
            }
        }
    );
};

global.getNoteList = oauthToken => {
    // oauthAccessToken is the token you need;
    var authenticatedClient = new Evernote.Client({
        token: oauthToken,
        sandbox: true,
        china: false
    });

    console.log('getNoteStore is start');
    // Set up the NoteStore client
    const noteStore = authenticatedClient.getNoteStore();

    // Make API calls
    noteStore.listNotebooks().then(function(notebooks) {
        // notebooks is the list of Notebook objects
        for (let i in notebooks) {
            console.log('Notebook: ' + notebooks[i].name);
        }
    });
};
