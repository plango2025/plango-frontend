import styles from './loginBtn.module.scss'
function loginBtn() {
  return (
      <div className={styles.loginContainer}>
        <button className={styles.loginBtn}>로그인</button>
      </div>
  );
}

export default loginBtn
