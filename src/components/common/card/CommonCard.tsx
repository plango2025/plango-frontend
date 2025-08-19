import { Button, Card, Image, Text, RatingGroup } from "@chakra-ui/react";
import styles from "./CommonCard.module.scss";
import { CiBookmark } from "react-icons/ci";
import { FaRegCommentDots } from "react-icons/fa";
import { FcLike } from "react-icons/fc";


interface CommonCardProps {
  profile_image: string;
  name: string;
  title: string;
  rating: string;
}

const CommonCard: React.FC<CommonCardProps> = ({ profile_image, name, title, rating }) => {
  return (
    <Card.Root maxW="sm" className={styles.root}>
      <Card.Title className={styles.title}>{profile_image}{name}</Card.Title>
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
            {title}
            <div className={styles.iconLayout}>
              <div className={styles.iconD}>
                <text>평점 </text>
                <RatingGroup.Root count={5} defaultValue={Number(rating)} size="sm">
                  <RatingGroup.HiddenInput />
                  <RatingGroup.Control />
                </RatingGroup.Root>
              </div>
              <div className={styles.iconD}>
                <div className={styles.iconD2}>
                  <text>d</text><text>d</text><text>d</text>
                </div>
              </div>
            </div>
          </Card.Description>
        </div>
      </Card.Body>
    </Card.Root>
  );
};

export default CommonCard;
