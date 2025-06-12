import React, { createContext, useContext, useState } from "react";

interface AccessTokenContextType{
    accessToken:string|null;
    setAccessToken:(token: string|null)=>void;

}

const AccessTokenContext = createContext<AccessTokenContextType|undefined>(undefined);
//AccessTokenProvider 컴포넌트 안에 속한 컴포넌트들은
//모두 accessToken을 사용가능
export const AccessTokenProvider:React.FC<{children:React.ReactNode}>=({children})=>{
  const [accessToken, setAccessToken] = useState<string | null>(null);
  return(
<AccessTokenContext.Provider value={{accessToken,setAccessToken}}>
{children}
</AccessTokenContext.Provider>
  )
}

// AccessTokenContext에 저장된 acessToken, setAccessToken을 꺼내쓰기 위한 커스텀 훅!
// 사용 예시) const { accessToken, setAccessToken } = useAccessToken();
//- `AccessTokenProvider`로 감싸지 않았을 경우 `context`는 `undefined`가 됨
//- 그럴 때는 명확한 에러를 던져서 개발자가 잘못 사용한 걸 알려준다.
export const useAccessToken = ()=>{
  const context = useContext(AccessTokenContext);
  if(!context) throw new Error("useAccessToken must be used within AccessTokenProvider");
  return context;
}