/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Divider } from '@material-ui/core';

import axios from '../../api';
import { baseURL } from '../../constants';
import { Link } from 'react-router-dom';

const fontFamily = { fontFamily: 'Roboto' };

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const ViewProduct = props => {
  const classes = useStyles();
  const [product, setProduct] = useState({});
  const [productCategory, setProductCategory] = useState('');
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/products/${props.match.params.id}`);
      setProduct(data);
      const response = await axios.get(`/categories/${data.categoryId}`);
      setProductCategory(response.data.name);
    };
    fetchProduct();
  }, [props.match.params.id]);
  const deleteProduct = id => {
    const url = `/products/${product._id}`;
    axios
      .delete(url)
      .then(function(response) {
        // handle success
        window.open('/products');
      })
      .catch(function(error) {
        // handle error
        console.log(error.message);
      });
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item md={8} xs={12}>
          <div
            style={{ backgroundColor: 'white', padding: 30, borderRadius: 20 }}>
            <Typography variant="h2" style={{ ...fontFamily }}>
              {product.name}
            </Typography>
            <br />
            <Typography variant="p" style={{ ...fontFamily }}>
              {product.description}
            </Typography>
            <br />
            <br />
            <Divider />
            <br />
            <Typography variant="p" style={{ ...fontFamily }}>
              <b>Price:</b> {product.price}
            </Typography>
            <br />
            <br />
            <Typography variant="p" style={{ ...fontFamily }}>
              <b>Color:</b> {product.color}
            </Typography>
            <br />
            <br />
            <Typography variant="p" style={{ ...fontFamily }}>
              <b>Width:</b> {product.width}
            </Typography>
            <br />
            <br />
            <Typography variant="p" style={{ ...fontFamily }}>
              <b>Height:</b> {product.height}
            </Typography>
            <br />
            <br />
            <Typography variant="p" style={{ ...fontFamily }}>
              <b>Depth:</b> {product.depth}
            </Typography>
            <br />
            <br />
            <Typography variant="p" style={{ ...fontFamily }}>
              <b>Category:</b> {productCategory}
            </Typography>
            <br />
            <br />
            <Divider />
            <br />
            <br />
            <Link
              style={{
                color: '#fff',
                backgroundColor: '#2979ff',
                padding: 10,
                fontFamily: 'Roboto',
                borderRadius: 5
              }}
              to={`/products/${product._id}/edit`}>
              EDIT PRODUCT
            </Link>
            <Link
              onClick={() => deleteProduct(product._id)}
              style={{
                marginLeft: 20,
                color: '#fff',
                backgroundColor: '#F44336',
                fontFamily: 'Roboto',
                padding: 10,
                borderRadius: 5
              }}>
              DELETE PRODUCT
            </Link>
          </div>
        </Grid>

        <Grid item md={3} xs={12}>
          <div
            style={{ backgroundColor: 'white', padding: 20, borderRadius: 20 }}>
            <img
              src={`${baseURL}/products/${product._id}/image`}
              style={{ borderRadius: 20 }}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ViewProduct;
