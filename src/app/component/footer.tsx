"use client";
import styles from "../style/footer.module.scss";
import {useTranslations} from 'next-intl';
import {
  FaCcVisa,
  FaCcMastercard,
  FaPaypal,
  FaCcDinersClub,
  FaCcDiscover,
} from "react-icons/fa";
import { SiAmericanexpress } from "react-icons/si";
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useTransition } from 'react';
function Footer() {
   const t = useTranslations('footer');
   const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();
  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  };
  return (
    <div className={styles.footer}>
      <div className={styles.menuFooter}>
        <h2>{t('quick')}</h2>
        <ul>
          <li>{t('form')}</li>
          <li>{t('smart')}</li>
          <li>{t('pre')}</li>
          <li>{t('mega')}</li>
          <li>{t('request')}</li>
          <li>{t('product')}</li>
        </ul>
      </div>
      <div className={styles.infoFooter}>
        <div className={styles.leftInfoFooter}>
          <h5>{t('language')}</h5>
          <select
          defaultValue={localActive}
          className='bg-transparent py-2'
          onChange={onSelectChange}
          disabled={isPending}>
            <option value="en">English</option>
            <option value="de">Deutsch</option>
            <option value="fran">Francais</option>
          </select>
        </div>
        <div className={styles.rightInfoFooter}>
          <ul className={styles.iconRightInfoFooter}>
            <li>
              <FaCcVisa style={{color:"blue"}} className={styles.icon} />
            </li>
            <li>
              <FaCcDinersClub style={{color:"orange"}} className={styles.icon} />
            </li>
            <li>
              <FaCcDiscover style={{color:"blue"}} className={styles.icon} />
            </li>
            <li>
              <FaPaypal style={{color:"rgb(156, 103, 216)"}} className={styles.icon} />
            </li>
            <li>
              <SiAmericanexpress style={{color:"rgb(95, 123, 185)"}}  className={styles.icon} />
            </li>
            <li>
              <FaCcMastercard style={{color:"rgb(151, 218, 75)"}}  className={styles.icon} />
            </li>
          </ul>
          <ul className={styles.InfoRightInfoFooter}>
            <li>© 2025</li>
            <li>[Demo App] - Globo Color Swatch</li>
            <li>Powered by Shopify</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Footer;
