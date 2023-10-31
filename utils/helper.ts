export function dataURLtoFile(dataurl: string, filename: string) {
  let arr = dataurl.split(","),
    mime = arr[0]?.match(/:(.*?);/)?.[1],
    bstr = atob(arr[arr.length - 1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export function daysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate();
}

export function toggleFullscreen(fullscreen: boolean, element: any) {
  if (fullscreen) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      //@ts-ignore
    } else if (document.mozCancelFullScreen) {
      //@ts-ignore
      document.mozCancelFullScreen();
      //@ts-ignore
    } else if (document.webkitExitFullscreen) {
      //@ts-ignore
      document.webkitExitFullscreen();
      //@ts-ignore
    } else if (document.msExitFullscreen) {
      //@ts-ignore
      document.msExitFullscreen();
    }
  }
}

export function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function uniqueArray<T extends Object>(arr: T[], key: keyof T): T[] {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}
