import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  public openFile(url: string): void {
    if (url.startsWith('http')) {
      window.open(url);
    } else if (url.startsWith('data')) {
      const pdfWindow = window.open('') || new Window;
      pdfWindow.document.write('<iframe width="100%" height="100%" src="' + encodeURI(url) + '"></iframe>');
    }
  }
  
  public getIconFile(fileName: string): string {
    const name = fileName.replace(/^.*[\\\/]/, '').toLowerCase();
    if (name.split('.').pop()?.startsWith('pdf')) {
      return './assets/dist/img/file-ext/pdf.png';
    } else if (name.split('.').pop()?.startsWith('xml')) {
      return './assets/dist/img/file-ext/xml.png';
    }
    return './assets/dist/img/file-ext/txt.png';
  }

  public readXmlAsync(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader: any = new FileReader();
      reader.onload = () => { resolve(reader.result); };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  public async readFileAsync(file: File) {
    return new Promise((resolve, reject) => {
      const reader: any = new FileReader();
      reader.onload = () => { resolve(reader.result); };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}
