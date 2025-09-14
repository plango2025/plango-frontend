// TapPagesPresenter.ts

import { useState, useEffect, useCallback } from "react";
import { useAccessToken } from "@/context/AccessTokenContext";
import { createApiWithToken } from "@/api/axiosInstance";
import { useMemo } from "react";
import axios from "axios";

// 응답 데이터의 공통 구조를 정의
interface ListResponse<T> {
  items: T[];
  next_cursor: string | null;
  has_more: boolean;
}

// 공통 로직을 처리하는 제네릭 훅
export const useFetchList = <T,>(url: string, limit: number = 10) => {
  const { accessToken, setAccessToken } = useAccessToken();
  const api = useMemo(
    () => createApiWithToken(() => accessToken, setAccessToken),
    [accessToken, setAccessToken]
  );
  
  const [data, setData] = useState<T[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      const params = { limit, cursor };
      const config = {
        requiresAuth: true,
        headers: new axios.AxiosHeaders(),
        params,
      };
      
      const res = await api.get(url, config);
      const listData = res.data as ListResponse<T>;

      setData((prev) => [...prev, ...listData.items]);
      setCursor(listData.next_cursor);
      setHasMore(listData.has_more);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [api, url, limit, cursor, hasMore, loading]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, hasMore, loading, fetchData };
};