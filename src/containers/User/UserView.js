import React from 'react';
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

  async deleteItem(id) {
    try {
      const payload = await api.delete(`${USERS}/${id}`);
      alert('sukses menghapus');
      const data = this.state.data.filter(el => el.id !== id);

      this.setState({
        data
      });

      console.log(payload);
    } catch (e) {
      console.log(e);
      alert('gagal menghapus');
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
                {this.state.data.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      <Avatar alt={row.email} src={row.avatar} />
                    </TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="right">{row.first_name}</TableCell>
                    <TableCell align="right">{row.last_name}</TableCell>
                    <TableCell align="right">
                      <Link
                        to={`/dashboard/users/edit/${row.id}`}
                        className="mr-2"
                      >
                        <Button variant="contained" color="primary">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        onClick={() => this.deleteItem(row.id)}
                        variant="contained"
                        color="secondary"
                      >
                        Delete
                      </Button>
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
