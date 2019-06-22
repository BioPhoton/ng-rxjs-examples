export const getLayouts = () => {

  const getCardLayout = () => {

    const itemHeight = 160;
    const itemWidth = 280;
    const margin = 10;

    const itemWidthM = itemWidth + margin * 2;
    const itemHeightM = itemHeight + margin * 2;

    const getCardsPerRow = (): number => {
      const width = window.innerWidth - margin * 2;
      return Math.floor(width / itemWidth);
    };

    return {
      name: 'card',
      top: (d, i) => Math.floor(i / getCardsPerRow()) * itemHeightM + 'px',
      left: (d, i) => (i % getCardsPerRow()) * itemWidthM + 'px',
      height: itemHeight + 'px',
      width: itemWidth + 'px',
      totalHeight: (data) => margin*2 + Math.ceil(data.length / getCardsPerRow()) * itemHeightM
    }
  };

  const getDiagramLayout = () => {

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
      name: 'diagram',
      top: (d, i) => Math.floor(i / getCardsPerRow()) * itemHeightM + 'px',
      left: (d, i) => (i % getCardsPerRow()) * itemWidthM + 'px',
      height: itemHeight + 'px',
      width: itemWidth + 'px',
      totalHeight: (data) => margin*2 + Math.ceil(data.length / getCardsPerRow()) * itemHeightM
    }
  }

  return {
    card: getCardLayout(),
    diagram: getDiagramLayout()
  };
}
