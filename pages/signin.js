import CircledIconBtn from "@/components/buttons/circleedIconBtn";
import Footer from "@/components/footer";
import Header from "@/components/header";
import LoginInput from "@/components/inputs/logininput";
import DotLoader from "@/components/loader/dotLoader";
import styles from "@/styles/signin.module.scss";
import axios from "axios";
import { Form, Formik } from "formik";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import * as Yup from "yup";

const initialValues = {
  login_email: "",
  login_password: "",
  name: "",
  email: "",
  password: "",
  confirm_password: "",
  success: "",
  error: "",
  login_error: "",
};

const loginValidation = Yup.object({
  login_email: Yup.string()
    .required("Email address is required")
    .email("Please enter a valid email address."),

  login_password: Yup.string().required("Please enter a password"),
});

const registerValidation = Yup.object({
  name: Yup.string()
    .required("What's your name")
    .min(2, "Name must be between 2 and 16 characters.")
    .max(16, "Name must be between 2 and 16 characters.")
    .matches(/^[aA-zZ]/, "Numbers and special characters are not allowed."),
  email: Yup.string()
    .required(
      "You'll need this when you log in and if you ever need to reset your password"
    )
    .email("Please enter a valid email address."),

  password: Yup.string()
    .required(
      "Enter a combination of at least six numbers, letters and punctuation mark(such as ! and &"
    )
    .min(6, "Password must be atleast 6 charcters.")
    .max(36, "Password can't be more than 36 characters"),
  confirm_password: Yup.string()
    .required("Confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match."),
});

export default function SignIn({ providers, csrfToken, callbackUrl }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialValues);

  const {
    login_email,
    login_password,
    name,
    email,
    password,
    confirm_password,
    success,
    error,
    login_error,
  } = user;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const signUpHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      setUser({ ...user, error: "", success: data.message });
      setLoading(false);
      setTimeout(async () => {
        let options = {
          redirect: false,
          email: email,
          password: password,
        };

        const res = await signIn("credentials", options);
        Router.push("/");
      });
    } catch (error) {
      setLoading(false);
      setUser({
        ...user,
        success: "",
        error: error.response.data.message,
      });
    }
  };

  const signInHandler = async () => {
    setLoading(true);

    let options = {
      redirect: false,
      email: login_email,
      password: login_password,
    };

    const res = await signIn("credentials", options);
    setUser({ ...user, error: "", success: "Login success" });
    setLoading(false);
    if (res?.error) {
      setLoading(false);
      setUser({
        ...user,
        success: "",
        login_error: res?.error,
      });
    } else {
      setTimeout(() => {
        Router.push(callbackUrl || "/");
      });
    }
  };

  return (
    <>
      {loading && <DotLoader loading={loading} />}
      <Header />
      <div className={styles.login}>
        <div className={styles.login_container}>
          <div className={styles.login_header}>
            <div className={styles.back_svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              We&#39;d be happy to join us ! <Link href="/">Go Store</Link>
            </span>
          </div>

          <div className={styles.login_form}>
            <h1>Sign In</h1>
            <p>
              Get access to one of the best Eshopping services in the world.
            </p>

            <Formik
              enableReinitialize
              initialValues={{
                login_email,
                login_password,
              }}
              validationSchema={loginValidation}
              onSubmit={() => {
                signInHandler();
              }}
            >
              {(form) => (
                <Form
                  method="post"
                  action="/api/auth/signin/email"
                  className={styles.form}
                >
                  <input
                    type="hidden"
                    name="csrfToken"
                    defaultValue={csrfToken}
                  />
                  <LoginInput
                    type="email"
                    name="login_email"
                    id="email"
                    icon="email"
                    value={login_email}
                    onChange={handleChange}
                    placeholder="Email Address"
                  />
                  <LoginInput
                    type="password"
                    name="login_password"
                    id="password"
                    icon="password"
                    value={login_password}
                    onChange={handleChange}
                    placeholder="Password"
                  />
                  <CircledIconBtn type="submit" text="Sign in" />
                  {login_error && (
                    <span className={styles.error}>{login_error}</span>
                  )}
                  <div className={styles.forgot}>
                    <Link href="/forgot-password">Forgot Password ?</Link>
                  </div>
                </Form>
              )}
            </Formik>
            <div className={styles.login_socials}>
              <span className={styles.or}>Or continue with</span>
              <div className={styles.login_socials_wrap}>
                {providers.map((provider) => {
                  if (provider.name === "Credentials") {
                    return;
                  }

                  return (
                    <div key={provider.name} className={styles.provider}>
                      <button
                        className={styles.social_btn}
                        onClick={() => signIn(provider.id)}
                      >
                        <Image
                          width={36}
                          height={36}
                          src={`/images/icons/${provider.id}.png`}
                          alt={provider.name}
                        />
                        Sign in with {provider.name}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.login_container}>
          <div className={styles.login_form}>
            <h1>Sign up</h1>
            <p>
              Get access to one of the best Eshopping services in the world.
            </p>

            <Formik
              enableReinitialize
              initialValues={{
                email,
                name,
                password,
                confirm_password,
              }}
              validationSchema={registerValidation}
              onSubmit={() => {
                signUpHandler();
              }}
            >
              {(form) => (
                <Form className={styles.form}>
                  <LoginInput
                    type="text"
                    name="name"
                    id="name"
                    icon="user"
                    value={name}
                    onChange={handleChange}
                    placeholder="Full Name"
                  />
                  <LoginInput
                    type="email"
                    name="email"
                    id="email"
                    icon="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Email Address"
                  />
                  <LoginInput
                    type="password"
                    name="password"
                    id="password"
                    icon="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="Password"
                  />
                  <LoginInput
                    type="password"
                    name="confirm_password"
                    id="confirm_password"
                    icon="password"
                    value={confirm_password}
                    onChange={handleChange}
                    placeholder="R-Type Password"
                  />
                  <CircledIconBtn type="submit" text="Sign up" />
                </Form>
              )}
            </Formik>
            <div className={styles.success}>
              {success && <span>{success}</span>}
            </div>
            <div className={styles.error}>{error && <span>{error}</span>}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const { req, query } = context;

  const session = await getSession({ req });
  const { callbackUrl } = query;

  if (session) {
    return {
      redirect: {
        destination: callbackUrl,
      },
    };
  }

  const csrfToken = await getCsrfToken(context);
  const providers = Object.values(await getProviders());
  return {
    props: { providers, csrfToken, callbackUrl },
  };
}
