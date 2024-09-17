"use client";

import React, { useState } from "react";

import { useDispatch } from "react-redux";

import styles from "./index.module.scss";

import Link from "next/link";

import { FiChevronRight } from "react-icons/fi";

import { trimInstrumentName } from "@/utils";

import { CATALOG_LINKS } from "@/app/constants";

interface CatalogProps {
  closeCatalog: any;
}

const Catalog: React.FC<CatalogProps> = ({ closeCatalog }) => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const dispatch = useDispatch();

  const handleCloseCatalog = () => dispatch(closeCatalog());

  const handleMouseEnter = (section: string) => {
    setHoveredSection(section);
  };

  const handleMouseLeave = () => {
    setHoveredSection(null);
  };

  return (
    <div className={styles.overlay} onClick={handleCloseCatalog}>
      <div className={styles.catalog}>
        <div className={styles.sectionLinks}>
          {CATALOG_LINKS.map(({ link, id, subtypes }) => (
            <div
              key={id}
              className={styles.sectionLinkContainer}
              onMouseEnter={() => handleMouseEnter(link)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={`/shop/${trimInstrumentName(link)}`}
                className={styles.sectionLink}
                onClick={handleCloseCatalog}
              >
                <span>{link}</span>
                <FiChevronRight size={24} />
              </Link>

              {hoveredSection === link && subtypes && (
                <div className={styles.subtypesMenu}>
                  {subtypes.map((subtype) => (
                    <Link
                      key={subtype.slug}
                      href={`/shop/${trimInstrumentName(link)}/${
                        subtype?.slug
                      }`}
                      className={styles.subtypeLink}
                      onClick={handleCloseCatalog}
                    >
                      {subtype.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
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
