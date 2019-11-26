import { Element } from './Element';
import { Theme } from './Theme';

export class Setting {
  id: string;
  label: string;
  elements: Array<Element> = [];
  theme: Theme
}