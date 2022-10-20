

let TOKEN = null;  //also takes care of the signed in/out state
let btn = document.getElementById("signInAndOutButton");

let feedbackMsg = document.getElementById("feedbackMsg");

btn.onclick = function () {

    if (TOKEN == null) {

        chrome.identity.getAuthToken({ 'interactive': true }, function (token) {
            // Use the token.
            TOKEN = token;
            console.log('TOKEN : ' + TOKEN);
            fetch('https://www.googleapis.com/oauth2/v3/userinfo?access_token=' + token)
                .then((response) => response.json())
                .then((response) => {
                    console.log(response);
                    btn.textContent = 'Sign Out'
                    feedbackMsg.innerHTML = "Welcome :" + response.email;
                }).catch((_) => {
                    feedbackMsg.innerHTML = "Failed to sign in, please try again";
                });


            // https://gmail.googleapis.com/gmail/v1/users/me/messages?alt=json&access_token=
            fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/183f6ed558919fb5?alt=json&access_token=' + TOKEN)
                .then((response) => response.json())
                .then((response) => console.log(response));


        });


    }
    else {
        //revoke the token.
        fetch('https://accounts.google.com/o/oauth2/revoke?token=' + TOKEN)
            .then((response) => response.json())
            .then((response) => console.log(response));

        //remove the revoked token from identity cache.
        chrome.identity.clearAllCachedAuthTokens(
            function () {
                console.log('Cleared token cache');
            },
        );
        TOKEN = null;
        feedbackMsg.innerHTML = "Signed Out!";
    }


}
