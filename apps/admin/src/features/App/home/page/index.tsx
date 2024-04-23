import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const HomePage = () => {
    const navigate = useNavigate();
    navigate('/category');

    return null;
};

export default HomePage;
