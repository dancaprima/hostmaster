import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './Login.css';
import FormErrorMsg from '../../components/FormErrorMsg';
import Button from '@material-ui/core/Button';

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .required('Harus Di isi')
    .email('Email tidak sesuai format'),
  password: Yup.string().required('Harus Di isi')
});

class RegisterSchema extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   username: '',
    //   password: ''
    // };
  }
  render() {
    return (
      <div className="login-wrapper">
        <div className="login-box">
          <Card>
            <CardContent>
              <Formik
                initialValues={{
                  email: '',
                  password: ''
                }}
                validationSchema={RegisterSchema}
                onSubmit={(values, actions) => {
                  // same shape as initial values
                  this.props.login(values);
                  // setTimeout(() => {
                  //   alert(JSON.stringify(values, null, 2));
                  //   actions.setSubmitting(false);
                  // }, 2000);
                }}
              >
                {({ errors, touched, isSubmitting, isValid }) => (
                  <Form>
                    <div className="row">
                      <div className="col-sm-12 text-center mt-3">
                        <h3>LOGIN</h3>
                      </div>
                      <div className="col-sm-12">
                        <Field
                          name="email"
                          render={({ field }) => {
                            return (
                              <TextField
                                error={errors.email && touched.email}
                                id="email"
                                label="Email"
                                fullWidth
                                {...field}
                                margin="normal"
                              />
                            );
                          }}
                        />
                        <ErrorMessage component={FormErrorMsg} name="email" />
                      </div>
                      <div className="col-sm-12">
                        <Field
                          name="password"
                          render={({ field }) => {
                            return (
                              <TextField
                                error={errors.password && touched.password}
                                id="password"
                                label="Password"
                                type="password"
                                fullWidth
                                {...field}
                                margin="normal"
                              />
                            );
                          }}
                        />
                        <ErrorMessage
                          component={FormErrorMsg}
                          name="password"
                        />
                      </div>
                    </div>
                    <div className="mt-5">
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                      >
                        Primary
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

export default Login;
