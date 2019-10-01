chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
    function(tabs){
        alert("New Version Loaded Succesfully");
    }
);

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        //This is where we are going to send a message to the python server to store in
        //our database
        alert("sending to server " + tabs[0].url);
        send_url(tabs[0].url)
    });
});


function send_url(url_to_send){
    var request = new XMLHttpRequest();
    request.open("POST", "http://127.0.0.1:8000/json-example", true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify({url: url_to_send}));
}




//chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
//   function(tabs){
//      alert(tabs[0].url);
//   }
//);
