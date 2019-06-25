import { LayoutConfig } from '../components/layout-selection/layout-config.interface';

export const getLayouts = () => {
  const getOriginalLayout = (): LayoutConfig => {

    const itemHeight = 20;
    const itemWidth = 250;
    const margin = 10;

    const itemWidthM = itemWidth + margin * 2;
    const itemHeightM = itemHeight + margin * 2;

    const cardsPerRow = 3;

    return {
      name: (d, i) => 'original',
      top: (d, i) => Math.floor(i / cardsPerRow) * itemHeightM + 'px',
      left: (d, i) => (i % cardsPerRow) * itemWidthM + 'px',
      height:  (d, i) => itemHeight + 'px',
      width: (d, i) => itemWidth + 'px',
      totalHeight: (data: any[]) => margin * 2 + Math.ceil(data.length / cardsPerRow) * itemHeightM + 'px'
    };
  };

  const getCardLayout = (): LayoutConfig => {

    const itemHeight = 120;
    const itemWidth = 220;
    const margin = 10;

    const itemWidthM = itemWidth + margin * 2;
    const itemHeightM = itemHeight + margin * 2;

    const getCardsPerRow = (): number => {
      const width = window.innerWidth - margin * 2;
      return Math.floor(width / itemWidth);
    };

    return {
      name: (d, i) => 'card',
      top: (d, i) => Math.floor(i / getCardsPerRow()) * itemHeightM + 'px',
      left: (d, i) => (i % getCardsPerRow()) * itemWidthM + 'px',
      height: (d, i) => itemHeight + 'px',
      width: (d, i) => itemWidth + 'px',
      totalHeight: (data) => margin * 2 + Math.ceil(data.length / getCardsPerRow()) * itemHeightM + 'px'
    };
  };

  const getDiagramLayout = (): LayoutConfig => {

    const itemHeight = 80;
    const itemWidth = 100;
    const margin = 10;

    const itemWidthM = itemWidth + margin * 2;
    const itemHeightM = itemHeight + margin * 2;

    const getCardsPerRow = (): number => {
      const width = window.innerWidth - margin * 2;
      return Math.floor(width / itemWidth);
    };

    return {
      name: (d, i) => 'diagram',
      top: (d, i) => Math.floor(i / getCardsPerRow()) * itemHeightM + 'px',
      left: (d, i) => (i % getCardsPerRow()) * itemWidthM + 'px',
      height: (d, i) => itemHeight + 'px',
      width: (d, i) => itemWidth + 'px',
      totalHeight: (data) => margin * 2 + Math.ceil(data.length / getCardsPerRow()) * itemHeightM + 'px'
    };
  };

  return {
    original: getOriginalLayout(),
    card: getCardLayout(),
    diagram: getDiagramLayout()
  };
};
