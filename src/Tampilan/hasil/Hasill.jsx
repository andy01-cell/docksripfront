import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const Hasill = () => {
  const datapredik = useLocation();
  const [data, setData] = useState([]);
  const columns = [
    { field: "id", headerName: "NO", width: 70 },
    { field: "nk", headerName: "Judul", width: 340 },
    { field: "d", headerName: "Abstrak", width: 450 },
    { field: "class", headerName: "Class", width: 130 },
  ];

  useEffect(() => {
    // Inisialisasi Firebase dan Firestore
    const db = getFirestore();

    // Mendapatkan data dari koleksi yang Anda simpan di Firestore
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "skripsi"));
      const newData = querySnapshot.docs.map((doc, index) => ({
        id: index + 1,
        nk: doc.data().judul,
        d: doc.data().abstrak,
        class: doc.data().prediksi,
      }));
      setData(newData);
    };

    fetchData();
  }, []);
  console.log("test = ", datapredik.state);
  return (
    <Grid container xs={12} md={12} justifyContent="center">
      <Grid item xs={12} md={11.7} marginTop="50px">
        <Typography variant="p" fontSize="24px">
          Data Hasil Klasifikasi
        </Typography>
      </Grid>
      <Grid item xs={12} md={11.7} marginTop="-60px" marginLeft="145vh">
        <Button
          variant="contained"
          sx={{ backgroundColor: "white", color: "black" }}
        >
          download
        </Button>
      </Grid>

      <Grid item xs={11} md={11.7} style={{ height: 400 }} marginTop="-80px">
        <DataGrid rows={data} columns={columns} />
      </Grid>
    </Grid>
  );
};

export default Hasill;
