import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../database/firebase";
import "@fontsource/open-sans";
import { LoadingButton } from "@mui/lab";

const Data = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    nim: "",
    nama: "",
    tahun: "",
    judul: "",
    abstrak: "",
  });

  const [loading, setLoading] = React.useState(false);

  const handleClickOpen = () => {
    setLoading(true);
  };

  const handleClose = () => {
    setLoading(false);
  };

  const onBtnklasifikasi = (e) => {
    e.preventDefault();
    handleClickOpen();
    const jsonData = {
      data: [state],
    };

    const jsonString = JSON.stringify(jsonData);

    console.log("babdataki = ", jsonString);
    axios
      .post("http://localhost:5000/predict", jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        onBtnsimpan();
        console.log("post succes : ", res);
        const prediksiensemble = res.data.predictions;
        const akurasiNB = res.data.nbakurasi;
        const akurasisvm = res.data.svmakurasi;
        const akurasiknn = res.data.knnakurasi;
        const akurasiensemble = res.data.ensembleakurasi;
        const MAEsvm = res.data.svmmae;
        const MAEknn = res.data.knnmae;
        const MAENB = res.data.nbmae;
        const MAEensemble = res.data.ensemblemae;
        const cv_nb = res.data.cv_nb;
        const cv_svm = res.data.cv_svm;
        const cv_knn = res.data.cv_knn;
        const cv_ensemble = res.data.cv_ensemble;
        console.log("post succes : ", res);

        const collectionRef = collection(db, "klasifikasi");
        prediksiensemble.forEach((item) => {
          addDoc(collectionRef, {
            ensemble: item.ensemble_prediksi,
            knn: item.knn_prediction,
            nb: item.nb_prediction,
            svm: item.svm_prediction,
            abstrak: item.abstrak,
            judul: item.judul,
          })
            .then((docRef) => {})
            .catch((error) => {
              console.error("Error menambahkan dokumen: ", error);
              alert("Error menambahkan dokumen");
            });
          // alert("Dokumen berhasil ditambahkan dengan ID");
        });
        alert("Dokumen berhasil ditambahkan");

        navigate("/", {
          state: {
            path: "/Hasil",
          },
        });

        navigate("/Hasil", {
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
            cv_ensemble: parseFloat(cv_ensemble * 100).toFixed(2),
            cv_knn: parseFloat(cv_knn * 100).toFixed(2),
            cv_nb: parseFloat(cv_nb * 100).toFixed(2),
            cv_svm: parseFloat(cv_svm * 100).toFixed(2),
          },
        });
      })
      .catch((err) => {
        console.log("ERRRR:: ", err.response.data);
        handleClose();
        alert("Terjadi Kesalahan inputan");
      });
  };

  const onBtnsimpan = async (e) => {
    // Mendapatkan koleksi "skripsi"
    const collectionRef = collection(db, "skripsi");

    // Mendapatkan data terakhir dalam koleksi
    const querySnapshot = await getDocs(collectionRef);

    // Menghitung ID untuk dokumen baru
    const newId = querySnapshot.size + 1;

    // Menambahkan dokumen dengan ID yang telah dihitung
    addDoc(collectionRef, {
      id: newId,
      nim: state.nim,
      nama: state.nama,
      tahun: state.tahun,
      judul: state.judul,
      abstrak: state.abstrak,
    })
      .then(() => {
        console.log("Dokumen berhasil ditambahkan dengan ID: " + newId);
      })
      .catch((error) => {
        alert("Error menambahkan dokumen: " + error.message);
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
            <Typography
              textAlign="center"
              variant="p"
              fontSize="24px"
              style={{ fontFamily: "Open Sans" }}
            >
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
              // type="number"
            />
          </Grid>
          <Grid item xs={12} md={12} marginTop="40px">
            <TextField
              fullWidth
              name="nama"
              label="Nama"
              autoComplete="nama"
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
              type="number"
              // InputLabelProps={{ shrink: true, required: true }}
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
          <Grid item xs={2} md={2} marginTop="30px">
            <LoadingButton
              loading={loading}
              variant="contained"
              sx={{ backgroundColor: "#646632" }}
              // onClick={onBtnsimpan}
              onClick={onBtnklasifikasi}
              style={{ fontFamily: "Open Sans" }}
            >
              Klasifikasi
            </LoadingButton>
          </Grid>
          <Grid item xs={10} md={10} marginTop="30px">
            <Button
              variant="contained"
              sx={{ backgroundColor: "white", color: "black" }}
              onClick={() => navigate("/data")}
              style={{ fontFamily: "Open Sans" }}
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
