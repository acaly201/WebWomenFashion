import Image from "next/image";
import { useTranslations } from "next-intl";
import styles from '@/app/style/home.module.scss'
export default function InfoHomePage() {
    const t = useTranslations("homePage");
  return (
    <div style={{width:'100%'}} className={styles.info_page}>
      <h1 style={{margin:'auto'}}>{t("title3")}</h1>
      <div className={styles.box_info_page}>
        <div className={styles.content_box_info_page}>
          <h2>{t("smart")}</h2>
          <p>{t("often")}</p>
          <h4>{t("help")}</h4>
          <p>{t("custom")}</p>
          <p>{t("dynamic")}</p>
          <p>{t("smartSearch")}</p>
          <button>{t("try")}</button>
        </div>
        <Image
          className={styles.img_box_info_page}
          alt="img"
          width={500}
          height={500}
          src={
            "https://nga-appstore.myshopify.com/cdn/shop/files/Smart_Product_Filter_750x.png"
          }
        />
      </div>
    </div>
  );
}
