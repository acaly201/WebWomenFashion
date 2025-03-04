"use client";
import { LuBookText } from "react-icons/lu";
import styles from "../style/demoGuide.module.scss";
import { FaCaretUp ,FaCaretDown } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
export default function DemoGuide() {
  const [showDemoGuide, setShowDemoGuide] = useState<Boolean>(false);
  return (
    <>
      <div
        onClick={() => setShowDemoGuide(!showDemoGuide)}
        className={styles.button_demo_guide}
      >
        <div className={styles.box_button_demo_guide}>
          {showDemoGuide ? (
            <IoMdClose className={styles.icon_demo_guide} />
          ) : (
            <LuBookText className={styles.icon_demo_guide} />
          )}
        </div>
      </div>

      <div className={showDemoGuide ? styles.box_demo_guide : styles.hide}>
        <div className={styles.title1_box_demo_guide}>
          <LuBookText className={styles.icon_demo_guide} />
          <h3>Demo Guide</h3>
        </div>
        <div className={styles.title2_box_demo_guide}>
          <p>What are you looking for?</p>
          <FaCaretUp />
        </div>
        <div className={styles.content_box_demo_guide}>
          <p style={{ color: "darkgray" }}>
            Select options below to get the best of this demo 👇
          </p>
          <p>I want to show ...</p>
          <ul>
            <li>
              <input type="radio" id="product" name="radio" value="HTML" />
              <span>Swatch on product page</span>
            </li>
            <li>
              <input type="radio" id="collection" name="radio" value="HTML1" />
              <span>Swatch on collection page</span>
            </li>
            <li>
              <input type="radio" id="home" name="radio" value="HTML2" />
              <span>Swatch on home page</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
