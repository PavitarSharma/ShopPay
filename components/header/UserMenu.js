"use client"

import Image from "next/image";
import styles from "./styles.module.scss";
import Link from "next/link";

const UserMenu = ({ loggedIn }) => {
  return (
    <div className={styles.menu}>
      <h4>Welcome to Shoppay</h4>
      {loggedIn ? (
        <div className={styles.flex}>
          <Image
            src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
            alt="avatar"
            width={100}
            height={100}
            className={styles.menu_image}
          />
          <div className={styles.col}>
            <span>Welcome Back, </span>
            <h3>John</h3>
            <span>Sign out</span>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
          <button className={styles.btn_primary}>Register</button>
          <button className={styles.btn_outlined}>Login</button>
        </div>
      )}

      <ul>
        <li>
            <Link href="/profile">Account</Link>
        </li>
        <li>
            <Link href="/profile/orders">My Orders</Link>
        </li>
        <li>
            <Link href="/profile/messages">Message Center</Link>
        </li>
        <li>
            <Link href="/profile/address">Address</Link>
        </li>
        <li>
            <Link href="/profile/wishlist">Whishlist</Link>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
