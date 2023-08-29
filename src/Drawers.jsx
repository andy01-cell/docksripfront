import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import { Outlet, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { useState } from "react";

const drawerWidth = 335;
const Drawers = () => {
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState("");
  const [disabled1, setDisabled1] = useState("");
  const [disabled2, setDisabled2] = useState("");

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
      <Drawer
        sx={{
          width: drawerWidth,
          backgroundColor: "#646632",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List
          sx={{
            backgroundColor: "#646632",
            height: "100vh",
          }}
        >
          <ListItem>
            <Grid container paddingTop="50px">
              <Grid item xs={12} md={12}>
                <Typography
                  textAlign="center"
                  variant="p"
                  fontSize="24px"
                  color="#FFFFFF"
                >
                  ENSEMBLE CLASSIFIER
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                paddingTop="50px"
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
