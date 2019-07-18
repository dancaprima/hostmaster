import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from '@material-ui/core/Button';
import FormErrorMsg from '../../components/FormErrorMsg';
import api from '../../utils/api';
import { USERS } from '../../utils/urls';
import { withRouter } from 'react-router';

const LoginSchema = Yup.object().shape({
  name: Yup.string().required('Harus Di isi'),
  job: Yup.string().required('Harus Di isi')
});

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: '',
        job: ''
      },
      data: null
    };
  }
  async componentDidMount() {
    const paramId = this.props.match.params.id;
    try {
      if (paramId) {
        const payload = await api.get(`${USERS}/${paramId}`);
        this.setState({
          form: {
            name: payload.data.data.first_name,
            job: ''
          },
          data: payload.data.data
        });
      }
    } catch (e) {
      alert('gagal load');
    }
  }
  async handleSubmit(reqBody) {
    const paramId = this.props.match.params.id;

    try {
      if (paramId) {
        const payload = await api.put(`${USERS}/${paramId}`, reqBody);
        alert('sukses edit');
      } else {
        const payload = await api.post(USERS, reqBody);
        alert('sukses post');
      }
      this.props.history.push('/dashboard/users');
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    const paramId = this.props.match.params.id;

    return (
      <div className="row">
        <div className="col-sm-6 offset-sm-3">
          <Card>
            <CardContent>
              <Formik
                initialValues={this.state.form}
                enableInitialize={true}
                validationSchema={LoginSchema}
                onSubmit={(values, actions) => {
                  // same shape as initial values
                  this.handleSubmit(values);
                  // setTimeout(() => {
                  //   alert(JSON.stringify(values, null, 2));
                  //   actions.setSubmitting(false);
                  // }, 2000);
                }}
              >
                {({ errors, touched, isSubmitting, isValid }) => (
                  <Form>
                    <div className="row">
                      <div className="col-sm-6 offset-sm-3 text-center  mt-3">
                        <h5 className="text-center">User Form</h5>
                        <h3>{this.state.data && this.state.data.email}</h3>
                      </div>
                      <div className="col-sm-12">
                        <Field
                          name="name"
                          render={({ field }) => {
                            return (
                              <TextField
                                error={errors.name && touched.email}
                                id="name"
                                label="Name"
                                fullWidth
                                {...field}
                                margin="normal"
                              />
                            );
                          }}
                        />
                        <ErrorMessage component={FormErrorMsg} name="name" />
                      </div>
                      <div className="col-sm-12">
                        <Field
                          name="job"
                          render={({ field }) => {
                            return (
                              <TextField
                                error={errors.job && touched.password}
                                id="job"
                                label="Job"
                                fullWidth
                                {...field}
                                margin="normal"
                              />
                            );
                          }}
                        />
                        <ErrorMessage component={FormErrorMsg} name="job" />
                      </div>
                    </div>
                    <div className="mt-5">
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                      >
                        {paramId ? 'EDIT' : 'SUBMIT'}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default withRouter(UserForm);
