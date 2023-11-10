import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import { Outlet, useNavigate } from "react-router-dom";
import { Grid, IconButton } from "@mui/material";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const Drawers = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [disabled, setDisabled] = useState("");
  const [disabled1, setDisabled1] = useState("");
  const [disabled2, setDisabled2] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(0);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(320);
  };
  const handleDrawerClose = () => {
    setIsDrawerOpen(0);
  };

  const informasiklik = (params) => {
    console.log("test => ", params);

    if (params === "nyala1") {
      setDisabled("bold");
      setDisabled1("");
      setDisabled2("");
    } else if (params === "nyala2") {
      setDisabled1("bold");
      setDisabled("");
      setDisabled2("");
    } else if (params === "nyala3") {
      setDisabled1("");
      setDisabled("");
      setDisabled2("bold");
    } else {
      setDisabled1("");
      setDisabled("");
      setDisabled2("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
      }}
    >
      <CssBaseline />
      <Box>
        <IconButton onClick={handleDrawerOpen}>
          {/* Gunakan state atau variabel untuk mengatur ikon yang sesuai */}
          {isDrawerOpen ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Drawer
        sx={{
          width: isDrawerOpen,
          // backgroundColor: "#646632",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isDrawerOpen,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        // anchor="left"
      >
        <List
          sx={{
            backgroundColor: "#646632",
            height: "100vh",
          }}
        >
          <Grid container>
            <Grid item>
              <IconButton onClick={handleDrawerClose}>
                {/* Gunakan state atau variabel untuk mengatur ikon yang sesuai */}
                {isDrawerOpen ? (
                  <MenuIcon
                    style={{ width: "24px", height: "24px", color: "white" }}
                  />
                ) : (
                  <MenuIcon
                    style={{ width: "24px", height: "24px", color: "white" }}
                  />
                )}
              </IconButton>
            </Grid>
            <Grid item marginTop="4px">
              <Typography
                textAlign="center"
                variant="p"
                fontSize="20px"
                color="#FFFFFF"
              >
                ENSEMBLE CLASSIFIER
              </Typography>
            </Grid>
          </Grid>
          <ListItem>
            <Grid container paddingTop="30px">
              <Grid
                item
                xs={12}
                md={12}
                onClick={() => informasiklik("nyala1")}
              >
                <Typography
                  textAlign="center"
                  variant="p"
                  fontSize="24px"
                  fontWeight={disabled}
                  color="#FFFFFF"
                  onClick={() => navigate("/")}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Beranda
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                paddingTop="25px"
                onClick={() => informasiklik("nyala2")}
              >
                <Typography
                  textAlign="center"
                  variant="p"
                  fontSize="24px"
                  fontWeight={disabled1}
                  color="#FFFFFF"
                  onClick={() => navigate("/data")}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Data
                </Typography>
              </Grid>
              {/* <Grid item xs={12} md={12} paddingTop="25px">
                <Typography
                  textAlign="center"
                  variant="p"
                  fontSize="24px"
                  color="#FFFFFF"
                  onClick={() => navigate("/Praproses")}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Praproses
                </Typography>
              </Grid> */}
              <Grid
                item
                xs={12}
                md={12}
                paddingTop="25px"
                onClick={() => informasiklik("nyala3")}
              >
                <Typography
                  textAlign="center"
                  variant="p"
                  fontSize="24px"
                  fontWeight={disabled2}
                  color="#FFFFFF"
                  onClick={() => navigate("/Hasil")}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Hasil
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
        </List>
      </Drawer>
      <Outlet />
    </Box>
  );
};

export default Drawers;
