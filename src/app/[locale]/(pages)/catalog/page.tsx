import { useTranslations } from "next-intl";
import styles from "@/app/style/catalogPage.module.scss";
export default function Catalog(){
    const t = useTranslations("catalogPage");
    return(
        <div className={styles.page_catalog}>
            <div className={styles.title_page_catalog}><h1>{t("title")}</h1></div>
            <div className={styles.products_page_catalog}>
                <ul className={styles.filter_product_page_catalog}>
                    <li>{t("filter")}:</li>
                    <li>{t("availability")}</li>
                    <li>{t("price")}</li>
                </ul>
                <ul className={styles.sort_product_page_catalog}>
                    <li>{t("sort")}</li>
                    <li></li>
                    <li>{t("product")}</li>
                </ul>
            </div>
        </div>
    )
}