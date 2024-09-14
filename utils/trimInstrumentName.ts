const trimInstrumentName = (name: string) => {
  if (name.split(" ").length > 1) {
    return name
      .split(" ")
      .map((word, ind) => {
        if (ind !== 0) {
          return "-" + word.trim().toLocaleLowerCase();
        } else {
          return word.trim().toLocaleLowerCase();
        }
      })
      .join("");
  }

  return name
    .split("")
    .map((part: string) => part.trim().toLocaleLowerCase())
    .join("");
};

export default trimInstrumentName;
