import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const Gate = () => {
  useEffect(() => {
    const getUserToken = async () => {
      const token = localStorage.getItem('userToken');
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
