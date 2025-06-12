import styles from "./CommonFooter.module.scss";

function CommonFooter() {
  return (
    <div className={styles.footer}>
      <p>
        © 2025 MySite. Illustrations by{" "}
        <a
          href="https://streamlinehq.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Streamline
        </a>
      </p>
    </div>
  );
}

export default CommonFooter;
