import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Radio,
  Table,
  InputNumber,
  Typography,
  Popconfirm,
  Checkbox,
  Space,
  Layout,
} from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { v4 as uuidv4 } from "uuid";
import { useRef } from "react";
import { useSelector, useDispatch, connect, ConnectedProps } from "react-redux";
import { addPerson, updatePerson, deletePerson } from "../form/personSlice";
import { RootState, AppDispatch, store } from "../store/store";
import { useNavigate } from "react-router-dom";
import { headerText } from "../components/headerSlice";

const { Content, Footer } = Layout;

const { Option } = Select;
interface Person {
  id: number;
  key: string;
  birthDate: any;
  exSalary: string;
  gender: string;
  idcard1: string;
  idcard2: string;
  idcard3: string;
  idcard4: string;
  idcard5: string;
  nation: string;
  phoneCode: string;
  phoneCode2: string;
  profix: string;
  realname: string;
  surename: number;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Person;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const FormTable = () => {
  // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [editingKey, setEditingKey] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [form] = Form.useForm();
  const formRef = useRef<any>(null);
  const dispatch = useDispatch<AppDispatch>();
  const persons = useSelector((state: RootState) => state.persons.persons);

  const isEditing = (record: Person) => record.key === editingKey;

  const edit = (record: Partial<Person> & { key: React.Key }) => {
    form.setFieldsValue({
      realname: "",
      gender: "",
      phoneCode2: "",
      nation: "",
      ...record,
    });
    console.log(record);
    // dispatch(updatePerson(updatedPerson));
    setEditingKey(record.key);
  };
  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Person;
      row.key = key.toString();
      dispatch(updatePerson(row));
      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "ชื่อ",
      dataIndex: "realname",
      editable: true,
      sorter: {
        compare: (a: any, b: any) => a.realname - b.realname,
      },
    },
    {
      title: "เพศ",
      dataIndex: "gender",
      editable: true,
      sorter: {
        compare: (a: any, b: any) => a.gender - b.gender,
      },
    },
    {
      title: "หมายเลขโทรศัพท์",
      dataIndex: "phonecoce2",
      editable: true,
      sorter: {
        compare: (a: any, b: any) => a.phonecoce2 - b.phonecoce2,
      },
    },
    {
      title: "สัญชาติ",
      dataIndex: "nation",
      editable: true,
      sorter: {
        compare: (a: any, b: any) => a.nation - b.nation,
      },
    },
    {
      title: "จัดการ",
      dataIndex: "operation",
      render: (_: any, record: Person) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const navigate = useNavigate();

  const onNavigation = (pamas: string) => {
    navigate("/");
    dispatch(headerText(""));
  };

  const onFinish = (values: any) => {
    let shallow = Object.assign({}, values);

    shallow.key = uuidv4();
    shallow.phonecoce2 = values.phonecoce + values.phonecoce2;
    dispatch(addPerson(shallow));
    formRef.current?.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleKeyPress = (e: any) => {
    const key = e.key;
    const isNumeric = /^\d+$/.test(key); // Check if key is numeric
    const isAllowedKey = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
    ].includes(key); // Allow specific keys

    if (!isNumeric && !isAllowedKey) {
      e.preventDefault(); // Prevent input of non-numeric and non-allowed keys
    }
  };

  const handleInput = (
    fieldName: string,
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const formInstance = formRef.current;
    const fieldNames = Object.keys(formInstance.getFieldsValue());
    const currentIndex = fieldNames.indexOf(fieldName);
    if (
      currentIndex < fieldNames.length - 1 &&
      e.currentTarget.value.length === e.currentTarget.maxLength
    ) {
      const nextFieldName = fieldNames[currentIndex + 1];
      const nextFieldInstance = formInstance.getFieldInstance(nextFieldName);
      console.log(nextFieldName);

      nextFieldInstance.focus();
    }
  };
  const onReset = () => {
    formRef.current?.resetFields();
  };

  const cancel = () => {
    setEditingKey("");
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Person) => ({
        record,
        inputType: col.dataIndex === "phonecoce2" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys);
    },
  };
  const selectItem = () => {
    if (selectedRowKeys.length > 0) {
      selectedRowKeys.forEach((key) => {
        dispatch(deletePerson(key.toString()));
      });
    }
    setSelectedRowKeys([]);
  };

  const onSelectAllChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked == true) {
      const allRowKeys = persons.map((row) => row.key);
      setSelectedRowKeys(allRowKeys);
    } else {
      setSelectedRowKeys([]);
    }
  };

  return (
    <Layout>
      <Space className="navBar">
        <Button onClick={() => onNavigation("home")}>หน้าหลัก</Button>
      </Space>
      <Content className="contentForm">
        <Form
          className="form"
          ref={formRef}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="คำนำหน้า"
            rules={[{ required: true }]}
            style={{ marginBottom: 0 }}
          >
            <Form.Item
              name="profix"
              rules={[{ required: true, message: "โปรดระบุคำนำหน้า" }]}
              style={{ display: "inline-block", width: "calc(15% - 8px)" }}
            >
              <Select placeholder="คำนำหน้า" allowClear>
                <Option value="miss">นางสาว</Option>
                <Option value="mrs">นาง</Option>
                <Option value="mr">นาย</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="ชื่อจริง"
              name="realname"
              rules={[{ required: true, message: "โปรดระบุชื่อจริง" }]}
              style={{
                display: "inline-block",
                width: "calc(40% - 8px)",
                margin: "0 8px",
              }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="นามสกุล"
              name="surename"
              rules={[{ required: true, message: "โปรดระบุนามสกุล" }]}
              style={{
                display: "inline-block",
                width: "calc(40% - 8px)",
                margin: "0 8px",
              }}
            >
              <Input />
            </Form.Item>
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Form.Item
              label="วันเกิด"
              name="birthDate"
              rules={[{ required: true, message: "โปรดระบุวันเกิด" }]}
              style={{ display: "inline-block", width: "calc(30% - 8px)" }}
            >
              <DatePicker placeholder="เดือน/วัน/ปี" format="MM/DD/YYYY" />
            </Form.Item>
            <Form.Item
              label="สัญชาติ"
              name="nation"
              rules={[{ required: true, message: "โปรดระบุสัญชาติ" }]}
              style={{
                display: "inline-block",
                width: "calc(40% - 8px)",
                margin: "0 8px",
              }}
            >
              <Input />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="บัตประชาชน"
            rules={[{ required: true }]}
            style={{ marginBottom: 0 }}
          >
            <Form.Item
              name="idcard1"
              style={{ display: "inline-block", width: "calc(10% - 8px)" }}
            >
              <Input
                onKeyPress={handleKeyPress}
                maxLength={1}
                onInput={(e) => handleInput("idcard1", e)}
              />
            </Form.Item>
            <p style={{ display: "inline-block", margin: "0 8px" }}>-</p>
            <Form.Item
              name="idcard2"
              style={{
                display: "inline-block",
                width: "calc(15% - 8px)",
                margin: "0 8px",
              }}
            >
              <Input
                onKeyPress={handleKeyPress}
                maxLength={4}
                onInput={(e) => handleInput("idcard2", e)}
              />
            </Form.Item>
            <p style={{ display: "inline-block", margin: "0 8px" }}>-</p>
            <Form.Item
              name="idcard3"
              style={{
                display: "inline-block",
                width: "calc(15% - 8px)",
                margin: "0 8px",
              }}
            >
              <Input
                onKeyPress={handleKeyPress}
                maxLength={5}
                onInput={(e) => handleInput("idcard3", e)}
              />
            </Form.Item>
            <p style={{ display: "inline-block", margin: "0 8px" }}>-</p>
            <Form.Item
              name="idcard4"
              style={{
                display: "inline-block",
                width: "calc(10% - 8px)",
                margin: "0 8px",
              }}
            >
              <Input
                onKeyPress={handleKeyPress}
                maxLength={2}
                onInput={(e) => handleInput("idcard4", e)}
              />
            </Form.Item>
            <p style={{ display: "inline-block", margin: "0 8px" }}>-</p>
            <Form.Item
              name="idcard5"
              style={{
                display: "inline-block",
                width: "calc(10% - 8px)",
                margin: "0 8px",
              }}
            >
              <Input
                onKeyPress={handleKeyPress}
                maxLength={1}
                onInput={(e) => handleInput("idcard5", e)}
              />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="เพศ"
            rules={[{ required: true }]}
            style={{ marginBottom: 0 }}
          >
            <Form.Item
              name="gender"
              rules={[{ required: true, message: "โปรดระบุเพศ" }]}
              style={{ display: "inline-block", width: "calc(20% - 8px)" }}
            >
              <Space direction="horizontal">
                <Radio.Group>
                  <Radio value={"ผู้ชาย"}>ผู้ชาย</Radio>
                  <Radio value={"ผู้หญิง"}>ผู้หญิง</Radio>
                  <Radio value={"ไม่ระบุ"}>ไม่ระบุ</Radio>
                </Radio.Group>
              </Space>
            </Form.Item>
          </Form.Item>
          <Form.Item label="หมายเลขโทรศัพท์มือถือ" style={{ marginBottom: 0 }}>
            <Form.Item
              name="phonecoce"
              rules={[{ required: true, message: "โปรดระบุหมายเลขโทรศัพท์" }]}
              style={{ display: "inline-block", width: "calc(15% - 8px)" }}
            >
              <Select allowClear>
                <Option value={66}>{66}</Option>
                <Option value={81}>{81}</Option>
                <Option value={1}>{1}</Option>
              </Select>
            </Form.Item>
            <p style={{ display: "inline-block", margin: "0 8px" }}>-</p>
            <Form.Item
              name="phonecoce2"
              rules={[{ required: true, message: "โปรดระบุหมายเลขโทรศัพท์" }]}
              style={{
                display: "inline-block",
                width: "calc(25% - 8px)",
                margin: "0 8px",
              }}
            >
              <Input maxLength={9} onKeyPress={handleKeyPress} />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="เงินเดือนที่คาดหวัง"
            rules={[{ required: true }]}
            style={{ marginBottom: 0 }}
          >
            <Form.Item
              name="exSalary"
              rules={[
                { required: true, message: "โปรดระบุเงืนเดือนที่คาดหวัง" },
              ]}
              style={{ display: "inline-block", width: "calc(40% - 8px)" }}
            >
              <Input placeholder="Input birth year" />
            </Form.Item>
            <Form.Item style={{ textAlign: "right" }}>
              <Button htmlType="submit">ส่งข้อมูล</Button>
              <Button
                htmlType="button"
                style={{ margin: "0 20px" }}
                onClick={onReset}
              >
                ล้างข้อมูล
              </Button>
            </Form.Item>
          </Form.Item>
        </Form>
      </Content>

      <Layout>
        <Content className="footer">
          <div style={{ marginBottom: 16, width: "100%" }}>
            <Checkbox onChange={onSelectAllChange}>เลือกทั้งหมด</Checkbox>
            <Button onClick={selectItem}>ลบข้อมูล</Button>
          </div>
          <Form form={form} component={false}>
            <Table
              rowSelection={rowSelection}
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              dataSource={persons}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={{
                onChange: cancel,
              }}
            />
          </Form>
        </Content>
      </Layout>
    </Layout>
  );
};
export default FormTable;
