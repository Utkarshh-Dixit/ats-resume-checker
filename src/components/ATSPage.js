import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import axios from "axios";
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  inputField: {
    marginBottom: "20px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  button: {
    width: "48%",
  },
  error: {
    color: "red",
    marginTop: "20px",
  },
  signout: {
    position: "absolute",
    top: "10px",
    right: "10px",
    padding: "10px",
    backgroundColor: "black",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
}));

const ATSPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(null);

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleCheckATSResult = async () => {
    setLoading(true);
    setError(null);
    setScore(null);

    if (!jobDescription || !resumeFile) {
      setError("Please provide both job description and resume file.");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      var latest = "";
      data.append("file", resumeFile);
      const options = {
        method: "POST",
        url: "https://api.apyhub.com/extract/text/pdf-file",
        headers: {
          "apy-token":
            "APY0xJ1Qw35ncVZTWIFTl2INhw8vFNSMEuvjsU5e9DkaPlqEkmJV5VgLVy6ehZ5d00gBzA9Du",
          "Content-Type": "multipart/form-data",
        },
        data: data,
      };

      await axios
        .request(options)
        .then(async function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });

      if (latest === "") {
        console.log("No data found");
      }

      const prompt = `I have a job description that says: ${jobDescription}. I have a resume that says: ${latest}. Please check if the resume is a good fit for the job. I want to know the score and you can provide me the score out of 100.`;

      const result = await model.generateContent(prompt);
      const ans = await result.response;
      const text = ans.text();
      console.log(text);

      // if (!atsResponse.ok) {
      //   throw new Error("Network response was not ok");
      // }

      // const atsData = await atsResponse.json();
      // console.log(atsData);
      // setScore(atsData.score);
    } catch (err) {
      setError("Failed to check ATS result");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Sign out error", error);
      });
  };

  return (
    <div>
      <button onClick={handleSignOut} className={classes.signout}>
        Sign Out
      </button>
      <Box className={classes.container}>
        <Typography variant="h4" className={classes.heading}>
          ATS Resume Checker
        </Typography>
        <TextField
          label="Job Description"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          className={classes.inputField}
          value={jobDescription}
          onChange={handleJobDescriptionChange}
        />
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          className={classes.inputField}
          onChange={handleFileChange}
        />
        <Box className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckATSResult}
            disabled={loading}
            className={classes.button}
          >
            {loading ? <CircularProgress size={24} /> : "Check ATS Result"}
          </Button>
        </Box>
        {error && <Typography className={classes.error}>{error}</Typography>}
        {score && <Typography variant="h6">ATS Score: {score}</Typography>}
      </Box>
    </div>
  );
};

export default ATSPage;
