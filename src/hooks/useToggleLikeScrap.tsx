// presenter/useToggleLikeScrap.ts
import { useState } from "react";
import { createApiWithToken } from "@/api/axiosInstance";
import { useAccessToken } from "@/context/AccessTokenContext";
import { toast } from 'react-toastify';

type ToggleType = "REVIEW" | "PLACE";

interface Options {
  initialLiked?: boolean;
  initialBookmarked?: boolean;
  initialLikeCount?: number;
  initialBookmarkCount?: number;
}

export const useToggleLikeScrap = (
  type: ToggleType,
  id: string,
  options?: Options
) => {
  const { accessToken, setAccessToken } = useAccessToken();
  const api = createApiWithToken(() => accessToken, setAccessToken);

  const [liked, setLiked] = useState<boolean>(options?.initialLiked ?? false);
  const [bookmarked, setBookmarked] = useState<boolean>(
    options?.initialBookmarked ?? false
  );
  const [likeCount, setLikeCount] = useState<number>(
    options?.initialLikeCount ?? 0
  );
  const [bookmarkCount, setBookmarkCount] = useState<number>(
    options?.initialBookmarkCount ?? 0
  );

  const toggleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const res = liked
        ? await api.delete("/like", {
            params: { type, ref_id: id },
            requiresAuth: true,
          })
        : await api.post("/like", null, {
            params: { type, ref_id: id },
            requiresAuth: true,
          });
      const newLiked = res.data.liked as boolean;
      setLiked(newLiked);
      setLikeCount((prev) => (newLiked ? prev + 1 : Math.max(prev - 1, 0)));
    } catch (err) {
      console.dir(err.status);
      if(err.status===403){
        toast.error("본인이 작성한 글에는 좋아요를 누를 수 없습니다.");
      }
    }
  };

  const toggleBookmark = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = bookmarked
        ? await api.delete("/scrap", {
            params: { type, ref_id: id },
            requiresAuth: true,
          })
        : await api.post("/scrap", null, {
            params: { type, ref_id: id },
            requiresAuth: true,
          });
      const newBookmarked = (res.data.scrapped ??
        res.data.bookmarked) as boolean;
      setBookmarked(newBookmarked);
      setBookmarkCount((prev) =>
        newBookmarked ? prev + 1 : Math.max(prev - 1, 0)
      );
    } catch (err) {
      if (err.status === 403) {
        toast.error("본인이 작성한 글에는 스크랩을 할 수 없습니다.");
      }
    }
  };

  return {
    liked,
    likeCount,
    bookmarked,
    bookmarkCount,
    toggleLike,
    toggleBookmark,
  };
};
