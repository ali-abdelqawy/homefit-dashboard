import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import {
  ProductsTable,
  ProductsToolbar,
  CategoriesToolbar,
  CategoriesTable
} from './components';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const CategoryList = () => {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <CategoriesToolbar />
        <br />
        <CategoriesTable/>
      </div>
    </div>
  );
};

export default CategoryList;
