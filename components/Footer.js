import React from "react";

export default function Footer() {
  return (
    <div>
      <div className="text-light side-spacer" style={{background:"#000"}}>
        <div className="p-2">
          <div className="row m-0">
            {/* <div className="col-sm pt-4">
          <ul className="nav flex-column">
            <li className="font-weight-bold pb-2"><h5>Services</h5></li>
            <li className="  nav-item">
              <a href="/#" style={{ color: "white" }}>
                Donations
              </a>
            </li>
            <li className="  nav-item">
              <a href="/services#admissions" style={{ color: "white" }}>
                C
              </a>
            </li>
            <li className="  nav-item">
              <a href="/services#placements" style={{ color: "white" }}>
                Placements
              </a>
            </li>
          </ul>
        </div> */}

            <div className="col-sm pt-4">
              <ul className="nav flex-column">
                <li className="font-weight-bold pb-2">
                  <h5>Support</h5>
                </li>

                <li className={"  nav-item"}>
                  <a
                    href="mailto: khakholia.nk@gmail.com"
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    Write to our CEO
                  </a>
                </li>
                <li className="  nav-item">
                  <a
                    href="mailto: hakholia.nk@gmail.com"
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    Email Us
                  </a>
                </li>
                <li className="  nav-item">
                  <a
                    href="whatsapp://send?phone=+91-9864945505"
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    Chat With Us ↗
                  </a>
                </li>
                <li className="  nav-item">
                  <a
                    href="tel:9864945505"
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    Phone
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-sm pt-4">
              <ul className="nav flex-column">
                <li className="font-weight-bold pb-2">
                  <h5>Registered Office</h5>
                </li>
                <li className="nav-item">
                Creators Connect
                  <br /> Bangalore-560029
                </li>
              </ul>
            </div>
          </div>
          <center>
            <a href="/#">Privacy Policy</a>
          </center>
          <center>
            <a href="/#">Terms and Conditions</a>
          </center>
          <p className="text-center">
        Copyright ⓒ 2022 Creators Connect, All Rights reserved.
      </p>
        </div>
      </div>
    </div>
  );
}
