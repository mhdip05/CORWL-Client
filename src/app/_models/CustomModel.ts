export class CustomModel {
  model: any = {};
  rollbackModel: any = {};
  validationModel: any = {};
  cascadeCityModel: any = { disabledCity: true, load: false };
  isAmend = false;
  editMode = false;
  disabled = false;
  hasValidation = false;
  isRemoved = false;
  showDialog = false;
  selected: any;

  changeCountry = (data: any) => {
    //console.log(data);

    this.model.countryId = data.countryId;
    this.model.countryName = data.countryName;

    if (data.countryId == 0) {
      this.model.cityId = 0;
      this.model.cityName = null;
      this.cascadeCityModel.disabledCity = true;
      return;
    }

    this.model.cityId = 0;
    this.model.cityName = null;
    this.cascadeCityModel.load = true;
    this.cascadeCityModel.disabledCity = false;
  };

  changeDropdown = (data: any) => {
    this.model = { ...this.model, ...data };
  };

  changeStaticDropdown = (event:any) => {
    //console.log(event)

    //this.model = event.value;
  }

  viewData = (data: any) => {
    //console.log(data);
    this.editMode = false;
    this.model = { ...data };
    setTimeout(() => {
      this.editMode = true;
    }, 0);
    this.isAmend = true;
  };

  validationReset = () => {
    this.validationModel = {};
  };

  handleError = (e: any): any => {
    this.hasValidation = true;
    if (e.error.errors) {
      this.validationModel = { ...e.error.errors };
      return { isDbError: false };
    } else if (e.error) {
      return { isDbError: true, dbError: e.error };
    } else {
      return { isDbError: true, dbError: 'Something went wrong' };
    }
  };

  private resetDropDown = () => {
    var list: any = document.getElementsByClassName('p-dropdown-clear-icon');
    if (list.length === 0) return;
    for (var i = 0; i < list.length; i++) {
      list[i]?.click();
    }
  };

  reset = (editMode?: boolean, callback?: any) => {
    this.validationModel = {};
    this.resetDropDown();
    if (editMode == false) this.model = {};
  };

  resetAll = () => {
    this.validationModel = {};
    this.model = {};
    this.isAmend = false;
    this.editMode = false;
    this.disabled = false;
    this.hasValidation = false;
    this.isRemoved = false;
    this.showDialog = false;
    this.resetDropDown();
  };


  // permissionForEdit = (companyId: number) => {
  //   if (this.utilService.checkIntegerInUrl(companyId) == false) {
  //     this.customModel.editMode = true;
  //     this.allowEdit = false;
  //   } else {
  //     this.allowEdit = true;
  //     this.getCompanyById();
  //   }
  // };

  rollback() {
    //this.customModel.cascadeCityModel.disabledCity = true;
    // this.customModel.editMode = false;
    // this.customModel.model = {...this.rollbackModel}
    // setTimeout(() => {
    //   this.customModel.editMode = true;
    // }, 0);
    // console.log(this.rollbackModel)
    // console.log(this.customModel.model)
  }

  // @HostListener('window:keyup.w', ['$event']) w(e: KeyboardEvent) {
  //   console.log('w captured', e);
  // }

  // @HostListener('window:keyup.w', ['$event']) s(e: KeyboardEvent) {
  //   console.log('shift w captured', e);
  // }

  // @HostListener('window:keyup.f8', ['$event']) sw(e: KeyboardEvent) {
  //   this.rollbackModel = {...this.customModel.model}
  // }
}