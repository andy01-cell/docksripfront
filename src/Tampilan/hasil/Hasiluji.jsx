import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

const Hasiluji = () => {
  const datapredik = useLocation();
  console.log("test = ", datapredik.state.akurasiNB);
  return (
    <Grid container xs={12} md={12} justifyContent="center" alignItems="start">
      <Grid item xs={11.8} md={11.8}>
        <Typography variant="p" fontSize="24px">
          Grafik
        </Typography>
      </Grid>
      <Grid item xs={11.8} md={11.8} marginTop="-10px">
        <Typography variant="p" fontSize="24px">
          Skor Pengujian
        </Typography>
      </Grid>
      <Grid item xs={11.8} md={11.8} marginTop="-150px">
        <Box>
          <TableContainer component={Paper} elevation={10}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>
                    <b>Nilai Akurasi</b>
                  </TableCell>
                  <TableCell>
                    <b>Nilai MAE</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <b>Naive Bayes</b>
                  </TableCell>
                  <TableCell>{datapredik.state.akurasiNB}%</TableCell>
                  <TableCell>{datapredik.state.maeNB}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Support Vector Machine</b>
                  </TableCell>
                  <TableCell>{datapredik.state.akurasisvm}%</TableCell>
                  <TableCell>{datapredik.state.maesvm}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>K-Nearest Neighbor</b>
                  </TableCell>
                  <TableCell>{datapredik.state.akurasiknn}%</TableCell>
                  <TableCell>{datapredik.state.maeknn}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Ensemble Classifier</b>
                  </TableCell>
                  <TableCell>{datapredik.state.akurasiensemble}%</TableCell>
                  <TableCell>{datapredik.state.maeensemble}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {/* <Paper
          elevation={10}
          style={{
            // padding: 15,
            height: "40vh",
          }}
        ></Paper> */}
      </Grid>
    </Grid>
  );
};

export default Hasiluji;
