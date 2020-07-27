import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button
} from '@material-ui/core';

import { getInitials } from 'helpers';
import axios from '../../../../api';

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

const UsersTable = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [selectedUsers] = useState([]);
  const [rowsPerPage] = useState(10);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const users = await axios.get('/users');
      console.log('users');
      const customers = users.data.filter(function(user) {
        return user.accType === 'customer';
      });
      setUsers(customers);
    };
    fetchData();
  }, []);

  const handleMakeAdmin = async (userId, userName) => {
    try {
      await axios.patch(`/makeAdmin/${userId}`);
      window.location.reload(false);
      alert(`${userName} is now an admin!`);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const handleDeleteUser = async userId => {
    try {
      await axios.delete(`/deleteuser/${userId}`);
      const newUsers = users.filter(user => user._id !== userId);
      setUsers(newUsers);
    } catch (error) {
      alert(error);
      console.log(error);
    }
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
                  <TableCell>Email</TableCell>
                  <TableCell>Registration date</TableCell>
                  <TableCell>Make Admin</TableCell>
                  <TableCell>Delete User</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.slice(0, rowsPerPage).map(user => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={user._id}
                    selected={selectedUsers.indexOf(user.id) !== -1}>
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Avatar className={classes.avatar} src={user.avatarUrl}>
                          {getInitials(user.name)}
                        </Avatar>
                        <Typography variant="body1">{user.name}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {moment(user.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      <Button
                        color="primary"
                        onClick={() => handleMakeAdmin(user._id, user.name)}
                        variant="contained">
                        Make Admin
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        color="secondary"
                        onClick={() => handleDeleteUser(user._id)}
                        variant="contained">
                        Delete User
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

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default UsersTable;
