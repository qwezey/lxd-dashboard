import {FC} from 'react';
import {Form, Formik, Field, FieldProps} from 'formik';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {signIn} from 'next-auth/react';

type FormValues = {
  username: string;
  password: string;
};

export function Authenticate(): ReturnType<FC> {
  return (
    <Formik<FormValues>
      initialValues={{username: '', password: ''}}
      onSubmit={async (values, {setFieldError}) => {
        const some = await signIn('credentials', {redirect: false, ...values});
        if (!some?.ok)
          setFieldError(
            'username',
            'There was an error signing in. Verify you entered the correct info.'
          );
      }}
      validationSchema={yup.object({
        username: yup.string().required(),
        password: yup.string().required(),
      })}
    >
      {({isValid}) => (
        <Form>
          <Stack gap={2} p={12} alignItems="center">
            <Field name="username">
              {({
                field,
                meta: {error, touched},
              }: FieldProps<FormValues['username']>) => (
                <TextField
                  label="Username"
                  variant="outlined"
                  {...field}
                  error={touched && !!error}
                  helperText={touched && error}
                  fullWidth
                />
              )}
            </Field>
            <Field name="password">
              {({
                field,
                meta: {error, touched},
              }: FieldProps<FormValues['password']>) => (
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  {...field}
                  error={touched && !!error}
                  helperText={touched && error}
                  fullWidth
                />
              )}
            </Field>
            <Button disabled={!isValid} type="submit">
              Sign In
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
