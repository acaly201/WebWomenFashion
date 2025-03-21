import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";
import { SlArrowDown } from "react-icons/sl";
import styles from "@/app/style/header.module.scss";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
function Header() {
  const t = useTranslations("header");
  return (
    <div className={styles.boxHeader}>
      <div className={styles.menuHeader}>
        <ul>
          <li>
            <Image
              src="https://nga-appstore.myshopify.com/cdn/shop/files/Logo_7b1833b8-7c00-47cf-97f5-163dcb9c83d2_50x.png"
              alt="logo header"
              width={50}
              height={50}
              style={{ borderRadius: "10px" }}
            />
          </li>
          <li>
            <Link href="/">{t("home")}</Link>
          </li>
          <li>
            <Link href={{ pathname: "/catalog" as "/pathnames" }}>{t("catalog")}</Link>
          </li>
          <li>
            {t("demo")}
            <SlArrowDown style={{ marginLeft: "10px" }} />
          </li>
          <li>
            {t("more")}
            <SlArrowDown style={{ marginLeft: "10px" }} />
          </li>
        </ul>
      </div>
      <div className={styles.supportWeb}>
        <ul>
          <li>
            <IoIosSearch className={styles.icon} />
          </li>
          <li>
            <CiUser className={styles.icon} />
          </li>
          <li>
            <IoBagHandleOutline className={styles.icon} />
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Header;
