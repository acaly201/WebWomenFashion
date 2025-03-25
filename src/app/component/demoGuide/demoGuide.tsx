"use client";
import { LuBookText } from "react-icons/lu";
import { Api, PREFIX } from "@/setting/api";
import styles from "@/app/style/demoGuide.module.scss";
import { useRouter } from "@/i18n/navigation";
import { FaCaretUp, FaCaretDown, FaAngleLeft } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { apiAllProduct } from "@/redux/features/apiProduct/apiProduct";
import {
  showDemo,
  selectShowDemo,
  selectShrinkDemoGuide,
  shrinkDemoGuide,
  selectShowSelect,
  showSelect,
  selectDataShowSelect,
} from "@/redux/features/demoGuide/demoguideSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import type { TypeDemoGuide } from "@/setting/dataType";
import type { TypeContentDemoGuide } from "@/setting/dataType";
import { useGoToInfoProduct } from "../products/goToInfoProduct";
export default function DemoGuide() {
  const [dataDemoGuide, setDataDemoGuide] = useState<
    TypeDemoGuide[] | undefined
  >([]);
  const [dataDemoGuide1, setDataDemoGuide1] = useState<[] | undefined>(
    []
  );
  const [valueOnChange, setValuaOnChange] = useState<boolean>();
  const dispatch = useAppDispatch();
  const statusShow = useAppSelector(selectShowDemo);
  const statusShrink = useAppSelector(selectShrinkDemoGuide);
  const statusShowSelect = useAppSelector(selectShowSelect);
  const dataShowSelect = useAppSelector(selectDataShowSelect);
  const goToInfoProduct=useGoToInfoProduct()
  useEffect(() => {
    fetch(Api.Demo_Guide.getAll)
      .then((repon) => {
        if (repon) {
          return repon.json();
        }
      })
      .then((data) => {
        setDataDemoGuide(data);
      })
      .catch(() => Error);
    dispatch(apiAllProduct());

  }, []);
  useEffect(() => {
    dataShowSelect &&
      fetch(Api.Demo_Guide.getByContent + dataShowSelect)
        .then((repon) => {
          if (repon) {
            return repon.json();
          }
        })
        .then((data) => {
          setDataDemoGuide1(data);
        })
        .catch(() => Error);
      
  }, [dataShowSelect, valueOnChange]);
  const router = useRouter();
  const handleOnChange = (value: TypeContentDemoGuide) => {
    setValuaOnChange(!valueOnChange);
    fetch(Api.Demo_Guide.getByContent + dataShowSelect + PREFIX + value.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: value.id,
        status: !value.status,
        title: value.title,
      }),
    })
      .then((res) => {
        console.log(res.json());
      })
      .catch(() => console.log("loi..."));
  };
  return (
    <>
      <div
        onClick={() => dispatch(showDemo())}
        className={styles.button_demo_guide}
      >
        <div className={styles.box_button_demo_guide}>
          {statusShow ? (
            <IoMdClose className={styles.icon_demo_guide} />
          ) : (
            <LuBookText className={styles.icon_demo_guide} />
          )}
        </div>
      </div>

      <div className={statusShow ? styles.box_demo_guide : styles.hide}>
        <div className={styles.title1_box_demo_guide}>
          <LuBookText className={styles.icon_demo_guide} />
          <h3>Demo Guide</h3>
        </div>
        <div
          onClick={() => dispatch(shrinkDemoGuide())}
          className={styles.title2_box_demo_guide}
        >
          <p>What are you looking for?</p>
          {statusShrink ? <FaCaretUp /> : <FaCaretDown />}
        </div>
        {statusShrink ? (
          <div className={styles.content_box_demo_guide}>
            <p>Select options below to get the best of this demo 👇</p>
            <p>I want to show ...</p>
            <ul>
              {dataDemoGuide && dataDemoGuide.length > 0 ? (
                dataDemoGuide.map((data, index: any) => {
                  return (
                    statusShowSelect && (
                      <li
                        onClick={() =>
                          data.id == 3
                            ? router.replace("/")
                            : setTimeout(
                                () => dispatch(showSelect(data.content)),
                                500
                              )
                        }
                        style={{ cursor: "pointer" }}
                        key={data.id}
                      >
                        <input
                          type="radio"
                          name="radio"
                          value={`HTML${index}`}
                          id={`HTML${index}`}
                        />
                        <label
                          onClick={() =>
                            data.id == 3
                              ? router.replace("/")
                              : setTimeout(
                                  () => dispatch(showSelect(data.content)),
                                  500
                                )
                          }
                          style={{ cursor: "pointer" }}
                          htmlFor={`HTML${index}`}
                        >
                          {data.title}
                        </label>
                      </li>
                    )
                  );
                })
              ) : (
                <li>Load...</li>
              )}
              {dataDemoGuide1 && dataDemoGuide1.length > 0 &&
                !statusShowSelect &&
                dataDemoGuide1.map((valuee: any, index: number) => {
                  return (
                    <>
                      <li style={{ cursor: "pointer" }} key={index}>
                        <input
                          checked={valuee.status}
                          onChange={() => handleOnChange(valuee)}
                          type="checkbox"
                          id={`HTML${index}`}
                          name={`HTML${index}`}
                          value={`HTML${index}`}
                        />

                        <label
                          style={
                            valuee.status
                              ? { fontWeight: "700", cursor: "pointer" }
                              : { cursor: "pointer" }
                          }
                          htmlFor={`HTML${index}`}
                        >
                          {valuee.title}
                        </label>
                      </li>
                      {valuee.status && (
                        <p>
                          Click{" "}
                          <span onClick={()=>goToInfoProduct('women-oversized-sweatshirt',6815747670088)}
                            style={{
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                          >
                            here
                          </span>{" "}
                          to view widget{" "}
                          <span style={{ fontWeight: "700" }}>
                            {valuee.title}
                          </span>
                        </p>
                      )}
                    </>
                  );
                })}
              {!statusShowSelect && (
                <li>
                  <span
                    onClick={() => {
                      dispatch(showSelect(undefined));
                    }}
                    style={{
                      textDecoration: "underline",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <FaAngleLeft />
                    Back
                  </span>
                </li>
              )}
            </ul>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
