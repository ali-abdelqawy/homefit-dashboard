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

const useStyles = makeStyles(() => ({
  root: {}
}));

const EditCategory = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    name: ''
  });

  useEffect(() => {
    const getCategory = async () => {
      const { data } = await axios.get(`/categories/${props.match.params.id}`);
      delete data._id;
      delete data.__v;
      setValues({ ...data });
    };

    getCategory();
  }, []);
  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleCategorySubmit = async () => {
    try {
      await axios.patch(`/categories/${props.match.params.id}`, { ...values });
      alert('Category Edited!');
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  return (
    <Grid container>
      <Grid item lg={12} md={6} xl={4} xs={12}>
        <Card {...rest} className={clsx(classes.root, className)}>
          <form autoComplete="off" noValidate>
            <CardHeader title="Edit Category" />
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
              </Grid>
            </CardContent>
            <Divider />
            <CardActions>
              <Button
                color="primary"
                onClick={() => handleCategorySubmit()}
                variant="contained">
                Save Category
              </Button>
            </CardActions>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
};

EditCategory.propTypes = {
  className: PropTypes.string
};

export default EditCategory;
