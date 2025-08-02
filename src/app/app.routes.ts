import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/news',
    pathMatch: 'full'
  },
  {
    path: 'news',
    loadComponent: () => import('./features/news/pages/news-list/news-list.component').then(m => m.NewsListComponent)
  },
  {
    path: 'news/new',
    loadComponent: () => import('./features/news/pages/news-form/news-form.component').then(m => m.NewsFormComponent)
  },
  {
    path: 'news/:id',
    loadComponent: () => import('./features/news/pages/news-detail/news-detail.component').then(m => m.NewsDetailComponent)
  },
  {
    path: 'news/:id/edit',
    loadComponent: () => import('./features/news/pages/news-form/news-form.component').then(m => m.NewsFormComponent)
  },
  {
    path: '**',
    redirectTo: '/news'
  }
];
