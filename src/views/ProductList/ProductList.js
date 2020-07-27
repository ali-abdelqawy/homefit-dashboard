import React from 'react';
import { makeStyles } from '@material-ui/styles';

import { ProductsTable, ProductsToolbar } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const ProductList = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <ProductsToolbar />
        <br />
        <ProductsTable />
      </div>
    </div>
  );
};

export default ProductList;
