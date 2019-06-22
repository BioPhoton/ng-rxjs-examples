export interface SortConfig {
  [key: string]: boolean
}

export interface SortSelectionState {
  sortOptions: string[],
  sortConfig: SortConfig
}
