import { Tabs } from "@chakra-ui/react"
import { LuFolder,  LuUser } from "react-icons/lu"
import styles from "./Tap.module.scss"
import { LuSquareCheck } from "react-icons/lu";

const Tap = ({ page1, page2, page3 }) => {
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
        <Tabs.Content value="profile">{page1}</Tabs.Content>
        <Tabs.Content value="likes">{page2}</Tabs.Content>
        <Tabs.Content value="bookmark">{page3}</Tabs.Content>
      </div>
    </Tabs.Root>
  )
}

export default Tap;