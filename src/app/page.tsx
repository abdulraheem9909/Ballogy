
"use client";
import ChatContent from "./component/chat/chatContent";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <ChatContent/>
    </main>
  );
}
