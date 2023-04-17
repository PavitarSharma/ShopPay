"use client";

import Link from "next/link";
import styles from "./styles.module.scss";
import { IoLocationSharp } from "react-icons/io5"

export default function Copyright({ country }) {
  return (
    <div className={styles.footer_copyright}>
      <section>
        © {new Date().getFullYear()} SHOPPAY ALL RIGHTS RESERVED
      </section>

      <section>
        <ul>
          {data.map((link) => (
            <li key={link.name}>
              <Link href={link.link}>{link.name}</Link>
            </li>
          ))}

          <li>
            <a href="#">
                <IoLocationSharp /> 
                <span>{country.name}</span>
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}

const data = [
  {
    name: "Privacy Center",
    link: "",
  },
  {
    name: "Privacy & Cookie Policy",
    link: "",
  },
  {
    name: "Manage Cookies",
    link: "",
  },
  {
    name: "Terms & Conditions",
    link: "",
  },
];
