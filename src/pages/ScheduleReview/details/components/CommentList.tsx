import {
  Wrapper,
  Title,
  List,
  Item,
  Header,
  Avatar,
  UserInfo,
  UserName,
  CreatedAt,
  Content,
} from "./CommentList.style";

interface Comment {
  comment_id: number;
  target_id: number; //이건 리뷰id
  target_type: string; //SCHEDULE_REVIEW
  user_id: string;
  content: string;
  user_nickname: string;
  user_avatar: string;
  created_at: string;
  updated_at: string;
}

interface CommentListProps {
  comments: Comment[];
}

const CommentList = ({ comments }: CommentListProps) => {
  return (
    <Wrapper>
      <Title>댓글 ({comments.length}개)</Title>
      <List>
        {comments.map((c) => (
          <Item key={c.comment_id}>
            <Header>
              <Avatar src={c.user_avatar} alt={c.user_nickname} />
              <UserInfo>
                <UserName>{c.user_nickname}</UserName>
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
