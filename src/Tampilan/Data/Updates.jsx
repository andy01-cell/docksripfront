import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const Updates = () => {
  const navigate = useNavigate();
  const idubah = useLocation();
  const idji = idubah.state.test;
  const [state, setState] = useState({
    nim: "",
    nama: "",
    tahun: "",
    judul: "",
    abstrak: "",
  });

  console.log("idnya = ", idji);

  useEffect(() => {
    // Inisialisasi Firebase dan Firestore
    const db = getFirestore();
    const fetchData = async () => {
      try {
        const skripsiRef = doc(db, "skripsi", idji);
        const docSnap = await getDoc(skripsiRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setState({
            nim: data.nim,
            nama: data.nama,
            tahun: data.tahun,
            judul: data.judul,
            abstrak: data.abstrak,
          });
        } else {
          console.log("Dokumen tidak ditemukan!");
        }
      } catch (error) {
        console.error("Error mengambil data:", error);
      }
    };

    fetchData();
  }, [idji]);

  const onHandledChanged = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onBtnsimpan = () => {
    const db = getFirestore();
    const { nim, nama, tahun, judul, abstrak } = state;

    const skripsiRef = doc(db, "skripsi", idji);

    // Update data di Firestore
    updateDoc(skripsiRef, {
      nim,
      nama,
      tahun,
      judul,
      abstrak,
    })
      .then(() => {
        console.log("Data berhasil diperbarui");
        // Redirect atau lakukan tindakan lain yang diperlukan setelah pembaruan
        alert("Data berhasil diperbarui");
        navigate("/data");
      })
      .catch((error) => {
        console.error("Error memperbarui data:", error);
      });
  };

  return (
    <Grid container justifyContent="center" xs={12} md={12}>
      <Grid item xs={10} md={10} marginTop="70px">
        <Grid container justifyContent="center" xs={12} md={12}>
          <Grid item xs={12} md={12}>
            <Typography textAlign="center" variant="p" fontSize="24px">
              Ubah Data Skripsi
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
              value={state.nim}
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
              value={state.nama}
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
              value={state.tahun}
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
              value={state.judul}
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
              value={state.abstrak}
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
              onClick={() => navigate("/data")}
            >
              Batal
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Updates;
