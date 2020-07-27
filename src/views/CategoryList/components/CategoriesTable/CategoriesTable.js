import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button
} from '@material-ui/core';

import axios from '../../../../api';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const CategoriesTable = props => {
  const { className, users, ...rest } = props;

  const classes = useStyles();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const { data } = await axios.get('/categories');
      console.log(data);
      setCategories(data);
    };
    getCategories();
  }, []);

  const deleteCategory = async id => {
    await axios.delete(`/categories/${id}`);
    window.location.reload(false);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Edit Category</TableCell>
                  <TableCell>Delete Category</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map(category => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={category._id}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>
                      <Link
                        style={{
                          color: '#fff',
                          backgroundColor: '#2979ff',
                          padding: 10,
                          borderRadius: 5
                        }}
                        to={`/categories/${category._id}/edit`}>
                        EDIT CATEGORY
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => deleteCategory(category._id)}>
                        Delete Category
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

CategoriesTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default CategoriesTable;
