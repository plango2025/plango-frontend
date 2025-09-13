import React, { useEffect, useState } from "react";
import { Wrapper, Image, Name, Profile } from "./Card.style";
import { Avatar, RatingGroup, Separator } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAccessToken } from "@/context/AccessTokenContext";
import {
  createApiWithToken,
  CustomAxiosRequestConfig,
} from "@/api/axiosInstance";
import { PlaceItem } from "@/pages/myPage/tapPages/TapPagesmodel";
import { Rating } from "@/components/common/card/Card.style";

interface Props {
  card: PlaceItem; // ✅ props 이름을 card로 명확히
}

const CardComponent5 = ({ card }: Props) => {
  const { accessToken, setAccessToken } = useAccessToken();
  const api = createApiWithToken(() => accessToken, setAccessToken);
  const navigate = useNavigate();

  const { name, address, thumbnail_url, rating } = card;

  const [localImg, setLocalImg] = useState<string | null>(null);

  // 썸네일 처리
  useEffect(() => {
    if (!thumbnail_url) return;
    const isRemote = /^https?:\/\//i.test(thumbnail_url);
    if (isRemote) {
      setLocalImg(thumbnail_url);
      return;
    }

    const fileName = thumbnail_url.split("/").pop() ?? "";
    if (!fileName) return;

    let objectUrl: string | null = null;

    (async () => {
      try {
        const res = await api.get(`/files/${encodeURIComponent(fileName)}`, {
          responseType: "blob",
        } as CustomAxiosRequestConfig);
        objectUrl = URL.createObjectURL(res.data);
        setLocalImg(objectUrl);
      } catch (err) {
        console.error("이미지 불러오기 실패", err);
      }
    })();

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [api, thumbnail_url]);

  return (
    <Wrapper onClick={() => navigate(`/place/${name}`)}>
      <div style={{ cursor: "pointer" }}>
        <Profile>
          <Avatar.Root size="sm">
            <Avatar.Fallback name={name} />
            <Avatar.Image src={thumbnail_url} />
          </Avatar.Root>
          <span>{name}</span>
        </Profile>

        {localImg && <Image src={localImg} alt={address} />}
        <Name>{address}</Name>
      </div>

      <Rating>
        <RatingGroup.Root value={rating} count={5} readOnly>
          <RatingGroup.HiddenInput />
          <RatingGroup.Control />
        </RatingGroup.Root>
      </Rating>

      <Separator mt="0.2rem" mb="0.2rem" size="sm" mr="0.7rem" ml="0.7rem" />
    </Wrapper>
  );
};

export default CardComponent5;
