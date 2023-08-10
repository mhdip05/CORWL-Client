import { CustomModel } from './../_models/CustomModel';

export class GridModel extends CustomModel {
  cols: any[] = [];
  data: any[] = [];

  loading = false;
  isInsert = false;
  gridLoad = false;
  
}
