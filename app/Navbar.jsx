'use client';

import { useEffect } from "react";
import ErrorEmitter from "../classes/errorEmitter";
import Login from './Login.jsx';


function Navbar({data}) {

    const errorEmitter = new ErrorEmitter();
   

    useEffect(()=>{
        if(!data.success){
            errorEmitter.send('Could not get navbar categories');
        }
    }, []);
 

    return (
        <nav>
            {/* {data.data.map(cat => {
                return <span key={cat.id}>{cat.name}</span>
            })}  */}
            <Login />
        </nav>
    );
}

export default Navbar;