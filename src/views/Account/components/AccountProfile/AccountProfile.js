import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Divider,
  Button
} from '@material-ui/core';
import axios from '../../../../api';
import { baseURL } from '../../../../constants';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

const AccountProfile = props => {
  const { className, ...rest } = props;
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get('/users/me');
      setUser(data);
    };
    fetchUser();
  }, []);

  const onImageChange = event => {
    setAvatar(event.target.files[0]);
  };

  const onImageUpload = async () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append('avatar', avatar, avatar.name);
    try {
      await axios.post(`/users/me/avatar`, formData);
      window.location.reload(false);
    } catch (error) {
      alert(error);
    }
  };

  const deleteImage = async () => {
    await axios.delete('/users/me/avatar');
    window.location.reload(false);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <div
          className={classes.details}
          style={{ flex: 1, justifyContent: 'center', marginRight: 140 }}>
          <Avatar
            className={classes.avatar}
            src={`${baseURL}/users/${user._id}/avatar`}
          />
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <form noValidate>
          <input onChange={onImageChange} type="file" />
          <br />
          <br />
          <Button
            onClick={() => onImageUpload()}
            className={classes.uploadButton}
            color="primary"
            variant="text">
            Update picture
          </Button>
        </form>
        <Button variant="text" onClick={() => deleteImage()}>
          Remove picture
        </Button>
      </CardActions>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string
};

export default AccountProfile;
