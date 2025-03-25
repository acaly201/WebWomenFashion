"use client"
import styles from "@/app/style/tabSearch.module.scss";
import { useRouter } from "@/i18n/navigation";
import { IoMdClose } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { useAppDispatch  ,useAppSelector} from "@/redux/hooks";
import { selectData } from "@/redux/features/apiProduct/reduceProduct";
import { textSearch ,dataProductBySearch } from "@/redux/features/apiProduct/reduceProduct";
export default function TabSearch({handleClickTabSearch}:{handleClickTabSearch:()=>void}) {
    const dispath = useAppDispatch();
    const dataProduct = useAppSelector(selectData)
    const router = useRouter()
    const handleClickSearch =()=>{
        dispath(dataProductBySearch(dataProduct))
        router.push({ pathname: `/search` as "/pathnames" });
        handleClickTabSearch()
    }
    return (
    <div className={styles.box_tab_search}>
      <div className={styles.header_tab_serach}>
        <div className={styles.input_search}>
          <input autoFocus onChange={(e:any)=>{dispath(textSearch(e.target.value))}} placeholder="Search" type="text" />
          <button onClick={handleClickSearch}><IoIosSearch /></button>         
        </div>
        <button onClick={handleClickTabSearch}>
          <IoMdClose />
        </button>
      </div>
      <div  onClick={handleClickTabSearch} className={styles.footer_tab_search}></div>
    </div>
  );
}
