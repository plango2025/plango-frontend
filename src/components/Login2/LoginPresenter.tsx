import React, { useState } from 'react'
import LoginModel from './LoginModel';
import LoginView from './LoginView';

const LoginPresenter: React.FC=()=> {
    const [id, setId] = useState<string>("");
    const[pw, setPw]= useState<string> ("");
    const [rememberId, setRememberId]= useState<boolean>(false);

const handleLogin=():void=> {
    const loginModel = new LoginModel(id, pw, rememberId);
    loginModel.login();
}

  return (
    <LoginView 
    id={id}
    setId={setId}
    pw={pw}
    setPw={setPw}
    rememberId={rememberId}
    setRememberId={setRememberId}
    handleLogin={handleLogin}
    />)
}

export default LoginPresenter
