import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../LoadingError/Error";
import Toast from "./../LoadingError/Toast";
import Loading from "./../LoadingError/Loading";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../Redux/Actions/userAction";

const ProfileTabs = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  // const [pin, setPin] = useState("");
  // const [newpin, setNewin] = useState("");
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [showPin, setShowPin] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const toastId = React.useRef(null);

  const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { loading: updateLoading } = userUpdateProfile;

  useEffect(() => {
    if (user) {
      setFirstname(user.firstname);
      setLastname(user.lastname);
      // setPin(user.pin);
      // setEmail(user.email);
      //console.log(user);
    }
  }, [dispatch, user]);

  // function pinHandler() {
  //   setShowPin(true);
  // }

  const submitHandler = (e) => {
    e.preventDefault();
    // Password match
    if (password !== confirmPassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Password does not match", Toastobjects);
      }
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          firstname,
          lastname,
          // pin,
          // newpin,
          //email,
          password,
        })
      );
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Profile Updated", Toastobjects);
      }
    }
  };

  return (
    <>
      <Toast />
      {error && <Message variant="alert-danger">{error}</Message>}
      {loading && <Loading />}
      {updateLoading && <Loading />}

      <div className="col-12 col-md-12 row  form-container mt-5">
        <div className="form mt-5">
          {/* <div
            className="btn btn-outline-danger col-12 col-md-2"
            onClick={() => setShowPin(!showPin)}
          >
            Change Pin
          </div> */}
          <div
            className="btn btn-outline-danger col-12 col-md-2"
            onClick={() => setShowPass(!showPass)}
          >
            Change Password
          </div>
        </div>
      </div>
      <form className="row  form-container" onSubmit={submitHandler}>
        <div className="col-md-6">
          <div className="form">
            <label for="account-fn">FirstName</label>
            <input
              className="form-control"
              type="text"
              required
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-fn">LastName</label>
            <input
              className="form-control"
              type="text"
              required
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
        </div>
        {/* {showPin ? (
          <>
            <div className="col-md-6">
              <div className="form">
                <label for="account-pin">current pin</label>
                <input
                  className="form-control"
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="*   *   *   *"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form">
                <label for="account-newpin">new pin</label>
                <input
                  className="form-control"
                  type="password"
                  value={newpin}
                  onChange={(e) => setNewin(e.target.value)}
                  placeholder="*   *   *   *"
                />
              </div>
            </div>
          </>
        ) : null} */}

        {/* <div className="col-md-6">
          <div className="form">
            <label for="account-email">E-mail Address</label>
            <input
              className="form-control"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div> */}
        {showPass ? (
          <>
            <div className="col-md-6">
              <div className="form">
                <label for="account-pass">New Password</label>
                <input
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="*   *   *   *"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form">
                <label for="account-confirm-pass">Confirm Password</label>
                <input
                  className="form-control"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="*   *   *   *"
                />
              </div>
            </div>
          </>
        ) : null}
        <button type="submit">Update Profile</button>
      </form>
    </>
  );
};

export default ProfileTabs;
