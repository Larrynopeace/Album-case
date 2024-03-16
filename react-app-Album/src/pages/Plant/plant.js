// This is the Plant page

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { Breadcrumb } from 'antd';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

// import the css file
import './plant.css';

const { Meta } = Card;

const Plant = () => {

    // Create a state variable to store the plant data
    const [plant, setPlant] = useState([]);
    // Create a state variable to store the plant type
    const [plantType, setPlantType] = useState('all');
    // Function to get the plant data
    const getAllPlant = () => {
        axios.get('http://localhost:3000/plant/all')
            .then((response) => {
                console.log("@@@Data: ", response.data);
                setPlant(response.data);
                setPlantType('all');
            })
            .catch((error) => {
                console.log(error);
            });
    }
    // Function to get the plant data by the plant type 'Day'
    const getDayPlant = () => {
        axios.get('http://localhost:3000/plant/type/day')
            .then((response) => {
                console.log("@@@Data:", response.data);
                setPlant(response.data);
                setPlantType('day');
            })
            .catch((error) => {
                console.log(error);
            });
    }
    // Function to get the plant data by the plant type Night'
    const getNightPlant = () => {
        axios.get('http://localhost:3000/plant/type/night')
            .then((response) => {
                console.log("@@@Data:", response.data);
                setPlant(response.data);
                setPlantType('night');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // Display all the plant data when the page is loaded
    useEffect(() => {
        getAllPlant();
    }, []);

    // Navigate to the plant detail page by clicking the Card:
    // Define the navigate object
    const navigate = useNavigate()
    // Navigate to the edit page with the plant id
    const navigateToEdit = (id) => {
        navigate(`/upload?id=${id}`)
    }

    return (
        <>
            {/* Breadcrumb */}
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>All</Breadcrumb.Item>
                {plantType === 'day' && <Breadcrumb.Item>Day</Breadcrumb.Item>}
                {plantType === 'night' && <Breadcrumb.Item>Night</Breadcrumb.Item>}
            </Breadcrumb>

            {/* Buttons */}
            <h1>This is the page that displays objects</h1>
            <Button
                onClick={getAllPlant}>All
            </Button>
            <Button
                style={{ backgroundColor: 'green', color: 'white' }}
                onClick={getDayPlant}>Day
            </Button>
            <Button
                style={{ backgroundColor: 'purple', color: 'white' }}
                onClick={getNightPlant}>Night
            </Button>

            {/* Item cards */}
            <div className="card-container">
                {/* Rendering items */}
                {plant.map((item) => (
                    <Card
                        className='custom-card'
                        hoverable
                        style={{ width: 180 }}
                        // Retreive each plant's image object in the array (Although there is only one image for each plant, it is still stored in an array. This is for the convenience of future expansion.)
                        cover={item.image.map(img => (
                            <img
                                key={img._id}
                                alt={item.title}
                                src={img.url}
                            />))}
                        key={item._id}
                        // Click the card to navigate to the edit page
                        onClick={() => navigateToEdit(item._id)}
                    >
                        <Meta title={item.title} description={item.description} />
                    </Card>
                ))}
            </div>
        </>
    );
}

export default Plant;