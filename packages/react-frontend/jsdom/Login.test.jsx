import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../src/pages/Login_page/Login';
import '@testing-library/jest-dom';

test('loads the login screen', async() => {
    render(
        <Router>
            <Login />
        </Router>
    );

    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument(); 
    expect(screen.getByText(/log in/i)).toBeInTheDocument();
});

describe('Login component', () => {
    it('should handle login correctly', () => {
        const mockLoginUser = jest.fn();
        render(
            <Router>
                <Login loginuser={mockLoginUser} />
            </Router>
        );

        console.log('Before input change');
        fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'testpassword' } });
        console.log('After input change, before button click');
        fireEvent.click(screen.getByText(/log in/i));
        console.log('After button click');

        expect(mockLoginUser).toHaveBeenCalledWith({
            username: 'testuser',
            password: 'testpassword',
        });
    });
});
