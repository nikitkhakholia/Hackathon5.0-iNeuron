import { useMoralis } from "react-moralis";
import { uploadFile } from "../pages/api/backend";
import { showErrorAlert, showSuccessAlert } from "../utils";

export default function Header() {
  const {
    authenticate,
    isAuthenticated,
    user,
    account,
    logout,
    isWeb3Enabled,
    Moralis,
  } = useMoralis();

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

  async function createUser(name, pic, email, web, ig, isc) {
    let options = {
      contractAddress: "0x3532d42C3789A0096129105cDFdeEEC970710260",
      functionName: "createUser",
      abi: [
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_photo",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_emailId",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_websiteLink",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_instagram",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "_isCreator",
              "type": "bool"
            }
          ],
          "name": "createUser",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ],
      params: {
        _name: name?name:' ',
        _photo: pic?pic:' ',
        _emailId: email?email:' ',
        _websiteLink: web?web:' ',
        _instagram: ig?ig:' ',
        _isCreator: isc,
      },
    };
    await Moralis.executeFunction(options);
    // $("#userCreationForm").hide();
    showSuccessAlert("Transaction Success.");
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }

  const doLogin = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "You are Loging in using Moralis." })
        .then(async (user) => {
          var cu = user.get("ethAddress");

          checkExistingUser(user.get("ethAddress"), (user) => {
            if (cu.toLowerCase() === user.userAddress.toLowerCase()) {
              //todo
            } else {
              document.getElementById("userCreationFormId").click();
            }
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const logOut = async () => {
    await logout();
    console.log("You are logged out successfully.");
  };

  return (
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          Creators Connect
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse " id="navbarSupportedContent">
          <div className="me-auto mb-2 mb-lg-0"></div>
          <ul class="navbar-nav d-flex">
            {/* <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li> */}
            {isAuthenticated && (
              <li class="nav-item">
                <a
                  class="nav-link active"
                  aria-current="page"
                  href="#"
                  onClick={logOut}
                >
                  Logout
                </a>
              </li>
            )}
            {!isAuthenticated && (
              <li class="nav-item">
                <a
                  class="nav-link active"
                  aria-current="page"
                  href="#"
                  onClick={doLogin}
                >
                  Connect Wallet
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <button
        id="userCreationFormId"
        type="button"
        class="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#userCreationForm"
      ></button>
      <div
        class="modal fade"
        id="userCreationForm"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="userCreationFormLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header border-0">
              <h5 class="modal-title" id="userCreationFormLabel">
                User Details
              </h5>
            </div>
            <div class="modal-body">
              <div class="form-check mb-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="creatorCheck"
                  onChange={e=>{
                    if(e.target.checked){
                      document.getElementById('creatorDetails').classList.remove('d-none')
                    }else{
                      document.getElementById('creatorDetails').classList.add('d-none')
                    }
                  }}
                />
                <label class="form-check-label" for="creatorCheck">
                  Are you Content Creator?
                </label>
              </div>
              <div id="creatorDetails" className="d-none">
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="nameInput"
                    placeholder="Full Name"
                  />
                  <label for="nameInput">Full Name</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="emailInput"
                    placeholder="Email"
                  />
                  <label for="emailInput">Email</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="websiteInput"
                    placeholder="Website"
                  />
                  <label for="websiteInput">Website</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="igInput"
                    placeholder="Instagram"
                  />
                  <label for="igInput">Instagram</label>
                </div>

                <div class="mb-3">
                  <label for="formFile" class="form-label">
                    Select Your Profile image
                  </label>
                  <input
                    class="form-control"
                    type="file"
                    id="formFile"
                    accept="image/png,image/gif,image/jpeg"
                    onChange={(e) => {
                      if (!e.target.files[0]) {
                        return;
                      }
                      if (e.target.files[0].size > 2097152) {
                        alert("File size cannot be more than 2mb.");
                        return;
                      }
                      document.getElementById("fileStatus").innerText =
                        "Uploading File...";

                      var formData = new FormData();
                      formData.set("file", e.target.files[0]);
                      uploadFile(formData).then((res) => {
                        if (res.status === 0) {
                          alert(res.error);
                        } else {
                          document.getElementById("fileLink").innerText =
                            "http://localhost:8001/filesync?filename=" +
                            res.link;
                          document.getElementById("fileStatus").innerText =
                            "File Uploaded Successfully";
                        }
                      });
                    }}
                  />
                  <p id="fileLink" className="d-none"></p>
                  <p id="fileStatus"></p>
                </div>
              </div>
            </div>
            <div class="modal-footer border-0">
              <button
                type="button"
                class="btn btn-dark"
                onClick={(e) => {
                  var name = document.getElementById("nameInput");
                  var email = document.getElementById("emailInput");
                  var web = document.getElementById("websiteInput");
                  var ig = document.getElementById("igInput");
                  var creatorCheck =
                    document.getElementById("creatorCheck").checked;
                  var profile = document.getElementById("fileLink").innerText;
                  if(creatorCheck){
                    if (name.value.trim() == "") {
                      showErrorAlert("Please enter your Name.");
                      name.focus()
                      return;
                    }
                    if (
                      !email.value.match(
                        "^[\\w-\\.+]*[\\w-\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$"
                      )
                    ) {
                      showErrorAlert("Please enter a valid Email.");
                      email.focus()
                      return;
                    }
                    if (!web.value.startsWith("http")) {
                      showErrorAlert("Please enter your Website.");
                      web.focus()
                      return;
                    }
                    if (!ig.value.startsWith("http")) {
                      showErrorAlert("Please enter your Instagram Link.");
                      ig.focus()
                      return;
                    }
                    if (profile == "") {
                      showErrorAlert("Please upload your profile image.");
                      return;
                    }
                  }
                  createUser(
                    name.value,
                    profile,
                    email.value,
                    web.value,
                    ig.value,
                    creatorCheck
                  );
                }}
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
