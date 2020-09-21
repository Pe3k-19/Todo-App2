import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style/App.css";
import { Alert } from "antd";
import MyTable from "./table";

function App() {
  //              HOOKS

  const [rows, setRows] = useState("");
  const [newData, setNewData] = useState("");
  const [newId, setNewId] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  // const [alertType, setAlertType] = useState('success');

  const handleGetData = () => {
    async function getData() {
      const response = await axios.get("http://localhost:5000/data");
      return response;
    }
    getData()
      .then((res) => setRows(res.data))
      .catch((error) => {
        console.log(error);
      });
    setAlertMessage("");
  };

  useEffect(() => {
    handleGetData();
  }, []);

  const handleChangeTask = (event) => {
    setNewData(event.target.value);
  };
  const handleChangeId = (event) => {
    setNewId(event.target.value);
  };

  //   ----------------------------------   GET    -----------------------------

  //   const handleGetData = () => {
  //     async function getData(url='') {
  //       const response = await fetch(url, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         }
  //       })
  // return response.json();
  // }
  //     getData("http://localhost:5000/data")
  //       .then((data) => setRows(data))

  //       .catch((err) => {
  //         setAlertMessage(
  // <Alert message={err} type="error" showIcon style={{ marginBottom: '20px' }} />)
  //       });
  //       setAlertMessage('')
  //   };

  //  -----------------------------------   GET  AXIOS   ------------------------------

  //  ----------------------------------   POST    ----------------------------

  // const handlePostData = () => {
  //   async function postData(url = "", data = {}) {
  //     const response = await fetch(url, {
  //       method: "POST",
  //       mode: "cors",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     return response.json();
  //   }

  //   postData("http://localhost:5000/", { newData })
  //     .then((data) => {
  //       console.log(data);
  //     })

  //     .catch((error) => {
  //       setAlertMessage(
  // <Alert message={error} type="error" showIcon style={{ marginBottom: '20px' }} />)
  //     });
  // };

  //  ----------------------------------   POST  AXIOS   ----------------------------

  const handlePostData = () => {
    async function postData() {
      const response = await axios.post("http://localhost:5000/post", {
        newData,
      });

      return response;
    }
    postData()
      .then((data) => console.log("Post empty", data.data))
      .catch((error) => {
        console.log(error);
      });
    if (newData === "") {
      setAlertMessage(
        <Alert
          message="Prázdne pole Task"
          type="error"
          showIcon
          style={{
            margin: "20px",
            borderRadius: "5px",
            textAlign: "center",
          }}
        />
      );
    } else {
      setAlertMessage(
        <Alert
          message="Dáta pridané"
          type="success"
          showIcon
          style={{
            margin: "20px",
            borderRadius: "5px",
            textAlign: "center",
          }}
        />
      );
    }
  };

  //  ----------------------------------   UPDATE  ----------------------------

  // const handleUpdateData = () => {
  //   async function updateData(url = "", data = {}) {
  //     const response = await fetch(url, {
  //       method: "PUT",
  //       mode: "cors",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     return response.json();
  //   }

  //   updateData("http://localhost:5000/update/:id", { newId, newData })
  //     .then((data) => {
  //       console.log(data);
  //     })

  //     .catch((error) => {
  //       setAlertMessage(<Alert message={error} type="error" showIcon style={{marginBottom: '20px'}} />)
  //     });

  // };

  //  ----------------------------------   UPDATE  AXIOS  ----------------------------

  const handleUpdateData = () => {
    async function updateData() {
      const response = await axios.post("http://localhost:5000/update/:id", {
        newId,
        newData,
      });
      return response;
    }
    updateData()
      .then((data) => console.log("Update empty", data.data))
      .catch((error) => {
        console.log(error);
      });
    if (newData === "" || newId === "") {
      setAlertMessage(
        <Alert
          message="Vyplňte všetky polia"
          type="error"
          showIcon
          style={{
            margin: "20px",
            borderRadius: "5px",
            textAlign: "center",
          }}
        />
      );
    } else {
      setAlertMessage(
        <Alert
          message="Dáta zmenené"
          type="success"
          showIcon
          style={{
            margin: "20px",
            borderRadius: "5px",
            textAlign: "center",
          }}
        />
      );
    }
  };

  //  ----------------------------------   DELETE   --------------------------------

  // const handleDeleteData = () => {
  //   async function DeleteData(url = "", data = {}) {
  //     const response = await fetch(url, {
  //       method: "DELETE",
  //       mode: "cors",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     return response.json();
  //   }

  //   DeleteData(`http://localhost:5000/delete/:id`, { newId })
  //     .then((data) => {
  //       console.log(data);
  //     })

  //     .catch((error) => {
  //       setAlertMessage(<Alert message={error} type="error" showIcon style={{marginBottom: '20px'}} />)
  //     });
  // };

  //  ----------------------------------   DELETE   AXIOS   --------------------------------

  const handleDeleteData = () => {
    async function deleteData() {
      const response = await axios.post("http://localhost:5000/delete/:id", {
        newId,
      });
      return response;
    }
    deleteData()
      .then((data) => console.log("delete empty", data.data))
      .catch((error) => {
        console.log(error);
      });
    if (newId === "") {
      setAlertMessage(
        <Alert
          message="Vyplňte pole Id"
          type="error"
          showIcon
          style={{
            margin: "20px",
            borderRadius: "5px",
            textAlign: "center",
          }}
        />
      );
    } else {
      setAlertMessage(
        <Alert
          message="Dáta vymazané"
          type="success"
          showIcon
          style={{
            margin: "20px",
            borderRadius: "5px",
            textAlign: "center",
          }}
        />
      );
    }
  };

  //  ------------------------------------   SEARCH   ---------------------------------------

  // const handleSearchData = () => {
  //   async function searchData(url = "", data = {}) {
  //     const response = await fetch(url, {
  //       method: "POST",
  //       mode: "cors",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     return response.json();
  //   }

  //   searchData("http://localhost:5000/search", { newData })
  //     .then((data) => {
  //       setRows(data);
  //     })

  //     .catch((error) => {
  //       setAlertMessage(<Alert message={error} type="error" showIcon style={{marginBottom: '20px'}} />)
  //     });
  // };

  //  ------------------------------------   SEARCH   ---------------------------------------

  const handleSearchData = () => {
    async function searchData() {
      const response = await axios.post("http://localhost:5000/search", {
        newData,
      });
      return response;
    }
    searchData()
      .then((data) => {
        if (data.data.length === 0 && newData === "") {
          console.log("search empty");
        } else {
          setRows(data.data);
        }
      })

      .catch((error) => {
        console.log(error);
      });
    if (newData === "") {
      setAlertMessage(
        <Alert
          message="Vyplňte pole Task"
          type="error"
          showIcon
          style={{
            margin: "20px",
            borderRadius: "5px",
            textAlign: "center",
          }}
        />
      );
    } else {
      setAlertMessage("");
    }
  };

  // ---------------------------------------------------------------------
  return (
    <div className="enviroment">
      <div className="container">
        <header>
          <h1>Todo App</h1>
        </header>
        <div>
          <MyTable
            tableData={rows}
            newId={newId}
            newData={newData}
            alertMessage={alertMessage}
            onChangeTask={handleChangeTask}
            onChangeId={handleChangeId}
            onChangeGetData={handleGetData}
            onChangePostData={handlePostData}
            onChangeUpdateData={handleUpdateData}
            onChangeDeleteData={handleDeleteData}
            onChangeSearchData={handleSearchData}
          />
          <div>{alertMessage}</div>
        </div>
        {/* {console.log(typeof newData)} */}
      </div>
    </div>
  );
}

export default App;
