import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Table from "./table";
import axios from "axios";

const title = "Курс валют";

const App = () => {
  const dayInMiliseconds = 86400000;
  const [curencies, setCurencies] = useState([]);
  const [startDate, setStartDate] = useState(
    () => new Date(Date.now() - dayInMiliseconds * 6)
  );
  const [endDate, setEndDate] = useState(() => new Date());

  useEffect(() => {
    async function callAPI(ids) {
      const results = await Promise.all(
        ids.map(async (id) => {
          const { data } = await axios.get(
            `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${id}?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
          );
          return data;
        })
      );
      setCurencies(results);
    }
    callAPI([145, 292, 298]);
  }, []);

  return (
    <div>
      <CssBaseline></CssBaseline>
      <h1>{title}</h1>
      <Table data={curencies} startDate={startDate} endDate={endDate} />
    </div>
  );
};

export default App;
