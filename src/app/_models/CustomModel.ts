export class CustomModel {
  model: any = {};
  editModel: any = {};
  rollbackModel: any = {};
  validationModel: any = {};
  cascadeCityModel: any = { disabledCity: true, load: false };
  isAmend = false;
  editMode = false;
  disabled = false;
  hasValidation = false;
  isRemoved = false;
  displayDialog = false;
  displayModal = false;
  selected: any;
  files!: File[];

  hideModal = () => (this.displayModal = false);

  hideDialog = () => (this.displayDialog = false);

  onFileUpload = (event: any) => (this.files = event);

  clearAllFiles = () => {
    if (this.model.file) delete this.model.file;
    this.files = [];
  };

  withFormData: any = () => {
    const formData = new FormData();
    var files = this.files;

    Object.entries(this.model).forEach(([key, value]: any) => {
      formData.append(key, value);
    });

    if (files !== undefined) {
      for (const file of files) {
        formData.append('files', file, file.name);
      }
    }
    return formData;
  };

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

  changeDropdown = (data: any, objId?: any, objName?: any) => {
    if (objId) {
      const obj = {
        [objId]: Object.values(data)[0],
        [objName]: Object.values(data)[1],
      };
      this.model = { ...this.model, ...obj };
      return;
    }
    this.model = { ...this.model, ...data };
  };

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
    //console.log(e);
    this.hasValidation = true;
    if (e.error.errors) {
      this.validationModel = { ...e.error.errors };
      //console.log(this.validationModel);
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
    if (editMode == false) {
      this.model = {};
      this.resetDropDown();
    } else {
      this.model = { ...this.model, ...this.editModel };
    }
    //console.log(this.editModel)
    //console.log(this.model)
  };

  resetAll = () => {
    this.validationModel = {};
    this.model = {};
    this.isAmend = false;
    this.editMode = false;
    this.disabled = false;
    this.hasValidation = false;
    this.isRemoved = false;
    this.resetDropDown();
  };

  private isValidDate(value: any) {
    const parsedDate = Date.parse(value);
    return !isNaN(parsedDate);
  }

  removeValidationMsg(
    event: Event | any,
    inputName: string,
    isInputDropdown = false,
    dropdownName?: any
  ): void {
    let inputValue = '';

    if (this.isValidDate(new Date(event)) == false) {
      inputValue = (event.target as HTMLInputElement).value.trim();
    } else {
      delete this.validationModel[inputName];
      return;
    }

    if (isInputDropdown && this.model[dropdownName]) {
      delete this.validationModel[inputName];
      return;
    }

    if (inputValue.length !== 0 && inputName in this.validationModel) {
      delete this.validationModel[inputName];
      return;
    }
  }

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
