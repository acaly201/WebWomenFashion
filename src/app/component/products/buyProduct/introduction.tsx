import styles from "@/app/style/buyProduct.module.scss";
import clsx from "clsx";
import { GiMaterialsScience } from "react-icons/gi";
import { MdOutlineLocalShipping } from "react-icons/md";
import { PiRulerLight, PiShareDuotone } from "react-icons/pi";
import { IoMdHeartEmpty } from "react-icons/io";
export default function Introduction({data}:any){
    return (
        <div className={clsx(styles.product_introduction)}>
        <div
          className={clsx(styles.info_product_introduction)}
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>
        <div className={clsx(styles.footer_product_introduction)}>
          <div className={clsx(styles.box_footer_product_introduction)}>
            <GiMaterialsScience />
            <span>Materials</span>
          </div>
          <div className={clsx(styles.box_footer_product_introduction)}>
            <MdOutlineLocalShipping />
            <span>Shipping & Returns</span>
          </div>
          <div className={clsx(styles.box_footer_product_introduction)}>
            <PiRulerLight />
            <span>Dimensions</span>
          </div>
          <div className={clsx(styles.box_footer_product_introduction)}>
            <IoMdHeartEmpty />
            <span>Care Instructions</span>
          </div>
          <div className={clsx(styles.box_footer_product_introduction)}>
            <PiShareDuotone />
            <span>Share</span>
          </div>
        </div>
      </div>
    )
}