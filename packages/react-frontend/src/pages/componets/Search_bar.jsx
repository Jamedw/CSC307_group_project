import { even } from "prelude-ls";
import { React , useState} from "react";

const defaultval = "Search for Post or Community";

function formSubmit(e)
{
    console.log(e.target.value);
    e.target.value = "";
}
function resetform(e)
{
    if (e.target.value === defaultval)
    e.target.value = ""
}
function handleKeyPress(event)
{
    if (event.key === 'Enter') {
    console.log(event.target.value)
    event.target.value = ""
    }
}

export default function search()
{
    return(
        <input name="Community_Post" defaultValue={defaultval}
        onFocus={(e) => resetform(e)}
        onKeyPress={(e) => handleKeyPress(e)}       
        size={80}
        />
    );
}