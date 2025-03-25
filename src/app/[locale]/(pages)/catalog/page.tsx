"use client";
import { useTranslations } from "next-intl";
import { useState, useMemo } from "react";
import { SlArrowDown } from "react-icons/sl";
import { formatCurrency } from "@/setting/formatNumber";
import styles from "@/app/style/catalogPage.module.scss";
import AllProducts from "@/app/component/products/pageAllProduct";
import FillterProducts from "@/app/component/products/filterProducts/filterProduct";
import { selectData ,selectData1} from "@/redux/features/apiProduct/reduceProduct";
import { useAppSelector } from "@/redux/hooks";
export default function Catalog({dataProduct1}:any) {
  const [currentPage, setCurrentPage] = useState(0);
  const [quantityOnchange, setQuantityOnchange] = useState<number>(0);
  const [statusOnchange, setStatusOnchange] = useState<{
    inStock: boolean;
    outStock: boolean;
  }>({
    inStock: false,
    outStock: false,
  });
  const [textInput, setTextInput] = useState<{
    numberForm: any;
    numberTo: any;
  }>({
    numberForm: "",
    numberTo: "",
  });
  const [sortBy, setSortBy] = useState<string>("featured");
  const dataProduct = useAppSelector(dataProduct1 ? selectData1 : selectData);
  const t = useTranslations("catalogPage");
  const handleChangeSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);

  };
  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setStatusOnchange((prev: any) => ({ ...prev, [name]: checked }));
    if (checked == true) {
      setQuantityOnchange(quantityOnchange + 1);
    } else {
      setQuantityOnchange(quantityOnchange - 1);
    }
    setCurrentPage(0);
  };
  const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setTextInput((prev: any) => {
      return { ...prev, [name]: value };
    });
    console.log(textInput);
  };
  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
  };
  const handleClickReset = () => {
    setStatusOnchange({
      inStock: false,
      outStock: false,
    });
    setQuantityOnchange(0);
  };
  const handleClickReset1 = () => {
    setTextInput({ numberForm: "", numberTo: "" });
  };
  const handleClickClearAll = () => {
    setStatusOnchange({
      inStock: false,
      outStock: false,
    });
    setQuantityOnchange(0);
    setTextInput({ numberForm: "", numberTo: "" });
  };
  const filteredProducts = useMemo(() => {
    let filtered = dataProduct.filter(
      (item: any) =>
        (textInput.numberForm == "" ? 0 : textInput.numberForm) < item.price &&
        item.price <
          (textInput.numberTo == ""
            ? dataProduct.reduce(
                (max: any, value: any) =>
                  value.price > max.price ? value : max,
                dataProduct[0]
              ).price
            : textInput.numberTo)
    );
    let filtered1 = filtered;
    if (statusOnchange.inStock !== statusOnchange.outStock) {
      filtered1 = filtered.filter((item: any) => {
        const inStock = item.variants.every(
          (item1: any) => item1.featured_image?.stock > 0
        );
        return statusOnchange.inStock ? inStock : !inStock;
      });
    }
    switch (sortBy) {
      case "nameAtoZ":
        filtered1.sort((a: any, b: any) => a.title.localeCompare(b.title));
        break;
      case "nameZtoA":
        filtered1.sort((a: any, b: any) => b.title.localeCompare(a.title));
        break;
      case "priceLowHigh":
        filtered1.sort((a: any, b: any) => a.price - b.price);
        break;
      case "priceHighLow":
        filtered1.sort((a: any, b: any) => b.price - a.price);
        break;
      default:
        filtered1;
    }
    return [filtered, filtered1];
  }, [dataProduct, textInput, statusOnchange, sortBy]);
  return (
    <div className={styles.page_catalog}>
      <div className={styles.title_page_catalog}>
        <h1>{t("title")}</h1>
      </div>
      <FillterProducts
        filteredProducts={filteredProducts}
        handleChangeNumber={handleChangeNumber}
        textInput={textInput}
        handleCheckBox={handleCheckBox}
        handleClickReset={handleClickReset}
        handleClickReset1={handleClickReset1}
        quantityOnchange={quantityOnchange}
        statusOnchange={statusOnchange}
        handleChangeSortBy={handleChangeSortBy}
      />
      <div className={styles.show_all_filter}>
        {statusOnchange.inStock == true && (
          <div
            onClick={() =>
              setStatusOnchange((prev: any) => ({ ...prev, inStock: false }))
            }
          >
            In stock <span>X</span>
          </div>
        )}
        {statusOnchange.outStock == true && (
          <div
            onClick={() =>
              setStatusOnchange((prev: any) => ({ ...prev, outStock: false }))
            }
          >
            Out of stock<span>X</span>
          </div>
        )}
        {(textInput.numberForm != "" || textInput.numberTo != "") && (
          <div onClick={() => setTextInput({ numberForm: "", numberTo: "" })}>
            ${formatCurrency(textInput.numberForm)} - $
            {formatCurrency(
              textInput.numberTo == ""
                ? dataProduct?.reduce(
                    (max: any, value: any) =>
                      value.price > max.price ? value : max,
                    dataProduct[0]
                  )?.price
                : textInput.numberTo
            )}
            <span>X</span>
          </div>
        )}
        {(statusOnchange.inStock == true ||
          statusOnchange.outStock == true ||
          textInput.numberForm != "" ||
          textInput.numberTo != "") && (
          <button onClick={handleClickClearAll}>Clear all</button>
        )}
      </div>
      <AllProducts
        filteredProducts={filteredProducts[1]}
        handlePageClick={handlePageClick}
        currentPage={currentPage}
      />
    </div>
  );
}
