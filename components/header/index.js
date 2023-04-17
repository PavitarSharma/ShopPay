"use client";

import Ad from "./Ad";
import Main from "./Main";
import Top from "./Top";
import styles from "./styles.module.scss";

const Header = ({ country }) => {
  return (
    <div className={styles.header}>
      <Ad />
      <Top country={country} />
      <Main />
    </div>
  );
};

export default Header;
