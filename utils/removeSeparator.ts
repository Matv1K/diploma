const removeSeparator = (separator: string | undefined | null): string | undefined | null => {
    if (separator === undefined || separator === null) {
      return separator;
    }
    return separator.replaceAll('-', ' ');
  };
  
  export default removeSeparator;
  