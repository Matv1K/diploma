'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import styles from './index.module.scss';

import Link from 'next/link';
import Image from 'next/image';

import { FiChevronRight } from 'react-icons/fi';
import { Logo } from '@/public/icons';

import { trimInstrumentName } from '@/utils';

import { closeCatalog } from '@/features/catalog/catalogSlice';

import { CATALOG_LINKS } from '@/app/constants';

const Catalog: React.FC = () => {
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
          <div className={styles.sectionLinkContainer}>
            <Link href={'/shop'} className={`${styles.sectionLink} ${styles.allSectionLink}`}>
              Shop All
            </Link>
          </div>

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
                  {subtypes.map(subtype => (
                    <Link
                      key={subtype.slug}
                      href={`/shop/${trimInstrumentName(link)}/${subtype?.slug}`}
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

        <div className={styles.catalogInfo}>
          <Link className={styles.linkSales} onClick={handleCloseCatalog} href='/shop/sale'>
            Items on Sale!
          </Link>

          <Link className={styles.logo} href='/' onClick={handleCloseCatalog}>
            <Image src={Logo} alt='Musify' width={40} height={40} priority/>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Catalog;
