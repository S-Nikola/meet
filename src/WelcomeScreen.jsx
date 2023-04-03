import React from "react";
import './WelcomeScreen.css';

function WelcomeScreen(props) {
  return props.showWelcomeScreen ? (
    <div className="WelcomeScreen">
      <div className="WelcomeBox">
        <h1>Welcome to the Meet App</h1>
      <h3> Log in to see upcoming events around the world for full-stack developers</h3>
      <p>After pressing the button bellow, there will be a warning saying the app is unsafe. This is due to it not being verified by Google.
        The app is a demo and intended as a student project. The required calendar permission is only to access the app, it does not actually
        result in use of user data in any way.
      </p>
      <div className="button_cont" align="center">
        <div className="google-btn">
          <div className="google-icon-wrapper">
            <img
              className="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google sign-in"
            />
          </div>
        <button onClick={() => { props.getAccessToken() }}
          rel="nofollow noopener"
          className="btn-text"
        >
          <b>Sign in with google</b>
        </button>
        </div>
      </div>
      <a
        href="https://S-Nikola.github.io/meet/privacy.html"
        rel="nofollow noopener"
      >
        Privacy policy
      </a>
      </div>
    </div>
  )
  : null
}

export default WelcomeScreen;