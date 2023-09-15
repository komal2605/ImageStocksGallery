import React, { useMemo } from "react";
import StockList from "../components/StockList";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserStockCount,
  uploadState,
} from "../components/Upload/reduxSlice";
import { authState } from "../components/Navbar/reduxSlice";

function Stockspage() {
  const { items, dataLoading } = useSelector(uploadState);
  const { currentUser } = useSelector(authState);
  const dispatch = useDispatch();
  const stockListItems = useMemo(() => {
    const userName = currentUser?.displayName.split(" ").join("").toLowerCase();
    const filterdStocks = items.filter((item) => {
      return item.userName === userName;
    });
    return filterdStocks;
  }, [items, currentUser]);
  const count = useMemo(() => {
    return stockListItems.length >= 1 ? (
      `you have ${stockListItems.length} image${
        stockListItems.length > 1 ? "s" : ""
      }`
    ) : (
      <>
        Your image gallery is feeling a little light 🤨?
        <br />
        Add your first image and start the collection..🥳
      </>
    );
  }, [stockListItems]);

  React.useEffect(() => {
    dispatch(setUserStockCount({ count: stockListItems.length }));
  }, [stockListItems, dispatch]);
  return (
    <>
      <h2>My #Stocks</h2>
      {dataLoading ? "loading...." : <p>{count}</p>}
      <StockList items={stockListItems} />
    </>
  );
}

export default Stockspage;
