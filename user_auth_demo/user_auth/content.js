window.onload = function () {
    alert(
        'Page is fully loaded'
    );
    const tbody = document.querySelector("tbody");
    console.log(tbody);
    alert(
        tbody.rows
    );

    auth2Client.setCredential(TOKEN);

};
