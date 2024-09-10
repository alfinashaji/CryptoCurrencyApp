import React, {useContext} from "react";
import {AppContext} from "../../../App";
import {IconButton} from "@mui/material";
import {DarkMode, LightMode} from "@mui/icons-material";

const Allbutton = () => {
  const {state, dispatch} = useContext(AppContext);

  const toggleDarkMode = () => {
    dispatch({type: "colorchange"});
  };

  // Determine if dark mode is active based on state
  const isDarkMode = state.theme.mode === "dark";

  return (
    <div>
      <IconButton
        aria-label="dark mode toggle"
        size="small"
        onClick={toggleDarkMode}
        sx={{
          backgroundColor: isDarkMode ? "#030619" : "#e9e9e9", // Sets the background color
          color: "#ffffff", // Sets the color of the icon
          "&:hover": {
            backgroundColor: "#030619", // Keeps the background color on hover
          },
        }}
      >
        {!isDarkMode ? (
          <DarkMode sx={{color: "#ffc40c", fontSize: "20px"}} />
        ) : (
          <LightMode sx={{color: "#FFFFFF", fontSize: "inherit"}} />
        )}
      </IconButton>
    </div>
  );
};

export default Allbutton;
