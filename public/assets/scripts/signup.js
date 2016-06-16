$(".login, .signup, post-signup").hide();
$(".login-btns").on("click", ".go-to-login-btn", function(){
  $(".login").show();
  $(".signup-or-login").hide();
})
$(".login-btns").on("click", ".go-to-signup-btn", function(){
  $(".signup").show();
  $(".signup-or-login").hide();
})

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
      }
      // [END_EXCLUDE]
    });
    // [END authwithemail]
  }
  document.getElementById('quickstart-sign-in').disabled = true;
}

function handleSignUp() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }
  // Sign in with email and pass.
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
    writeSecondaryUserData(user.uid, deviceId);
    $(".post-signup").hide();
    $(".quickstart-user-details-container").hide();
    alert('Thanks for registering!');
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
function initApp() {
  // Listening for auth state changes.
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

      // User is signed in.
      $(".signup-or-login, .login, .signup").hide();
      $(".post-signup").show();
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var refreshToken = user.refreshToken;
      var providerData = user.providerData;

      writeUserData(uid, email);
      // [START_EXCLUDE silent]
      document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
      document.getElementById('quickstart-sign-in').textContent = 'Sign out';
      document.getElementById('quickstart-account-details').textContent = JSON.stringify({
        displayName: displayName,
        email: email,
        emailVerified: emailVerified,
        photoURL: photoURL,
        isAnonymous: isAnonymous,
        uid: uid,
        refreshToken: refreshToken,
        providerData: providerData
      }, null, '  ');
      // [END_EXCLUDE]
    } else {
      // User is signed out.
      // [START_EXCLUDE silent]
      // $("#leaderboard, .leaderboard-title").hide();
      document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
      document.getElementById('quickstart-sign-in').textContent = 'Sign in';
      document.getElementById('quickstart-account-details').textContent = 'null';
      // [END_EXCLUDE]
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

