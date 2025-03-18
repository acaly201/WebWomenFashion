"use client"
import styles from "@/app/style/buyProduct.module.scss";
import clsx from "clsx";
import { useAppDispatch } from "@/redux/hooks";
import { showImg2 } from "@/redux/features/apiProduct/reduceProduct";
export default function BuyMore({data}:any){
    const dispatch = useAppDispatch()
    return  <div className={styles.box_buy_more}>
    <div>
      <div>
        <div>
          <div></div>
        </div>
        <div>
          <h5></h5>
          <span></span>
        </div>
        <h5></h5>
      </div>
      <span>Color</span>
      <div>
        <span></span>
        <select
          onChange={(e) =>
            dispatch(
              showImg2({
                color: e.target.value,
                variants: data.variants,
              })
            )
          }
          className={clsx(styles.select_color_other_product)}
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
    </div>
  </div>
}