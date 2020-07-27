import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField
} from '@material-ui/core';
import axios from '../../../../api';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Password = props => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get('/users/me');
      setUser(data);
    };
    fetchUser();
  }, []);
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    password: '',
    newPassword: ''
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const updatePassword = async () => {
    const { data } = await axios.post('/users/login', {
      email: user.email,
      password: values.password
    });
    if (data.token) {
      await axios.patch('/users/me', { password: values.newPassword });
      window.location.reload(false);
    }
    //console.log(values.password, values.newPassword);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form method="POST">
        <CardHeader title="UPDATE PASSWORD" />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Current Password"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="New Password"
            name="newPassword"
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => updatePassword()}>
            Update
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
