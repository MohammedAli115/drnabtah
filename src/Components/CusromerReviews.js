import axios from "axios";
import React, { useEffect, useState } from "react";

function CusromerReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://e-commerce-backend-production-dcd8.up.railway.app/api/reviews?per_page=10"
      )
      .then((response) => {
        setReviews(response.data.data.data);
        console.log(response.data.data.data);
      })
      .catch((error) => console.log("ERROR FECHING DATA"));
  }, []);
  return (
    <div style={{ margin: "100px 0 0 0 " }}>
      <div className="container">
        <h4 className="text-center">CusromerReviews</h4>
        <div className="row">
            {reviews.map((r) => {
              return (
                <div  className="col-lg-3 col-md-6 col-sm-12" key={r.id}>
                  <img src={r.image_url} alt="" />
                  <p>{r. title_ar}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default CusromerReviews;
