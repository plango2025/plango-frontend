import  { useState } from 'react';
import styles from './myPage.module.scss';
import { UserProfile } from "./MyPageModel";
import { useAccessToken } from "@/context/AccessTokenContext"; // Import the hook

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
}

const MyPageEditModal = ({ isOpen, onClose, user }: Props) => {
  const [formData, setFormData] = useState({
    nickname: user.nickname,
    address: user.address,
    birth: user.birth,
    about: user.about,
    profile_image: user.profile_image,
  });
  const [newProfileImage, setNewProfileImage] = useState<File | null>(null);

  // Use the hook to get the access token
  const { accessToken } = useAccessToken();

  if (!isOpen) {
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewProfileImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!accessToken) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      // 1. Profile image upload logic
      let profileImageUrl = formData.profile_image;
      if (newProfileImage) {
        const fileFormData = new FormData();
        fileFormData.append("files", newProfileImage); // ✅ 단수형

        // POST /api/files with the access token
        const fileUploadResponse = await fetch(
          "http://localhost:8000/api/files",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            body: fileFormData,
          }
        );

        const fileUploadData = await fileUploadResponse.json();
        if (fileUploadData.file_urls && fileUploadData.file_urls.length > 0) {
          profileImageUrl = fileUploadData.file_urls[0];
        } else {
          throw new Error("File upload failed.");
        }
      }

      // 2. User profile update logic
      const updatePayload = {
        nickname: formData.nickname,
        address: formData.address,
        birth: formData.birth,
        about: formData.about,
        profile_image: profileImageUrl,
      };

      // Filter out unchanged fields to send only the modified ones
      const updatedFields = Object.keys(updatePayload).reduce((acc, key) => {
        // Only include fields that have changed
        if (updatePayload[key] !== user[key]) {
          acc[key] = updatePayload[key];
        }
        return acc;
      }, {});

      // PATCH /api/users with the access token
      const userUpdateResponse = await fetch(
        "http://localhost:8000/api/users",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(updatedFields),
        }
      );
      if (!userUpdateResponse.ok) {
        throw new Error("Failed to update user profile.");
      }

      alert("프로필이 성공적으로 업데이트되었습니다.");
      window.location.reload(); // ✅ 새로고침
      onClose();
      // You might want to reload the user data in the parent component after a successful update.
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("프로필 업데이트 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>개인정보 수정</h2>
          <button onClick={onClose} className={styles.closeButton}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label>닉네임</label>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>주소</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>생년월일</label>
            <input
              type="date"
              name="birth"
              value={formData.birth}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>소개</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>프로필 이미지</label>
            <input
              type="file"
              name="profile_image"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton}>
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyPageEditModal;