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
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';
import axios from '../../api';
import { colors } from '../../constants';

const useStyles = makeStyles(() => ({
  root: {}
}));

const AddProduct = props => {
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
    categoryId: '',
    modelURL: ''
  });
  const [method, setMethod] = useState('url');
  const [categories, setCategories] = useState([]);
  const [saveState, setSaveState] = useState(1);
  const [productImage, setProductImage] = useState(null);
  const [productModelFiles, setProductModelFiles] = useState([]);
  const [productModelTextures, setProductModelTextures] = useState([]);
  const [productId, setProductId] = useState('');

  useEffect(() => {
    axios
      .get('/categories')
      .then(function(response) {
        // handle success
        setCategories(response.data);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }, []);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleProductSubmit = async () => {
    try {
      const response = await axios.post(`/products/${values.categoryId}`, {
        ...values
      });
      setProductId(response.data._id);
      setSaveState(2);
    } catch (error) {
      alert(error);
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
      await axios.post(`/products/${productId}/image`, formData);
      alert('Product Image Saved!');
    } catch (error) {
      alert(error);
    }
  };
  const onProductModelChange = event => {
    setProductModelFiles(event.target.files);
  };

  const onModelTexturesChange = event => {
    setProductModelTextures(event.target.files);
  };

  const onModelsUpload = async () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      'productModel',
      productModelFiles[0],
      productModelFiles[0].name
    );
    formData.append(
      'productModel',
      productModelFiles[1],
      productModelFiles[1].name
    );
    try {
      await axios.post(`/products/${productId}/model`, formData);
      alert('Model Files Added!');
    } catch (error) {
      alert(error);
    }
  };

  const handleMethodChange = async event => {
    setMethod(event.target.value);
  };

  const onModelTexturesUpload = async () => {
    //Create an object of formData
    const formData = new FormData();

    for (let i = 0; i < productModelTextures.length; i++) {
      formData.append(
        'productTexture',
        productModelTextures[i],
        productModelTextures[i].name
      );
    }
    try {
      await axios.post(`/products/${productId}/texture`, formData);
      alert('Model Textures Added!');
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
              <CardHeader title="Add Product" />
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
                    <label style={{ fontFamily: 'roboto' }}>
                      Select Category
                    </label>
                    <TextField
                      fullWidth
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
                  Next
                </Button>
              </CardActions>
            </form>
          </Card>
        </Grid>
      </Grid>
    );
  } else if (saveState === 2) {
    return (
      <Grid container>
        <Grid item lg={12} md={6} xl={4} xs={12}>
          <Card {...rest} className={clsx(classes.root, className)}>
            <CardHeader title="Add Product Image" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <form noValidate>
                    <input onChange={onFileChange} type="file" />
                    <br />
                    <br />
                    {saveState === 2 && (
                      <Button
                        color="primary"
                        onClick={onFileUpload}
                        variant="contained">
                        Save Image
                      </Button>
                    )}
                  </form>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <br />
          <Card {...rest} className={clsx(classes.root, className)}>
            <CardHeader title="Select Model Upload Method:" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="method"
                      name="method"
                      onChange={handleMethodChange}
                      value={method}>
                      <FormControlLabel
                        control={<Radio />}
                        label="URL"
                        value="url"
                      />
                      <FormControlLabel
                        control={<Radio />}
                        label="Upload Files"
                        value="upload"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <br />
          {method === 'upload' && (
            <>
              <Card {...rest} className={clsx(classes.root, className)}>
                <CardHeader title="Add Product 3D Model Files" />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <form encType="multipart/form-data" noValidate>
                        <input
                          multiple
                          name="productModel"
                          onChange={onProductModelChange}
                          type="file"
                        />
                        <br />
                        <br />
                        {saveState === 2 && (
                          <Button
                            color="primary"
                            onClick={onModelsUpload}
                            variant="contained">
                            Save Model Files
                          </Button>
                        )}
                      </form>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <br />
              <Card {...rest} className={clsx(classes.root, className)}>
                <CardHeader title="Add Product 3D Model Textures" />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <form encType="multipart/form-data" noValidate>
                        <input
                          multiple
                          name="productTextures"
                          onChange={onModelTexturesChange}
                          type="file"
                        />
                        <br />
                        <br />
                        {saveState === 2 && (
                          <Button
                            color="primary"
                            onClick={onModelTexturesUpload}
                            variant="contained">
                            Save Model Textures
                          </Button>
                        )}
                      </form>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </>
          )}
          {method === 'url' && (
            <Card {...rest} className={clsx(classes.root, className)}>
              <CardHeader title="Add Product URL" />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <form noValidate>
                      <TextField
                        fullWidth
                        label="Model URL"
                        margin="dense"
                        name="modelURL"
                        onChange={handleChange}
                        required
                        value={values.modelURL}
                        variant="outlined"
                      />
                      <br />
                      <br />
                      {saveState === 2 && (
                        <Button
                          color="primary"
                          onClick={onModelTexturesUpload}
                          variant="contained">
                          Save
                        </Button>
                      )}
                    </form>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}
          <br />
          <Button
            style={{
              backgroundColor: '#3f51b5',
              color: 'white'
            }}
            onClick={() => {
              window.location.reload(false);
            }}>
            Done
          </Button>
        </Grid>
      </Grid>
    );
  }
};

AddProduct.propTypes = {
  className: PropTypes.string
};

export default AddProduct;
