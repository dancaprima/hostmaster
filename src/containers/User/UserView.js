import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import api from '../../utils/api';
import { USERS } from '../../utils/urls';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 650
  }
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
];

export default class UserView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  async componentDidMount() {
    try {
      const payload = await api.get(USERS);
      this.setState({
        data: payload.data.data
      });
      console.log(payload.data.data);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-sm-4">
            <Link to={'/dashboard/users/add'}>
              <div className="mb-3">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Tambah
                </Button>
              </div>
            </Link>
          </div>
        </div>
        <div>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Avatar</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="right">First name</TableCell>
                  <TableCell align="right">Last Name</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.data.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      <Avatar alt={row.email} src={row.avatar} />
                    </TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="right">{row.first_name}</TableCell>
                    <TableCell align="right">{row.last_name}</TableCell>
                    <TableCell align="right">
                      <Link to={`/dashboard/users/edit/${row.id}`}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          Edit
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </React.Fragment>
    );
  }
}
