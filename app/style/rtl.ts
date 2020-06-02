export const textAlign: any = (isRTL: boolean) => {
    return isRTL ? { textAlign: "right" } : { textAlign: "left" };
  };
export const alignItems: any = (isRTL: boolean) => {
return isRTL ? { alignItems: "flex-start" } : { alignItems: "flex-end" };
};

export const flexDirection: any = (isRTL: boolean) => {
  return isRTL ? { flexDirection: "row-reverse" } : { flexDirection: "row" };
};