import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../database/firebase";

const Data = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    nim: "",
    tahun: "",
    judul: "",
    abstrak: "",
  });

  const onBtnsimpan = (e) => {
    e.preventDefault();
    console.log(state);
    const data = new FormData();
    data.append("judul", state.judul);
    data.append("abstrak", state.abstrak);

    axios
      .post("http://localhost:5000/predict", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("post succes : ", res);

        // const prediksisvm = res.data.prediksi_rbf;
        // const prediksiknn = res.data.prediksi_poly;
        // const prediksiNB = res.data.prediksi_poly;
        const prediksiensemble = res.data.predicted_class;
        const akurasiNB = res.data.Naive_Bayes_Accuracy;
        const akurasisvm = res.data.SVM_Accuracy;
        const akurasiknn = res.data.KNN_Accuracy;
        const akurasiensemble = res.data.ensemble_akurasi;
        const MAEsvm = res.data.SVM_MAE;
        const MAEknn = res.data.KNN_MAE;
        const MAENB = res.data.Naive_Bayes_MAE;
        const MAEensemble = res.data.ensemble_MAE;
        console.log("post succes : ", res.data.Naive_Bayes_MAE);

        const collectionRef = collection(db, "skripsi");
        addDoc(collectionRef, {
          nim: state.nim,
          tahun: state.tahun,
          judul: state.judul,
          abstrak: state.abstrak,
          prediksi: prediksiensemble,
          akurasiknn: parseFloat(akurasiknn * 100).toFixed(2),
          akurasisvm: parseFloat(akurasisvm * 100).toFixed(2),
          akurasiNB: parseFloat(akurasiNB * 100).toFixed(2),
          akurasiensemble: parseFloat(akurasiensemble * 100).toFixed(2),
          maesvm: MAEsvm,
          maeknn: MAEknn,
          maeNB: MAENB,
          maeensemble: MAEensemble,
        })
          .then((docRef) => {
            console.log("Dokumen berhasil ditambahkan dengan ID: ", docRef.id);
          })
          .catch((error) => {
            console.error("Error menambahkan dokumen: ", error);
          });

        navigate("/Hasiluji", {
          state: {
            prediksi: prediksiensemble,
            akurasiknn: parseFloat(akurasiknn * 100).toFixed(2),
            akurasisvm: parseFloat(akurasisvm * 100).toFixed(2),
            akurasiNB: parseFloat(akurasiNB * 100).toFixed(2),
            akurasiensemble: parseFloat(akurasiensemble * 100).toFixed(2),
            maesvm: MAEsvm,
            maeknn: MAEknn,
            maeNB: MAENB,
            maeensemble: MAEensemble,
          },
        });
      })
      .catch((err) => {
        console.log("ERRRR:: ", err.response.data);
        // if (state.email){
        //   alert("input email anda dengan benar")
        // }
      });
  };

  const onHandledChanged = (event) => {
    const name = event.target.name;
    // setCurrency(event.target.value);
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <Grid container justifyContent="center" xs={12} md={12}>
      <Grid item xs={10} md={10} marginTop="70px">
        <Grid container justifyContent="center" xs={12} md={12}>
          <Grid item xs={12} md={12}>
            <Typography textAlign="center" variant="p" fontSize="24px">
              Tambah Data Skripsi
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} marginTop="40px">
            <TextField
              fullWidth
              name="nim"
              label="NIM"
              autoComplete="nim"
              onChange={onHandledChanged}
              required
            />
          </Grid>
          <Grid item xs={12} md={12} marginTop="30px">
            <TextField
              fullWidth
              name="tahun"
              label="Tahun"
              autoComplete="tahun"
              type="date"
              InputLabelProps={{ shrink: true, required: true }}
              onChange={onHandledChanged}
              required
            />
          </Grid>
          <Grid item xs={12} md={12} marginTop="30px">
            <TextField
              fullWidth
              name="judul"
              label="Judul"
              autoComplete="judul"
              onChange={onHandledChanged}
              required
            />
          </Grid>
          <Grid item xs={12} md={12} marginTop="30px">
            <TextField
              fullWidth
              name="abstrak"
              label="Abstrak"
              autoComplete="abstrak"
              onChange={onHandledChanged}
              required
            />
          </Grid>
          <Grid item xs={1.5} md={1.5} marginTop="30px">
            <Button
              variant="contained"
              sx={{ backgroundColor: "white", color: "black" }}
              onClick={onBtnsimpan}
            >
              Simpan
            </Button>
          </Grid>
          <Grid item xs={10.5} md={10.5} marginTop="30px">
            <Button
              variant="contained"
              sx={{ backgroundColor: "white", color: "black" }}
            >
              Batal
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Data;
