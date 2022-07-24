export const uploadFile = (data) => {
    // document.getElementById("loading-icon").classList.remove("d-none");
  
    return fetch(`http://localhost:8001/fileupload`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: data,
    })
      .then((response) => {
        // document.getElementById("loading-icon").classList.add("d-none");
        return response.json();
      })
      .catch((err) => console.log(err));
  };