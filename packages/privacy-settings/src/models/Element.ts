import { Type } from './Type';
import { Option } from './Option';

export class Element {
  type: Type;
  label: string;
  value: string | boolean;
  options?: Array<Option> = [];
}