import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const Beranda = () => {
  return (
    <Grid
      container
      xs={12}
      md={12}
      // direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        item
        xs={9}
        md={9}
        textAlign="center"
        // sx={{
        //   backgroundColor: "#646632",
        // }}
      >
        <Typography textAlign="center" variant="p" fontSize="28px">
          <b>
            KLASIFIKASI TOPIK DOKUMEN SKRIPSI BERDASARKAN JUDUL DAN ABSTRAK
            MENGGUNAKAN METODE ENSEMBLE CLASSIFIER
          </b>
        </Typography>
      </Grid>
      <Grid item xs={10} md={10} textAlign="center" marginTop="-300px">
        <Box
          sx={{
            // height: "20vh",
            backgroundColor: "#D9D9D9",
          }}
        >
          <Typography textAlign="center" variant="p" fontSize="24px">
            Metode Ensemble Classifier merupakan gabungan dari tiga algoritma
            yaitu Naive Bayes, Support Vector Machine, dan K-Nearest Neighbor.
            Hasill Klasifikasi data akan terbagi menjadi tiga kelas peminatan
            pada jurusan Teknik Informatika.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Beranda;
