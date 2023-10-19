import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Button,
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
import { useLocation } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Workbook } from "exceljs";
import { db } from "../../database/firebase";

const Hasill = () => {
  const datapredik = useLocation();
  const akurasiNB = datapredik?.state?.akurasiNB;
  const [data, setData] = useState([]);
  const columns = [
    { field: "id", headerName: "NO", width: 70 },
    { field: "nk", headerName: "Judul", width: 340 },
    { field: "d", headerName: "Abstrak", width: 450 },
    { field: "class", headerName: "Class", width: 130 },
  ];

  const downloadExcel = async () => {
    // Ambil data dari Firestore (contoh menggunakan koleksi "klasifikasi")
    const collectionRef = collection(db, "klasifikasi");
    const querySnapshot = await getDocs(collectionRef);
    const data = [];

    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });

    // Buat file Excel
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Data Firestore");

    worksheet.addRow(["ensemble", "abstrak", "judul"]);

    // Tambahkan data ke worksheet
    data.forEach((item) => {
      worksheet.addRow([item.ensemble, item.abstrak, item.judul]);
    });

    // Simpan file Excel dalam blob
    const blob = await workbook.xlsx.writeBuffer();

    // Buat URL objek untuk blob
    const blobUrl = URL.createObjectURL(
      new Blob([blob], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })
    );

    // Buat elemen <a> untuk mengunduh file
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = "data_firestore.xlsx";
    a.click();

    // Bebaskan sumber daya URL objek
    URL.revokeObjectURL(blobUrl);
  };

  useEffect(() => {
    // Inisialisasi Firebase dan Firestore
    const db = getFirestore();

    // Mendapatkan data dari koleksi yang Anda simpan di Firestore
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "klasifikasi"));
      const newData = querySnapshot.docs.map((doc, index) => ({
        id: index + 1,
        nk: doc.data().judul,
        d: doc.data().abstrak,
        class: doc.data().ensemble,
      }));
      setData(newData);
    };

    fetchData();
  }, []);
  console.log("test = ", datapredik.state);
  return (
    <Box sx={{ maxHeight: "100vh", maxWidth: "158vh" }} marginRight="20px">
      <Grid container xs={12} md={12} justifyContent="end" marginTop="50px">
        <Grid item xs={12} md={12}>
          <Typography variant="p" fontSize="24px">
            Data Hasil Klasifikasi
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{ backgroundColor: "white", color: "black" }}
            onClick={downloadExcel}
          >
            download
          </Button>
        </Grid>

        <Grid item xs={12} md={12} style={{ height: 400 }} marginTop="2px">
          <DataGrid rows={data} columns={columns} />
        </Grid>
        <Grid item xs={12} md={12} marginTop="50px">
          <Grid
            container
            xs={12}
            md={12}
            justifyContent="center"
            alignItems="start"
          >
            <Grid item xs={11.8} md={11.8}>
              <Typography variant="p" fontSize="24px">
                Skor Pengujian
              </Typography>
            </Grid>
            <Grid item xs={11.8} md={11.8}>
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
                        <TableCell>{akurasiNB ?? "null"}%</TableCell>
                        <TableCell>
                          {datapredik.state
                            ? `${datapredik.state.maeNB}`
                            : "null"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>Support Vector Machine</b>
                        </TableCell>
                        <TableCell>
                          {datapredik.state
                            ? `${datapredik.state.akurasisvm}%`
                            : "null"}
                        </TableCell>
                        <TableCell>
                          {datapredik.state
                            ? `${datapredik.state.maesvm}`
                            : "null"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>K-Nearest Neighbor</b>
                        </TableCell>
                        <TableCell>
                          {datapredik.state
                            ? `${datapredik.state.akurasiknn}%`
                            : "null"}
                        </TableCell>
                        <TableCell>
                          {datapredik.state
                            ? `${datapredik.state.maeknn}`
                            : "null"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>Ensemble Classifier</b>
                        </TableCell>
                        <TableCell>
                          {datapredik.state
                            ? `${datapredik.state.akurasiensemble}%`
                            : "null"}
                        </TableCell>
                        <TableCell>
                          {datapredik.state
                            ? `${datapredik.state.maeensemble}`
                            : "null"}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hasill;
