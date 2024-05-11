import React from "react";

export default function search()
{
    return(
        <input name="Community_Post" defaultValue="Search for Post or Community" 
        onFocus={(e) => e.target.value = ""} size={60}/>
    );
}