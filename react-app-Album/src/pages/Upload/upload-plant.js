// This is the page of upload plant

import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Input, Upload, Radio, message, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

const UploadPlant = () => {

    // Define params object using useSearchParams hook
    const [searchParams] = useSearchParams()
    // Get the edited article id from the URL   
    const editItemId = searchParams.get('id')
    // useNavigate hook to navigate to the plant page
    const navigate = useNavigate();

    // Submit the form function
    const onSubmitThePlant = (values) => {
        // Create a object which will be added to the database
        // The values are the input of the form
        const plantObject = {
            title: values.title,
            description: values.description,
            // The value is 'getValueFromEvent' of the upload component, but it has been set in Form.Item
            image: values.upload,
            type: values.type,
        };
        // See the body of the request
        console.log("@@@Object in form:", plantObject);
        // There are two cases: add new item and update existing item
        if (editItemId) {
            // First case: Update existing item
            axios.put(`http://localhost:3000/plant/update/${editItemId}`, plantObject)
                .then((response) => {
                    console.log("@@@Updated object:", response);
                    message.success('Plant updated successfully');
                    navigate('/plant');
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            // Second case: Add new item
            axios.post('http://localhost:3000/plant/add', plantObject)
                .then((response) => {
                    console.log("@@@Added object:", response);
                    message.success('Plant added successfully');
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    // Return (re-fill) the edited article detail:
    // Define the instance of Form
    const [form] = Form.useForm()
    // Get the article detail back by the id from the api when click the item card
    useEffect(() => {
        // If the editArticleId is null, do not get the edit article detail
        if (!editItemId) {
            return;
        }
        // Get an article with detail by the id from the api
        axios.get(`http://localhost:3000/plant/${editItemId}`)
            .then((response) => {
                console.log("@@@Selected item:", response.data);

                // Set(return) the form values
                form.setFieldsValue({
                    title: response.data.title,
                    description: response.data.description,
                    type: response.data.type,
                    // set the upload field to an array containing the image object
                    //upload: response.data.image.map((img) => ({ url: `http://localhost:3000/${img.url}` })),
                    upload: response.data.image.map((img) => ({ url: img.url })),
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }, [editItemId, form]); // Dependency array

    // Delete the plant function
    const onDeletePlant = (id) => {
        axios.delete(`http://localhost:3000/plant/delete/${id}`)
            .then((response) => {
                console.log("@@@Deleted item:", response);
                message.success('Plant deleted successfully');
                // You might want to navigate away from the page or refresh the data here
                navigate('/plant');
            })
            .catch((error) => {
                console.log(error);
            });
    };
    // Confirm the delete action on delete button
    const confirm = (e) => {
        console.log(e);
        onDeletePlant(editItemId); // Call onDeletePlant here
    };
    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    };

    // Console log the error message when the form is not valid
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // Console log the image when it is uploaded on Upload component
    const onSeeUploadedImage = (info) => {
        console.log("@@@Uploaded Image:", info.fileList);
    };

    // Preview the images
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    // Get the base64 of the image
    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    // Handle the preview of the image
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    // Handle the cancel of the preview
    const handleCancel = () => setPreviewOpen(false);

    return (
        <>
            <h1>{editItemId ? 'You can edit the object here' : 'You can upload an object here'}</h1>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onSubmitThePlant}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                // Pass the instance of Form to the form property of Form
                form={form}
            >
                {/* Title input */}
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the title!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>


                {/* Description input */}
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the description!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                {/* Upload image */}
                <Form.Item
                    label="Upload"
                    name="upload"
                    valuePropName="fileList"
                    getValueFromEvent={e => Array.isArray(e) ? e : e && e.fileList}
                    rules={[
                        {
                            required: true,
                            message: 'Please upload an image!',
                        },
                    ]}
                >
                    <Upload
                        name='image'
                        listType="picture-card"
                        // action is the api address that upload sends the image to
                        action={'http://localhost:3000/upload'}
                        // onChange is the function that is called when the image is uploading
                        onChange={onSeeUploadedImage}
                        // 1 is the max number of the image
                        maxCount={1}
                        onPreview={handlePreview}
                    >
                        <div style={{ marginTop: 8 }}>
                            <PlusOutlined />
                        </div>
                    </Upload>
                </Form.Item>
                {/* Preview the image */}
                <Modal
                    open={previewOpen}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancel}>
                    <img
                        alt="example"
                        style={{
                            width: '100%',
                        }}
                        src={previewImage}
                    />
                </Modal>

                {/* Type input */}
                <Form.Item
                    label="Type"
                    name="type"
                    rules={[
                        {
                            required: true,
                            message: 'Please select a type!',
                        },
                    ]}
                >
                    <Radio.Group>
                        <Radio.Button value="day">Day</Radio.Button>
                        <Radio.Button value="night">Night</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                {/* Buttons */}
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    {/* Submit button */}
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    {/* Delete button */}
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        {editItemId && (
                            <Button type="primary" danger>
                                Delete
                            </Button>
                        )}
                    </Popconfirm>
                </Form.Item>
            </Form>
        </>
    )
};
export default UploadPlant;
