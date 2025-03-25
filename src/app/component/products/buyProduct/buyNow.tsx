"use client";
import { formatCurrency } from "@/setting/formatNumber";
import styles from "@/app/style/buyProduct.module.scss";
import clsx from "clsx";
export default function BuyNow({
  handleClickSelect,
  selectBuyNow,
  data,
}: {
  handleClickSelect:(e:number)=>void;
  selectBuyNow:number;
  data:any;
}) {
  return (
    <div className={clsx(styles.box_buy_now)}>
      <p style={{ width: "100%", fontWeight: 700 }}>Buy now</p>
      <div
        onClick={() => handleClickSelect(1)}
        className={styles.select_box_buy_now}
        style={selectBuyNow == 1 ? { border: "2px solid black" } : undefined}
      >
        {selectBuyNow == 1 ? (
          <div
            className={styles.status_select_box_buy_now}
            style={{ border: "2px solid black" }}
          >
            <div className={styles.active_select_box_buy_now}></div>
          </div>
        ) : (
          <div className={styles.status_select_box_buy_now}></div>
        )}
        <h5>Single</h5>
        <span>Standard price</span>
        <div className={styles.price_box_buy_now}>
          <h5>${formatCurrency(data.price)}</h5>
        </div>
      </div>
      <div
        onClick={() => handleClickSelect(2)}
        className={styles.select_box_buy_now}
        style={selectBuyNow == 2 ? { border: "2px solid black" } : undefined}
      >
        {selectBuyNow == 2 ? (
          <div
            className={styles.status_select_box_buy_now}
            style={{ border: "2px solid black" }}
          >
            <div className={styles.active_select_box_buy_now}></div>
          </div>
        ) : (
          <div className={styles.status_select_box_buy_now}></div>
        )}

        <h5>Duo</h5>
        <span>You save 10%</span>
        <div className={styles.price_box_buy_now}>
          <h5>
            ${formatCurrency(data.price * 2 - ((data.price * 2) / 100) * 10)}
          </h5>
          <span style={{ textDecoration: "line-through" }}>
            ${formatCurrency(data.price * 2)}
          </span>
        </div>
      </div>
      <div
        onClick={() => handleClickSelect(3)}
        className={styles.select_box_buy_now}
        style={selectBuyNow == 3 ? { border: "2px solid black" } : undefined}
      >
        {selectBuyNow == 3 ? (
          <div
            className={styles.status_select_box_buy_now}
            style={{ border: "2px solid black" }}
          >
            <div className={styles.active_select_box_buy_now}></div>
          </div>
        ) : (
          <div className={styles.status_select_box_buy_now}></div>
        )}
        <h5>Single</h5>
        <span>You save 20%</span>
        <div className={styles.price_box_buy_now}>
          <h5>
            ${formatCurrency(data.price * 3 - ((data.price * 3) / 100) * 20)}
          </h5>
          <span style={{ textDecoration: "line-through" }}>
            ${formatCurrency(data.price * 3)}
          </span>
        </div>
      </div>
    </div>
  );
}
