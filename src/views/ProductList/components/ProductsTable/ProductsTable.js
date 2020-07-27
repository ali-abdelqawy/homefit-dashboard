/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import axios from '../../../../api';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination
} from '@material-ui/core';

import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const ProductsTable = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const [products, setProducts] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [currentProducts, setCurrentProducts] = useState(0);

  const handlePageChange = (event, page) => {
    setPage(page);
    if (currentProducts / (page - 1) === rowsPerPage || currentProducts === 0) {
      setCurrentProducts(prevState => prevState + rowsPerPage);
    } else {
      setCurrentProducts(prevState => prevState - rowsPerPage);
    }
  };
  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  useEffect(() => {
    axios
      .get('/products')
      .then(function(response) {
        // handle success
        setProducts(response.data);
      })
      .catch(function(error) {
        // handle error
        alert(error);
      });
  }, []);

  const deleteProduct = async id => {
    try {
      await axios.delete(`/products/${id}`);
      const newProducts = products.filter(product => product._id !== id);
      setProducts(newProducts);
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteModel = async id => {
    try {
      await axios.delete(`/products/${id}/model`);
      const updatedProducts = [...products];
      const productIndex = updatedProducts.findIndex(p => p._id === id);
      updatedProducts[productIndex].model_path = '';
      setProducts(updatedProducts);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>View Details</TableCell>
                  <TableCell>Edit Product</TableCell>
                  <TableCell>Delete Product</TableCell>
                  <TableCell>3D Model</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products
                  .slice(currentProducts, rowsPerPage + currentProducts)
                  .map(product => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={product._id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>
                        <Link
                          style={{
                            color: '#fff',
                            backgroundColor: '#3f51b5',
                            padding: 10,
                            borderRadius: 5
                          }}
                          to={`/products/${product._id}`}>
                          VIEW DETAILS
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link
                          style={{
                            color: '#fff',
                            backgroundColor: '#2979ff',
                            padding: 10,
                            borderRadius: 5
                          }}
                          to={`/products/${product._id}/edit`}>
                          EDIT PRODUCT
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link
                          onClick={() => deleteProduct(product._id)}
                          style={{
                            color: '#fff',
                            backgroundColor: '#F44336',
                            padding: 10,
                            borderRadius: 5
                          }}>
                          DELETE PRODUCT
                        </Link>{' '}
                      </TableCell>
                      <TableCell>
                        {product.model_path && product.model_path.length && (
                          <Link
                            onClick={() => deleteModel(product._id)}
                            style={{
                              color: '#fff',
                              backgroundColor: '#F44336',
                              padding: 10,
                              borderRadius: 5
                            }}>
                            DELETE MODEL
                          </Link>
                        )}
                        {(!product.model_path ||
                          !product.model_path.length) && (
                          <Link
                            style={{
                              color: '#fff',
                              backgroundColor: '#3f51b5',
                              padding: 10,
                              borderRadius: 5
                            }}
                            to={`product/${product._id}/model/add`}>
                            ADD MODEL
                          </Link>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={products.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

ProductsTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default ProductsTable;
