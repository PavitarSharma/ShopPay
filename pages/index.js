import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ country }) {
  return (
    <div>
      <Header country={country} />
      <Footer country={country} />
    </div>
  );
}

export async function getServerSideProps() {
  // let data = await axios
  //   .get(`https://api.ipregistry.co/?key=${process.env.IPREGISTERY_API_KEY}`)
  //   .then((res) => {
  //     return res.data.location.country;
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  return {
    props: {
      // country: {
      //   name: data.name,
      //   flag: data.flag.emojitwo,
      // },
      country: {
        name: "Morraco",
        flag: "/images/country-logo.jpeg",
      },
    },
  };
}
