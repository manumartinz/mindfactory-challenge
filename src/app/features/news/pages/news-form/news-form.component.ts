import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TextareaModule } from 'primeng/textarea';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ButtonModule, InputTextModule, TextareaModule, ProgressSpinnerModule],
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss']
})
export class NewsFormComponent implements OnInit {
  formularioNoticias: FormGroup;
  esModoEdicion = false;
  idNoticia: string | null = null;
  cargando = false;
  enviando = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private servicioNoticias: NewsService
  ) {
    this.formularioNoticias = this.crearFormulario();
  }

  ngOnInit() {
    this.idNoticia = this.route.snapshot.paramMap.get('id');
    this.esModoEdicion = !!this.idNoticia && this.route.snapshot.url[this.route.snapshot.url.length - 1]?.path === 'edit';

    if (this.esModoEdicion) {
      this.cargarNoticiaParaEditar();
    }
  }

  crearFormulario(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', [Validators.required, Validators.minLength(20)]],
      author: ['', Validators.required],
      category: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });
  }

  cargarNoticiaParaEditar() {
    if (!this.idNoticia) return;

    this.cargando = true;
    this.servicioNoticias.getNewsById(this.idNoticia).subscribe({
      next: (noticia) => {
        this.formularioNoticias.patchValue(noticia);
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar la noticia para editar';
        this.cargando = false;
      }
    });
  }

  alEnviar() {
    if (this.formularioNoticias.invalid) {
      this.marcarFormularioTocado();
      return;
    }

    this.enviando = true;
    this.error = '';

    const datosNoticia = { ...this.formularioNoticias.value };
    
    const operacion = this.esModoEdicion && this.idNoticia
      ? this.servicioNoticias.updateNews(this.idNoticia, { id: this.idNoticia, ...datosNoticia })
      : this.servicioNoticias.createNews(datosNoticia);

    operacion.subscribe({
      next: (noticia) => {
        const idNavegar = this.esModoEdicion ? this.idNoticia : noticia.id;
        this.router.navigate(['/news', idNavegar]);
      },
      error: () => {
        this.error = this.esModoEdicion ? 'Error al actualizar la noticia' : 'Error al crear la noticia';
        this.enviando = false;
      }
    });
  }

  reiniciarFormulario() {
    this.formularioNoticias.reset();
  }

  volver() {
    const ruta = this.esModoEdicion && this.idNoticia ? ['/news', this.idNoticia] : ['/news'];
    this.router.navigate(ruta);
  }

  limpiarError() {
    this.error = '';
  }

  esCampoInvalido(nombreCampo: string): boolean {
    const campo = this.formularioNoticias.get(nombreCampo);
    return campo?.invalid && (campo.dirty || campo.touched) || false;
  }

  esUrlValida(url: string): boolean {
    try {
      return !!new URL(url);
    } catch {
      return false;
    }
  }

  private marcarFormularioTocado() {
    Object.values(this.formularioNoticias.controls).forEach(control => control.markAsTouched());
  }
} 