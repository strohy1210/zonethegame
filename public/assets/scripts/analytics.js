var config = {
  apiKey: "AIzaSyBL2Ch4q1Oi6ex7uvmZlUAo2MFOBwwd0Ow",
  authDomain: "project-1367028999804294771.firebaseapp.com",
  databaseURL: "https://project-1367028999804294771.firebaseio.com",
  storageBucket: "project-1367028999804294771.appspot.com",
};

firebase.initializeApp(config);


var usersRef = firebase.database().ref("users");

function writeUserData(userId, email) {
  firebase.database().ref('users/' + userId).set({
    email: email
  });
}

function authorizeCode(code) {
  if (code === secretCode) {
    return true;
  } else {
    return false;
  }
}

function writeSecondaryUserData(userId, deviceId) {
  firebase.database().ref('users/' + userId).push({
    deviceId: deviceId,
    codeEntered: true
  });
}
 
var user = firebase.auth().currentUser;

var secretCode = "9Op240sK";

function formatTime(seconds) {

  var date = new Date(null);
  date.setSeconds(seconds); // specify value for SECONDS here
  return date.toISOString().substr(11, 8).slice(4,8);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



// usersRef.orderByChild("score").once("value", function(snap) { 


//   var users = _.values(snap.val());
//   var usersInOrder = _.sortBy( users, 'score' ).reverse();
//   var j=0;
//   for (j; j <= users.length; j++) {  
//     $("tbody").append("<tr><td align='center'>" + parseInt(j+1) + "</td><td align='center' class='player-icon'> <img src='" + usersInOrder[j].image_url + "'> </td><td>" + usersInOrder[j].first_name + "</td><td>" + numberWithCommas(usersInOrder[j].score) +  "</td><td>" + formatTime(usersInOrder[j].time) + "</td></tr>");

//   }

// // });

window.onload = function() {
  initApp();
};

