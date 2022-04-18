const Evernote = require('evernote');

// issued at 2020-01-08
const token =
    'S=s1:U=95a3b:E=176db12f4c3:C=16f8361c788:P=185:A=aokayama:V=2:H=6c19448620c280ce3f84dadcb2f062d4';
const client = new Evernote.Client({
    token: token,
    sandbox: true,
    china: false
});

console.log(client);
client
    .getNoteStore()
    .listNotebooks()
    .then(function() {
        console.log(arguments);
    });
