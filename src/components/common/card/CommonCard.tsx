import { Button, Card, Image, Text } from "@chakra-ui/react";
import styles from "./CommonCard.module.scss";
import { CiBookmark } from "react-icons/ci";
import { FaRegCommentDots } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

interface CommonCardProps {
  hashtag: string;
  title: string;
}

const CommonCard: React.FC<CommonCardProps> = ({ hashtag, title }) => {
  return (
    <Card.Root maxW="sm" className={styles.root}>
      <Card.Title className={styles.title}>Living room Sofa</Card.Title>
      <Image
        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Green double couch with wooden legs"
      />

      <Card.Body>
        <div className={styles.buttonLayout}>
          <FcLike size="36" className={styles.like} />
          <FaRegCommentDots size="36" />
          <CiBookmark size="36" />
        </div>

        <div className={styles.bodyLayout}>
          <Card.Description className={styles.description}>
            {hashtag}
            <div className={styles.iconLayout}>
              <div className={styles.iconD}>
                <img src="/src/assets/images/icons/pin.png" alt="" />
                <text>{title}</text>
              </div>
              <div className={styles.iconD}>
                <img src="/src/assets/images/icons/person.png" alt="" />
                <text>친구들과 함께</text>
              </div>
              <div className={styles.iconD}>
                <img src="/src/assets/images/icons/clock.png" alt="" />
                <text>2박 3일</text>
              </div>
            </div>
          </Card.Description>
        </div>
      </Card.Body>
    </Card.Root>
  );
};

export default CommonCard;
