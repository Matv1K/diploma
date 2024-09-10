const trimInstrumentName = (name: any) => {
  return name
    .split("")
    .map((part: any) => part.trim().toLocaleLowerCase())
    .join("");
};

export default trimInstrumentName;
