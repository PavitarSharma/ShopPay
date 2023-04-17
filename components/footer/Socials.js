"use client"

import styles from "./styles.module.scss";
import {
  BsInstagram,
  BsTwitter,
  BsYoutube,
  BsPinterest,
  BsSnapchat,
} from "react-icons/bs";
import { FaFacebookF, FaTiktok } from "react-icons/fa";

const Socials = () => {
  return (
    <div className={styles.footer_socials}>
      <section>
        <h3>STAY CONNECTED</h3>

        <ul>
          <li>
            <a href="#" translate="_blank">
              <FaFacebookF />
            </a>
          </li>
          <li>
            <a href="#" translate="_blank">
              <BsInstagram />
            </a>
          </li>
          <li>
            <a href="#" translate="_blank">
              <BsTwitter />
            </a>
          </li>
          <li>
            <a href="#" translate="_blank">
              <BsYoutube />
            </a>
          </li>
          <li>
            <a href="#" translate="_blank">
              <BsPinterest />
            </a>
          </li>
          <li>
            <a href="#" translate="_blank">
              <BsSnapchat />
            </a>
          </li>
          <li>
            <a href="#" translate="_blank">
              <FaTiktok />
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Socials;
