import styles from "./page.module.scss";

const NotFound = () => {
  return (
    <main>
      <div className={styles.container}>
        <h1>404 - Page Not Found</h1>
        <p className={styles.text}>
          Sorry, the page you are looking for does not exist.
        </p>
      </div>
    </main>
  );
};

export default NotFound;
