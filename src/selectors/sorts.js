const sorts = (sort, offers) => {
  switch (sort) {
    case `Top rated first`:
      return offers.sort((offer1, offer2) => {
        if (offer1.rating < offer2.rating) {
          return 1;
        }
        if (offer1.rating > offer2.rating) {
          return -1;
        }
        return 0;
      });
    case `Price: low to high`:
      return offers.sort((offer1, offer2) => {
        if (offer1.price > offer2.price) {
          return 1;
        }
        if (offer1.price < offer2.price) {
          return -1;
        }
        return 0;
      });
    case `Price: high to low`:
      return offers.sort((offer1, offer2) => {
        if (offer1.price < offer2.price) {
          return 1;
        }
        if (offer1.price > offer2.price) {
          return -1;
        }
        return 0;
      });
  }
  return offers;
};
export default sorts;
