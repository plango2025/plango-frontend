// 댓글 목록 컴포넌트

interface Comment {
  id: number;
  userId: string;
  userName: string;
  userAvatar: string;
  createdAt: string;
  content: string;
}

interface CommentListProps {
  comments: Comment[];
}

const CommentList = ({ comments }: CommentListProps) => {
  return (
    <div>
      <h3>댓글 ({comments.length}개)</h3>
      <ul>
        {comments.map((c) => (
          <li
            key={c.id}
            style={{
              marginBottom: "1rem",
              listStyle: "none",
              borderBottom: "1px solid #eee",
              paddingBottom: "1rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={c.userAvatar}
                alt={c.userName}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  marginRight: 10,
                }}
              />
              <div>
                <strong>{c.userName}</strong>
                <div style={{ fontSize: 12, color: "#888" }}>
                  {new Date(c.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
            <p style={{ marginTop: 8 }}>{c.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
