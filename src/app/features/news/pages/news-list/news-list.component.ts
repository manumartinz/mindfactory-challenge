import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { News } from '../../models/news.interface';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ButtonModule, ConfirmDialogModule],
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  noticias: News[] = [];
  cargando = true;
  error = '';
  categoriaSeleccionada = '';
  idEliminando: string | null = null;

  constructor(private servicioNoticias: NewsService) { }

  ngOnInit() {
    this.cargarNoticias();
  }

  obtenerNoticiasFiltradas(): News[] {
    if (this.categoriaSeleccionada) {
      return this.noticias.filter(noticia => noticia.category === this.categoriaSeleccionada);
    }
    return this.noticias;
  }

  cargarNoticias() {
    this.cargando = true;
    this.error = '';

    this.servicioNoticias.getAllNews().subscribe({
      next: (noticias) => {
        this.noticias = noticias;
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error al cargar las noticias. Asegúrate de que json-server esté ejecutándose.';
        this.cargando = false;
      }
    });
  }

  eliminarNoticia(id: string) {
    if (!confirm('¿Estás seguro de que quieres eliminar esta noticia?')) return;

    this.idEliminando = id;
    this.servicioNoticias.deleteNews(id).subscribe({
      next: () => {
        this.noticias = this.noticias.filter(noticia => noticia.id !== id);
        this.idEliminando = null;
      },
      error: () => {
        this.error = 'Error al eliminar la noticia';
        this.idEliminando = null;
      }
    });
  }

  obtenerResumen(contenido: string): string {
    return contenido.length > 150 ? contenido.substring(0, 150) + '...' : contenido;
  }

  trackByFn(index: number, item: News): string | number {
    return item.id || index;
  }
} 