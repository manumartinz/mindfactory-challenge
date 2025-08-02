import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { News } from '../../models/news.interface';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  noticia: News | null = null;
  cargando = true;
  error = '';
  eliminando = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicioNoticias: NewsService
  ) {}

  ngOnInit() {
    this.cargarNoticia();
  }

  cargarNoticia() {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (!id) {
      this.error = 'ID de noticia no válido';
      this.cargando = false;
      return;
    }

    this.cargando = true;
    this.error = '';
    
    this.servicioNoticias.getNewsById(id).subscribe({
      next: (noticia) => {
        this.noticia = noticia;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar la noticia. Verifica que existe y que json-server esté ejecutándose.';
        this.cargando = false;
      }
    });
  }

  eliminarNoticia() {
    if (!this.noticia?.id) return;
    if (!confirm('¿Estás seguro de que quieres eliminar esta noticia? Esta acción no se puede deshacer.')) return;

    this.eliminando = true;
    
    this.servicioNoticias.deleteNews(this.noticia.id).subscribe({
      next: () => {
        this.router.navigate(['/news']);
      },
      error: () => {
        this.error = 'Error al eliminar la noticia';
        this.eliminando = false;
      }
    });
  }

  volver() {
    this.router.navigate(['/news']);
  }
} 