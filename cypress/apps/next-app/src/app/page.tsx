"use client";
import Image from "next/image";
import styles from "./page.module.css";
import SgdsMasthead from "@govtechsg/sgds-web-component/react/masthead/index.js"; 
import SgdsButton from "@govtechsg/sgds-web-component/react/button/index.js";
import dynamic from "next/dynamic";

const SgdsFileUpload = dynamic(
  () => import("@govtechsg/sgds-web-component/react/file-upload/index.js"),
  {
    ssr: false,
  }
);
export default function Home() {
  return (
    <main className={styles.main}>
      <SgdsMasthead></SgdsMasthead>
      <SgdsButton>Hello World</SgdsButton>
    <SgdsFileUpload>Upload</SgdsFileUpload>
    </main>
  );
}
