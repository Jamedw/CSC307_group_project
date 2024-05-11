import React from "react";
import logo from "../images/calpoly.png"
import { Link } from 'react-router-dom';

function handleclick()
{
    <li><Link to="/">Home</Link></li>
}

export default function Poly_logo()
{
    return (
        <a href="\">
        <img src={logo} style={{height:50 , width:50,borderRadius:50,}} alt="horsey" />
        </a>
    );
}