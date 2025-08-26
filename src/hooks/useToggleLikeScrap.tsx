// presenter/useToggleLikeScrap.ts
import { useState, useEffect, useCallback } from "react";
import type { AxiosError } from "axios";
import { createApiWithToken } from "@/api/axiosInstance";
import { useAccessToken } from "@/context/AccessTokenContext";
import { toast } from "react-toastify";

type ToggleType = "REVIEW" | "PLACE";

interface Options {
  initialLiked?: boolean;
  initialBookmarked?: boolean;
  initialLikeCount?: number;
  initialBookmarkCount?: number;
}

export const useToggleLikeScrap = (
  type: ToggleType,
  id: string | number,
  options: Options = {}
) => {
  const { accessToken, setAccessToken } = useAccessToken();
  const api = createApiWithToken(() => accessToken, setAccessToken);

  // ---- state ----
  const [liked, setLiked] = useState<boolean>(!!options.initialLiked);
  const [bookmarked, setBookmarked] = useState<boolean>(
    !!options.initialBookmarked
  );
  const [likeCount, setLikeCount] = useState<number>(
    options.initialLikeCount ?? 0
  );
  const [bookmarkCount, setBookmarkCount] = useState<number>(
    options.initialBookmarkCount ?? 0
  );

  // ✅ props(초기값) 변경 시 내부 상태 동기화 (로그인 전→후 재요청 반영)
  useEffect(() => {
    setLiked(!!options.initialLiked);
    setBookmarked(!!options.initialBookmarked);
    setLikeCount(options.initialLikeCount ?? 0);
    setBookmarkCount(options.initialBookmarkCount ?? 0);
    // id가 바뀌면 전부 리셋
  }, [
    id,
    options.initialLiked,
    options.initialBookmarked,
    options.initialLikeCount,
    options.initialBookmarkCount,
  ]);

  // ---- actions ----
  const toggleLike = useCallback(
    async (e?: React.MouseEvent) => {
      e?.stopPropagation();

      const next = !liked;
      // 옵티미스틱
      setLiked(next);
      setLikeCount((prev) => Math.max(0, prev + (next ? 1 : -1)));

      try {
        const res = next
          ? await api.post("/like", null, {
              params: { type, ref_id: id },
              requiresAuth: true,
            })
          : await api.delete("/like", {
              params: { type, ref_id: id },
              requiresAuth: true,
            });

        const serverLiked =
          (res as any)?.data?.liked ?? (res as any)?.data?.is_liked;
        const serverCount =
          (res as any)?.data?.like_count ?? (res as any)?.data?.likes;

        if (typeof serverLiked === "boolean") setLiked(serverLiked);
        if (typeof serverCount === "number") setLikeCount(serverCount);
      } catch (err) {
        // 롤백
        setLiked(!next);
        setLikeCount((prev) => Math.max(0, prev + (next ? -1 : 1)));

        const status = (err as AxiosError)?.response?.status;
        if (status === 403)
          toast.error("본인이 작성한 글에는 좋아요를 누를 수 없습니다.");
        else if (status === 401) toast.error("로그인이 필요한 서비스입니다.");
      }
    },
    [api, id, liked, type]
  );

  const toggleBookmark = useCallback(
    async (e?: React.MouseEvent) => {
      e?.stopPropagation();

      const next = !bookmarked;
      // 옵티미스틱
      setBookmarked(next);
      setBookmarkCount((prev) => Math.max(0, prev + (next ? 1 : -1)));

      try {
        const res = next
          ? await api.post("/scrap", null, {
              params: { type, ref_id: id },
              requiresAuth: true,
            })
          : await api.delete("/scrap", {
              params: { type, ref_id: id },
              requiresAuth: true,
            });

        const serverBookmarked =
          (res as any)?.data?.scrapped ??
          (res as any)?.data?.bookmarked ??
          (res as any)?.data?.is_scrapped;
        const serverCount =
          (res as any)?.data?.scrap_count ?? (res as any)?.data?.bookmarks;

        if (typeof serverBookmarked === "boolean")
          setBookmarked(serverBookmarked);
        if (typeof serverCount === "number") setBookmarkCount(serverCount);
      } catch (err) {
        // 롤백
        setBookmarked(!next);
        setBookmarkCount((prev) => Math.max(0, prev + (next ? -1 : 1)));

        const status = (err as AxiosError)?.response?.status;
        if (status === 403)
          toast.error("본인이 작성한 글에는 스크랩을 할 수 없습니다.");
        else if (status === 401 )
          toast.error("로그인이 필요한 서비스입니다.");
      }
    },
    [api, id, bookmarked, type]
  );

  return {
    liked,
    likeCount,
    bookmarked,
    bookmarkCount,
    toggleLike, // onClick={toggleLike} 또는 onClick={(e)=>toggleLike(e)} 둘 다 OK
    toggleBookmark, // onClick 동일
    // 필요시 외부에서 강제 동기화할 수 있도록 setter도 노출 가능:
    setLiked,
    setBookmarked,
    setLikeCount,
    setBookmarkCount,
  };
};
