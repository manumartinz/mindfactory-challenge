
# NEWS-APP @ MindFactory | v.01

Desafío técnico de un crud básico de noticias en Angular@19.

Al momento de desarrollar la app pensé en hacerla de dos formas, una mediante el uso de LocalStorage y otra (la que elegí) 
con una librería llamada JSON-SERVER que me permite levantar un FAKE API a partir de un JSON 'db.json'.

Para el desarrollo de la UI mi idea fue implementar algunos componentes de PrimeNG@19 para que me faciliten el desarrollo en temas de funcionalidades 
que por cuestiones de tiempo no lleguea a  aplicar como por ejemplo un modal de confirmación para el eliminado de noticias, algún sistema de notificaciones para confirmar el guardado y la edición, entre otras.

# Entre otras cosas
- Llegue a desarrollar de forma símple el filtrado por categorías y un empty state en caso de que no encuentre ninguna noticia creada en esa categoría
- Tenía pensado implementar correcciones más funciones como la de busqueda por input de alguna noticia en especifico, la posibilidad de filtrado por fecha de creación,
sistema de logeo con roles, uno para usuario y otro como admin y diferenciar las funciones permitidas por cada uno mediante un guard, entre otras ideas que tenia en mente pero por cuestiones de tiempo no llegué.


# Despliegue
Para poder desplegar el app 
```bash
   npm install
   npm run dev // Esto correra tanto "ng serve", como "npx json-server db.json" para el despliegue del API.

```
