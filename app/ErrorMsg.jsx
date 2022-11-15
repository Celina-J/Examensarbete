'use client';

import { useEffect, useState } from "react";


function ErrorMsg() {

    const [msg, setMsg] = useState({type: '', msg: ''});

    useEffect(() => {
        document.addEventListener('global-message-popup', (e)=>{
            setMsg({type: e.detail.type, msg: e.detail.message});
            
            setTimeout(()=>{
                setMsg({type: '', msg: ''})
            }, 5000);
        });
        
    }, []);

    return ( 
        <div className={`error-msg-popup error-msg-${msg.type}`} hidden={!msg.type} >{msg.msg}</div>
     );
}

export default ErrorMsg;