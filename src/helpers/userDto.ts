export const userDto = (dataRes: any) => {
  return {
    id: dataRes.id,
    name: dataRes.lastName +" " + dataRes.firstName,
    email: dataRes.email,
    type: dataRes.type,
    imageUrl: dataRes.imageUrl,
    locked: dataRes.locked,
    displayReview: dataRes.displayReview,
  };
};
