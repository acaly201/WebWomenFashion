"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import styles from "@/app/style/header.module.scss";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import TabSearch from "./tabSearch";
function Header() {
  const box1Ref = useRef<HTMLDivElement | null>(null);
  const box2Ref = useRef<HTMLDivElement | null>(null);
  const menu1Ref = useRef<HTMLLIElement | null>(null);
  const menu2Ref = useRef<HTMLLIElement | null>(null);
  const [hideTabSearch, setHideTabSearch] = useState<boolean>(false);
  const [hideMenu, setHideMenu] = useState<{ menu1: boolean; menu2: boolean }>({
    menu1: false,
    menu2: false,
  });
  const [quantityCart,setQuantityCart]= useState<number>(0)
  const t = useTranslations("header");
  const pathname = usePathname();
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      setTimeout(() => {
        if (
          menu1Ref.current &&
          menu1Ref.current.contains(event.target as Node)
        ) {
          return;
        }

        if (
          menu2Ref.current &&
          menu2Ref.current.contains(event.target as Node)
        ) {
          return;
        }

        if (
          hideMenu.menu1 &&
          box1Ref.current &&
          !box1Ref.current.contains(event.target as Node)
        ) {
          setHideMenu({ menu1: false, menu2: false });
        }

        if (
          hideMenu.menu2 &&
          box2Ref.current &&
          !box2Ref.current.contains(event.target as Node)
        ) {
          setHideMenu({ menu1: false, menu2: false });
        }
      }, 0);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hideMenu]);
  useEffect(()=>{
    const updateCartQuantity = () => {
      const dataLocal = JSON.parse(localStorage.getItem("cart") ?? "[]");
      setQuantityCart(dataLocal.reduce((total:number,item:any)=>{
        return total + item.quantity
      },0));
    };
  
    // Lắng nghe sự kiện thay đổi giỏ hàng
    window.addEventListener("cartUpdated", updateCartQuantity);
  
    // Gọi ngay để cập nhật ban đầu
    updateCartQuantity();
  
    return () => {
      window.removeEventListener("cartUpdated", updateCartQuantity);
    };
  },[])

  const handleClickHideMenu = (menu: "menu1" | "menu2") => {
    setHideMenu((prev) => ({
      menu1: menu === "menu1" ? !prev.menu1 : false,
      menu2: menu === "menu2" ? !prev.menu2 : false,
    }));
  };
  const handleClickTabSearch = () => {
    setHideTabSearch(!hideTabSearch);
    if (hideTabSearch) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
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
          <li
            style={
              !pathname.includes("catalog") &&
              !pathname.includes("product") &&
              !pathname.includes("search") &&
              !pathname.includes("cart")
                ? { borderBottom: "1px solid black" }
                : undefined
            }
          >
            <Link
              onClick={() => setHideMenu({ menu1: false, menu2: false })}
              href="/"
            >
              {t("home")}
            </Link>
          </li>
          <li
            style={
              pathname.includes("catalog")
                ? { borderBottom: "1px solid black" }
                : undefined
            }
          >
            <Link
              onClick={() => setHideMenu({ menu1: false, menu2: false })}
              href={{ pathname: "/catalog" as "/pathnames" }}
            >
              {t("catalog")}
            </Link>
          </li>
          <li
            ref={menu1Ref}
            onClick={() => handleClickHideMenu("menu1")}
            className={clsx(styles.link_demo)}
          >
            {t("demo")}

            {hideMenu.menu1 == true ? (
              <div ref={box1Ref} onClick={(e) => e.stopPropagation()}>
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
              </div>
            ) : (
              <SlArrowDown style={{ marginLeft: "10px" }} />
            )}
          </li>
          <li
            ref={menu2Ref}
            onClick={() => handleClickHideMenu("menu2")}
            className={clsx(styles.link_demo)}
          >
            {t("more")}

            {hideMenu.menu2 == true ? (
              <div onClick={(e) => e.stopPropagation()} ref={box2Ref}>
                <SlArrowUp style={{ marginLeft: "10px" }} />
                <ul className={styles.menu_link}>
                  <li> Product Filter & Search </li>
                  <li>Product Options</li>
                  <li>PreOrder & Back In Stock Alert</li>
                  <li>Form Builder</li>
                </ul>
              </div>
            ) : (
              <SlArrowDown style={{ marginLeft: "10px" }} />
            )}
          </li>
        </ul>
      </div>
      <div className={styles.supportWeb}>
        <ul>
          <li onClick={handleClickTabSearch}>
            <IoIosSearch className={styles.icon} />
          </li>
          <li>
            <CiUser className={styles.icon} />
          </li>
          <li className={styles.quantity_cart}>
            
            <Link href={{ pathname: "/cart" as "/pathnames" }}>
            <div><span>{quantityCart}</span></div>
              <IoBagHandleOutline className={styles.icon} />
            </Link>
          </li>
        </ul>
      </div>
      {hideTabSearch && (
        <TabSearch handleClickTabSearch={handleClickTabSearch} />
      )}
    </div>
  );
}
export default Header;
