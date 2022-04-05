import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Collapse,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Moment from "react-moment";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

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

  const handleCheck = (bestellung) => {
    let newState = "";
    if (bestellung.Status === "offen") {
      newState = "in Bearbeitung";
    }
    if (bestellung.Status === "in Bearbeitung") {
      newState = "abgeschlossen";
    }
    const getUpdateState = async () => {
      await axios
        .put(
          `http://localhost:5000/bestellungen/${bestellung._id}`,
          {
            Status: newState,
          },
          {
            headers: {
              Authorization: localStorage.getItem("Auth"),
            },
          }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUpdateState();
  };

  const handleClose = () => {
    const newState = "storniert";
    const getUpdateState = async () => {
      await axios
        .put(
          `http://localhost:5000/bestellungen/${bestellung._id}`,
          {
            Status: newState,
          },
          {
            headers: {
              Authorization: localStorage.getItem("Auth"),
            },
          }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUpdateState();
  };

  const handleRenderButton = (bestellung) => {
    const myButton =
      bestellung.Status != "storniert" &&
      bestellung.Status != "abgeschlossen" ? (
        <>
          <IconButton color="success" onClick={() => handleCheck(bestellung)}>
            <CheckIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleClose(bestellung)}>
            <CloseIcon />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton
            disabled
            color="success"
            onClick={() => handleCheck(bestellung)}
          >
            <CheckIcon />
          </IconButton>
          <IconButton
            disabled
            color="error"
            onClick={() => handleClose(bestellung)}
          >
            <CloseIcon />
          </IconButton>
        </>
      );
    return myButton;
  };

  return (
    <>
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
          {bestellung.KontaktDaten.Strasse} {bestellung.KontaktDaten.Hausnummer}
          , {bestellung.KontaktDaten.PLZ} {bestellung.KontaktDaten.Stadt}
        </TableCell>
        <TableCell align="right">
          {bestellung.KontaktDaten.Telefonnummer}
        </TableCell>
        <TableCell align="right">{bestellung.Status}</TableCell>
        <TableCell align="right">
          <Moment format="YYYY/MM/DD HH:mm">{bestellung.createdAt}</Moment>
        </TableCell>
        <TableCell align="right">{handleRenderButton(bestellung)}</TableCell>
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
    </>
  );
}

export default function Content({ status }) {
  const [bestellungen, setBestellungen] = useState([]);
  const [selectedState, setSelectedState] = useState("alles");

  useEffect(() => {
    let stateString = "";
    if (selectedState !== "alles") {
      stateString = `?status=${selectedState}`;
    }
    const getOrder = async () => {
      await axios
        .get(`http://localhost:5000/bestellungen${stateString}`, {
          ...defaultOptions,
        })
        .then((res) => {
          setBestellungen(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getOrder();
  }, [selectedState]);

  const handleOnChangeState = (e) => {
    setSelectedState(e.target.value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
        <Card variant="outlined">
          <CardContent>
            <Select
              id="country-selector"
              value={selectedState}
              label="Country"
              onChange={handleOnChangeState}
              variant="outlined"
              style={{ backgroundColor: "white" }}
            >
              <MenuItem key={uuid()} value="alles">
                alles
              </MenuItem>
              <MenuItem key={uuid()} value="offen">
                offen
              </MenuItem>
              <MenuItem key={uuid()} value="in%20Bearbeitung">
                in Bearbeitung
              </MenuItem>
              <MenuItem key={uuid()} value="abgeschlossen">
                abgeschlossen
              </MenuItem>
              <MenuItem key={uuid()} value="storniert">
                storniert
              </MenuItem>
            </Select>
            <TableContainer
              component={Paper}
              style={{ height: 800, width: "100%" }}
            >
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Bestellung</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Adresse</TableCell>
                    <TableCell align="right">Telefonnummer</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Bestellzeitpunkt</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bestellungen.map((bestellung) => (
                    <CollapsibleContent key={uuid()} bestellung={bestellung} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
}
