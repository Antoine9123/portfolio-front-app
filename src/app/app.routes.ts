import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { WebProjectsComponent } from './pages/web-projects/web-projects.component';

export const routes: Routes = [
    {
        path: 'home', component: HomeComponent, data: { title: 'Home' }
    },
    {
        path: 'contact', component: ContactComponent, data: { title: 'Contact' }
    },
    {
        path: 'webprojects', component: WebProjectsComponent, data: { title: 'Web Projects' }
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
