import * as React from "react";
import { TextField, Checkbox, FormControlLabel, Button } from "@mui/material";
import { Grid, Box, Container, Typography, IconButton } from "@mui/material";
import googleIcon from "../../assets/googleIcon.png";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Formik, Form } from "formik";
import { signinSchema } from "../../helpers/validator";
import useAuth from "../../hooks/useAuth";

const SigninForm: React.FC<IAuthModal> = ({
  openAuthModal,
  setOpenAuthModal,
}) => {
  const { signin } = useAuth();
  const [showPassword, setShowPassword] = React.useState(true);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const initialValues: ISigninInitialValues = { email: "", password: "" };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" mr={3}>
          Sign in
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={signinSchema}
          onSubmit={(values, actions) => {
            signin(values);
            actions.setSubmitting(false);
            actions.resetForm();
            setOpenAuthModal({ auth: "", open: false });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Box height={85} minWidth={{ xs: 270, sm: 400 }}>
                <TextField
                  // autoFocus
                  fullWidth
                  id="email"
                  label="Email adress"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Box>
              <Box height={85} minWidth={{ xs: 270, sm: 400 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Password"
                  type={showPassword ? "password" : "text"}
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword((show) => !show)}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  fullWidth
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    bgcolor: "#926a7e",
                    "&:hover": { bgcolor: "#926a7ee9" },
                  }}
                >
                  Sign In
                </Button>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  //   onClick={() => GoogleProvider("login", "googleUser")}
                  sx={{
                    textTransform: "none",
                    lineHeight: "1.2",
                    pb: 0,
                    pt: 0.4,
                    pl: 0.4,
                    pr: 1,
                    justifyContent: "space-between",
                    bgcolor: "#926a7e",
                    "&:hover": { bgcolor: "#926a7ee9" },
                  }}
                >
                  <span style={{ marginRight: 2 }}>
                    <img
                      src={googleIcon}
                      alt="Google"
                      style={{ height: "32px", width: "32px", borderRadius: 4 }}
                    />
                  </span>
                  Sign In With Google
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
        <Grid container mt={2}>
          <Grid item xs>
            <Button
              variant="text"
              sx={{
                textTransform: "none",
              }}
            >
              Forgot password?
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="text"
              sx={{
                textTransform: "none",
              }}
              onClick={() => {
                setOpenAuthModal({ auth: "Signup", open: true });
              }}
            >
              New user? Sign up
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SigninForm;
