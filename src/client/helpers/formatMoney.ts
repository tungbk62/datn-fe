export const formatMoney = (amount: any) => {
  try {
    const thousands = ".";
    // tslint:disable
    amount = String(amount).replace(/\,/g, "");
    amount = String(amount).replace(/\./g, "");
    amount = Number(amount) || 0;
    const i = parseInt(amount).toString();
    const j = i.length > 3 ? i.length % 3 : 0;
    return (
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands)
    );
  } catch (e) {
    console.log(e);
  }
};
