// components/ProfileModel.ts
export default class MyPageModel {
  private imageSrc: string;

  constructor() {
    this.imageSrc = 'default-profile.png';
  }

  public getImage(): string {
    return this.imageSrc;
  }

  public setImage(file: File, callback: (src: string) => void): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        this.imageSrc = e.target.result as string;
        callback(this.imageSrc);
      }
    };
    reader.readAsDataURL(file);
  }
}
