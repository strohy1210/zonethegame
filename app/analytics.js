var ref = new Firebase('https://flickering-fire-1102.firebaseio.com/');
// var activeUsers = new Firebase('https://airpair-analytics-tutorial.firebaseio.com/activeUsers');
var activeVisitors = ref.child('activeVisitors');
activeVisitors.push({
  path: window.location.pathname,
  arrivedAt: Firebase.ServerValue.TIMESTAMP,
  userAgent: navigator.userAgent
});

var usersRef = ref.child("users");

// usersRef.set({
//   alanisawesome: {
//     date_of_birth: "June 23, 1912",
//     full_name: "Alan Turing"
//   },
//   gracehop: {
//     date_of_birth: "December 9, 1906",
//     full_name: "Grace Hopper"
//   }
// });

usersRef.update({
  "alanisawesome/full_name": "Alan The Machine"
  "gracehop/full_name": "Amazing Grace"
});