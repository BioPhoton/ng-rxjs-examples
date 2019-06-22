const getCardsPerRow = (): number => {
  const width = window.innerWidth - 20;
  return Math.floor(width / 200);
};

const itemHeight = 160;
const itemWidth = 280;
const margin = 10;

const itemWidthM = itemWidth + margin * 2;
const itemHeightM = itemHeight + margin * 2;

export const initialState = {
  data: {},
  layout: {
    name: 'cards',
    top: (d, i) => Math.floor(i / getCardsPerRow()) * itemHeightM + 'px',
    left: (d, i) => (i % getCardsPerRow()) * itemWidthM + 'px',
    height: itemHeight + 'px',
    width: itemWidth + 'px',
    totalHeight: (data) => margin*2 + Math.ceil(data.length / getCardsPerRow()) * itemHeightM
  },
  colorMap: {},
  sortConfig: {},
  filterConfig: ''
}
