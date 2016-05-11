var ref = new Firebase('https://flickering-fire-1102.firebaseio.com/');


var usersRef = ref.child("users");


usersRef.orderByChild("score").on("value", function(snap) {

  var users = _.values(snap.val());
  var usersInOrder = _.sortBy( users, 'score' ).reverse();
  var j=0;
  for (j; j <= users.length; j++) {       
    $("tbody").append("<tr><td>" + parseInt(j+1) + ".</td><td>" + usersInOrder[j].first_name + "</td><td>" + usersInOrder[j].score + "</td></tr>");
  }


});
