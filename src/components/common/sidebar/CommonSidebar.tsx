import styles from "./CommonSideBar.module.scss";


function CommonSidebar() {
  return (
    <div className={styles.sidebar}>
      <img className={styles.sidebar__logo}src="src/assets/images/icons/travel.png" alt="" />
      <ul className={styles.sidebar__iconList}>
        <li className={styles.sidebar__iconList__icon}>
          <img src="src/assets/images/icons/Home.png" alt="" />
        </li>
        <li className={styles.sidebar__iconList__icon}>
          <img src="src/assets/images/icons/ai.png" alt="" />
        </li>
        <li className={styles.sidebar__iconList__icon}>
          <img src="src/assets/images/icons/shere.png" alt="" />
        </li>
        <li className={styles.sidebar__iconList__icon}>
          <img src="src/assets/images/icons/Bookmark.png" alt="" />
        </li>
        <li className={styles.sidebar__iconList__icon}>
          <img src="src/assets/images/icons/bell.png" alt="" />
        </li>
      </ul>
    </div>
  );
}

export default CommonSidebar;
