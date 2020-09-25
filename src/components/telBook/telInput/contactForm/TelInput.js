import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "400px",
      display: "flex",
    },
  },
}));

export function TelInput(prop) {
  const classes = useStyles();

  return (
    <>
      <TextField
        className={classes.root}
        style={{ width: 200, margin: 10 }}
        id="outlined-basic"
        label={prop.name}
        variant="outlined"
        name={prop.name}
        onChange={prop.onChange}
        value={prop.value}
      />
    </>
  );
}
