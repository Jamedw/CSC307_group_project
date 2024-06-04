import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Login from '../src/pages/Login_page/Login';

test('loads the login screen', async() => {
    render(<Login />)

})
