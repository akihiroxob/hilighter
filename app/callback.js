const query = window.location.search.substr(1);
const verifier = query
    .split('&')
    .find(q => q.match('oauth_verifier'))
    .split('=')[1];

const BG = chrome.extension.getBackgroundPage();
BG.getAccessToken(verifier);
