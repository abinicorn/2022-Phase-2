import React from 'react';
import logo from './logo.svg';
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { Box, Button, Grid, Paper, Skeleton } from "@mui/material";
import { useState } from "react";
import './App.css';

function App() {

  const [musicName, setMusicName] = useState("");
  const [musicInfo, setMusicInfo] = useState(undefined);
  const POKEMON_BASE_API_URL = "https://itunes.apple.com/search?term=";



  return (
    <div>
      <div className="search-field">
        <h1>iTunes Music Search</h1>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <TextField
            id="search-bar"
            className="text"
            value={musicName}
            onChange={(prop) => {
              setMusicName(prop.target.value);
            }}
            label="Artist Name"
            variant="outlined"
            placeholder="Search"
            size="medium"
          />
          <br />
          <Button
            onClick={() => {
              search();
            }}
          >
            <SearchIcon style={{ fill: "blue" }} />
            Search
          </Button>
        </div>
      </div>

      {musicInfo === undefined ? (
        <div>
        </div>
      ) : (
        <div
          id="pokemon-result"
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "100px 10px 0px 10px",
          }}
        >
          <Paper >
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
                  {musicInfo === undefined || musicInfo === null ? (
                    <h1> Music not found</h1>
                  ) : (
                    <div>
                      <h1>
                        {musicInfo}
                      </h1>
      
                    </div>
                  )}
                </Box>
              </Grid>
              <Grid item>
                <Box>
                  
                  
                    <Skeleton width={300} height={300} />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </div>
      )}
    </div>
  );

  function search() {
    console.log(musicName);
    if (musicName === undefined || musicName === "") {
      return;
    }
    axios
      .get(POKEMON_BASE_API_URL + musicName.toLowerCase().trim().split(/\s+/).join("+"))
      .then((res) => {
        setMusicInfo(res.data);
      })
      .catch(() => {
        setMusicInfo(undefined);
      });
  }


}

export default App;
