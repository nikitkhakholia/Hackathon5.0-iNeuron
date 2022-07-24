import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { uploadFile } from "../pages/api/backend";
import { showErrorAlert, showSuccessAlert } from "../utils";
var ethers = require("ethers");
export default function Home() {
  const {
    authenticate,
    isAuthenticated,
    user,
    account,
    logout,
    isWeb3Enabled,
    Moralis,
  } = useMoralis();
  async function getCreators(next) {
    let options = {
      contractAddress: "0x3532d42C3789A0096129105cDFdeEEC970710260",
      functionName: "getcreatorsAddresses",
      abi: [
        {
          inputs: [],
          name: "getcreatorsAddresses",
          outputs: [
            {
              internalType: "address[]",
              name: "",
              type: "address[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
    };
    next(await Moralis.executeFunction(options));
  }
  async function getFundedAMount(address) {
    let options = {
      contractAddress: "0x3532d42C3789A0096129105cDFdeEEC970710260",
      functionName: "getAddressToAmountFunder",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_address",
              type: "address",
            },
          ],
          name: "getAddressToAmountFunder",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      params: {
        _address: address,
      },
    };
    console.log("in");
    return await Moralis.executeFunction(options);
  }
  async function donate(recAdd, next) {
    let options = {
      contractAddress: "0x3532d42C3789A0096129105cDFdeEEC970710260",
      functionName: "payContentCreator",
      abi: [
        {
          inputs: [
            {
              internalType: "address payable",
              name: "_receiver",
              type: "address",
            },
          ],
          name: "payContentCreator",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
      ],
      params: {
        _receiver: recAdd,
      },

      msgValue: Moralis.Units.ETH(parseFloat(prompt("Enter value to donate."))),
    };
    next(await Moralis.executeFunction(options));
  }
  async function checkExistingUser(ethAddress, next) {
    let options = {
      contractAddress: "0x3532d42C3789A0096129105cDFdeEEC970710260",
      functionName: "getUser",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_address",
              type: "address",
            },
          ],
          name: "getUser",
          outputs: [
            {
              components: [
                {
                  internalType: "address",
                  name: "userAddress",
                  type: "address",
                },
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
              internalType: "struct Donation.user",
              name: "",
              type: "tuple",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      params: {
        _address: ethAddress,
      },
    };
    next(await Moralis.executeFunction(options));
  }

  const [creators, setCreators] = useState({ data: [] });
  const [creatorsF, setCreatorsF] = useState({ data: [] });
  window.onload = async () => {
    await Moralis.enableWeb3();
    getCreators((creat) => {
      creat.forEach((creator) => {
        checkExistingUser(creator, async (cData) => {
          // console.log(cData);
          var x = creators.data;
          x.push(cData);
          setCreators({ ...creators, data: x });

          var funds = await getFundedAMount(creator);
          var y = creatorsF.data;
          y.push(funds);
          setCreatorsF({ ...creatorsF, data: y });
        });
      });
    });
  };
  return (
    <div>
      <div className="p-4">
        <div className="row m-4 p-4  justify-content-center">
          <div className="col m-2 p-4 bg-light rounded">
            <h1>Support a Contributor</h1>
            <div className="row m-0 justify-content-center" id="creators_cards">
              {creators.data &&
                creators.data.map((c, i) => {
                  // console.log(JSON.stringify(user.ethAddress));
                  // getFundedAMount(c[0], (totalFunded) => {
                  // alert(getFundedAMount(c[0]))
                  if (true) {
                    // if(user.ethAddress.toLowerCase()!=c[0].toLowerCase()){
                    return (
                      <div
                        key={i}
                        class="card m-4 p-0"
                        style={{ width: "18rem" }}
                      >
                        <img src={c[2]} class="card-img-top m-0" alt="..." />
                        <div class="card-body">
                          <h5 class="card-title">{c[1]}</h5>
                          <p class="card-text">{c[3]}</p>
                          <p>
                            Amount Funded Till Date:{" "}
                            {parseInt(
                              creatorsF.data[i]
                                ? creatorsF.data[i].toString()
                                : 0
                            ) / 1000000000000000000}{" "}
                            ETH
                          </p>
                          <a
                            href="#"
                            class="btn btn-primary"
                            onClick={(e) => {
                              donate(c[0], (res) => {});
                            }}
                          >
                            Donate
                          </a>
                        </div>
                      </div>
                    );
                  }
                  // });
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
