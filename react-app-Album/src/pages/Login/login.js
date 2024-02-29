// This is the Login page
import { Form, Input, Button, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { saveToken } from '../../store/actions';
import { saveUserInfo } from '../../store/actions';

// import css
import './login.css';

const Login = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    // function that handle the login user form
    const onFinish = (values) => {
        console.log('Success:', values);
        // Validate the user object
        const user = {
            username: values.username,
            password: values.password
        }
        console.log("@@@Validated user:", user)

        // Send the user object to the api
        axios.post('http://localhost:3000/user/login', user)
            .then(response => {
                console.log("@@@Received user&token:", response.data)
                // Save the token in the session storage
                sessionStorage.setItem('SAVE_TOKEN', response.data.token);
                // Save the token in the redux store
                dispatch(saveToken(response.data.token));
                // Save the user info in the redux store
                dispatch(saveUserInfo(response.data.user));

                message.success('User logged in successfully')
                navigate('/home');
            })
            .catch(error => {
                console.log(error)
                message.error('User login failed')
            })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // Navigate to the signup page when the user clicks the signup button
    const navigateToSignup = () => {
        navigate('/signup');
    }

    return (
        <>
            <div className="login-container">
                <h1>This is the login page Login:123 123</h1>
                <Form
                    className="login-form"
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 1200,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
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

                    {/* Remember me checkbox */}
                    <Form.Item
                        name="remember"
                        valuePropName="unchecked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    {/* Login button */}
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>

                        {/* Signup button */}
                        <Button
                            type="default"
                            style={{ marginLeft: '10px' }}
                            onClick={() => navigateToSignup()}
                        >
                            Signup
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

export default Login;