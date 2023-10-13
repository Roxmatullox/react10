import { Fragment, useState } from "react"
import { Button, Checkbox, Flex, Form, Image, Input, Modal, Space, Table, message } from "antd"
import { useEffect } from "react"
import request from "../constants/request"

const Teachers = () => {

  const [form] = Form.useForm()
  const [open, setOpen] = useState(false);
  
  const [selected , setSelected] = useState(null)

  const [data , setData] = useState([])
  const [loading , setLoading] = useState(false)

  useEffect(()=>{
    getData()
  } , [])

  async function getData() {
    try {
      setLoading(true)
      let {data} = await request.get("teachers")
      setData(data)
    } catch (err) {
      message.error(err)
    } finally{
      setLoading(false)
    }
  }


  const editData = async (id) =>{
    try {
      const {data} = await request.get(`teachers/${id}`)
      form.setFieldsValue(data)
      setOpen(true)
      setSelected(id)
    } catch (err) {
      console.log(err);
    }
  }


  const columns = [
    {
      title: 'Avatar',
      key: 'avatar',
      render : (data) =>{
        return <Image height={50} src={data.avatar}/>
      }
    },
    {
      title: 'Firstname',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Lastname',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Is Married',
      key: 'isMarried',
      render : (data) => {
        return (data.isMarried ? "ha" : "yoq")
      }
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'action',
      render : (data) => {
        return (<Space size="middle" >
          <Button onClick={()=>editData(data)} type="primary" >Edit</Button>
          <Button onClick={()=>deleteData(data)} type="primary" danger >Delete</Button>
        </Space>)
      }
    },
  ];

  const showModal = () => {
    form.resetFields()
    setOpen(true);
  };

  const hideModal = async () => {
    try {
      let values = await form.validateFields()
      if (selected === null) {
        await request.post("teachers" , values)  
      } else {
        await request.put(`teachers/${selected}`, values)
      }
      setOpen(false);
      getData()
    } catch (err) {
      console.log(err)
    }
  };




  const deleteData = async (id) =>{
    let deleteConfirm = confirm(`${id} lik teacher ochirilsinmi ?`)
    if (deleteConfirm) {
      await request.delete(`teachers/${id}`)
      getData()
    }
  }



  const closeModal = () => {
    setOpen(false);
  };

  return (
    <Fragment >
      <Table title={()=>(
        <Flex justify="space-between" align="center">
          <h2>Teachers ({data.length})</h2>
          <Button onClick={showModal} type="primary">
            Add Teacher
          </Button>
          <Modal
            title="Modal"
            open={open}
            onOk={hideModal}
            onCancel={closeModal}
            okText="Add"
          >
            <Form
              name="teacher"
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
              autoComplete="off"
              form={form}
            >
              <Form.Item
                label="Firstname"
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: 'Please input your firstName!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Lastname"
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: 'Please input your lastName!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Image"
                name="avatar"
                rules={[
                  {
                    required: true,
                    message: 'Please input your avatar!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="isMarried"
                valuePropName="checked"
                wrapperCol={{
                  span: 24,
                }}
              >
                <Checkbox>Is Married ?</Checkbox>
              </Form.Item>
            </Form>
          </Modal>
        </Flex>
      )} loading={loading} dataSource={data} columns={columns} />
    </Fragment>
  )
}

export default Teachers