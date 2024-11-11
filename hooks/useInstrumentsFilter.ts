import { useState, useEffect } from 'react';

import { getInstruments } from '@/api/instruments/instrumentService';

import { InstrumentCardI } from '@/types';

interface Filters {
  isNewOnly?: boolean;
  priceRange?: string;
  brand?: string;
  filter?: string;
}

const useInstrumentsFilter = (
  initialFilters: Filters = {},
  type: 'shop' | 'sale' | 'sectionName' | 'subtypeName' = 'shop',
  sectionName?: string,
  subtypeName?: string,
) => {
  const [instruments, setInstruments] = useState<InstrumentCardI[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [filters, setFilters] = useState<Filters>(initialFilters);

  const fetchInstruments = async (reset = false) => {
    try {
      setIsLoading(true);

      const { isNewOnly, priceRange, brand, filter } = filters;

      const { instruments: newInstruments, hasMore } = await getInstruments(reset ? 1 : page, 10, {
        isNewOnly,
        priceRange: priceRange !== 'All' ? priceRange : undefined,
        brand: brand || undefined,
        filter: filter || undefined,
      }, type, sectionName, subtypeName);

      setInstruments(prevInstruments => (reset ? newInstruments : [...prevInstruments, ...newInstruments]));
      setPage(prevPage => (reset ? 2 : prevPage + 1));
      setHasMore(hasMore);
    } catch (error) {
      console.error('Error fetching instruments:', error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInstruments(true);
  }, [filters, type, sectionName, subtypeName]);

  return { instruments, hasMore, isLoading, filters, setFilters, fetchInstruments };
};

export default useInstrumentsFilter;
