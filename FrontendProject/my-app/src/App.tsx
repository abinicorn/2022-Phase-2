import React from 'react';
import logo from './logo.svg';
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { Box, Button, Grid, Paper, Skeleton } from "@mui/material";
import { useState } from "react";
import './App.css';

function App() {

  const [userName, setUserName] = useState("");
  const [genderInfo, setGenderInfo] = useState();
  const [possibility, setPossibility] = useState();
  const GENDER_BASE_API_URL = "https://api.genderize.io/?name=";


  return (
    <div>
      <div className="search-field">
        <h1>Guess your gender by your name!</h1>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <TextField
            id="search-bar"
            className="text"
            value={userName}
            onChange={(prop) => {
              setUserName(prop.target.value);
            }}
            label="Your Name"
            variant="outlined"
            placeholder="Type your first name"
            size="medium"
          />
          <br />
          <Button
            onClick={() => {
              search();
            }}
            variant="contained"
          >
            Guess!
          </Button>
        </div>
      </div>

      {genderInfo === undefined ? (
        <div>
        </div>
      ) : (
        <div
          id="gender-result"
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "100px 10px 0px 10px",
          }}
        >
          <Paper>
            <Grid
              container
              direction="row"
              spacing={5}
              sx={{
                justifyContent: "center",
              }}
            >
              <Grid item>
                <Box>
                  {genderInfo === undefined || genderInfo === null ? (
                    <h1> Oops! Your age is too hard to guess!</h1>
                  ) : (
                    <div>
                      <h1>
                        Your name: {userName}
                      </h1>
                      <p>Your possible gender: <b> {genderInfo} </b> </p>
                      <p>How possible this result is? {possibility}</p>
      
                    </div>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </div>
      )}
    </div>
  );

  function search() {
    console.log(userName);
    if (userName === undefined || userName === "") {
      return;
    }
    axios
      .get(GENDER_BASE_API_URL + userName.toLowerCase().trim().split(/\s+/).join())
      .then((res) => {
        setGenderInfo(res.data.gender);
        setPossibility(res.data.probability);
      })
      .catch(() => {
        setGenderInfo(undefined);
      });

  }


}

export default App;
