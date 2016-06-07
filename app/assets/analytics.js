// Initialize Firebase
var config = {
  apiKey: "AIzaSyAOMjaCTrkHpwLMyM_jYBC1I6wE7jbFN4s",
  authDomain: "flickering-fire-1102.firebaseapp.com",
  databaseURL: "https://flickering-fire-1102.firebaseio.com",
  storageBucket: "flickering-fire-1102.appspot.com",
};
firebase.initializeApp(config);

// $('#login-signup-page').hide();

var usersRef = firebase.database().ref("users");


function formatTime(seconds) {

  var date = new Date(null);
  date.setSeconds(seconds); // specify value for SECONDS here
  return date.toISOString().substr(11, 8).slice(4,8);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

usersRef.orderByChild("score").once("value", function(snap) { 


  var users = _.values(snap.val());
  var usersInOrder = _.sortBy( users, 'score' ).reverse();
  var j=0;
  for (j; j <= users.length; j++) {  
    $("tbody").append("<tr><td align='center'>" + parseInt(j+1) + "</td><td align='center' class='player-icon'> <img src='" + usersInOrder[j].image_url + "'> </td><td>" + usersInOrder[j].first_name + "</td><td>" + numberWithCommas(usersInOrder[j].score) +  "</td><td>" + formatTime(usersInOrder[j].time) + "</td></tr>");

  }

});


