// mypageview.tsx
import React from "react";
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
  // ✅ 렌더링 순서를 변경하여 error를 먼저 처리
  if (loading) {
    return <div>로딩중...</div>;
  }

  if (error) {
    return <div>{error}</div>; // 에러 메시지를 표시
  }

  if (!user) {
    return <div>유저 정보를 불러올 수 없습니다.</div>; // 에러가 아닌데 user 정보가 없을 경우
  }

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
                    {user.address}
                  </div>
                  <div className={styles.myLayout__textarea1__birth}>
                    {user.birth}
                  </div>
                  <div className={styles.myLayout__textarea1__tag}>
                    여행 {user.id}회차
                  </div>
                </div>
              </div>
              <div className={styles.myLayout__myLayout2}>
                <div className={styles.myLayout__textarea2}>{user.about}</div>
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
