import { dataURLtoFile } from "@/utils/helper";

export const BOX_WIDTH = 500;
export const BOX_HEIGHT = 500;

export type CropImageEvent =
  | "zoomDefault"
  | "rotate"
  | "zoom"
  | "translate"
  | "result";

export class CropImage {
  initTranslate = { x: 0, y: 0 };
  _translate = { x: 0, y: 0 };
  _zoomDefault = 1;
  _rotate = 0;
  _zoom = 1;
  image!: HTMLImageElement;

  constructor(
    public id: string,
    private fileImage: File,
  ) {
    const imageFile = new Image();
    imageFile.src = URL.createObjectURL(fileImage);
    imageFile.onload = () => {
      this.image = imageFile;
      const zoomX = BOX_WIDTH / imageFile.width;
      const zoomY = BOX_HEIGHT / imageFile.height;
      const zoom = zoomX < zoomY ? zoomY : zoomX;
      this.zoomDefault = zoom;
    };
  }

  get height(): number {
    return this.rotate === 90 || this.rotate === 270
      ? this.image.width
      : this.image.height;
  }

  get width(): number {
    return this.rotate === 90 || this.rotate === 270
      ? this.image.height
      : this.image.width;
  }

  private rotateImage = (image: HTMLImageElement, rotate: number) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = this.width;
    canvas.height = this.height;

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(getRadianAngle(rotate));

    ctx.drawImage(this.image, -image.width / 2, -image.height / 2);
    return new Promise<HTMLImageElement>((res, rej) => {
      const image = new Image();

      image.src = canvas.toDataURL(this.fileImage.type);
      image.onload = () => {
        res(image);
      };
    });
  };

  public saveImage = async () => {
    const image = await this.rotateImage(this.image, this.rotate);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx || !image) return;

    canvas.width = BOX_WIDTH;
    canvas.height = BOX_HEIGHT;

    ctx.translate(BOX_WIDTH / 2, BOX_HEIGHT / 2);

    const zoom = this.zoom * this.zoomDefault;

    ctx.drawImage(
      image,
      (BOX_WIDTH - this.width * zoom) / 2 +
        this.translate.x * zoom -
        BOX_WIDTH / 2,
      (BOX_HEIGHT - this.height * zoom) / 2 +
        this.translate.y * zoom -
        BOX_HEIGHT / 2,
      this.width * zoom,
      this.height * zoom,
    );

    // As Base64 string
    const base64 = canvas.toDataURL(this.fileImage.type);

    this.imageBiding(base64);
    // downloadURI(base64, 'name.jpg');
  };

  private dispatchEvent = <
    T extends CropImageEvent,
    Data = { [key in T]: any },
  >(
    message: `${T}`,
    data: Data,
  ) => {
    window.dispatchEvent(
      new CustomEvent<Data>(`${message}-${this.id}`, {
        detail: data,
      }),
    );
  };

  private translateBiding(x: number, y: number, zoom: number) {
    if (y >= (this.height * zoom - BOX_HEIGHT) / zoom / 2) {
      y = (this.height * zoom - BOX_HEIGHT) / zoom / 2;
    }

    if (y <= -(this.height * zoom - BOX_HEIGHT) / zoom / 2) {
      y = -(this.height * zoom - BOX_HEIGHT) / zoom / 2;
    }

    if (x >= (this.width * zoom - BOX_WIDTH) / zoom / 2) {
      x = (this.width * zoom - BOX_WIDTH) / zoom / 2;
    }

    if (x <= -(this.width * zoom - BOX_WIDTH) / zoom / 2) {
      x = -(this.width * zoom - BOX_WIDTH) / zoom / 2;
    }

    this.translate = { x, y };
  }

  get zoomDefault() {
    return this._zoomDefault;
  }

  private set zoomDefault(zoomDefault) {
    this.dispatchEvent("zoomDefault", { zoomDefault });
    this._zoomDefault = zoomDefault;
  }

  get rotate() {
    return this._rotate;
  }

  private set rotate(rotate) {
    this.dispatchEvent("rotate", { rotate });
    this._rotate = rotate;

    const zoomX = BOX_WIDTH / this.width;
    const zoomY = BOX_HEIGHT / this.height;
    const zoomDefault = zoomX < zoomY ? zoomY : zoomX;
    this.zoomDefault = zoomDefault;

    const { x, y } = this.translate;
    const zoom = this.zoom * this.zoomDefault;

    this.translateBiding(x, y, zoom);
  }

  get zoom() {
    return this._zoom;
  }

  private set zoom(zoomParams) {
    this.dispatchEvent("zoom", { zoom: zoomParams });
    this._zoom = zoomParams;

    const { x, y } = this.translate;
    const zoom = zoomParams * this.zoomDefault;

    this.translateBiding(x, y, zoom);
  }

  get translate() {
    return this._translate;
  }

  private set translate(translate) {
    let { x, y } = translate;
    const zoom = this.zoom * this.zoomDefault;
    if (y > (this.height * zoom - BOX_HEIGHT) / zoom / 2 + 1) {
      y = this.translate.y;
    }

    if (y < -(this.height * zoom - BOX_HEIGHT) / zoom / 2 - 1) {
      y = this.translate.y;
    }

    if (x > (this.width * zoom - BOX_WIDTH) / zoom / 2 + 1) {
      x = this.translate.x;
    }

    if (x < -(this.width * zoom - BOX_WIDTH) / zoom / 2 - 1) {
      x = this.translate.x;
    }

    this.dispatchEvent("translate", { translate: { x, y } });
    this._translate = { x, y };
  }

  onMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    this.initTranslate = { x: event.clientX, y: event.clientY };
    const translateInit = { ...this.translate };

    const handleMouseMove = (event: MouseEvent) => {
      if (!this.image) return;

      const x = translateInit.x + event.clientX - this.initTranslate.x;
      const y = translateInit.y + event.clientY - this.initTranslate.y;

      this.translate = { x, y };
    };

    const handleMouseUp = (event: MouseEvent) => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  onZoom = (value: number[]) => {
    this.zoom = value[0];
  };

  onRotate = () => {
    if (this.rotate === 270) {
      this.rotate = 0;
      return;
    }

    this.rotate -= 90;
  };

  imageBiding(image: string) {
    const file = dataURLtoFile(image, this.fileImage.name);

    this.dispatchEvent(`result`, { result: file });
  }
}

function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180;
}

function downloadURI(uri: string, name: string) {
  const link = document.createElement("a");
  // If you don't know the name or want to use
  // the webserver default set name = ''
  link.setAttribute("download", name);
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  link.remove();
}
