import React from "react";

const Home = () => {
  return (
    <div
      className="home"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        margin: "auto",
      }}
    >
      <a
        href="/login"
        style={{
          padding: "15px 30px",
          borderRadius: "20px",
          backgroundColor: "black",
          color: "white",
        }}
      >
        Login
      </a>
      <a
        href="/register"
        style={{
          padding: "15px 30px",
          borderRadius: "20px",
          backgroundColor: "black",
          color: "white",
        }}
      >
        Register
      </a>
    </div>
  );
};

export default Home;
