"use client";
import styles from "@/app/style/buyProduct.module.scss";
import clsx from "clsx";
import { useState } from "react";
import { formatCurrency } from "@/setting/formatNumber";
import { useAppDispatch } from "@/redux/hooks";
import { showImg2 } from "@/redux/features/apiProduct/reduceProduct";
export default function BuyMore({
  data,
  handleClickSelect,
  handleChange,
  selectBuyNow,
  dataColorProduct,
}: {
  data: any;
  dataColorProduct: string[];
  handleClickSelect: (e: number) => void;
  selectBuyNow: number;
  handleChange: (index: number, e: any) => void;
}) {
  const dataBuyMore = [
    {
      title: "Single",
      title_price: "Standard price",
      price: formatCurrency(data.price),
      price1: formatCurrency(data.price),
    },
    {
      title: "Duo",
      title_price: "You save 10%",
      price: formatCurrency(data.price * 2 - ((data.price * 2) / 100) * 10),
      price1: formatCurrency(data.price * 2),
    },
    {
      title: "Trio",
      title_price: "You save 20%",
      price: formatCurrency(data.price * 3 - ((data.price * 3) / 100) * 20),
      price1: formatCurrency(data.price * 3),
    },
  ];

  const dispatch = useAppDispatch();

  return (
    <div className={styles.box_buy_more}>
      {dataBuyMore.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => handleClickSelect(index + 1)}
            className={styles.select_box_buy_more}
            style={
              selectBuyNow == index + 1
                ? { border: "3px solid black" }
                : undefined
            }
          >
            <div className={styles.info_select_box_buy_more}>
              <div className={styles.status_select_box_buy_more}>
                {selectBuyNow == index + 1 ? (
                  <div className={styles.active_select_box_buy_more}></div>
                ) : (
                  <></>
                )}
              </div>
              <div className={styles.title_select_box_buy_more}>
                <h5>{item.title}</h5>
                <span>{item.title_price}</span>
              </div>
              <div>
                <h5>${item.price}</h5>
                {index == 1 || index == 2 ? (
                  <span style={{ textDecoration: "line-through" }}>
                    ${item.price1}
                  </span>
                ) : (
                  <></>
                )}
              </div>
            </div>
            {selectBuyNow == index + 1 ? (
              <>
                <span>Color</span>
                <div className={styles.color_select_box_buy_more}>
                  <span>#1</span>
                  <select
                    onChange={(e: any) => {
                      handleChange(0, e);
                    }}
                    value={dataColorProduct[0]}
                    className={clsx(styles.select_color_product)}
                  >
                    {data.variants.map((value: any) => {
                      return (
                        <option key={value.id} value={value.title}>
                          {value.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {selectBuyNow >= 2 && (
                  <div className={styles.color_select_box_buy_more}>
                    <span>#2</span>
                    <select
                      value={dataColorProduct[1]}
                      onChange={(e: any) => {
                        handleChange(1, e);
                      }}
                      className={clsx(styles.select_color_product)}
                    >
                      {data.variants.map((value: any) => {
                        return (
                          <option key={value.id} value={value.title}>
                            {value.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}
                {selectBuyNow >= 3 && (
                  <div className={styles.color_select_box_buy_more}>
                    <span>#3</span>
                    <select
                      value={dataColorProduct[2]}
                      onChange={(e: any) => {
                        handleChange(2, e);
                      }}
                      className={clsx(styles.select_color_product)}
                    >
                      {data.variants.map((value: any) => {
                        return (
                          <option key={value.id} value={value.title}>
                            {value.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
        );
      })}
    </div>
  );
}
