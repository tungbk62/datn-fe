export const userDto = (dataRes: any) => {
  return {
    id: dataRes.id,
    name: dataRes.lastName +" " + dataRes.firstName,
    email: dataRes.email,
    type: dataRes.imageUrl,
    imageUrl: dataRes.type,
    locked: dataRes.locked,
    displayReview: dataRes.displayReview,
  };
};
