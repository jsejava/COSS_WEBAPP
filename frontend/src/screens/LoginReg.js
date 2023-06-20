import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { login } from "../Redux/Actions/userAction";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import * as Yup from "yup";
import { useFormik } from "formik";
//Form validation
const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginReg = ({ location, history }) => {
  window.scrollTo(0, 0);

  // const page = localStorage.getItem("locationPage");
  // console.log("local_locationPage", page);

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  // console.log(location.search);
  // console.log(location.search.split("=")[1]);
  console.log(localStorage.getItem("locationPage"));

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      console.log(localStorage.getItem("locationPage"));
      const page = localStorage.getItem("locationPage");
      console.log("local_locationPage", page);
      history.push(`/${page}`);
    }
  }, [userInfo, history, redirect]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(login(values));
    },
    validationSchema: formSchema,
  });

  // const submitHandler = (e) => {
  //   e.preventDefault();

  //   dispatch(login(email, password));
  // };

  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}
        <div>
          <img alt="logo" src="/logo/s2.jpeg" />
        </div>
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={formik.handleSubmit}
          _lpchecked="1"
        >
          <input
            value={formik.values.email}
            onBlur={formik.handleBlur("email")}
            onChange={formik.handleChange("email")}
            // className="form-control mb-2"
            type="email"
            placeholder="E-mail address"
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
          <button type="submit">Login</button>
          <p>
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginReg;
