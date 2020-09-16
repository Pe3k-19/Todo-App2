import React from "react";
import { Table } from "antd";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { Form, Input } from "antd";

export default function MyTable(props) {
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Task Title",
      dataIndex: "title",
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        rowKey="id"
        dataSource={props.tableData}
        className="table"
      />
      <div className="navigation">
        <Form style={{ textAlign: "center" }}>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            size="normal"
            onClick={() => props.onChangeGetData()}
          >
            Get Task
          </Button>
          <Button id="putBtn" onClick={() => props.onChangeSearchData()}>
            Search Task
          </Button>
          <Form.Item label="Task" name="task">
            <Input
              name="name"
              id="dataName"
              value={props.newData}
              onChange={(event) => props.onChangeTask(event)}
            />
          </Form.Item>
          <Form.Item label="Id" name="taskId">
            <Input
              name="id"
              id="dataId"
              value={props.newId}
              onChange={(event) => props.onChangeId(event)}
            />
          </Form.Item>

          <Button type="primary" onClick={() => props.onChangePostData()}>
            Add Task
          </Button>
          <Button id="putBtn" onClick={() => props.onChangeUpdateData()}>
            Update Task
          </Button>
          <Button danger onClick={() => props.onChangeDeleteData()}>
            Delete Task
          </Button>
        </Form>
        {/* {props.alertMessage} */}
      </div>
      {/* {console.log(rows)} */}
    </div>
  );
}
