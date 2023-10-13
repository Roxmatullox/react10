
import PropTypes from "prop-types";

import { Button, Flex, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';



const Login = ({setLogin}) => {

  const navigate = useNavigate()

  const onFinish = (values) => {
    const {username} = values
    localStorage.setItem( "Login" , username)
    setLogin(true)
    navigate("/teachers")
  };

  return (
    <main id='login'>
      <Flex justify='center' align='center'>
        <Form
          name="basic"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            width: 500,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 24,
            }}
          >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </main>
  )
}

Login.propTypes = {
  setLogin : PropTypes.func
}

export default Login