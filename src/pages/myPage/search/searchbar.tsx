import  { useState } from "react";
import styles from "./searchbar.module.scss";

const Searchbar = () => {
  const [inputText, setInputText] = useState<string>(""); // 입력값을 관리하는 상태

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        value={inputText} // inputText 상태와 바인딩
        onChange={(e) => setInputText(e.target.value)} // 텍스트 변경 시 상태 업데이트
        className={styles.input}
        placeholder="Enter text"
      />
      <button className={styles.button}>
        검색
      </button>
    </div>
  );
};

export default Searchbar;
