import { Component } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Plugins } from '@capacitor/core';
const { CameraPreview } = Plugins;
import { CameraPreviewOptions, CameraPreviewPictureOptions } from '@capacitor-community/camera-preview';

import '@capacitor-community/camera-preview'
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  image = null;
  public lat;
  public lng;
  iframeSrc;
  width = window.innerWidth;
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.iframeSrc = `https://maps.google.com/maps?q=${this.lat},${this.lng}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
          
        }
      },
        (error: any) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  cameraActive = false;
  torchActive = false;
  constructor(private sanitizer: DomSanitizer) {
    this.getLocation();
  }
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  async openCamera() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    this.image = image.webPath;
  }
}
