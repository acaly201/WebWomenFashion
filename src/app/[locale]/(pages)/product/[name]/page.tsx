"use client";
import styles from "@/app/style/product.module.scss"
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Api } from "@/setting/api";
import InfoProduct from "@/app/component/products/infoProduct";
import ImgProduct from "../../../../component/products/imgProduct";
export default function Product() {
  const [data, setData] = useState<any>(null);
  const params = useParams();
  const { name } = params;
  const dispatch = useAppDispatch();
  useEffect(() => {
    const id = localStorage.getItem(`productId${name}`);
    fetch(Api.List_Product.getById + id)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  if (data) {
    return (
      <div className={styles.product}>
        <ImgProduct data={data} />
        <InfoProduct data={data} />
      </div>
    );
  } else return <div>Loading.........</div>;
}
