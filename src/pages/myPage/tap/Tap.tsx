import { Tabs } from "@chakra-ui/react";
import { LuFolder, LuUser, LuSquareCheck } from "react-icons/lu";
import styles from "./Tap.module.scss";

// Sub-components for each tab's content, now accepting props
const ProfileSubTabs = ({ section1, section2 }) => (
  <Tabs.Root variant="enclosed" fitted defaultValue={"sub-profile1"}>
    <Tabs.List className={styles.subTabsList}>
      <Tabs.Trigger className={styles.subTabs} value="sub-profile1">Sub-Profile 1</Tabs.Trigger>
      <Tabs.Trigger className={styles.subTabs} value="sub-profile2">Sub-Profile 2</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="sub-profile1"><div className = {styles.y_scroll}>{section1}</div></Tabs.Content>
    <Tabs.Content value="sub-profile2">{section2}</Tabs.Content>
  </Tabs.Root>
);

const LikesSubTabs = ({ section3, section4 }) => (
  <Tabs.Root variant="enclosed" fitted defaultValue="sub-likes1">
    <Tabs.List className={styles.subTabsList}>
      <Tabs.Trigger className={styles.subTabs} value="sub-likes1">Sub-Likes 3</Tabs.Trigger>
      <Tabs.Trigger className={styles.subTabs} value="sub-likes2">Sub-Likes 4</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="sub-likes1">{section3}</Tabs.Content>
    <Tabs.Content value="sub-likes2">{section4}</Tabs.Content>
  </Tabs.Root>
);

const BookmarkSubTabs = ({ section5, section6 }) => (
  <Tabs.Root variant="enclosed" fitted defaultValue="sub-bookmark1">
    <Tabs.List className={styles.subTabsList}>
      <Tabs.Trigger className={styles.subTabs} value="sub-bookmark1">Sub-Bookmark 5</Tabs.Trigger>
      <Tabs.Trigger className={styles.subTabs}value="sub-bookmark2">Sub-Bookmark 6</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="sub-bookmark1">{section5}</Tabs.Content>
    <Tabs.Content value="sub-bookmark2">{section6}</Tabs.Content>
  </Tabs.Root>
);

const Tap = ({ section1, section2, section3, section4, section5, section6 }) => {
  return (
    <Tabs.Root className={styles.tabsRoot} variant="plain" defaultValue="profile">
      <Tabs.List className={styles.tabsRoot} bg="bg.muted" rounded="l3" p="1">
        <Tabs.Trigger value="profile" className={styles.triggerRoot}>
          <LuUser />
          profile
        </Tabs.Trigger>
        <Tabs.Trigger className={styles.triggerRoot} value="likes">
          <LuFolder />
          likes
        </Tabs.Trigger>
        <Tabs.Trigger className={styles.triggerRoot} value="bookmark">
          <LuSquareCheck />
          bookmark
        </Tabs.Trigger>
        <Tabs.Indicator rounded="l2" />
      </Tabs.List>
      <div className={styles.result}>
        <Tabs.Content value="profile" className = {styles.y_scroll}>
          <ProfileSubTabs section1={section1} section2={section2} />
        </Tabs.Content>
        <Tabs.Content value="likes">
          <LikesSubTabs section3={section3} section4={section4} />
        </Tabs.Content>
        <Tabs.Content value="bookmark">
          <BookmarkSubTabs section5={section5} section6={section6} />
        </Tabs.Content>
      </div>
    </Tabs.Root>

  );
};

export default Tap;