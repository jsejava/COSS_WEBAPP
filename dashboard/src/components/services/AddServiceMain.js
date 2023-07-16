import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { SERVICE_CREATE_RESET } from "../../Redux/Constants/ServiceConstants";
import { createService } from "../../Redux/Actions/ServiceActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddServiceMain = () => {
  const [name, setName] = useState("");
  const [availability, setAvailability] = useState(true);
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const serviceCreate = useSelector((state) => state.serviceCreate);
  const { loading, error, product } = serviceCreate;

  useEffect(() => {
    if (product) {
      toast.success("Product Added", ToastObjects);
      dispatch({ type: SERVICE_CREATE_RESET });
      setName("");
      setDescription("");
      setCountInStock(0);
      setImage("");
      setPrice(0);
      setAvailability(true);
    }
  }, [product, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createService(name, price, description, image, countInStock, availability)
    );
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/services" className="btn btn-danger text-white">
              Go to services
            </Link>
            <h2 className="content-title">Add service</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Publish now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Service title
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Availability
                    </label>
                    <div className="payment-container"></div>
                    <div className="radio-container">
                      <input
                        className="form-check-input"
                        type="radio"
                        value={true}
                        onChange={(e) => setAvailability(e.target.value)}
                        name="selection"
                      />
                      <label className="form-check-label ms-2">Yes</label>

                      <input
                        className="form-check-input ms-5"
                        type="radio"
                        value={false}
                        onChange={(e) => setAvailability(e.target.value)}
                        name="selection"
                      />
                      <label className="form-check-label ms-2">No</label>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Amount Range
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                      disabled
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Description</label>
                    <textarea
                      placeholder="Type here"
                      className="form-control"
                      rows="7"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Images</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Image URL"
                      value={image}
                      required
                      onChange={(e) => setImage(e.target.value)}
                    />
                    <input className="form-control mt-3" type="file" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddServiceMain;
