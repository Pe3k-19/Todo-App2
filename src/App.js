import React, { useState, useEffect } from "react";
import "./style/App.css";
import MyTable from "./table";

function App() {
  //              HOOKS

  const [rows, setRows] = useState("");
  const [newData, setNewData] = useState("");
  const [newId, setNewId] = useState("");

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

  const handleGetData = () => {
    async function getData(url='') {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
return response.json();
}
    getData("http://localhost:5000/data")
      .then((data) => setRows(data))

      .catch((err) => {
        console.log("error: ", err);
      });
    // console.log(rows)
    
  };

  //  ----------------------------------   POST    ----------------------------

  const handlePostData = () => {
    async function postData(url = "", data = {}) {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return response.json();
    }

    postData("http://localhost:5000/", { newData })
      .then((data) => {
        console.log(data);
      })

      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  //  ----------------------------------   UPDATE  ----------------------------

  const handleUpdateData = () => {
    async function updateData(url = "", data = {}) {
      const response = await fetch(url, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return response.json();
    }

    updateData("http://localhost:5000/update/:id", { newId, newData })
      .then((data) => {
        console.log(data);
      })

      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  //  ----------------------------------   DELETE   --------------------------------

  const handleDeleteData = () => {
    async function DeleteData(url = "", data = {}) {
      const response = await fetch(url, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return response.json();
    }

    DeleteData(`http://localhost:5000/delete/:id`, { newId })
      .then((data) => {
        console.log(data);
      })

      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  //  ------------------------------------   SEARCH   ---------------------------------------

  const handleSearchData = () => {
    async function searchData(url = "", data = {}) {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return response.json();
    }

    searchData("http://localhost:5000/search", { newData })
      .then((data) => {
        setRows(data);
      })

      .catch((error) => {
        console.error("Fetch error:", error);
      });
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
            onChangeTask={handleChangeTask}
            onChangeId={handleChangeId}
            onChangeGetData={handleGetData}
            onChangePostData={handlePostData}
            onChangeUpdateData={handleUpdateData}
            onChangeDeleteData={handleDeleteData}
            onChangeSearchData={handleSearchData}
          />
        </div>
        {/* {console.log(typeof newData)} */}
      </div>
    </div>
  );
}

export default App;
