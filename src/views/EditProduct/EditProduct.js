import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  TextareaAutosize,
  Typography
} from '@material-ui/core';
import axios from '../../api';
import { colors, baseURL } from '../../constants';

const useStyles = makeStyles(() => ({
  root: {}
}));

const EditProduct = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    color: '',
    width: '',
    height: '',
    depth: '',
    categoryId: ''
  });

  const [categories, setCategories] = useState([]);
  const [saveState, setSaveState] = useState(1);
  const [productImage, setProductImage] = useState(null);
  const [productId, setProductId] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get('/categories');
      setCategories(data);
      console.log(props.match.params.id);
    };
    fetchCategories();

    const fetchProduct = async () => {
      const { data } = await axios.get(`/products/${props.match.params.id}`);
      setValues({ ...data });
    };
    fetchProduct();
  }, []);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleProductSubmit = async () => {
    const updatedProduct = {};
    updatedProduct.name = values.name;
    updatedProduct.width = values.width;
    updatedProduct.height = values.height;
    updatedProduct.depth = values.depth;
    updatedProduct.categoryId = values.categoryId;
    updatedProduct.color = values.color;
    updatedProduct.price = values.price;
    updatedProduct.description = values.description;

    try {
      await axios.patch(`/products/${props.match.params.id}`, {
        ...updatedProduct
      });
      window.location.reload(false);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const onFileChange = event => {
    setProductImage(event.target.files[0]);
  };

  const onFileUpload = async () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append('image', productImage, productImage.name);
    try {
      await axios.post(`/products/${props.match.params.id}/image`, formData);
      window.location.reload(false);
    } catch (error) {
      alert(error);
    }
  };

  if (saveState === 1) {
    return (
      <Grid container>
        <Grid item lg={12} md={6} xl={4} xs={12}>
          <Card {...rest} className={clsx(classes.root, className)}>
            <form autoComplete="off" noValidate>
              <CardHeader title="Edit Product" />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      margin="dense"
                      name="name"
                      onChange={handleChange}
                      required
                      value={values.name}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Price"
                      margin="dense"
                      name="price"
                      onChange={handleChange}
                      required
                      type="number"
                      value={values.price}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Width"
                      margin="dense"
                      name="width"
                      onChange={handleChange}
                      required
                      type="number"
                      value={values.width}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Height"
                      margin="dense"
                      name="height"
                      onChange={handleChange}
                      type="number"
                      value={values.height}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Depth"
                      margin="dense"
                      name="depth"
                      onChange={handleChange}
                      required
                      type="number"
                      value={values.depth}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Select Color"
                      margin="dense"
                      name="color"
                      onChange={handleChange}
                      required
                      select
                      // eslint-disable-next-line react/jsx-sort-props
                      SelectProps={{ native: true }}
                      value={values.color}
                      variant="outlined">
                      {colors.map(option => (
                        <option
                          key={option.value}
                          style={{ color: option.value }}
                          value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Select Categories"
                      margin="dense"
                      name="categoryId"
                      onChange={handleChange}
                      required
                      select
                      // eslint-disable-next-line react/jsx-sort-props
                      SelectProps={{ native: true }}
                      value={values.categoryId}
                      variant="outlined">
                      {categories.map(option => (
                        <option key={option._id} value={option._id}>
                          {option.name}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      margin="dense"
                      multiline
                      name="description"
                      onChange={handleChange}
                      required
                      rows={3}
                      rowsMax={10}
                      value={values.description}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <CardActions>
                <Button
                  color="primary"
                  onClick={() => handleProductSubmit()}
                  variant="contained">
                  Save Product
                </Button>
              </CardActions>
            </form>
            <br />
            <br />
            <Grid item md={12} style={{ marginLeft: 20 }} xs={12}>
              <Typography variant="h3">Change Product Image</Typography>
              <br />
              <br />
              <img src={`${baseURL}/products/${props.match.params.id}/image`} />
              <form noValidate>
                <input onChange={onFileChange} type="file" />
                <Button
                  color="primary"
                  onClick={onFileUpload}
                  variant="contained">
                  Save
                </Button>
                <br />
                <br />
                <br />
              </form>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    );
  } else if (saveState === 2) {
    return (
      <Grid container>
        <Grid item lg={12} md={6} xl={4} xs={12}>
          <Card {...rest} className={clsx(classes.root, className)}>
            <CardHeader title="Add Product" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <Typography>Add Product Image</Typography>
                  <form noValidate>
                    <input onChange={onFileChange} type="file" />
                    {saveState === 2 && (
                      <Button
                        color="primary"
                        onClick={onFileUpload}
                        variant="contained">
                        Next
                      </Button>
                    )}
                  </form>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
};

EditProduct.propTypes = {
  className: PropTypes.string
};

export default EditProduct;
