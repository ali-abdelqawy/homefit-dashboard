import React from 'react';
import { makeStyles } from '@material-ui/styles';

import { CategoriesToolbar, CategoriesTable } from './components';

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
        <CategoriesTable />
      </div>
    </div>
  );
};

export default CategoryList;
