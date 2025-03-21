"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { showImg} from "@/redux/features/apiProduct/reduceProduct";
import {
  selectData,
  selectDataImg,
  status,
} from "@/redux/features/apiProduct/reduceProduct";
import { useGoToInfoProduct } from "./goToInfoProduct";
import styles from "@/app/style/catalogPage.module.scss";
import { formatCurrency } from "@/setting/formatNumber";
export default function AllProducts() {
  const containerRefs = useRef<any>({});
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const dispatch = useAppDispatch();
  const dataProduct = useAppSelector(selectData);
  const dataImgs = useAppSelector(selectDataImg);
  const statusApi = useAppSelector(status);
  const goToInfoProduct = useGoToInfoProduct()
  const handleMouseDown = (index: number, e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setStartX(e.pageX - containerRefs.current[index].offsetLeft);
    setScrollLeft(containerRefs.current[index].scrollLeft);
  };

  const handleMouseMove = (index: number, e: any) => {
    if (!isDragging) return;
    e.stopPropagation();
    e.preventDefault();
    const x = e.pageX - containerRefs.current[index].offsetLeft;
    const walk = (x - startX) * 2;
    containerRefs.current[index].scrollLeft = scrollLeft - walk;
  };

  if (statusApi == "loading") {
    return <div>Loading .....</div>;
  }
  if (statusApi == "failed") {
    return <div>Chưa có dữ liệu</div>;
  }
  if (statusApi == "idle") {
    return (
      <div className={styles.box_list_products}>
        {dataProduct.length > 0 &&
          dataImgs.length > 0 &&
          dataProduct.map((data: any, index: number) => {
            return (
              <div
                onClick={() => {
                  goToInfoProduct(data.handle, data.id);
              
                }}
                className={styles.box_product}
                key={data.id}
              >
                <div className={styles.img_box_product}>
                  <Image
                    className={styles.img_product1}
                    style={{ width: "100%", height: "100%" }}
                    src={dataImgs.find((value) => value.id == data.id)?.url || ""}
                    width={500}
                    height={500}
                    alt="img"
                  />
                </div>
                <div className={styles.info_product}>
                  <h4>{data.title}</h4>
                  <span>
                    $
                    {formatCurrency(data.price)}
                  </span>
                </div>
                <div
                  onClick={(e: any) => e.stopPropagation()}
                  ref={(el: any) => (containerRefs.current[index] = el)}
                  onMouseDown={(e) => handleMouseDown(index, e)}
                  onMouseMove={(e) => handleMouseMove(index, e)}
                  onMouseUp={() => setIsDragging(false)}
                  onMouseLeave={() => setIsDragging(false)}
                  className={styles.list_img_box_product}
                >
                  {data.variants.map((data: any) => {
                    return (
                      data.featured_image && (
                        <div
                          onClick={(e: any) => {
                            e.stopPropagation();
                            dispatch(showImg(data));
                          }}
                          style={
                            data.featured_image.src ==
                            dataImgs.filter(
                              (value) =>
                                value.id == data.featured_image.product_id
                            )[0].url
                              ? { border: "1px solid black" }
                              : undefined
                          }
                          className={styles.box_img}
                          key={data.id}
                        >
                          <Image
                            className={styles.img_product}
                            style={{ width: "100%", height: "100%" }}
                            src={data.featured_image.src}
                            width={500}
                            height={500}
                            alt="img"
                          />
                        </div>
                      )
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}
