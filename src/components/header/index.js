import React, {
  useEffect, useMemo, useReducer, useState,
} from 'react';
import { useSelector } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import useStyles from './styles';

export default function Header() {
  const classes = useStyles();

  // Buscar saidas e entradas (listas)
  const [total, setTotal] = useState(0);
  const incomeIn = useSelector((state) => state.incomeIn);
  const incomeOut = useSelector((state) => state.incomeOut);

  useEffect(() => {
    let totalIn = incomeIn.reduce((calculado, atual) => calculado + parseFloat(atual.value), 0);
    let totalOut = incomeOut.reduce((calculado, atual) => calculado + parseFloat(atual.value), 0);

    if (!totalIn) {
      totalIn = 0;
    }

    if (!totalOut) {
      totalOut = 0;
    }

    setTotal(totalIn - totalOut);
  }, [incomeIn, incomeOut]);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            LOGO
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Controle de dinheiro
          </Typography>
          <Typography variant="h6">
            Saldo R$
            {' '}
            {total.toFixed(2)}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
