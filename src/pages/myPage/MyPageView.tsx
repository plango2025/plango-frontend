import React from "react";
import CommonCard from "@/components/common/card/CommonCard";
import CommonSidebar from "@/components/common/sidebar/CommonSidebar";
import styles from "./myPage.module.scss";
import Tap from "./tap/Tap";
import { Page1, Page2, Page3 } from "./tapPages/TapPagesView";
import { UserProfile } from "./MyPageModel";

interface Props {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const MyPageView: React.FC<Props> = ({ user, loading, error }) => {
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>사용자 정보가 없습니다.</div>;

  return (
    <div className={styles.CommunityViewLayout}>
      <CommonSidebar />

      <main className={styles.container}>
        <div className={styles.mainContainerLayout}>
          <div className={styles.topLayout}>
            <div className={styles.myLayout}>
              <div className={styles.myLayout__myLayout1}>
                <div
                  className={styles.myLayout__faceLayout}
                  style={{
                    backgroundImage: `url(${user.profile_image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className={styles.myLayout__textarea1}>
                  <div className={styles.myLayout__textarea1__name}>
                    {user.nickname}
                  </div>
                  <div className={styles.myLayout__textarea1__address}>
                    {user.nickname}
                  </div>
                  <div className={styles.myLayout__textarea1__birth}>
                    {user.nickname}
                  </div>
                  <div className={styles.myLayout__textarea1__tag}>
                    여행 {user.nickname}회차
                  </div>
                </div>
              </div>

              <div className={styles.myLayout__myLayout2}>
                <div className={styles.myLayout__textarea2}>
                  {user.nickname}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.tapLayout}>
            <Tap page1={<Page1 />} page2={<Page2 />} page3={<Page3 />} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyPageView;
