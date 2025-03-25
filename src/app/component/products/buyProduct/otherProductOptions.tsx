"use client";
import { formatCurrency } from "@/setting/formatNumber";
import styles from "@/app/style/buyProduct.module.scss";
import clsx from "clsx";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import { showImg2 } from "@/redux/features/apiProduct/reduceProduct";
import { useCallback } from "react";
import { Link } from "@/i18n/navigation";
export default function OtherProductOptions({
  dataApi,
  dataFrequentlyBoughtTogether,
  goToInfoProduct,
}: any) {
  const dispatch = useAppDispatch();
  const handleAddToCart = useCallback(() => {
    const storedData = JSON.parse(localStorage.getItem("cart") ?? "[]");
    const products = dataApi
      .filter((value: any) => value.other_product == true)
      .map((item: any) => ({
        id: item.id,
        name: item.title,
        handle: item.handle,
        price: item.price,
        totalPrice: item.price,
        quantity: 1,
        color: dataFrequentlyBoughtTogether.filter(
          (data: any) => data.id === item.id
        )[0].color,
        img: dataFrequentlyBoughtTogether.filter(
          (data: any) => data.id === item.id
        )[0].url,
        size: null,
        combo: null,
      }));
    const updatedCart = [...products, ...storedData].reduce(
      (acc: any, item: any) => {
        const existingItem = acc.find(
          (el: any) =>
            el.id === item.id &&
            el.name === item.name &&
            el.color === item.color &&
            el.img === item.img &&
            el.size === item.size &&
            el.combo === item.combo
        );
        if (existingItem) {
          existingItem.totalPrice += item.totalPrice;
          existingItem.quantity += item.quantity;
        } else {
          acc.push({ ...item });
        }
        return acc;
      },
      []
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  }, [dataFrequentlyBoughtTogether]);
  return (
    <div className={clsx(styles.other_product_options)}>
      <h5>Frequently Bought Together</h5>
      <div className={clsx(styles.info_other_product_options)}>
        {dataApi.length > 0 &&
          dataApi
            .filter((value: any) => value.other_product == true)
            .map((item: any) => {
              return (
                <div
                  className={clsx(styles.box_info_other_product_options)}
                  key={item.id}
                >
                  <div
                    onClick={() => goToInfoProduct(item.handle, item.id)}
                    className={clsx(styles.box_img_other_product)}
                  >
                    <Image
                      className={styles.img_other_product}
                      src={
                        dataFrequentlyBoughtTogether.filter(
                          (data: any) => data.id === item.id
                        )[0].url
                      }
                      width={500}
                      height={500}
                      alt="img"
                    />
                  </div>
                  <div className={clsx(styles.box_info_other_product)}>
                    <h5 onClick={() => goToInfoProduct(item.handle, item.id)}>
                      {item.title}
                    </h5>
                    <span>${formatCurrency(item.price)}</span>
                    <select
                      onChange={(e) =>
                        dispatch(
                          showImg2({
                            color: e.target.value,
                            variants: item.variants,
                          })
                        )
                      }
                      className={clsx(styles.select_color_other_product)}
                    >
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

      <div className={clsx(styles.price_other_product_options)}>
        <span style={{ fontSize: "17px", fontWeight: "600" }}>Total</span>

        <span style={{ fontWeight: "800" }}>$99.00</span>
      </div>
      <button
        onClick={handleAddToCart}
        className={clsx(styles.by_other_product_options)}
      >
        <Link href={{ pathname: "/cart" as "/pathnames" }}>
          Add bundle to cart
        </Link>
      </button>
    </div>
  );
}
