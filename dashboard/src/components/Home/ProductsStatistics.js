import React from "react";

const ProductsStatistics = () => {
  return (
    // <div className="col-xl-4 col-lg-12">
    <div className="card mb-4 shadow-sm">
      <article className="card-body">
        <h5 className="card-title">Products statistics</h5>
        <iframe
          style={{
            background: "#FFFFFF",
            border: "none",
            borderRadius: "2px",
            boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);",
            width: "105%",
            height: "300px",
          }}
          src="https://charts.mongodb.com/charts-project-0-ndgxs/embed/charts?id=64535caf-5cea-4989-8b8f-45227af560f6&maxDataAge=3600&theme=light&autoRefresh=true"
        ></iframe>
      </article>
    </div>
    // </div>
  );
};

export default ProductsStatistics;
