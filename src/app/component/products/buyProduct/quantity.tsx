"use client";
import styles from "@/app/style/buyProduct.module.scss";
import clsx from "clsx";
export default function Quantity({
  handleReduceQuantity,
  handleIncreaseQuantity,
  quantityProduct,
}: {
  handleReduceQuantity:()=>void,
  handleIncreaseQuantity:()=>void,
  quantityProduct:number,
}) {
  return (
    <div className={clsx(styles.box_quantity)}>
      <span>Quantity</span>
      <div className={clsx(styles.box_quantity_number)}>
        <div onClick={handleReduceQuantity}>-</div>
        <span>{quantityProduct}</span>
        <div onClick={handleIncreaseQuantity}>+</div>
      </div>
    </div>
  );
}
