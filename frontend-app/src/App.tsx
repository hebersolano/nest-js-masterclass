import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";

function App() {
  return (
    <GoogleOAuthProvider clientId="911268034001-du9vu5q76dn48fjsil2vhk0gcjdtiu4u.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={(response) => {
          console.log(response);
          fetch("http://localhost:3000/auth/google-authentication", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: response.credential,
            }),
          })
            .then((response) => console.log(response))
            .then((data) => console.log(data));
        }}
      />
      Login
    </GoogleOAuthProvider>
  );
}

export default App;
