import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import axios from "axios";
import uuid from "react-uuid";

const defaultOptions = {
  headers: {
    Authorization: localStorage.getItem("Auth"),
  },
};

function CollapsibleContent(props) {
  const { bestellung } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {bestellung._id}
        </TableCell>
        <TableCell align="right">
          {bestellung.KontaktDaten.Vorname} {bestellung.KontaktDaten.Nachname}
        </TableCell>
        <TableCell align="right">
          {bestellung.KontaktDaten.Adresse} {bestellung.KontaktDaten.Hausnummer}
        </TableCell>
        <TableCell align="right">
          {bestellung.KontaktDaten.Telefonnummer}
        </TableCell>
        <TableCell align="right">TimeStamp</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Produkt</TableCell>
                    <TableCell>Extras</TableCell>
                    <TableCell>Anzahl</TableCell>
                    <TableCell>Kommentar</TableCell>
                    <TableCell align="right">Preis</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bestellung.Produkte.map((produkt) => (
                    <TableRow key={uuid()}>
                      <TableCell component="th" scope="row">
                        {produkt.Name}
                      </TableCell>
                      <TableCell>{produkt.Belag}</TableCell>
                      <TableCell align="right">{produkt.Anzahl}</TableCell>
                      <TableCell>{produkt.Kommentar}</TableCell>
                      <TableCell align="right">{produkt.Preis}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

/*Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};*/

export default function Content() {
  const [bestellungen, setBestellungen] = useState([]);

  useEffect(() => {
    const getOrder = async () => {
      await axios
        .get(`http://localhost:5000/bestellungen`, { ...defaultOptions })
        .then((res) => {
          console.log(res.data);
          setBestellungen(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getOrder();
  }, []);

  return (
    <div
      style={{ margin: "10px 10px 10px 10px", padding: "10px 10px 10px 10px" }}
    >
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Bestellung</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Adresse</TableCell>
              <TableCell align="right">Telefonnummer</TableCell>
              <TableCell align="right">Bestellzeitpunkt</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bestellungen.map((bestellung) => (
              <CollapsibleContent key={uuid()} bestellung={bestellung} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
