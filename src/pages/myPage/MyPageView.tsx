// mypageview.tsx
import  { useState } from "react";
import CommonSidebar from "@/components/common/sidebar/CommonSidebar";
import styles from "./MyPage.module.scss";
import Tap from "./tap/Tap";
import {
  Page1,
  Page2,
  Page3,
  Page4,
  Page5,
  Page6,
} from "./tapPages/TapPagesView";
import { UserProfile } from "./MyPageModel";
import { LuPencil } from "react-icons/lu"; // Import the pen icon
import MyPageEditModal from "./MyPageEditModal"; // Import the new modal component
import { Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface Props {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const MyPageView= ({ user, loading, error }: Props) => {
  const navigate = useNavigate();
  // State to manage the visibility of the pop-up
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the pop-up
  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  // Function to close the pop-up
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // ✅ 렌더링 순서를 변경하여 error를 먼저 처리
  if (loading) {
    return <Spinner />;
  }

  if (error) {
    navigate("/login");
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
                ></div>
                {/* Pen icon for editing */}
                <button
                  onClick={handleEditClick}
                  className={styles.editButton}
                  aria-label="Edit Profile"
                >
                  <LuPencil />
                </button>
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
                    여행 {user.tourcount}회차
                  </div>
                </div>
              </div>
              <div className={styles.myLayout__myLayout2}>
                <div className={styles.myLayout__textarea2}>
                  <div>
                    <text className={styles.about}>About me</text>
                    <div>{user.about}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.tapLayout}>
            <Tap
              section1={<Page1 />}
              section2={<Page2 />}
              section3={<Page3 />}
              section4={<Page4 />}
              section5={<Page5 />}
              section6={<Page6 />}
            />
          </div>
        </div>
      </main>

      {/* Pop-up Modal Component */}
      <MyPageEditModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={user}
      />
    </div>
  );
};

export default MyPageView;
