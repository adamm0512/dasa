import { Component, OnInit, HostListener, AfterViewInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: '../styles.css' // <--- Usa ./ e la barra dritta /
})
export class AppComponent implements OnInit, AfterViewInit {
  isMenuOpen = false;

  private words = ["DASA Studio.", "DASA Web & App.", "DASA Performance."];
  private i = 0;
  private j = 0;
  private isDeleting = false;
  
  public dynamicText = ""; 

  constructor(
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.checkScroll();
  }

  ngAfterViewInit() {
    // Partiamo da zero per essere sicuri che la logica giri bene
    this.dynamicText = "";
    this.j = 0;
    
    // Avviamo l'effetto
    setTimeout(() => {
      this.typeEffect();
    }, 1000);
  }

  typeEffect() {
    const currentWord = this.words[this.i];
    
    if (this.isDeleting) {
      // Cancellazione
      this.dynamicText = currentWord.substring(0, this.j - 1);
      this.j--;
    } else {
      // Scrittura
      this.dynamicText = currentWord.substring(0, this.j + 1);
      this.j++;
    }

    this.cdr.detectChanges();

    let timeout = this.isDeleting ? 50 : 100;

    // Controllo stati
    if (!this.isDeleting && this.j === currentWord.length) {
      // Parola finita, aspetta e poi cancella
      this.isDeleting = true;
      timeout = 2500;
    } else if (this.isDeleting && this.j === 0) {
      // Cancellazione finita, passa alla prossima parola
      this.isDeleting = false;
      this.i = (this.i + 1) % this.words.length;
      timeout = 500;
    }

    // Ricorsione sicura
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.zone.run(() => {
          this.typeEffect();
        });
      }, timeout);
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() { this.checkScroll(); }

  checkScroll() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => {
      const windowHeight = window.innerHeight;
      const revealTop = el.getBoundingClientRect().top;
      if (revealTop < windowHeight - 150) el.classList.add('active');
    });
  }

  toggleMenu() { this.isMenuOpen = !this.isMenuOpen; }
}