import { RiMore2Line } from "react-icons/ri";

import { Avatar, Menu, Portal, Separator } from "@chakra-ui/react";
import {
  Wrapper,
  Title,
  List,
  Item,
  Header,
  UserInfo,
  UserName,
  CreatedAt,
  Content,
  SideFlex,
} from "./CommentList.style";
import { deleteComment } from "../model/ReviewDetailModel";
import { useAccessToken } from "@/context/AccessTokenContext";
import { createApiWithToken } from "@/api/axiosInstance";
import { useEffect, useState } from "react";
const CommentList = ({ comments }) => {
  const { accessToken, setAccessToken } = useAccessToken();
  const api = createApiWithToken(() => accessToken, setAccessToken);
  const [items, setItems] = useState(comments ?? []);

  useEffect(() => {
    setItems(comments ?? []);
  }, [comments]);

  const handleMenuClick = (action, id) => {
    if (action === "edit") {
      console.log("수정 클릭됨", id);
      // TODO: 수정 로직 추가
    } else if (action === "delete") {
      setItems((prev) => prev.filter((c) => c.id !== id));
      deleteComment(api, id);
    }
  };

  return (
    <Wrapper>
      <Title>댓글 ({items.length}개)</Title>
      <List>
        {items.map((c) => (
          <Item key={c.id}>
            <Separator mt="1rem" mb="1rem" size="sm" />

            <SideFlex>
              <Header>
                <Avatar.Root size="sm">
                  <Avatar.Fallback name={c.author.nickname} />
                  <Avatar.Image src={c.author.profile_image} />
                </Avatar.Root>
                <UserInfo>
                  <UserName>{c.author.nickname}</UserName>
                  <CreatedAt>
                    {new Date(c.created_at).toLocaleString("ko-KR")}
                  </CreatedAt>
                </UserInfo>
              </Header>
              <button>
                <Menu.Root>
                  <Menu.Trigger asChild>
                    <button>
                      <RiMore2Line />
                    </button>
                  </Menu.Trigger>
                  <Portal>
                    <Menu.Positioner>
                      <Menu.Content
                        pl={"0.6rem"}
                        pr={"0.6rem"}
                        pt={"0.3rem"}
                        pb={"0.3rem"}
                      >
                        {/* TODO: 수정은 나중에 */}
                        <Menu.Item
                          onClick={() => handleMenuClick("edit", c.id)}
                          value="수정"
                        >
                          수정
                        </Menu.Item>
                        <Menu.Item
                          onClick={() => {
                            handleMenuClick("delete", c.id);
                          }}
                          value="삭제"
                        >
                          삭제
                        </Menu.Item>
                      </Menu.Content>
                    </Menu.Positioner>
                  </Portal>
                </Menu.Root>
              </button>
            </SideFlex>

            <Content>{c.content}</Content>
          </Item>
        ))}
      </List>
    </Wrapper>
  );
};

export default CommentList;
