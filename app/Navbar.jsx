'use client';

import { useEffect } from "react";
import ErrorEmitter from "../classes/errorEmitter";

function Navbar({data}) {

    const errorEmitter = new ErrorEmitter();

    useEffect(()=>{
        if(!data.success){
            errorEmitter.send(data.message.sqlMessage);
        }
    }, []);
 

    return (
        <nav>
            <button onClick={() => errorEmitter.send('Testar hur det ser ut när jag skriver ett error meddelande', 'success')}>Emit message</button>
            {data.data.map(cat => {
                return <li key={cat.id}>{cat.name}</li>
            })}
        </nav>
    );
}

export default Navbar;