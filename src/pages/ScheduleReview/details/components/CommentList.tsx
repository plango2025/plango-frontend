import { Avatar, Separator } from '@chakra-ui/react';
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
} from "./CommentList.style";
const CommentList = ({ comments }) => {
  if (!comments) return <div>댓글 없음</div>;

  return (
    <Wrapper>

      <Title>댓글 ({comments.length}개)</Title>
      <List>
        {comments.map((c) => (
          <Item key={c.id}>
            <Separator mt="1rem" mb="1rem" size="sm" />

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
            <Content>{c.content}</Content>
          </Item>
        ))}
      </List>
    </Wrapper>
  );
};

export default CommentList;
