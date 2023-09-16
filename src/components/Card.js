import { Timestamp } from "firebase/firestore";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

const Skeleton = ({ isLoaded }) => {
  return (
    <div
      className="skeleton"
      style={{ display: isLoaded ? "none" : "block" }}
    ></div>
  );
};

function Card({ path, title, date, userName, id }) {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = React.useState(false);

  const DateString = useMemo(() => {
    const dates = date?.split(" ");
    return dates && `${dates[2]} ${dates[1]},  ${dates[3]}`;
  }, [date]);

  const createdDate = useMemo(() => {
    const dateStringFromFirestore = date;
    const dateObject = new Date(dateStringFromFirestore);
    const timestamp = Timestamp.fromDate(dateObject);
    return timestamp.toMillis();
  }, [date]);

  const handleClick = () => {
    navigate(`/image/${id}`, { state: { id } });
  };
  const handleLoading = () => {
    setIsLoaded(true);
  };

  return (
    <>
      <div className="image-wrapper " onClick={handleClick}>
        <img
          style={{ display: isLoaded ? "block" : "none" }}
          className="image"
          src={path}
          alt={title}
          onLoad={handleLoading}
        />

        <Skeleton isLoaded={isLoaded} />

        <div className="overlay d-flex"></div>
        <div className="position-absolute bottom-0 mt-auto w-100 d-flex align-items-baseline mx-2">
          <h2 className=" text-white text-start mb-3">{title}</h2>
        </div>
        <div className="user-info d-flex justify-content-between align-items-center  p-2 ">
          <span className="fw-normal">
            <span className="border border-light-subtle rounded-circle me-1 bg-white ">
              👤
            </span>{" "}
            {userName}
          </span>
          <span className="d-flex flex-column align-items-end">
            {createdDate ? (
              <ReactTimeAgo date={createdDate} locale="en-US" />
            ) : (
              ""
            )}
            <span style={{ fontSize: "10px" }}>{DateString}</span>
          </span>
        </div>
      </div>
    </>
  );
}

export default Card;
