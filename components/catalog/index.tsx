import React from "react";

import styles from "./index.module.scss";

import Link from "next/link";

import { CATALOG_LINKS } from "@/constants";

const Catalog: React.FC = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.catalog}>
        <div className={styles.links}>
          {CATALOG_LINKS.map(({ link, id }): any => {
            return (
              <p className={styles.link} key={id}>
                {link}
              </p>
            );
          })}
        </div>

        <Link className={styles.linkSales} href="/shop/sale">
          Items on Sale!
        </Link>
      </div>
    </div>
  );
};

export default Catalog;
