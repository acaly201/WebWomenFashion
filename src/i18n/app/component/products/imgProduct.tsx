"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import { FaSearchPlus } from "react-icons/fa";
import styles from "@/app/style/imgProduct.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectData,
  selectDataImg,
  status,
} from "@/redux/features/apiProduct/reduceProduct";
export default function ImgProduct(props: { data: any }) {
  const { data } = props;
  const [status, setStatus] = useState<boolean>(false);
  const imageRefs = useRef<any>({});
  const dataImgs = useAppSelector(selectDataImg);
  const handleClickImg = (id: number) => {
    setStatus(!status);
    setTimeout(() => {
      imageRefs.current[id]?.scrollIntoView({});
    });
  };
  return (
    <div
      className={styles.box_right_product}
      style={
        status
          ? { width: "100%", height: "100%", cursor: "zoom-in" }
          : undefined
      }
    >
      {dataImgs.length > 0 && (
        <div
          ref={(el: any) => (imageRefs.current[0] = el)}
          style={status ? { cursor: "zoom-in" } : undefined}
          onClick={() => handleClickImg(0)}
          className={styles.box_img_product1}
        >
          <Image
            className={styles.img_product1}
            src={dataImgs.filter((item: any) => item.id === data.id)[0].url}
            width={500}
            height={500}
            alt="img"
          />
          <div className={styles.icon}>
            <FaSearchPlus />
          </div>
        </div>
      )}
      {data &&
        data.media &&
        data.media
          .filter((item: any) => {
            return item.position <= data.media.length / 2;
          })
          .map((item1: any, index: number) => {
            return (
              <div
                ref={(el: any) => (imageRefs.current[index + 1] = el)}
                key={item1.id}
                style={
                  status ||
                  (index + 1 ==
                    data.media.filter((item: any) => {
                      return item.position <= data.media.length / 2;
                    }).length &&
                    index % 2 == 0)
                    ? { width: "100%", height: "100%", cursor: "zoom-in" }
                    : undefined
                }
                onClick={() => handleClickImg(index + 1)}
                className={styles.box_img_product2}
              >
                <Image
                  className={styles.img_product2}
                  src={item1.preview_image.src}
                  width={500}
                  height={500}
                  alt="img"
                />
                <div className={styles.icon}>
                  <FaSearchPlus />
                </div>
              </div>
            );
          })}
    </div>
  );
}
