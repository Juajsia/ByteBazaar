import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  ngOnInit() {
    const images = [
        '../../../assets/1.jpg',
        '../../../assets/2.jpg',
        '../../../assets/3.jpg'
    ];
    const intervalTimeMs = 8000;
    let currentPosition = 0;
    let $btnGoBack: any = document.querySelector('#goBack');
    let $btnGoAhead: any = document.querySelector('#goAhead');
    let $image: HTMLElement | null = document.querySelector('#image');
    let interval: any;
    
    function passPicture() {
        if (currentPosition >= images.length - 1) {
            currentPosition = 0;
        } else {
            currentPosition++;
        }
        renderImage();
    }

    function goBackPicture() {
        if (currentPosition <= 0) {
            currentPosition = images.length - 1;
        } else {
            currentPosition--;
        }
        renderImage();
    }
    
    function renderImage() {
        $image!.style.backgroundImage = `url(${images[currentPosition]})`;
    }
    
    function playinterval() {
        interval = setInterval(passPicture, intervalTimeMs);
    }
    
    function stopinterval() {
        clearInterval(interval);
        interval = null;
    }
    
    function passPictureManual() {
        stopinterval();
        passPicture();
        playinterval();
    }
    
    function goBackPictureManual() {
        stopinterval();
        goBackPicture();
        playinterval();
    }
    
    $btnGoAhead.addEventListener('click', passPictureManual);
    $btnGoBack.addEventListener('click', goBackPictureManual);
    
    renderImage();
    playinterval()
}
}
