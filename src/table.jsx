import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const intl = new Intl.DateTimeFormat("ru-RU");

const getDates = (startDate, endDate) => {
  const datesArray = [Date.parse(startDate)];

  while (datesArray[datesArray.length - 1] < Date.parse(endDate)) {
    datesArray.push(datesArray[datesArray.length - 1] + 86400000);
  }
  return datesArray;
};

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, snuf, calories, fat, carbs, protein) {
  return { name, snuf, calories, fat, carbs, protein };
}

const rows = [
  createData("EUR", 1, 60, 24, 4, 7),
  createData("USD", 237, 9.0, 37, 4.3, 8),
  createData("RUR", 262, 16.0, 24, 6.0, 9),
];
const currencies = {
  145: "USD",
  292: "EUR",
  298: "RUR",
};
export default function BasicTable({ data, startDate, endDate }) {
  const classes = useStyles();
  const dates = getDates(startDate, endDate);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {dates.map((date) => (
              <TableCell align="right">{intl.format(date)}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={`data-row-${index}`}>
              <TableCell component="th" scope="row">
                {currencies[row[0].Cur_ID]}
              </TableCell>
              {row.map((currency) => {
                const value =
                  currency.Cur_ID === 298
                    ? currency.Cur_OfficialRate / 100
                    : currency.Cur_OfficialRate;
                return <TableCell align="right">{value.toFixed(4)}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
