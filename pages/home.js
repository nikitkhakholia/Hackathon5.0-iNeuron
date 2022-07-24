import { useEffect } from "react";
import styles from "../styles/Home.module.css";
const Moralis = require("moralis");
export default async function home() {
    await Moralis.enableWeb3()
    useEffect(async() => {
        
        getContributors()
    }, [""])
  var contributors = ["Nikit", "Anush", "Harshita"];
  async function getContributors() {
    let options = {
      contractAddress: "0x3532d42C3789A0096129105cDFdeEEC970710260",
      functionName: "s_allUsers",
      abi: [
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "s_allUsers",
          outputs: [
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "string",
              name: "photo",
              type: "string",
            },
            {
              internalType: "address",
              name: "userAddress",
              type: "address",
            },
            {
              internalType: "string",
              name: "emailId",
              type: "string",
            },
            {
              internalType: "string",
              name: "websiteLink",
              type: "string",
            },
            {
              internalType: "string",
              name: "instagram",
              type: "string",
            },
            {
              internalType: "bool",
              name: "isCreator",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
    };
    return await Moralis.executeFunction(options);
  }
  return (
    <div className={styles.container}>
      <div className="p-4">
        <div className="row m-4 p-4  justify-content-center">
          <div className="col m-2 p-4 bg-light rounded">
            <h1>Support a Contributor</h1>
            <div className="row m-0 justify-content-around">
              {true &&
                contributors.map((cont, i) => {
                  return (
                    <div
                      className="col-4 hilight m-2 rounded p-2"
                      data-bs-toggle="modal"
                      data-bs-target={"#exampleModal" + cont}
                    >
                      <div className="row m-0 justify-content-around align-items-center">
                        <div className="col h3 m-0 p-2">{cont}</div>
                        <div className="col-4">
                          <img
                            src="/right-arrow.png"
                            className="h-50 w-50"
                            alt="pay"
                          />
                        </div>
                      </div>
                      <div
                        class="modal fade"
                        id={"exampleModal" + cont}
                        tabindex="-1"
                        aria-labelledby={"exampleModalLabel" + cont}
                        aria-hidden="true"
                      >
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5
                                class="modal-title"
                                id={"exampleModalLabel" + cont}
                              >
                                Modal title
                              </h5>
                              <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div class="modal-body">{cont}</div>
                            <div class="modal-footer">
                              <button
                                type="button"
                                class="btn btn-light"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button type="button" class="btn btn-dark">
                                Donate
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
