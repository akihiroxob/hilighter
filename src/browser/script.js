import {type} from 'os';

(function() {
    const BG = chrome.extension.getBackgroundPage();
    const token = window.localStorage.getItem('oauth_token');
    if (!token) {
        BG.startOauth();
        return;
    }

    BG.getNoteList(token);
})();
