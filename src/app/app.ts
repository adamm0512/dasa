import { Component, OnInit, AfterViewInit, HostListener, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['../styles.css'] // Verifica se il tuo file si chiama app.css o styles.css
})
export class AppComponent implements OnInit, AfterViewInit {
  isMenuOpen = false;
  isExploring = false; // Stato per l'animazione immersiva
  currentYear = new Date().getFullYear();

  // Dati della Hero
  features = [
    { text: 'Gestionali Custom', color: 'emerald' },
    { text: 'App Scalabili', color: 'blue' },
    { text: 'Cloud Arch', color: 'slate' }
  ];

  constructor(private zone: NgZone) {}

  ngOnInit() {
    // Logica all'avvio
  }

  ngAfterViewInit() {
    this.checkScroll();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }

  /**
   * Gestisce l'apparizione degli elementi (reveal) allo scroll
   */
  checkScroll() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el: any) => {
      const windowHeight = window.innerHeight;
      const revealTop = el.getBoundingClientRect().top;
      if (revealTop < windowHeight - 150) {
        el.classList.add('active');
      }
    });
  }

  /**
   * Nuova funzione per l'animazione del pulsante Esplora
   * Attivata dal (click)="startExplore()" nell'HTML
   */
  startExplore() {
    this.isExploring = true;
    
    // 1. Blocca lo scroll per evitare movimenti durante l'espansione
    document.body.style.overflow = 'hidden';

    // 2. Dopo 700ms (quando il cerchio copre la visuale)
    setTimeout(() => {
      const target = document.getElementById('perche-noi');
      if (target) {
        // Scroll istantaneo nascosto dal colore pieno
        target.scrollIntoView({ behavior: 'auto' });
      }

      // 3. Facciamo svanire l'effetto e ripristiniamo lo scroll
      setTimeout(() => {
        const circle = document.getElementById('expand-circle');
        if (circle) circle.style.opacity = '0';
        
        document.body.style.overflow = '';
        
        // 4. Reset totale degli stati dopo che tutto è terminato
        setTimeout(() => {
          this.isExploring = false;
          if (circle) circle.style.opacity = '1';
        }, 600);
      }, 300);
    }, 700);
  }

  /**
   * Gestione menu mobile
   */
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /**
   * Scroll fluido per i link della navbar e del menu mobile
   */
  scrollTo(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      this.isMenuOpen = false; // Chiude il menu mobile se aperto
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}