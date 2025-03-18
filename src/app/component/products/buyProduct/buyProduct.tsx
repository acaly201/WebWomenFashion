"use client";
import styles from "@/app/style/buyProduct.module.scss";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { useGoToInfoProduct } from "../goToInfoProduct";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  selectData,
  selectDataFrequentlyBoughtTogether,
} from "@/redux/features/apiProduct/reduceProduct";
import { showImg2 } from "@/redux/features/apiProduct/reduceProduct";
import { GiMaterialsScience } from "react-icons/gi";
import { MdOutlineLocalShipping } from "react-icons/md";
import { PiRulerLight, PiShareDuotone } from "react-icons/pi";
import { IoMdHeartEmpty } from "react-icons/io";
import { formatCurrency } from "@/setting/formatNumber";
import BuyNow from "./buyNow";
import BuyMore from "./buyMore";
import Quantity from "./quantity";
import OtherProductOptions from "./otherProductOptions";
export default function ByProduct(props: { data: any }) {
  const { data } = props;
  const goToInfoProduct = useGoToInfoProduct();
  const [quantityProduct, setQuantityProduct] = useState<number>(1);
  const [selectBuyNow, setSelectBuyNow] = useState(1);
  const dispatch = useAppDispatch();
  const dataApi = useAppSelector(selectData);
  const dataFrequentlyBoughtTogether = useAppSelector(
    selectDataFrequentlyBoughtTogether
  );
  const handleReduceQuantity = () => {
    if (quantityProduct <= 1) return;
    setQuantityProduct(quantityProduct - 1);
  };
  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Increases the quantity of the product by 1.
   * Updates the state to reflect the new quantity.
   */

  /******  c9a9ca41-22ca-4b40-b488-bfb7e8af3cc3  *******/
  const handleIncreaseQuantity = () => {
    setQuantityProduct(quantityProduct + 1);
  };
  const handleClickSelect = (value: number) => {
    setSelectBuyNow(value);
  };
  return (
    // Mua sản phẩm
    <div className={clsx(styles.box_buy_product)}>
      {data.other_product == true && (
        <Quantity
          handleReduceQuantity={handleReduceQuantity}
          quantityProduct={quantityProduct}
          handleIncreaseQuantity={handleIncreaseQuantity}
        />
      )}
      {data.other_product == false ? (
        data.variants[0].featured_image == null ? (
          <BuyNow
            handleClickSelect={handleClickSelect}
            selectBuyNow={selectBuyNow}
            data={data}
          />
        ) : (
          <BuyMore data={data} />
        )
      ) : (
        <></>
      )}

      <div className={clsx(styles.box_buy)}>
        <button>Add to cart</button>
        <button style={{ backgroundColor: "black", color: "white" }}>
          Buy it now
        </button>
      </div>
      {/* // Mua sản phẩm theo combo */}
      {data.other_product == true && (
       <OtherProductOptions dataApi={dataApi} dataFrequentlyBoughtTogether={dataFrequentlyBoughtTogether} goToInfoProduct={goToInfoProduct} />
      )}

      {/* Thông tin sản phẩm */}
      <div className={clsx(styles.product_introduction)}>
        <div
          className={clsx(styles.info_product_introduction)}
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>
        <div className={clsx(styles.footer_product_introduction)}>
          <div className={clsx(styles.box_footer_product_introduction)}>
            <GiMaterialsScience />
            <span>Materials</span>
          </div>
          <div className={clsx(styles.box_footer_product_introduction)}>
            <MdOutlineLocalShipping />
            <span>Shipping & Returns</span>
          </div>
          <div className={clsx(styles.box_footer_product_introduction)}>
            <PiRulerLight />
            <span>Dimensions</span>
          </div>
          <div className={clsx(styles.box_footer_product_introduction)}>
            <IoMdHeartEmpty />
            <span>Care Instructions</span>
          </div>
          <div className={clsx(styles.box_footer_product_introduction)}>
            <PiShareDuotone />
            <span>Share</span>
          </div>
        </div>
      </div>
    </div>
  );
}
