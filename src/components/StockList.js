import React, { Fragment } from "react";
import Card from "./Card";

const StockList = ({ items }) => {
  return (
    <div className="gallery mt-5">
      {items?.map((item, i) => {
        return (
          <Fragment key={i}>
            <Card {...item} />
          </Fragment>
        );
      })}
    </div>
  );
};

export default StockList;
