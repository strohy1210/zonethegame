function toggleSignIn() {
  if (firebase.auth().currentUser) {
    // [START signout]
    firebase.auth().signOut();
    // [END signout]
  } else {
    var email = document.getElementById('login-email').value;
    var password = document.getElementById('login-password').value;
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    // Sign in with email and pass.
    // [START authwithemail]
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        console.error(error);
        alert('There was an error. Please signup if you have not');
      }
      // [END_EXCLUDE]
    });
    // [END authwithemail]
  }
}

function handleSignUp() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var passwordConfirm = document.getElementById('password-confirm').value;
  if (email.length < 4) {
    alert('Please enter a valid email address.');
    return;
  }
  if (password.length < 6) {
    alert('Please enter a password of at least 6 characters.');
    return;
  }
  if (password != passwordConfirm){
    alert("Please make sure passwords are identical.");
    return;
  }
  // [START createwithemail]
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      console.error(error);
      alert(error["message"]);
    }
    // [END_EXCLUDE]
  })

// [END createwithemail]

}
/**
 * handles authorizing and registering user's device id and the code they were emailed
 *
 */

function handlePostSignUp() {
  var deviceId = document.getElementById('device-id').value;
  var code = document.getElementById('code').value;
  var user = firebase.auth().currentUser;

  if (authorizeCode(code)){
    writeUserData(user.uid, deviceId);
    $(".post-signup").hide();
    // $(".quickstart-user-details-container").hide();
    alert('Thanks for registering!');
    $(".leaderboard-title, #leaderboard").show();
  } else {
    alert('Code is not valid, please sign up for our kickstarter to receive one!');
    return;
  }

}

/**
 * Handles registering callbacks for the auth status.
 *
 * This method registers a listener with firebase.auth().onAuthStateChanged. This listener is called when
 * the user is signed in or out, and that is where we update the UI.
 *
 * When signed in, we also authenticate to the Firebase Realtime Database.
 */
function initApp(user) {
  // Listening for auth state changes.
  // [START authstatelistener]

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      $(".signup-or-login, .login, .signup").hide();
      firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
        if (snapshot.val()){
          var codeEntered = snapshot.val().codeEntered;
          if (!codeEntered) {
            $(".post-signup").show();
          } else {
            $(".post-signup").hide();
            $(".leaderboard-title, #leaderboard").show();
          }
        }else {
          $(".post-signup").show();
        }

      });

      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var refreshToken = user.refreshToken;
      var providerData = user.providerData;

    } else {
      $(".signup-or-login").show();
    }
    // [START_EXCLUDE silent]
    document.getElementById('quickstart-sign-in').disabled = false;
    // [END_EXCLUDE]
  });
  // [END authstatelistener]

  document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
  document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
  document.getElementById('post-signup-submit').addEventListener('click', handlePostSignUp, false);
}