import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import { register } from "../Redux/Actions/userAction";
import Header from "./../components/Header";
import SuccessMessage from "../components/SuccessMessage";
import { useFormik } from "formik";
import * as Yup from "yup";

//Form validation
const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
  // pin: Yup.string().required("pin is required"),
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
});

const Register = ({ location, history }) => {
  window.scrollTo(0, 0);
  //// const [firstname, setFirstname] = useState("");
  //// const [lastname, setLastname] = useState("");
  // // const [pin, setPin] = useState("");
  // // const [email, setEmail] = useState("");
  //// const [password, setPassword] = useState("");
  const [Empty, setEmpty] = useState(false);
  // const [Emptyln, setEmptyln] = useState(false);

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  let { error, loading, registered } = userRegister;

  // console.log(localStorage.getItem("locationPage"));

  // console.log(userRegister);

  useEffect(
    () => {
      setTimeout(() => {
        if (registered)
          //history.push(redirect);
          history.push("/login-reg");
      }, 5000);
    },
    ////[registered, history]);
    [registered]
  );

  //initialize form
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      amount: 5,
    },

    onSubmit: (values) => {
      if (
        values.firstname.trim().length === 0 ||
        values.lastname.trim().length === 0
      )
        return setEmpty(true);
      dispatch(register(values));
    },
    validationSchema: formSchema,
  });

  return (
    <>
      <Header />

      {registered ? (
        <>
          <div className="col-12 col-lg d-flex flex-column justify-content-center align-items-center login-center">
            <div className="p-5 bg-light rounded text-center">
              <SuccessMessage
                title=" Successful Registration"
                msg=" An Verification Link is sent to your e-mail"
                description="Pls Verify For a successul Login"
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container d-flex flex-column justify-content-center align-items-center login-center">
            {error && <Message variant="alert-danger">{error}</Message>}
            {loading && <Loading />}

            <form
              className="Login col-md-8 col-lg-4 col-11"
              onSubmit={formik.handleSubmit}
            >
              <input
                value={formik.values.firstname}
                onBlur={formik.handleBlur("firstname")}
                onChange={formik.handleChange("firstname")}
                // className="form-control mb-2"
                type="text"
                placeholder="First Name"
              />
              {/* Err */}
              <div className="text-danger mb-2">
                {formik.touched.firstname && formik.errors.firstname}
                {Empty && formik.values.firstname.trim().length <= 0 ? (
                  <label>First Name can't be Empty</label>
                ) : (
                  ""
                )}
              </div>
              <input
                value={formik.values.lastname}
                onBlur={formik.handleBlur("lastname")}
                onChange={formik.handleChange("lastname")}
                // className="form-control mb-2"
                type="TEXT"
                placeholder="Last Name"
              />
              {/* Err */}
              <div className="text-danger mb-2">
                {formik.touched.lastname && formik.errors.lastname}
                {Empty && formik.values.lastname.trim().length <= 0 ? (
                  <label>Last Name can't be Empty</label>
                ) : (
                  ""
                )}
              </div>
              <input
                value={formik.values.email}
                onBlur={formik.handleBlur("email")}
                onChange={formik.handleChange("email")}
                // className="form-control mb-2"
                type="email"
                placeholder="Email"
              />
              {/* Err */}
              <div className="text-danger mb-2">
                {formik.touched.email && formik.errors.email}
              </div>
              <input
                value={formik.values.password}
                onBlur={formik.handleBlur("password")}
                onChange={formik.handleChange("password")}
                // className="form-control mb-2"
                type="password"
                placeholder="Password"
              />
              {/* Err */}
              <div className="text-danger mb-2">
                {formik.touched.password && formik.errors.password}
              </div>
              <button type="submit">Register</button>{" "}
              <p>
                <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                  I Have Account <strong>Login</strong>
                </Link>
              </p>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Register;
