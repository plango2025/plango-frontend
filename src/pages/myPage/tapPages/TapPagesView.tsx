import CommonCard from "@/components/common/card/CommonCard";
import styles from "./TapPages.module.scss";

export function Page1() {
  return (
    <div className={styles.pageContainer}>
      <CommonCard hashtag="실험" />
      <CommonCard />
      <CommonCard />
    </div>
  );
}

export function Page2() {
  return (
    <div className={styles.pageContainer}>
      <CommonCard />
      <CommonCard />
      <CommonCard />
    </div>
  );
}

export function Page3() {
  return (
    <div className={styles.pageContainer}>
      <CommonCard />
      <CommonCard />
      <CommonCard />
    </div>
  );
}
