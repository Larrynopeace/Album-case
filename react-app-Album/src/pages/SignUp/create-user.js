// This is the page of the create a user form

import { Form, Input, message } from 'antd';
import { Button, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';

// import css
import './create-user.css';
import axios from 'axios';

const CreateUser = () => {

    // Use the navigate hook to navigate
    const navigate = useNavigate();
    // function that handle the creating user form
    const onFinish = (values) => {
        console.log('@@@Collected values of form: ', values);
        // Create a user object for the backend
        const user = {
            username: values.username,
            password: values.password,
            email: values.email
        }
        // See the user object to the api
        console.log("@@@Sending object:", user)
        // Send the user object to the api
        axios.post('http://localhost:3000/user/create', user)
            .then(response => {
                console.log(response.data)
                message.success('User created successfully')
                navigate('/login');
            })
            .catch(error => {
                console.log(error)
                message.error('User creation failed')
            })
    };

    // This is the layout of the form
    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };

    return (
        <>
            <div className='create-user-container'>
            <h1>This is the page to create a user using form</h1>

                {/* Form */}
                <Form
                    className='form-container'
                    {...formItemLayout}
                    name="register"
                    onFinish={onFinish}
                    style={{
                        maxWidth: 600,
                    }}
                    scrollToFirstError
                >

                    {/* Username input */}
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

                    {/* Password input */}
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    {/* Email input */}
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    {/* Agreement checkbox */}
                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                            },
                        ]}
                        {...tailFormItemLayout}
                    >
                        <Checkbox>
                            {/* I have read the <a href="https://www.wikipedia.org/">agreement</a> */}
                            <span className='text'>I have read the <a href="https://www.wikipedia.org/">agreement</a></span>
                        </Checkbox>
                    </Form.Item>


                    {/* Submit button */}
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            {/* </div> */}
        </>
    );


}

export default CreateUser;