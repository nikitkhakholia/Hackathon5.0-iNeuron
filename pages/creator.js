import { useState } from "react";

const userDefault = "";
export default function creator() {
  const [contributor, setContributor] = useState({
    photo: "",
    userAddress: "",
    emailId: "",
    website:"",
    instagram: "",
    isCreator: "",
    name: "",
  });
  return (
    // <div style={{background:"#000"}}>
    <div>
      <div className="row m-0 justify-content-center ">
        <div className="col text-center">
          <div className="row justify-content-center m-0 p-4">
            <div className="col-2 text-center ">
              <img
                className="profile w-100 border-5 bg-light rounded-circle m-2"
                src={contributor.photo ? contributor.phone : "/user.png"}
                alt="profile"
                style={{ cursor: "pointer", objectFit: "cover" }}
              />
            </div>
            
          </div>
          <div className="fs-1">Name</div>
            <div className="row justify-content-center">
                <div className="col">
                    
                </div>
                <div className="col">Instagram</div>
                <div className="col">Email</div>
                <div className="col">Website</div>
            </div>
        </div>
      </div>
    </div>
  );
}
