import { useNavigate } from "react-router-dom";
import styles from "./loginBtn.module.scss";
function LoginBtn() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className={styles.loginContainer}>
      <button onClick={handleLoginClick} className={styles.loginBtn}>
        로그인
      </button>
    </div>
  );
}

export default LoginBtn;
