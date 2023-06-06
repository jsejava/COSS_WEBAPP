import React from "react";

const SaleStatistics = () => {
  return (
    <div className="col-xl-4 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Sale statistics</h5>
          <iframe
            style={{
              background: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);",
              width: "100%",
              height: "300px",
            }}
            src="https://charts.mongodb.com/charts-project-0-ndgxs/embed/charts?id=64535803-ed8c-4d40-82ed-8d03ca7fc87c&maxDataAge=3600&theme=light&autoRefresh=true"
          ></iframe>
        </article>
      </div>
    </div>
  );
};

export default SaleStatistics;
