import React, { useState } from 'react';
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
  Radio,
  FormControlLabel,
  RadioGroup,
  FormControl,
  TextField
} from '@material-ui/core';
import axios from '../../api';

const useStyles = makeStyles(() => ({
  root: {}
}));

const AddModel = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [method, setMethod] = useState('url');
  const [modelLink, setModelLink] = useState('');
  const [productId] = useState(props.match.params.id);
  const [productModelFiles, setProductModelFiles] = useState([]);
  const [productModelTextures, setProductModelTextures] = useState([]);
  const [filesButtonTitle, setFileButtonTitle] = useState('SAVE MODEL FILES');
  const [texturesButtonTitle, setTexturesButtonTitle] = useState(
    'SAVE MODEL TEXTURES'
  );

  const handleMethodChange = async event => {
    setMethod(event.target.value);
  };

  const handleModelLinkChange = async event => {
    setModelLink(event.target.value);
  };

  const onProductModelChange = event => {
    setProductModelFiles(event.target.files);
  };

  const onModelTexturesChange = event => {
    setProductModelTextures(event.target.files);
  };

  const onModelLinkSubmit = async () => {
    try {
      await axios.post(`/products/${productId}/modelLink`, { modelLink });
      window.location.href = '/products';
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const onModelsUpload = async () => {
    setFileButtonTitle('Uploading...');
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    for (let i = 0; i < productModelFiles.length; i++) {
      formData.append(
        'productModel',
        productModelFiles[i],
        productModelFiles[i].name
      );
    }

    try {
      await axios.post(`/products/${productId}/model`, formData);
      setFileButtonTitle('SAVE MODEL FILES');
      alert('Model Files Added!');
    } catch (error) {
      setFileButtonTitle('SAVE MODEL FILES');
      alert(error);
    }
  };

  const onModelTexturesUpload = async () => {
    //Create an object of formData
    const formData = new FormData();
    setTexturesButtonTitle('Loading...');
    for (let i = 0; i < productModelTextures.length; i++) {
      formData.append(
        'productTexture',
        productModelTextures[i],
        productModelTextures[i].name
      );
    }
    try {
      await axios.post(`/products/${productId}/texture`, formData);
      setTexturesButtonTitle('SAVE MODEL TEXTURES');
      alert('Model Textures Added!');
    } catch (error) {
      alert(error);
      setTexturesButtonTitle('SAVE MODEL TEXTURES');
    }
  };

  return (
    <Grid container>
      <Grid item lg={12} md={6} xl={4} xs={12}>
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
                      onChange={handleModelLinkChange}
                      required
                      value={modelLink}
                      variant="outlined"
                    />
                    <br />
                    <br />
                    <Button
                      color="primary"
                      onClick={onModelLinkSubmit}
                      variant="contained">
                      Save
                    </Button>
                  </form>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
        <br />
        {method === 'upload' && (
          <>
            <Card {...rest} className={clsx(classes.root, className)}>
              <CardHeader title="Add Product 3D Model Files" />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <form noValidate encType="multipart/form-data">
                      <input
                        name="productModel"
                        onChange={onProductModelChange}
                        type="file"
                        multiple
                      />
                      <br />
                      <br />
                      <Button
                        color="primary"
                        onClick={onModelsUpload}
                        variant="contained">
                        {filesButtonTitle}
                      </Button>
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
                    <form noValidate encType="multipart/form-data">
                      <input
                        name="productTextures"
                        onChange={onModelTexturesChange}
                        type="file"
                        multiple
                      />
                      <br />
                      <br />
                      <Button
                        color="primary"
                        onClick={onModelTexturesUpload}
                        variant="contained">
                        {texturesButtonTitle}
                      </Button>
                    </form>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => {
                    window.location.href = '/products';
                  }}>
                  Done
                </Button>
              </CardActions>
            </Card>
          </>
        )}
      </Grid>
    </Grid>
  );
};

AddModel.propTypes = {
  className: PropTypes.string
};

export default AddModel;
