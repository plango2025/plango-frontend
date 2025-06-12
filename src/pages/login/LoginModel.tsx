import axios from 'axios';
class LoginModel {
  private id: string = "";
  private pw: string = "";
  private rememberId: boolean = false;

  constructor(id: string, pw: string, rememberId: boolean) {
    this.id = id;
    this.pw = pw;
    this.rememberId = rememberId;
  }

  async login(): Promise<any> {

    try{
      // 로그인 요청 로직 (로그인 API 호출)
      const response = await axios.post("/api/login", {
        id: this.id,
        pw: this.pw,
      });

      //서버로 부터 받은 응답 처리(토큰)
      const {token}= response.data;

      //로그인 상태에 따라 아이디 저장/삭제 처리리
    if(this.rememberId){
      localStorage.setItem("rememberedId", this.id); //아이디 기억하기!
    }else{
      localStorage.removeItem("rememberedId")// 아이디 기억 안하기기
    }
    //서버로 부터 받은 토큰 또는 필요한 데이터 반환환
    return {token}; //예시로 토큰만 반환
    
    }catch(err){
      console.log(err)
      throw err;

    }
    

  }

  getId(): string {
    return this.id;
  }

  getPassword(): string {
    return this.pw;
  }

  getRememberId(): boolean {
    return this.rememberId;
  }
}
export default LoginModel;