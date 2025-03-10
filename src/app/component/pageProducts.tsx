"use client";
import { useEffect } from "react";
import Image from "next/image";
import { apiProduct } from "@/redux/features/apiProduct/apiProduct";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectData, status } from "@/redux/features/apiProduct/apiProduct";
import styles from "@/app/style/catalogPage.module.scss";
export default function PageProduct() {
  const dispatch = useAppDispatch();
  const dataProduct = useAppSelector(selectData);
  const statusApi = useAppSelector(status);
  useEffect(() => {
    dispatch(apiProduct());
  }, []);
  if (statusApi == "loading") {
    return <div>Loading .....</div>;
  }
  if (statusApi == "failed") {
    return <div>Chưa có dữ liệu</div>;
  }
  if (statusApi == "idle") {
    return (
      <div>
        {dataProduct.length > 0 &&
          dataProduct.map((data: any, index: number) => {
            return (
              <div key={data.id}>
                <div>
                  <Image
                    style={{ width: "100%", height: "100%" }}
                    src={data.featured_image}
                    width={500}
                    height={500}
                    alt="img"
                  />
                </div>
                <div>
                  <h4>{data.title}</h4>
                  <span>{data.price}</span>
                </div>
                <div></div>
              </div>
            );
          })}
      </div>
    );
  }
}
