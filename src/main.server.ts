import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app'; // <--- CAMBIA DA { App } A { AppComponent }
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config); // <--- CAMBIA ANCHE QUI

export default bootstrap;