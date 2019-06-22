import { Layout } from '../../layout.interface';

export interface LayoutConfig {[name: string]: Layout}

export interface LayoutSelectionState {
  layoutOptions: string[],
  layoutConfig: LayoutConfig
}
