"use client";
import { useTranslations } from "next-intl";
import { useState, useRef, useEffect} from "react";
import { SlArrowDown } from "react-icons/sl";
import { useAppSelector } from "@/redux/hooks";
import { selectData } from "@/redux/features/apiProduct/reduceProduct";
import styles from "@/app/style/catalogPage.module.scss";
import { formatCurrency } from "@/setting/formatNumber";
export default function FillterProducts({
  quantityOnchange,
  handleCheckBox,
  statusOnchange,
  handleClickReset,
  textInput,
  handleChangeNumber,
  handleClickReset1,
  filteredProducts,
  handleChangeSortBy,
}: {
  quantityOnchange: number;
  handleCheckBox: (e: React.ChangeEvent<HTMLInputElement>) => void;
  statusOnchange: { inStock: boolean; outStock: boolean };
  handleClickReset: () => void;
  textInput: { numberForm: any; numberTo: any };
  handleChangeNumber: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickReset1: () => void;
  filteredProducts:any;
  handleChangeSortBy: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  const t = useTranslations("catalogPage");
  const box1Ref = useRef<HTMLDivElement | null>(null);
  const box2Ref = useRef<HTMLDivElement | null>(null);
  const menu1Ref = useRef<HTMLLIElement | null>(null);
  const menu2Ref = useRef<HTMLLIElement | null>(null);
  const [hideMenu, setHideMenu] = useState<{ menu1: boolean; menu2: boolean }>({
    menu1: false,
    menu2: false,
  });

  const dataProduct = useAppSelector(selectData);
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

  const handleClickHideMenu = (menu: "menu1" | "menu2") => {
    setHideMenu((prev) => ({
      menu1: menu === "menu1" ? !prev.menu1 : false,
      menu2: menu === "menu2" ? !prev.menu2 : false,
    }));
  };

  return (
    <div className={styles.products_page_catalog}>
      <ul className={styles.filter_product_page_catalog}>
        <li>{t("filter")}:</li>
        <li
          ref={menu1Ref}
          onClick={() => handleClickHideMenu("menu1")}
          className={styles.filter_by_availability}
        >
          {t("availability")}
          <SlArrowDown style={{ marginLeft: "10px" }} />
          {hideMenu.menu1 == true ? (
            <div
              onClick={(e) => e.stopPropagation()}
              ref={box1Ref}
              className={styles.box_filter}
            >
              <div className={styles.header_box_filter_by_availability}>
                <span>{quantityOnchange} selected</span>
                <button
                  onClick={handleClickReset}
                  style={{ borderBottom: "1px solid black" }}
                >
                  Reset
                </button>
              </div>
              <div className={styles.footer_box_filter_by_availability}>
                <label>
                  <input
                    checked={statusOnchange.inStock ?? false}
                    onChange={handleCheckBox}
                    name="inStock"
                    type="checkbox"
                  />
                  <span>
                    In stock (
                    {dataProduct.length > 1 &&
                      filteredProducts[0].filter((item: any) => {
                        return (
                          item.variants.every(
                            (item1: any) => item1.featured_image?.stock > 0
                          ) == true
                        );
                      }).length}
                    )
                  </span>
                </label>
                <label>
                  <input
                    checked={statusOnchange.outStock ?? false}
                    onChange={handleCheckBox}
                    name="outStock"
                    type="checkbox"
                  />
                  <span>
                    Out of stock (
                    {dataProduct.length > 1 &&
                      filteredProducts[0].filter((item: any) => {
                        return (
                          item.variants.every(
                            (item1: any) => item1.featured_image?.stock > 0
                          ) == false
                        );
                      }).length}
                    )
                  </span>
                </label>
              </div>
            </div>
          ) : (
            <></>
          )}
        </li>
        <li
          ref={menu2Ref}
          onClick={() => handleClickHideMenu("menu2")}
          className={styles.filter_by_price}
        >
          {t("price")} <SlArrowDown style={{ marginLeft: "10px" }} />
          {hideMenu.menu2 == true ? (
            <div
              onClick={(e) => e.stopPropagation()}
              ref={box2Ref}
              className={styles.box_filter}
            >
              <div className={styles.header_box_filter_by_price}>
                <span>
                  The highest price is $
                  {dataProduct.length > 0 &&
                    formatCurrency(
                      dataProduct.reduce(
                        (max: any, value: any) =>
                          value.price > max.price ? value : max,
                        dataProduct[0]
                      ).price
                    )}
                </span>
                <button
                  onClick={handleClickReset1}
                  style={{ borderBottom: "1px solid black" }}
                >
                  Reset
                </button>
              </div>
              <div className={styles.footer_box_filter_by_price}>
                <label>
                  <span>$</span>
                  <input
                    placeholder="From"
                    value={textInput.numberForm ?? ""}
                    onChange={handleChangeNumber}
                    name="numberForm"
                    type="number"
                  />
                </label>
                <label>
                  <span>$</span>
                  <input
                    placeholder="To"
                    value={textInput.numberTo ?? ""}
                    onChange={handleChangeNumber}
                    name="numberTo"
                    type="number"
                  />
                </label>
              </div>
            </div>
          ) : (
            <></>
          )}
        </li>
      </ul>
      <ul className={styles.sort_product_page_catalog}>
        <li>{t("sort")}:</li>
        <li>
          <select defaultValue={"featured"} onChange={handleChangeSortBy}>
            <option value="featured">Featured</option>
            <option value="nameAtoZ">Alphabetically, A-Z</option>
            <option value="nameZtoA">Alphabetically, Z-A</option>
            <option value="priceLowHigh">Price, low to high</option>
            <option value="priceHighLow">Price, high to low</option>
          </select>
        </li>
        <li>
          {filteredProducts[1].length} of {dataProduct.length - 1}{" "}
          {t("product")}:
        </li>
      </ul>
    </div>
  );
}
