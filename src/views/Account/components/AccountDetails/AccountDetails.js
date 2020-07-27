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
  TextField
} from '@material-ui/core';

import axios from '../../../../api';

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = props => {
  const { className, ...rest } = props;

  const [userName, setUserName] = useState('');
  const classes = useStyles();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get('/users/me');
      setUserName(data.name);
    };
    fetchUser();
  }, []);

  const handleChange = event => {
    setUserName(event.target.value);
  };

  const onSubmit = async () => {
    await axios.patch('/users/me', { name: userName });
    window.location.reload(false);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete="off" noValidate>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <label style={{ fontFamily: 'Roboto' }}>Name</label>
              <TextField
                fullWidth
                margin="dense"
                name="name"
                onChange={handleChange}
                required
                value={userName}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={() => onSubmit()}>
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
