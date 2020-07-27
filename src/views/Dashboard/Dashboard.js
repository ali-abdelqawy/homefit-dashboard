import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { Budget, TotalUsers, TasksProgress } from './components';
import axios from '../../api';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  useEffect(() => {
    const getUsersCount = async () => {
      const totalUsers = await axios.get('/totalusers');
      setTotalUsers(totalUsers.data);
    };

    const getProductsCount = async () => {
      const totalProducts = await axios.get('/totalproducts');
      setTotalProducts(totalProducts.data);
    };

    const getCategoriesCount = async () => {
      const totalCategories = await axios.get('/totalcategories');
      setTotalCategories(totalCategories.data);
    };
    getUsersCount();
    getCategoriesCount();
    getProductsCount();
  }, []);
  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Budget totalProducts={totalProducts} />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalUsers totalUsers={totalUsers} />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TasksProgress totalCategories={totalCategories} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
