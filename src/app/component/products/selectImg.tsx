"use client"
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
      {data && data.variants[0].title !== "Default Title" && (
        <span className={styles.title_color}>
          Color: {dataImgs.find((value) => value.id == data.id)?.color}
        </span>
      )}
      <div className={styles.box_all_img}>
        {data.variants &&
          data.variants.map((data: any) => {
            return (
              data.featured_image && (
                <div
                  onClick={(e: any) => {
                    dispatch(showImg(data));
                  }}
                  style={
                    data.title ==
                    dataImgs.filter(
                      (value) => value.id == data.featured_image.product_id
                    )[0]?.color
                      ? { border: "1px solid black" }
                      : undefined
                  }
                  className={clsx(
                    styles.box_img,
                    " relative group"
                  )}
                  key={data.id}
                >
                  <span className="absolute top-[-30px] left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap w-max ">
                    {data.title}
                  </span>
                  <Image
                    className={styles.img}
                    src={data.featured_image.src}
                    width={200}
                    height={200}
                    alt="img"
                  />
                </div>
              )
            );
          })}
      </div>
      {data && data.variants && data.variants[0].featured_image && <span style={{margin:'10px 0',display:'block',color:'#868080'}}>🔥 Stock: only {dataImgs.find((value) => value.id == data.id)?.stock} left in stock</span>}
      
    </div>
  );
}
