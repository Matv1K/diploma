import React from "react";

import { useDispatch } from "react-redux";

import styles from "./index.module.scss";

import Link from "next/link";

import { trimInstrumentName } from "@/utils";

import { CATALOG_LINKS } from "@/constants";

interface CatalogProps {
  closeCatalog: any;
}

const Catalog: React.FC<CatalogProps> = ({ closeCatalog }) => {
  const dispatch = useDispatch();

  const handleCloseCatalog = () => {
    dispatch(closeCatalog());
  };

  return (
    <div className={styles.overlay} onClick={handleCloseCatalog}>
      <div className={styles.catalog}>
        <div className={styles.links}>
          {CATALOG_LINKS.map(({ link, id }): any => {
            return (
              <Link
                key={id}
                href={`/shop/${trimInstrumentName(link)}`}
                className={styles.link}
                onClick={handleCloseCatalog}
              >
                {link}
              </Link>
            );
          })}
        </div>
        <Link
          onClick={handleCloseCatalog}
          className={styles.linkSales}
          href="/shop/sale"
        >
          Items on Sale!
        </Link>
      </div>
    </div>
  );
};
export default Catalog;
