export interface KakaoUserInfo {
  nickname: string;
  id: string;
}

export interface KakaoLoginViewInterface {
  showUserInfo: (info: KakaoUserInfo) => void;
  showError: (message: string) => void;
}
