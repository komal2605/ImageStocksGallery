import React from "react";
import Card from "./Card";

const StockList = ({ items }) => {
  return (
    <div className="row mt-5">
      {items?.map((item, i) => {
        return (
          <div
            className="col-12 col-md-6 col-lg-4 d-flex justify-content-center"
            key={i}
          >
            <Card {...item} />
          </div>
        );
      })}
    </div>
  );
};

export default StockList;
