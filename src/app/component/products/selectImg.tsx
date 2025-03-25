"use client";
import styles from "@/app/style/selectImg.module.scss";
import clsx from "clsx";
import { showImg } from "@/redux/features/apiProduct/reduceProduct";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectDataImg } from "@/redux/features/apiProduct/reduceProduct";
import Image from "next/image";
import { group } from "console";

export default function SelectImg(props: { data: any }) {
  const { data } = props;
  const dispatch = useAppDispatch();
  const dataImgs = useAppSelector(selectDataImg);
  return (
    <div className={styles.box_select_img}>
      {data.type == "shoe" && (
        <div className={styles.size_product}>
          <span className={styles.title_color}>
            Size: {dataImgs.find((value) => value.id == data.id)?.size}
          </span>
          <div className={styles.box_all_size}>
            {data.variants &&
              [
                ...new Map(
                  data.variants.map((item: any) => [item.option1, item])
                ).values(),
              ].map((value: any) => {
                return (
                  <div
                    onClick={() => {
                      dispatch(showImg([value, "size"]));
                    }}
                    style={
                      value.option1 ==
                      dataImgs.filter(
                        (value1) => value1.id == value.featured_image.product_id
                      )[0]?.size
                        ? { backgroundColor:'black',color:'white' }
                        : undefined
                    }
                    key={value.id}
                    className={clsx(styles.box_select_size, " relative group")}
                  >
                    <span className="absolute top-[-30px] left-1/2 -translate-x-1/2 bg-black text-white text-xs px-5 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap w-max ">
                      {value.option1}
                    </span>
                    <span>{value.option1}</span>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {data && data.variants[0].title !== "Default Title" && (
        <span className={styles.title_color}>
          Color: {dataImgs.find((value) => value.id == data.id)?.color}
        </span>
      )}
      <div className={styles.box_all_img}>
        {data.variants &&
          [
            ...new Map(
              data.variants.map((item: any) => [item.featured_image?.src, item])
            ).values(),
          ].map((data1: any) => {
            return (
              data1.featured_image && (
                <div
                  onClick={() => {
                    dispatch(showImg([data1, "img"]));
                  }}
                  style={
                    (data.type == "clothes" ? data1.title : data1.option2) ==
                    dataImgs.filter(
                      (value) => value.id == data1.featured_image.product_id
                    )[0]?.color
                      ? { border: "2px solid black" }
                      : undefined
                  }
                  className={clsx(styles.box_img, " relative group")}
                  key={data1.id}
                >
                  <span className="absolute top-[-30px] left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap w-max ">
                    {data.type == "clothes" ? data1.title : data1.option2}
                  </span>
                  <Image
                    style={
                      data1.featured_image.stock == 0
                        ? { opacity: "0.3" }
                        : undefined
                    }
                    className={styles.img}
                    src={data1.featured_image.src}
                    width={200}
                    height={200}
                    alt="img"
                  />
                </div>
              )
            );
          })}
      </div>
      {data && data.variants && data.variants[0].featured_image && (
        <span style={{ margin: "10px 0", display: "block", color: "#868080" }}>
          🔥 Stock: only {dataImgs.find((value) => value.id == data.id)?.stock}{" "}
          left in stock
        </span>
      )}
    </div>
  );
}
