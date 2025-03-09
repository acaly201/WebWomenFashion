"use client";
import { useTranslations } from "next-intl";
import styles from "../style/home.module.scss";
import { useState, useEffect } from "react";
import { Api } from "@/setting/api";
import Image from "next/image";
import { GrLinkNext } from "react-icons/gr";
import type { TypeSample } from "@/setting/dataType";

export default function HomePage() {
  const t = useTranslations("homePage");
  const [listSample, setListSample] = useState<TypeSample[] | undefined>(
    undefined
  );
  useEffect(() => {
    fetch(Api.List_Sample.getAll)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        if (data) {
          setListSample(data);
        }
      })
      .catch(() => {
        console.log(Error);
      });
  }, []);

  return (
    <>
      <div className={styles.home_page}>
        <div className={styles.title}>
          <h1>{t("title1")}</h1>
        </div>
        <div className={styles.list_sample}>
          {listSample ? (
            listSample.map((data, index) => {
              return (
                <div className={styles.box_sample} key={data.id}>
                  <div className={styles.img_sample}>
                    <Image
                      style={{ width: "100%", height: "100%" }}
                      src={data.image}
                      width={500}
                      height={500}
                      alt="img"
                    />
                  </div>
                  <div className={styles.content_sample}>
                    <h2>{data.title}</h2>
                    <p>{data.content}</p>
                    <span>
                      View Example
                      <GrLinkNext className={styles.icon} />
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>Load.....</h1>
          )}
        </div>
        <div className={styles.list_product}></div>
        <div className={styles.info_page}>
          <h1>{t("title3")}</h1>
          <div className={styles.box_info_page}>
            <div className={styles.content_box_info_page}>
              <h2>{t("smart")}</h2>
              <p>{t("often")}</p>
              <h4>{t("help")}</h4>
              <p>{t("custom")}</p>
              <p>{t("dynamic")}</p>
              <p>{t("smartSearch")}</p>
              <button>{t("try")}</button>
            </div>
            <Image
              className={styles.img_box_info_page}
              alt="img"
              width={500}
              height={500}
              src={
                "https://nga-appstore.myshopify.com/cdn/shop/files/Smart_Product_Filter_750x.png"
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
