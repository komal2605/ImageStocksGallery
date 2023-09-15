import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

function Card({ path, title, date, userName, id }) {
  const navigate = useNavigate();
  const createdDate = useMemo(() => {
    const dates = date?.split(" ");
    return dates && `${dates[2]} ${dates[1]},  ${dates[3]}`;
    //eslint-disable-next-line
  }, []);
  const handleClick = () => {
    navigate(`/image/${id}`, { state: { id } });
  };

  return (
    <div className="mb-5" onClick={handleClick}>
      <div className="card overflow-hidden" style={{ width: "19rem" }}>
        <div
          style={{
            height: "280px",
            backgroundImage: `url(${path})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="d-flex justify-content-between align-items-center  p-2 ">
          <span className="fw-normal">
            <span className="border border-light-subtle rounded-circle me-1 bg-white">
              👤
            </span>
            {userName}
          </span>
          <span className="fs-6 fw-light">{createdDate}</span>
        </div>
        <h5 className="text-center p-2 fw-semibold text-capitalize bg-light mb-0">
          {title}
        </h5>
      </div>
    </div>
  );
}

export default Card;
