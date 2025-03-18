"use client";
import styles from "@/app/style/byProduct.module.scss";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { useGoToInfoProduct } from "./goToInfoProduct";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { selectData ,selectDataFrequentlyBoughtTogether } from "@/redux/features/apiProduct/reduceProduct";
import { showImg2 } from "@/redux/features/apiProduct/reduceProduct";
import { GiMaterialsScience } from "react-icons/gi";
import { MdOutlineLocalShipping } from "react-icons/md";
import { PiRulerLight, PiShareDuotone } from "react-icons/pi";
import { IoMdHeartEmpty } from "react-icons/io";
export default function ByProduct(props: { data: any }) {
  const { data } = props;
  const goToInfoProduct = useGoToInfoProduct();
  const [quantityProduct, setQuantityProduct] = useState<number>(1);
  const dispatch = useAppDispatch();
  const dataApi = useAppSelector(selectData);
  const dataFrequentlyBoughtTogether = useAppSelector(selectDataFrequentlyBoughtTogether);
  const handleReduceQuantity = () => {
    if (quantityProduct <= 1) return;
    setQuantityProduct(quantityProduct - 1);
  };
  const handleIncreaseQuantity = () => {
    setQuantityProduct(quantityProduct + 1);
  };
  return (
    // Mua sản phẩm theo số lượng
    <div className={clsx(styles.box_by_product)}>
      <div className={clsx(styles.box_quantity)}>
        <span>Quantity</span>
        <div className={clsx(styles.box_quantity_number)}>
          <div onClick={handleReduceQuantity}>-</div>
          <span>{quantityProduct}</span>
          <div onClick={handleIncreaseQuantity}>+</div>
        </div>
      </div>
      <div className={clsx(styles.box_by)}>
        <button>Add to cart</button>
        <button style={{ backgroundColor: "black", color: "white" }}>
          Buy it now
        </button>
      </div>
      {/* // Mua sản phẩm theo combo */}
      <div className={clsx(styles.other_product_options)}>
        <h5>Frequently Bought Together</h5>
        <div className={clsx(styles.info_other_product_options)}>
          {dataApi
            .filter((value: any) => value.other_product == true)
            .map((item: any) => {
              return (
                <div
                  className={clsx(styles.box_info_other_product_options)}
                  key={item.id}
                >
                  <div onClick={()=>goToInfoProduct(item.handle,item.id)} className={clsx(styles.box_img_other_product)}>
                    <Image
                      className={styles.img_other_product}
                      src={dataFrequentlyBoughtTogether.filter((data: any) => data.id === item.id)[0].url}
                      width={500}
                      height={500}
                      alt="img"
                    />
                  </div>
                  <div className={clsx(styles.box_info_other_product)}>
                    <h5 onClick={()=>goToInfoProduct(item.handle,item.id)} >{item.title}</h5>
                    <span>
                      $
                      {String(item.price).slice(0, 2) +
                        "." +
                        String(item.price).slice(2)}
                    </span>
                    <select onChange={(e)=>dispatch(showImg2({color:e.target.value ,variants:item.variants}))} className={clsx(styles.select_color_other_product)}>
                      {item.variants.map((value: any) => {
                        return (
                          <option key={value.id} value={value.title}>
                            {value.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              );
            })}
          <div className={styles.icon_add1}>+</div>
          <div className={styles.icon_add2}>+</div>
        </div>
        {/* Thông tin sản phẩm */}
        <div className={clsx(styles.price_other_product_options)}>
          <span style={{ fontSize: "17px", fontWeight: "600" }}>Total</span>
          <span style={{ textDecoration: "line-through" }}>$100</span>
          <span style={{ fontWeight: "800" }}>$80</span>
        </div>
        <button className={clsx(styles.by_other_product_options)}>
          Add bundle to cart
        </button>
      </div>
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
