import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function LoginPage() {
  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        navigate("/ats");
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);

        navigate("/ats");
      })
      .catch((error) => alert(error.message));
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={styles.loginPage}>
      <div style={styles.loginContainer}>
        <h1 style={styles.heading}>Sign-in</h1>

        <form>
          <h5 style={styles.label}>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <h5 style={styles.label}>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <br />
          <button style={styles.signInButton} value="submit" onClick={signIn}>
            Sign In
          </button>
        </form>

        <p style={styles.terms}>
          By continuing, you agree to app's Conditions of Use and Privacy
          Notice.
        </p>

        <button style={styles.registerButton} onClick={register}>
          Create your new account
        </button>
      </div>
    </div>
  );
}

const styles = {
  loginPage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  loginContainer: {
    width: "300px",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    textAlign: "center",
  },
  heading: {
    marginBottom: "20px",
  },
  label: {
    textAlign: "left",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  signInButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#0A66C2",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "10px",
  },
  terms: {
    fontSize: "12px",
    color: "#555",
    marginBottom: "20px",
  },
  registerButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#fff",
    color: "#0A66C2",
    border: "1px solid #0A66C2",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default LoginPage;
