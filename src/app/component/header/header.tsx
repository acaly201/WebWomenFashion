"use client";
import Image from "next/image";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import styles from "@/app/style/header.module.scss";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import clsx from "clsx";
import { usePathname } from "next/navigation";
function Header() {
  const [hideMenu, setHideMenu] = useState<any>({ menu1: false, menu2: false });
  const t = useTranslations("header");
  const pathname = usePathname()
  const handleClickHideMenu = (value: any) => {
    if (value == "menu1") {
      setHideMenu({ menu1: !hideMenu[value], menu2: false });
    } else {
      setHideMenu({ menu1: false, menu2: !hideMenu[value] });
    }
    console.log(pathname)
  };
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
          <li style={!pathname.includes('catalog') && !pathname.includes('product') ? {borderBottom:'1px solid black'} : undefined}>
            <Link
              onClick={() => setHideMenu({ menu1: false, menu2: false })}
              href="/"
            >
              {t("home")}
            </Link>
          </li>
          <li style={pathname.includes('catalog')  ? {borderBottom:'1px solid black'} : undefined}>
            <Link
              onClick={() => setHideMenu({ menu1: false, menu2: false })}
              href={{ pathname: "/catalog" as "/pathnames" }}
            >
              {t("catalog")}
            </Link>
          </li>
          <li
            onClick={() => handleClickHideMenu("menu1")}
            className={clsx(styles.link_demo)}
          >
            {t("demo")}

            {hideMenu.menu1 == true ? (
              <>
                <SlArrowUp style={{ marginLeft: "10px" }} />
                <ul className={styles.menu_link}>
                  <li
                    style={{ color: "black", fontWeight: 600, cursor: "auto" }}
                  >
                    Color/Image type
                  </li>
                  <li> Color or custom image swatch</li>
                  <li> Automated variant image swatch</li>
                  <li>Pill swatch</li>
                  <li
                    style={{ color: "black", fontWeight: 600, cursor: "auto" }}
                  >
                    Button type
                  </li>
                  <li>Button</li>
                  <li>Button without border</li>
                  <li>Pill button</li>
                </ul>
              </>
            ) : (
              <SlArrowDown style={{ marginLeft: "10px" }} />
            )}
          </li>
          <li
            onClick={() => handleClickHideMenu("menu2")}
            className={clsx(styles.link_demo)}
          >
            {t("more")}
           
            {hideMenu.menu2 == true ? (
              <> <SlArrowUp style={{ marginLeft: "10px" }} />
                <ul className={styles.menu_link}>
                  <li> Product Filter & Search </li>
                  <li>Product Options</li>
                  <li>PreOrder & Back In Stock Alert</li>
                  <li>Form Builder</li>
                </ul>
              </>
            ): <SlArrowDown style={{ marginLeft: "10px" }} />}
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
