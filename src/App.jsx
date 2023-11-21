import React from "react";
import { Route, Routes } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import Drawers from "./Drawers";
import Data from "./Tampilan/Data/Data";
import Beranda from "./Tampilan/Home/beranda";
import Praproses from "./Tampilan/praproses/Praproses";
import Hasill from "./Tampilan/hasil/Hasill";
import Hasiluji from "./Tampilan/hasil/Hasiluji";
import Tabeldata from "./Tampilan/Data/Tabeldata";
import Updates from "./Tampilan/Data/Updates";

const App = () => {
  // const navigate = useNavigate();
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Drawers />}>
          <Route exact path="/" element={<Beranda />} />
          <Route exact path="/data" element={<Tabeldata />} />
          <Route exact path="/tambahdata" element={<Data />} />
          <Route exact path="/update" element={<Updates />} />
          <Route exact path="/Praproses" element={<Praproses />} />
          <Route exact path="/Hasil" element={<Hasill />} />
          {/* <Route exact path="/Hasiluji" element={<Hasiluji />} /> */}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
