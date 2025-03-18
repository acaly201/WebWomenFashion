"use client"
import { formatCurrency } from "@/setting/formatNumber";
import styles from "@/app/style/buyProduct.module.scss";
import clsx from "clsx";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import { showImg2 } from "@/redux/features/apiProduct/reduceProduct";
export default function OtherProductOptions({dataApi,dataFrequentlyBoughtTogether,goToInfoProduct}:any) {
    const dispatch = useAppDispatch()
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
        <span style={{ textDecoration: "line-through" }}>$100</span>
        <span style={{ fontWeight: "800" }}>$80</span>
      </div>
      <button className={clsx(styles.by_other_product_options)}>
        Add bundle to cart
      </button>
    </div>
  );
}
