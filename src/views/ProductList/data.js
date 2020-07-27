import axios from '../../api';

const getAllProducts = () => {
  axios
    .get('/products')
    .then(function(response) {
      // handle success
      return response.data;
    })
    .catch(function(error) {
      // handle error
      return error;
    });
};

export default getAllProducts;
