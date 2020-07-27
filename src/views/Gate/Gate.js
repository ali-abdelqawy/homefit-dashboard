import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const Gate = props => {
  useEffect(() => {
    const getUserToken = async () => {
      const token = await localStorage.getItem('userToken');
      if (!token) {
        window.location.href = '/sign-in';
      } else {
        window.location.href = '/dashboard';
      }
    };
    getUserToken();
  }, []);

  return null;
};

Gate.propTypes = {
  history: PropTypes.object
};

export default withRouter(Gate);
