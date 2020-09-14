import React from "react";
import { Table } from "antd";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { Form, Input } from "antd";


export default function MyTable(props) {

  const columns = [
    {
      title: "Task Title",
      dataIndex: "title",
    }
  ];

  return (
    <div>
      <Table columns={columns} align="center" dataSource={props.tableData} className="table"/>
      <div className="navigation">
        <Form  style={{textAlign:'center'}} >
          <Form.Item label="Task" name="task">
            <Input name="name" id="dataName" value={props.newData} onChange={(event) => props.onChangeForm(event)} />
          </Form.Item>
          <Button
          type="primary"
          icon={<DownloadOutlined />}
          size="normal"
          onClick={() => props.onChangeGetData()}
        >
          Get Task
        </Button>
          <Button id="putBtn" onClick={() => console.log("update")}>
          Search Task
        </Button>
          <Button type="primary" onClick={() => props.onChangePostData()}>
           Add Task
          </Button>
          <Button danger onClick={() => props.onChangeDeleteData()}>
           Delete Task
          </Button>
        </Form>
      </div>
      {/* {console.log(rows)} */}
    </div>
  );
}
