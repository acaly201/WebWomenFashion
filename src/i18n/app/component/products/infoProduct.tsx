import styles from "@/app/style/infoProduct.module.scss";
import SelectImg from "./selectImg";
import ByProduct from "./byProduct";
export default function InfoProduct(props: { data: any }) {
  const { data } = props;
  return (
    <div className={styles.info_product}>
      <h5 className={styles.title_info_product}>[Demo App] - Globo Color Swatch</h5>
      <h2 className={styles.name_product}>{data.title}</h2>
      <span className={styles.price_product} >
        ${String(data.price).slice(0, 2) + "." + String(data.price).slice(2)}
      </span>
      <SelectImg data={data} />
      <ByProduct data={data} />
    </div>
  );
}
