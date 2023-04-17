"use client";

import Ad from "./Ad";
import Main from "./Main";
import Top from "./Top";
import styles from "./styles.module.scss";

const Header = () => {
  return (
    <div className={styles.header}>
      <Ad />
      <Top />
      <Main />
    </div>
  );
};

export default Header;
