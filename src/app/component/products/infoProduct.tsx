import styles from "@/app/style/infoProduct.module.scss";
import SelectImg from "./selectImg";
import ByProduct from "./buyProduct/buyProduct";
import { formatCurrency } from "@/setting/formatNumber";
export default function InfoProduct(props:any) {
  const { data } = props;
  return ( 
    <div className={styles.info_product}>
      <h5 className={styles.title_info_product}>
        [Demo App] - Globo Color Swatch
      </h5>
      <h2 className={styles.name_product}>{data.title}</h2>
      <span className={styles.price_product}>
        ${formatCurrency(data.price)}
      </span>
      <SelectImg data={data} />
      <ByProduct data={data} />
    </div>
  );
}
