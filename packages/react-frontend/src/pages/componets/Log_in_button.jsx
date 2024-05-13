import React from "react";
import { Link, Routes, Route } from 'react-router-dom';
import Log_in from "../Log_in"
import { green, white } from "color-name";

export default function Log_in_button()
{

    return(
        <a href="/Log_in" >
            <button style={{marginTop:10, borderRadius:20,backgroundColor:green}}>Log in</button>
        </a>
    );
}
