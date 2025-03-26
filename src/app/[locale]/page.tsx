"use client";
import { useTranslations } from "next-intl";
import styles from "../style/home.module.scss";
import { useState, useEffect } from "react";
import { Api } from "@/setting/api";
import Image from "next/image";
import { GrLinkNext } from "react-icons/gr";
import type { TypeSample } from "@/setting/dataType";
import { useGoToInfoProduct } from "../component/products/goToInfoProduct";
import AllProducts from "../component/products/pageAllProduct";
import { useAppSelector } from "@/redux/hooks";
import { selectData } from "@/redux/features/apiProduct/reduceProduct";
import InfoHomePage from "../component/home/infoHomePage";
export default function HomePage() {
  const t = useTranslations("homePage");
  const [listSample, setListSample] = useState<TypeSample[] | undefined>([]);
  const goToInfoProduct = useGoToInfoProduct();
  const dataProduct = useAppSelector(selectData);
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
          {listSample && listSample.length > 0 ? (
            listSample.map((data: any) => {
              return (
                <div className={styles.box_sample} key={data.id}>
                  <div
                    onClick={() =>
                      goToInfoProduct(data.name_product, data.id_product)
                    }
                    className={styles.img_sample}
                  >
                    <Image
                      style={{ width: "100%", height: "100%" }}
                      src={data.image}
                      width={500}
                      height={500}
                      alt="img"
                    />
                  </div>
                  <div className={styles.content_sample}>
                    <h2
                      onClick={() =>
                        goToInfoProduct(data.name_product, data.id_product)
                      }
                    >
                      {data.title}
                    </h2>
                    <p>{data.content}</p>
                    <span
                      onClick={() =>
                        goToInfoProduct(data.name_product, data.id_product)
                      }
                    >
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
        <div style={{ margin: "50px auto" }} className={styles.title}>
          <h1>{t("title2")}</h1>
        </div>
        <div className={styles.list_product}>
          {dataProduct.length > 0 ? (
            <AllProducts
              filteredProducts={dataProduct.filter(
                (item: any, index: number) => index <= 7
              )}
            />
          ) : (
            <h1>Loading products...</h1>
          )}
        </div>
        <div style={{ width: "70%", margin: "auto" }}>
          <InfoHomePage />
        </div>
      </div>
    </>
  );
}
