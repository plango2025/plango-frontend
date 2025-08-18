import { useCallback, useState } from "react";
import { fetchPlaceByKeyword } from "../model/placeInfoModel";
import { createApiWithToken } from '@/api/axiosInstance';
import { useAccessToken } from '@/context/AccessTokenContext';
import { PlaceIntro } from '@/types/place';



export const usePlaceSearch = () => {
  const [placeIntro, setPlaceIntro] = useState<PlaceIntro | null>(null);
  const [loading, setLoading] = useState(false);
  const { accessToken, setAccessToken } = useAccessToken();

  const api = createApiWithToken(() => accessToken, setAccessToken);

  const searchPlace = useCallback(
    async (keyword: string) => {
      setLoading(true);
      const data = await fetchPlaceByKeyword(api, keyword);
      setPlaceIntro(data);
      setLoading(false);
    },
    [accessToken]
  ); 

  return { placeIntro, loading, searchPlace };
};