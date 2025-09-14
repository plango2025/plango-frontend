import {  Card, Image } from "@chakra-ui/react";
import styles from "./CommonCard.module.scss";
import { CiBookmark } from "react-icons/ci";
import { FaRegCommentDots } from "react-icons/fa";
import { FcLike } from "react-icons/fc";


interface CommonCardProps {
  thumbnail_url: string;
  destination: string;
  title: string;
}

const CommonCard = ({ destination, title }: CommonCardProps) => {
  return (
    <div className={styles.mainbody}>
      <Card.Root className={styles.root}>
        <Card.Title className={styles.title}>{title}</Card.Title>
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
              {destination}
              <div className={styles.iconLayout}>
                <div className={styles.iconD}>
                  <text>평점 </text>
                </div>
                <div className={styles.iconD}>
                  <div className={styles.iconD2}>
                    <text>d</text>
                    <text>d</text>
                    <text>d</text>
                  </div>
                </div>
              </div>
            </Card.Description>
          </div>
        </Card.Body>
      </Card.Root>
    </div>
  );
};

export default CommonCard;
