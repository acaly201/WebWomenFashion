"use client";
import styles from "@/app/style/cart.module.scss";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import { selectData } from "@/redux/features/apiProduct/reduceProduct";
import AllProducts from "@/app/component/products/pageAllProduct";
import { Link } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdDiscount } from "react-icons/md";
import { formatCurrency } from "@/setting/formatNumber";
import { useGoToInfoProduct } from "@/app/component/products/goToInfoProduct";
export default function Cart() {
  const dataProduct = useAppSelector(selectData);
  const [dataLocalStorage, setDataLocalStorage] = useState<any>([]);
  const goToInfoProduct = useGoToInfoProduct();
  useEffect(() => {
    const dataLocal = JSON.parse(localStorage.getItem("cart") ?? "[]");
    if (dataLocal.length >= 1) {
      setDataLocalStorage(dataLocal);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(dataLocalStorage));
    window.dispatchEvent(new Event("cartUpdated"));
  }, [dataLocalStorage]);
  const handleDeleteProduct = (e: number) => {
    setDataLocalStorage(
      dataLocalStorage.filter((data: any, index: number) => index != e)
    );
  };
  const handleClickQuantity = (e: string, index: number) => {
    const newData = dataLocalStorage.map((item: any, i: number) => {
      if (i === index) {
        const newQuantity = e === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1);
        return {
          ...item,
          quantity: newQuantity,
          totalPrice: newQuantity * item.price, 
        };
      }
      return item;
    });
    setDataLocalStorage(newData);
  };
  return (
    <>
      <div className={styles.page_cart}>
        {dataLocalStorage.length > 0 && (
          <div className={styles.box_products_cart}>
            <div className={styles.title_box_products_cart}>
              <h2>Your cart</h2>
              <button>
                <Link href={{ pathname: "/catalog" as "/pathnames" }}>
                  Continue shopping
                </Link>
              </button>
            </div>
            <div className={styles.all_product_cart}>
              <div className={styles.title_all_product_cart}>
                <span style={{ width: "50%" }}>PRODUCT</span>
                <span style={{ width: "15%" }}>QUANTITY</span>
                <span style={{ width: "15%", textAlign: "end" }}>TOTAL</span>
              </div>
              <div className={styles.content_all_product_cart}>
                {dataLocalStorage.length > 0 &&
                  dataLocalStorage.map((item: any, index: number) => {
                    return (
                      <div key={index} className={styles.product_cart}>
                        <div className={styles.info_product_cart}>
                          <div className={styles.img_info_product_cart}>
                            <Image
                              className={styles.img}
                              src={item.img}
                              width={500}
                              height={500}
                              alt="img"
                            />
                          </div>
                          <div className={styles.info_info_product_cart}>
                            <h5
                              onClick={() => {
                                goToInfoProduct(item.handle, item.id);
                              }}
                            >
                              {item.name}
                            </h5>
                            <span>${formatCurrency(item.price)}</span>
                            {item.color && <span>Color: {item.color}</span>}
                            {item.size && <span>Size: {item.size}</span>}
                            {item.combo && (
                              <span>
                                <MdDiscount style={{ color: "black" }} />{" "}
                                {item.combo}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className={styles.quantity_product_cart}>
                          <div>
                            <button
                              onClick={() =>
                                handleClickQuantity("reduce", index)
                              }
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() =>
                                handleClickQuantity("increase", index)
                              }
                            >
                              +
                            </button>
                          </div>
                          <button onClick={() => handleDeleteProduct(index)}>
                            <RiDeleteBin6Line />
                          </button>
                        </div>
                        <div className={styles.price_product_cart}>
                          <span
                            style={
                              item.combo == "Duo" || item.combo == "Trio"
                                ? { textDecoration: "line-through" }
                                : undefined
                            }
                          >
                            ${formatCurrency(item.totalPrice)}
                          </span>
                          {(item.combo == "Duo" || item.combo == "Trio") && (
                            <span>
                              $
                              {formatCurrency(
                                item.combo == "Duo"
                                  ? item.totalPrice -
                                      (item.totalPrice / 100) * 10
                                  : item.totalPrice -
                                      (item.totalPrice / 100) * 20
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className={styles.total_all_product_cart}>
                <span>
                  Subtotal $
                  {formatCurrency(
                    dataLocalStorage.reduce((total: number, item: any) => {
                      return item.combo == "Duo"
                        ? (total +=
                            item.totalPrice - (item.totalPrice / 100) * 10)
                        : item.combo == "Trio"
                        ? (total +=
                            item.totalPrice - (item.totalPrice / 100) * 20)
                        : (total += item.totalPrice);
                    }, 0)
                  )}
                </span>
                <p>Taxes and shipping calculated at checkout</p>
                <button>Check out</button>
              </div>
            </div>
          </div>
        )}

        {dataLocalStorage.length < 1 && (
          <div className={styles.info_cart}>
            <h2 onClick={() => console.log(dataLocalStorage)}>
              Your cart is empty
            </h2>
            <button>
              <Link href={{ pathname: "/catalog" as "/pathnames" }}>
                Continue shopping
              </Link>
            </button>
            <h3>Have an account?</h3>
            <p>
              <span>Log in</span> to check out faster
            </p>
          </div>
        )}

        <h1>Featured collection</h1>
        <AllProducts
          filteredProducts={dataProduct.filter(
            (item: any, index: number) => index <= 3
          )}
        />
        <button>
          <Link href={{ pathname: "/catalog" as "/pathnames" }}>View all</Link>
        </button>
      </div>
    </>
  );
}
