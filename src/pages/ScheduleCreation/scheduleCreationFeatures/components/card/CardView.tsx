import {
  Badge,
  Box,
  Button,
  Card,
  HStack,
  Image,
  Spacer,
} from "@chakra-ui/react";
import styles from "./CardView.module.scss";
export const CardView = () => (
  <Card.Root flexDirection="row" overflow="hidden" maxW="xl">
    <Image
      objectFit="cover"
      maxW="200px"
      src="https://lh3.googleusercontent.com/gps-cs-s/AB5caB_e0M0es76YU8P_4Gj-wRZlRs6WtXBpKDrJHjQyGu_qn_2O1DjwA9b8uZ8YHhm1ghL3vy01k-0dJRIsG1UiAibxwxFfNIDKSXHHGG7UVouZZWPxbrvV6GumShZAxXdXqkVw2MyX=s680-w680-h510"
      alt="지브리 테마파크"
    />
    <Box className={styles.boxStyle}>
      <Card.Body>
        <Card.Title mb="2">지브리 테마 파크</Card.Title>
        <Card.Description>
          Caffè latte is a coffee beverage of Italian origin made with espresso
          and steamed milk.
        </Card.Description>
        <HStack mt="4">
          <Badge>미정</Badge>
          <Badge>미정</Badge>
        </HStack>
      </Card.Body>
      <div className={styles.buttonLayout}>
        <Button className={styles.buttonStyle}>+</Button>
      </div>
    </Box>
  </Card.Root>
);

export default CardView;
