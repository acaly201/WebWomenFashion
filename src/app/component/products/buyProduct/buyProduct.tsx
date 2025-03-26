"use client";
import styles from "@/app/style/buyProduct.module.scss";
import clsx from "clsx";
import { useCallback, useEffect, useState, useRef } from "react";
import { useGoToInfoProduct } from "../goToInfoProduct";
import { useAppSelector } from "@/redux/hooks";
import {
  selectData,
  selectDataImg,
  selectDataFrequentlyBoughtTogether,
} from "@/redux/features/apiProduct/reduceProduct";
import { Link } from "@/i18n/navigation";
import BuyNow from "./buyNow";
import BuyMore from "./buyMore";
import Quantity from "./quantity";
import OtherProductOptions from "./otherProductOptions";
import Introduction from "./introduction";
import { MdError } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";
export default function ByProduct(props: { data: any }) {
  const { data } = props;
  const goToInfoProduct = useGoToInfoProduct();
  const divRef = useRef<HTMLDivElement | null>(null);
  const [quantityProduct, setQuantityProduct] = useState<number>(1);
  const [selectBuyNow, setSelectBuyNow] = useState(1);
  const [dataColorProduct, setDataColorProduct] = useState<any>(
    Array(3).fill(data.variants[0].title)
  );
  const [dataImgProduct, setDataImgProduct] = useState<string[]>(
    Array(3).fill(data.variants[0]?.featured_image?.src)
  );
  const [dataPreview, setDataPreview] = useState<any>(null);
  const [statusScoll, setStatusScoll] = useState(false);
  const dataApi = useAppSelector(selectData);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 200) {
        setStatusScoll(true);
      } else {
        setStatusScoll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        dataPreview != null &&
        divRef.current &&
        !divRef.current.contains(event.target)
      ) {
        setDataPreview(null);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [dataPreview]);
  const handleChange = (index: number, event: any) => {
    const newValues = [...dataColorProduct];
    newValues[index] = event.target.value;
    setDataColorProduct(newValues);
    const newValues1 = [...dataImgProduct];
    newValues1[index] = data.variants.filter(
      (item: any) => item.title == event.target.value
    )[0].featured_image.src;
    setDataImgProduct(newValues1);
  };
  const dataFrequentlyBoughtTogether = useAppSelector(
    selectDataFrequentlyBoughtTogether
  );
  const dataImgs = useAppSelector(selectDataImg);
  const handleReduceQuantity = () => {
    if (quantityProduct <= 1) return;
    setQuantityProduct(quantityProduct - 1);
  };
  const handleIncreaseQuantity = () => {
    setQuantityProduct(quantityProduct + 1);
  };
  const handleClickSelect = (value: number) => {
    setSelectBuyNow(value);
  };

  const handleAddToCart = useCallback(() => {
    const storedData = JSON.parse(localStorage.getItem("cart") ?? "[]");
    let arrProduct = [];
    const product = {
      id: data.id,
      name: data.title,
      handle: data.handle,
      price: data.price,
      totalPrice:
        data.other_product || (!data.other_product && data.type == "shoe")
          ? data.price * quantityProduct
          : data.variants[0].featured_image == null
          ? data.price * selectBuyNow
          : data.price,
      quantity:
        data.other_product || (!data.other_product && data.type == "shoe")
          ? quantityProduct
          : selectBuyNow,
      color:
        data.other_product || (!data.other_product && data.type == "shoe")
          ? dataImgs.find((value: any) => value.id == data.id)?.color
          : data.variants[0].featured_image == null
          ? null
          : selectBuyNow == 1
          ? dataColorProduct[0]
          : dataColorProduct,
      img:
        !data.other_product &&
        data.type != "shoe" &&
        data.variants[0].featured_image != null
          ? selectBuyNow == 1
            ? dataImgProduct[0]
            : dataImgProduct
          : dataImgs.filter((item: any) => item.id === data.id)[0].url,
      size:
        !data.other_product && data.type == "shoe"
          ? dataImgs.find((value) => value.id == data.id)?.size
          : null,
      combo:
        data.other_product || (!data.other_product && data.type == "shoe")
          ? null
          : selectBuyNow == 1
          ? "Single"
          : selectBuyNow === 2
          ? "Duo"
          : "Trio",
    };
    
    if (
      !data.other_product &&
      data.type != "shoe" &&
      data.variants[0].featured_image != null &&
      selectBuyNow != 1
    ) {
      if (selectBuyNow == 2) {
        arrProduct = dataColorProduct
          .slice(0, -1)
          .map((item: any, index: number) => ({
            id: data.id,
            handle: data.handle,
            name: data.title,
            price: data.price,
            totalPrice: data.price * quantityProduct,
            quantity: 1,
            color: item,
            img: dataImgProduct[index],
            size: null,
            combo: "Duo",
          }));
      } else {
        arrProduct = dataColorProduct.map((item: any, index: number) => ({
          id: data.id,
          name: data.title,
          handle: data.handle,
          price: data.price,
          totalPrice: data.price * quantityProduct,
          quantity: 1,
          color: item,
          img: dataImgProduct[index],
          size: null,
          combo: "Trio",
        }));
      }
    }
    const updatedCart = [
      ...(!data.other_product &&
      data.type != "shoe" &&
      data.variants[0].featured_image != null &&
      selectBuyNow != 1
        ? arrProduct
        : [product]),
      ...storedData,
    ].reduce((acc: any, item: any) => {
      const existingItem = acc.find(
        (el: any) =>
          el.id === item.id &&
          el.name === item.name &&
          el.color === item.color &&
          el.img === item.img &&
          el.size === item.size &&
          el.combo === item.combo
      );
      if (existingItem) {
        existingItem.totalPrice += item.totalPrice;
        existingItem.quantity += item.quantity;
      } else {
        acc.push({ ...item });
      }
      return acc;
    }, []);
    setDataPreview(updatedCart[0] ?? product);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
    console.log(dataPreview);
  }, [
    quantityProduct,
    data,
    selectBuyNow,
    dataImgs,
    dataImgProduct,
    dataColorProduct,
  ]);
  return (
    // Mua sản phẩm
    <div className={clsx(styles.box_buy_product)}>
      <div
        ref={divRef}
        className={clsx(
          dataPreview
            ? statusScoll
              ? styles.active_cart_top
              : styles.active_cart_preview
            : styles.cart_preview
        )}
      >
        <div className={styles.header_cart_preview}>
          <span>
            <FaChevronDown />
            Item added to your cart
          </span>
          <button onClick={() => setDataPreview(null)}>
            <IoMdClose />
          </button>
        </div>
        <div className={styles.container_cart_preview}>
          <div className={styles.img_container_cart_preview}>
            {dataPreview != null && (
              <Image
                src={dataPreview.img}
                width={500}
                height={500}
                style={{ width: "100%", height: "100%" }}
                alt="img"
              />
            )}
          </div>
          <div className={styles.info_container_cart_preview}>
            <h5>{dataPreview?.name}</h5>
            {dataPreview?.color != null && (
              <span>Color:{dataPreview?.color}</span>
            )}
          </div>
        </div>

        <div className={styles.footer_cart_preview}>
          <button>
            <Link href={{ pathname: "/cart" as "/pathnames" }}>
              View my cart
            </Link>
          </button>
          <button style={{ backgroundColor: "black", color: "white" }}>
            <Link href={{ pathname: "/cart" as "/pathnames" }}>Check out</Link>
          </button>
          <button onClick={() => setDataPreview(null)}>
            Continue shopping
          </button>
        </div>
      </div>

      {(data.other_product == true || data.type == "shoe") && (
        <Quantity
          handleReduceQuantity={handleReduceQuantity}
          quantityProduct={quantityProduct}
          handleIncreaseQuantity={handleIncreaseQuantity}
        />
      )}
      {data.other_product == false && data.type != "shoe" ? (
        data.variants[0].featured_image == null ? (
          <BuyNow
            handleClickSelect={handleClickSelect}
            selectBuyNow={selectBuyNow}
            data={data}
          />
        ) : (
          <BuyMore
            handleChange={handleChange}
            handleClickSelect={handleClickSelect}
            selectBuyNow={selectBuyNow}
            dataColorProduct={dataColorProduct}
            data={data}
          />
        )
      ) : (
        <></>
      )}
      <div className={clsx(styles.box_buy)}>
        {data && data.variants && data.variants[0].featured_image ? (
          dataImgs.find((value) => value.id == data.id)?.stock == 0 ? (
            <button style={{ cursor: "not-allowed" }}>Sold out</button>
          ) : dataImgs.find((value) => value.id == data.id)?.stock <
              selectBuyNow ||
            dataImgs.find((value) => value.id == data.id)?.stock <
              quantityProduct ? (
            <>
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "15px 0",
                }}
              >
                <MdError style={{ color: "red" }} />
                The maximum quantity of this item is already in your cart.
              </p>
              <button style={{ cursor: "not-allowed" }}>Cannot add</button>{" "}
            </>
          ) : (
            <>
              {" "}
              <button onClick={handleAddToCart}>Add to cart</button>
              <button style={{ backgroundColor: "black", color: "white" }}>
                Buy it now
              </button>
            </>
          )
        ) : (
          <>
            <button onClick={handleAddToCart}>Add to cart</button>
            <button style={{ backgroundColor: "black", color: "white" }}>
              Buy it now
            </button>
          </>
        )}
      </div>

      {/* // Mua sản phẩm theo combo */}
      {data.other_product == true && (
        <OtherProductOptions
          dataApi={dataApi}
          dataFrequentlyBoughtTogether={dataFrequentlyBoughtTogether}
          goToInfoProduct={goToInfoProduct}
        />
      )}
      {/* Thông tin sản phẩm */}
      <Introduction data={data} />
    </div>
  );
}
