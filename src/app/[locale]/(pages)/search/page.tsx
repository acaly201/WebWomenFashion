"use client";
import { useMemo, useRef, useState } from "react";
import Catalog from "../catalog/page";
import styles from "@/app/style/pageSearch.module.scss";
import { useRouter } from "@/i18n/navigation";
import { IoIosSearch } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectData,
  selectData1,
  selectTextSearch,
  selectStatusResultSearch
} from "@/redux/features/apiProduct/reduceProduct";
import {
  textSearch,
  dataProductBySearch,
} from "@/redux/features/apiProduct/reduceProduct";
export default function Search() {
  const refSearch = useRef<HTMLDivElement>(null);
  const [textEror, setTextEror] = useState<string>("");
  const dispath = useAppDispatch();
  const dataProduct = useAppSelector(selectData);
  const dataProduct1 = useAppSelector(selectData1);
  const inputTextSearch = useAppSelector(selectTextSearch);
  const statusResultSearch = useAppSelector(selectStatusResultSearch);
  const router = useRouter();

  const handleClickSearch = () => {
    dispath(dataProductBySearch(dataProduct));
    router.push({ pathname: `/search` as "/pathnames" });
    
  }

  return (
    <>
      <div className={styles.box_tab_search}>
        <h1>Search results</h1>
        <div className={styles.input_search}>
          <input
          value={inputTextSearch}
            autoFocus
            onChange={(e: any) => {
              dispath(textSearch(e.target.value));
            }}
            placeholder="Search"
            type="text"
          />
          <button onClick={handleClickSearch}>
            <IoIosSearch />
          </button>
        </div>
        <p>{statusResultSearch}</p>
      </div>

      {dataProduct1.length >= 1 && <Catalog dataProduct1={dataProduct1} />}
    </>
  );
}
