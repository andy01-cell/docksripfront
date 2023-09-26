import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import axios from "axios";
import { db } from "../../database/firebase";

const Tabeldata = () => {
  const navigate = useNavigate();
  const datapredik = useLocation();
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: "no", headerName: "No", width: 50 },
    { field: "nim", headerName: "NIM", width: 130 },
    { field: "tahun", headerName: "Tahun", width: 70 },
    { field: "judul", headerName: "Judul", width: 280 },
    { field: "abstrak", headerName: "Abstrak", width: 280 },
    {
      field: "opsi",
      headerName: "Opsi",
      width: 170,
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            style={{
              textTransform: "none",
              marginRight: "5px",
              color: "black",
              backgroundColor: "white",
            }}
            onClick={() => handleUbahClick(params.row.id)}
          >
            Ubah
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{
              textTransform: "none",
              marginRight: "5px",
              color: "black",
              backgroundColor: "white",
            }}
            onClick={() => handleHapusClick(params.row.id)}
            // onClickCapture={() => handleHapusClick(params.row.id)}
          >
            Hapus
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    // Inisialisasi Firebase dan Firestore
    const db = getFirestore();

    // Mendapatkan data dari koleksi yang Anda simpan di Firestore
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "skripsi"));
      const newData = querySnapshot.docs.map((doc, index) => ({
        id: doc.id,
        no: index + 1,
        nim: doc.data().nim,
        tahun: doc.data().tahun,
        judul: doc.data().judul,
        abstrak: doc.data().abstrak,
        class: doc.data().prediksi,
      }));
      setData(newData);
      console.log("data = ", data);
    };

    fetchData();
  }, []);
  console.log("test = ", datapredik.state);

  const handleUbahClick = (id) => {
    console.log("id = ", id);
    navigate("/update", {
      ubah: {
        dataid: id,
      },
    }); // Navigasi ke halaman '/update'
  };

  const handleHapusClick = async (id) => {
    const db = getFirestore();

    try {
      // Mendapatkan referensi dokumen berdasarkan ID
      const skripsiRef = doc(db, "skripsi", id);

      // Hapus dokumen dari Firestore
      await deleteDoc(skripsiRef);

      // Data berhasil dihapus
      console.log("Dokumen berhasil dihapus");
    } catch (error) {
      console.error("Error menghapus");
    }

    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  const onBtnklasifikasi = (e) => {
    e.preventDefault();
    const jsonData = {
      data: data,
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
        console.log("post succes : ", res);

        // const prediksisvm = res.data.prediksi_rbf;
        // const prediksiknn = res.data.prediksi_poly;
        // const prediksiNB = res.data.prediksi_poly;
        const prediksiensemble = res.data.predictions;
        const akurasiNB = res.data.nbakurasi;
        const akurasisvm = res.data.svmakurasi;
        const akurasiknn = res.data.knnakurasi;
        const akurasiensemble = res.data.ensembleakurasi;
        const MAEsvm = res.data.svmmae;
        const MAEknn = res.data.knnmae;
        const MAENB = res.data.nbmae;
        const MAEensemble = res.data.ensemblemae;
        console.log("post succes : ", res.data.Naive_Bayes_MAE);

        const collectionRef = collection(db, "klasifikasi");
        prediksiensemble.forEach((item) => {
          addDoc(collectionRef, {
            ensemble: item.ensemble_prediksi,
            abstrak: item.abstrak,
            judul: item.judul,
          })
            .then((docRef) => {
              console.log(
                "Dokumen berhasil ditambahkan dengan ID: ",
                docRef.id
              );
              alert("Dokumen berhasil ditambahkan dengan ID");
            })
            .catch((error) => {
              console.error("Error menambahkan dokumen: ", error);
              alert("Error menambahkan dokumen");
            });
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
      });
  };

  return (
    <Grid container xs={12} md={12} justifyContent="center">
      <Grid item xs={12} md={11.7} marginTop="50px">
        <Typography variant="p" fontSize="24px">
          Data Hasil Klasifikasi
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        md={11.7}
        marginTop="-30px"
        marginBottom="60px"
        marginLeft="143vh"
      >
        <Button
          variant="contained"
          sx={{ backgroundColor: "white", color: "black" }}
          onClick={() => navigate("/tambahdata")}
        >
          Tambah Data
        </Button>
      </Grid>

      <Grid item xs={11} md={11.7} style={{ height: 400 }} marginTop="-80px">
        <DataGrid rows={data} columns={columns} />
      </Grid>
      <Grid item xs={12} md={11.7} marginTop="0px" marginLeft="75vh">
        <Button
          variant="contained"
          sx={{ backgroundColor: "#646632" }}
          onClick={onBtnklasifikasi}
        >
          Klasifikasi
        </Button>
      </Grid>
      {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Peringatan!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            apakah anda yakin ingin menghapusnya?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>tidak</Button>
          <Button onClick={handleClose} autoFocus>
            iya
          </Button>
        </DialogActions>
      </Dialog> */}
    </Grid>
  );
};

export default Tabeldata;
