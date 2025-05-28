// components/ProfilePresenter.ts

import ProfileModel from './ProfileModel';

export interface MyPageInterface {
  updateImage: (src: string) => void;
  openFileDialog: () => void;
}

export default class MyPagePresenter {
  private view: MyPageInterface;
  private model: ProfileModel;

  constructor(view: MyPageInterface, model: ProfileModel) {
    this.view = view;
    this.model = model;
  }

  public onImageSelected(file: File): void {
    this.model.setImage(file, (src) => {
      this.view.updateImage(src);
    });
  }

  public onClickCameraButton(): void {
    this.view.openFileDialog();
  }
}
