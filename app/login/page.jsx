'use client';

import { useRef } from "react";

function Login() {

    const email = useRef();
    const password = useRef();

    function handleLogin(e){
        e.preventDefault();

        fetch('/api/login', {
            method: "POST",
            body: JSON.stringify({
                email: email.current.value,
                password: password.current.value
            })
        })
        .then(resp => resp.json())
        .then(data => console.log(data));
        
    }

    return (
        <>
            <form onSubmit={handleLogin} method="post">
                <input ref={email} name='email' type="text" />
                <input ref={password} name='password' type="text" />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default Login;