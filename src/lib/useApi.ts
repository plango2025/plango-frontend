import { createApiWithToken } from '@/api/axiosInstance';
import { useAccessToken } from '@/context/AccessTokenContext';

export const useApi = () => {
  const { accessToken, setAccessToken } = useAccessToken();

  const getToken = () => accessToken;
  const setToken = (token: string | null) => setAccessToken(token);

  return createApiWithToken(getToken, setToken);
};
