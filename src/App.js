import React, { useState, useEffect } from "react";
import "./style/App.css";
import MyTable from "./table";
import { Alert } from "antd";
import axios from "axios";

function App() {
  //              HOOKS

  const [rows, setRows] = useState("");
  const [newData, setNewData] = useState("");
  const [newId, setNewId] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  // const [alertType, setAlertType] = useState('success');

  useEffect(() => {
    handleGetData();
  }, []);

  const handleChangeTask = (event) => {
    setNewData(event.target.value);
  };
  const handleChangeId = (event) => {
    setNewId(event.target.value);
  };

  // const alertMessageFunc = () => {
  //  return (
  //   <Alert message={alertMessage} type={alertType} showIcon style={{marginBottom: '20px'}} />
  //  )
  // }

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
  //         setAlertMessage(<Alert message={err} type="error" showIcon style={{marginBottom: '20px'}} />)
  //       });
  //       setAlertMessage('')
  //   };

  //  -----------------------------------   GET  AXIOS   ------------------------------
  const handleGetData = () => {
    async function getData() {
      const response = await axios.get("http://localhost:5000/data");
      return response;
    }
    getData().then((res) => setRows(res.data));
  };

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
  //       setAlertMessage(<Alert message={error} type="error" showIcon style={{marginBottom: '20px'}} />)
  //     });
  // };

  //  ----------------------------------   POST  AXIOS   ----------------------------

  const handlePostData = () => {
    async function postData(url = "", data = {}) {
      const response = await axios.post("http://localhost:5000", { newData });
      return response;
    }
    postData().then((data) => console.log(data));
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
    async function updateData(url = "", data = {}) {
      const response = await axios.post("http://localhost:5000/update/:id", {
        newId,
        newData,
      });
      return response.json();
    }
    updateData().then((data) => console.log(data));
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
    async function deleteData(url = "", data = {}) {
      const response = await axios.post("http://localhost:5000/delete/:id", {
        newId,
      });
      return response;
    }
    deleteData().then((data) => console.log(data));
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
    async function searchData(url = "", data = {}) {
      const response = await axios.post("http://localhost:5000/search", {
        newData,
      });
      return response;
    }
    searchData().then((data) => setRows(data.data));
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
          {alertMessage}
        </div>
        {/* {console.log(typeof newData)} */}
      </div>
    </div>
  );
}

export default App;
