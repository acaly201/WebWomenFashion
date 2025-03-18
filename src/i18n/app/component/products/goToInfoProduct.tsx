"use client";
import { useRouter } from "@/i18n/navigation";
export const useGoToInfoProduct = () => {
  const router = useRouter();

  const goToInfoProduct = (name: string, id: any) => {
    localStorage.setItem(`productId${name}`, id);
    router.push({ pathname: `/product/${name}` as "/pathnames" });
  };

  return goToInfoProduct;
};
