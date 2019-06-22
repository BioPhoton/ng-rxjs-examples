import * as d3 from 'd3';
import * as fastSort from 'fast-sort';

export function getColorMap(data) {

  const propertiesToGroup = Object.keys(data[0]);
  const groups = propertiesToGroup.reduce((o, prop) => {
    o[prop] = data.reduce((g: any, i): any => {
      g[i[prop]] = true;
      return g;
    }, {});
    return o;
  }, {});

  const getColorFactory = (l) => d3.scaleSequential().domain([0, l]).interpolator(d3.interpolateSpectral);

  const groupsColorMap = Object.entries(groups)
    .map(([p, g]):any => {
      const gK = Object.keys(g);
      const gC = getColorFactory(gK.length);
      const r = gK.reduce((acc:any, v, i):any => {
        acc[v] = gC(i);
        return acc;
      }, {});

      return [p, r];
    })
    .reduce((a: any, [k, v]):any => {
      a[k] = v;
      return a;
    }, {});

  return groupsColorMap;

}

export function sort(sorting, data: any[]): any[] {
  const sortConfig = Object.entries(sorting)
    .reduce((config, [key, direction]) => {
      config.push({ [direction ? 'asc' : 'desc']: d => d[key] });
      return config;
    }, []);
  return sortConfig.length ? fastSort([...data]).by(sortConfig) : data;
}

export function filter(d: any[], filterConfig): any[] {
  return d && filterConfig ?
    d.filter(d => d.name.search(filterConfig) >= 0) :
    d;
}
