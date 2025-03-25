"use client";
import styles from "@/app/style/product.module.scss";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Api } from "@/setting/api";
import { selectData } from "@/redux/features/apiProduct/reduceProduct";
import InfoProduct from "@/app/component/products/infoProduct";
import ImgProduct from "../../../../component/products/imgProduct";
import AllProducts from "@/app/component/products/pageAllProduct";
import InfoHomePage from "@/app/component/home/infoHomePage";
export default function Product() {
  const [data, setData] = useState<any>(null);
  const params = useParams();
  const { name } = params;
  const [status, setStatus] = useState<boolean>(false);
  const imageRefs = useRef<any>({});
  const dataProduct = useAppSelector(selectData);
  const handleClickImg = (id: number) => {
    setStatus(!status);
    setTimeout(() => {
      imageRefs.current[id]?.scrollIntoView({});
    });
  };
  useEffect(() => {
    const id = localStorage.getItem(`productId${name}`);
    fetch(Api.List_Product.getById + id)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  if (data) {
    return (
      <>
        <div className={styles.product}>
          <ImgProduct
            status={status}
            imageRefs={imageRefs}
            handleClickImg={handleClickImg}
            data={data}
          />
          {!status && (
            <>
              <InfoProduct data={data} />
              <div className={styles.info_home_page}>
                <InfoHomePage />
              </div>
              {dataProduct && dataProduct.length > 0 && (
                <AllProducts
                  filteredProducts={dataProduct.filter(
                    (item: any, index: number) => index <= 3
                  )}
                />
              )}
            </>
          )}
        </div>
      </>
    );
  } else return <div>Loading.........</div>;
}
