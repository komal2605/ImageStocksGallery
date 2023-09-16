import { useSelector } from "react-redux";
import { uploadState } from "../components/Upload/reduxSlice";
import React, { useMemo } from "react";
import StockList from "../components/StockList";
function Homepage() {
  const { items, dataLoading } = useSelector(uploadState);
  const count = useMemo(() => {
    return items.length > 0
      ? `Total ${items?.length} image${
          items?.length > 1 ? "s found 👍🏻" : "found 🙄"
        }`
      : "no items found";
  }, [items]);

  return (
    <>
      <div className="sub-header flex-column flex-md-row">
        <h1 className="text-center">Gallery</h1>
        <p className="text-center text-md-start mt-auto">
          {dataLoading ? "🛞 loading..." : count}
        </p>
      </div>
      <StockList items={items} />
    </>
  );
}

export default Homepage;
