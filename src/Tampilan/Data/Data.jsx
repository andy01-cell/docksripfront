import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../database/firebase";
import "@fontsource/open-sans";

const Data = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    nim: "",
    nama: "",
    tahun: "",
    judul: "",
    abstrak: "",
  });

  const onBtnsimpan = async (e) => {
    e.preventDefault();

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
        alert("Dokumen berhasil ditambahkan dengan ID: " + newId);
        navigate("/data");
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
          <Grid item xs={1.5} md={1.5} marginTop="30px">
            <Button
              variant="contained"
              sx={{ backgroundColor: "white", color: "black" }}
              onClick={onBtnsimpan}
              style={{ fontFamily: "Open Sans" }}
            >
              Simpan
            </Button>
          </Grid>
          <Grid item xs={10.5} md={10.5} marginTop="30px">
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
