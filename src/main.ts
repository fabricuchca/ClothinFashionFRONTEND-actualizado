import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { ComponenteModule } from './app/component/componente/componente.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
