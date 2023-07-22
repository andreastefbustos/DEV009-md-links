# Markdown Links

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Instalación](#3-instalación)
* [4. Comandos](#4-comandos)
* [5. Criterios de aceptación mínimos del proyecto](#5-criterios-de-aceptación-mínimos-del-proyecto)
* [6. Entregables](#6-entregables)
* [7. Hacker edition](#7-hacker-edition)
* [8. Pistas, tips y lecturas complementarias](#8-pistas-tips-y-lecturas-complementarias)
* [9. Checklist](#9-checklist)
* [10. Achicando el problema](#10-achicando-el-problema)

***

## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...) y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

## 2. Resumen del proyecto

`md-Links` es una librería desarrollada en Node.js que ofrece funciones para verificar, leer y analizar los enlaces presentes en archivos con formato `Markdown`. Esta herramienta es especialmente útil para examinar la documentación que deseamos incorporar a nuestros proyectos, ya que nos permite detectar enlaces repetidos, rotos o válidos.

Con mdLinks, podemos asegurarnos de que los enlaces presentes en nuestros archivos Markdown sean correctos y estén funcionando adecuadamente. Además, nos brinda la posibilidad de identificar aquellos enlaces que puedan estar llevándonos a páginas inexistentes o con errores, evitando así posibles problemas para los usuarios de nuestro proyecto.

Gracias a la facilidad de uso y la capacidad de análisis de `mdLinks`, podemos mantener la integridad y la calidad de la documentación de nuestros proyectos, garantizando que los enlaces estén siempre actualizados y en buen estado.

## 3. Instalación

Se debe de ejecutar este comando

```npm i md-links-asb```

## 4. Comandos

1. Accede a la terminal y ejecuta el siguiente comando:

```md-links --help```

El primer comando mostrará las instrucciones para ejecutar el programa y las opciones disponibles.

```
Explore the mdLinks Library.


Usage: md-links <path> [options]

Options:
md-links ./docs                         Analyze links in the "docs" folder
md-links ./docs --validate              Verify links and their status
md-links ./docs --stats                 Get statistics of total and unique links
md-links ./docs --validate --stats      Get complete link analysis including broken links
```

Asegúrate de seguir las instrucciones detalladamente para obtener el resultado deseado.

2. Al ejecutar el siguiente comando 

```md-links ./docs```

Obtendremos un arreglo de objetos con las propiedades:

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.

```
[
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: '/Users/andreabustos/workdir/laboratoria/DEV009-md-links/data_testing/subFolder/sub1/sub-test.md'
  },
  {
    href: 'https://nodejs.org/',
    text: 'Node.js',
    file: '/Users/andreabustos/workdir/laboratoria/DEV009-md-links/data_testing/subFolder/sub-test.md'
  },
  {
    href: 'https://user-images.githubusercontent.com',
    text: 'md-links',
    file: '/Users/andreabustos/workdir/laboratoria/DEV009-md-links/sub-test.md'
  },
  {
    href: 'https://davichobits.github.io/demo-mdlinks/docs/hitos/hito-4',
    text: 'Markdown',
    file: '/Users/andreabustos/workdir/laboratoria/DEV009-md-links/data_testing/subFolder/test-noLinks.md'
  },
  {
    href: 'https://mdn.github.io/learning-area/javascript/apis/introduction/maps-example.html',
    text: 'Node.js',
    file: '/Users/andreabustos/workdir/laboratoria/DEV009-md-links/data_testing/test-noLinks.md'
  },
  {
    href: 'https://httpstat.us/450',
    text: 'md-links',
    file: '/Users/andreabustos/workdir/laboratoria/DEV009-md-links/test-noLinks.md'
  }
]
```




### 2) CLI (Command Line Interface - Interfaz de Línea de Comando)

El ejecutable de nuestra aplicación debe poder ejecutarse de la siguiente
manera a través de la **terminal**:

`md-links <path-to-file> [options]`

Por ejemplo:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

El comportamiento por defecto no debe validar si las URLs responden ok o no,
solo debe identificar el archivo markdown (a partir de la ruta que recibe como
argumento), analizar el archivo Markdown e imprimir los links que vaya
encontrando, junto con la ruta del archivo donde aparece y el texto
que hay dentro del link (truncado a 50 caracteres).

#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo debe hacer una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok.

Por ejemplo:

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```

Vemos que el _output_ en este caso incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

##### `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

También podemos combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```

## 6. Entregables

Módulo instalable via `npm install <github-user>/md-links`. Este módulo debe
incluir tanto **un ejecutable** como **una interfaz** que podamos importar con `require`
para usarlo programáticamente.

## 7. Hacker edition

Las secciones llamadas _Hacker Edition_ son **opcionales**. Si **terminaste**
con todo lo anterior y te queda tiempo, intenta completarlas. Así podrás
profundizar y/o ejercitar más sobre los objetivos de aprendizaje del proyecto.

* Puedes agregar la propiedad `line` a cada objeto `link` indicando en qué línea
  del archivo se encontró el link.
* Puedes agregar más estadísticas.
* Integración continua con Travis o Circle CI.

***

## 8. Pistas, tips y lecturas complementarias

Súmate al canal de Slack
[#project-md-links](https://claseslaboratoria.slack.com/archives/C03T1E5TJCQ)
para conversar y pedir ayuda del proyecto.

### FAQs

#### ¿Cómo hago para que mi módulo sea _instalable_ desde GitHub?

Para que el módulo sea instalable desde GitHub solo tiene que:

* Estar en un repo público de GitHub
* Contener un `package.json` válido

Con el comando `npm install githubname/reponame` podemos instalar directamente
desde GitHub. Ver [docs oficiales de `npm install` acá](https://docs.npmjs.com/cli/install).

Por ejemplo, el [`course-parser`](https://github.com/Laboratoria/course-parser)
que usamos para la currícula no está publicado en el registro público de NPM,
así que lo instalamos directamente desde GitHub con el comando `npm install
Laboratoria/course-parser`.

### Sugerencias de implementación

La implementación de este proyecto tiene varias partes: leer del sistema de
archivos, recibir argumentos a través de la línea de comando, analizar texto,
hacer consultas HTTP, ... y todas estas cosas pueden enfocarse de muchas formas,
tanto usando librerías como implementando en VanillaJS.

Por poner un ejemplo, el _parseado_ (análisis) del markdown para extraer los
links podría plantearse de las siguientes maneras (todas válidas):

* Usando un _módulo_ como [markdown-it](https://github.com/markdown-it/markdown-it),
  que nos devuelve un arreglo de _tokens_ que podemos recorrer para identificar
  los links.
* Siguiendo otro camino completamente, podríamos usar
  [expresiones regulares (`RegExp`)](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions).
* También podríamos usar una combinación de varios _módulos_ (podría ser válido
  transformar el markdown a HTML usando algo como [marked](https://github.com/markedjs/marked)
  y de ahí extraer los link con una librería de DOM como [JSDOM](https://github.com/jsdom/jsdom)
  o [Cheerio](https://github.com/cheeriojs/cheerio) entre otras).
* Usando un _custom renderer_ de [marked](https://github.com/markedjs/marked)
  (`new marked.Renderer()`).

No dudes en consultar a tus compañeras y coaches
si tienes dudas existenciales con respecto a estas decisiones. No existe una
"única" manera correcta :wink:

### Tutoriales / NodeSchool workshoppers

* [learnyounode](https://github.com/workshopper/learnyounode)
  Considera los primeros puntos para conocer más de Node.js, y cuales
  son pertinentes a este proyecto, no es necesario hacer todos los pasos.
* [how-to-npm](https://github.com/workshopper/how-to-npm)
* [promise-it-wont-hurt](https://github.com/stevekane/promise-it-wont-hurt)

### Otros recursos

* [Acerca de Node.js - Documentación oficial](https://nodejs.org/es/about/)
* [Node.js file system - Documentación oficial](https://nodejs.org/api/fs.html)
* [Node.js http.get - Documentación oficial](https://nodejs.org/api/http.html#http_http_get_options_callback)
* [Node.js - Wikipedia](https://es.wikipedia.org/wiki/Node.js)
* [What exactly is Node.js? - freeCodeCamp](https://medium.freecodecamp.org/what-exactly-is-node-js-ae36e97449f5)
* [¿Qué es Node.js y para qué sirve? - drauta.com](https://www.drauta.com/que-es-nodejs-y-para-que-sirve)
* [¿Qué es Nodejs? Javascript en el Servidor - Fazt en YouTube](https://www.youtube.com/watch?v=WgSc1nv_4Gw)
* [¿Simplemente qué es Node.js? - IBM Developer Works, 2011](https://www.ibm.com/developerworks/ssa/opensource/library/os-nodejs/index.html)
* [Node.js y npm](https://www.genbeta.com/desarrollo/node-js-y-npm)
* [Asíncronía en js](https://carlosazaustre.es/manejando-la-asincronia-en-javascript)
* [NPM](https://docs.npmjs.com/getting-started/what-is-npm)
* [Publicar packpage](https://docs.npmjs.com/getting-started/publishing-npm-packages)
* [Crear módulos en Node.js](https://docs.npmjs.com/getting-started/publishing-npm-packages)
* [Leer un archivo](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback)
* [Leer un directorio](https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback)
* [Path](https://nodejs.org/api/path.html)
* [Linea de comando CLI](https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e)

## 9. Checklist

### General

* [ ] Puede instalarse via `npm install --global <github-user>/md-links`

### `README.md`

* [ ] Un board con el backlog para la implementación de la librería.
* [ ] Documentación técnica de la librería.
* [ ] Guía de uso e instalación de la librería

### API `mdLinks(path, opts)`

* [ ] El módulo exporta una función con la interfaz (API) esperada.
* [ ] Implementa soporte para archivo individual
* [ ] Implementa soporte para directorios
* [ ] Implementa `options.validate`

### CLI

* [ ] Expone ejecutable `md-links` en el path (configurado en `package.json`)
* [ ] Se ejecuta sin errores / output esperado
* [ ] Implementa `--validate`
* [ ] Implementa `--stats`

### Pruebas / tests

* [ ] Pruebas unitarias cubren un mínimo del 70% de statements, functions,
  lines, y branches.
* [ ] Pasa tests (y linters) (`npm test`).

## 10. Achicando el problema

Un "superpoder" que esperamos puedas desarrollar durante el bootcamp
es el de definir "mini-proyectos" que te acerquen paso a paso a
la solución del "gran proyecto". Es el equivalente a comenzar armando
esquinas o bordes del rompecabezas/puzzle sin saber necesariamente
cómo encajarán al final. Déjate llevar y explora.

Estas son algunas sugerencias:

### Empieza con un diagrama de flujo

Este proyecto es distinto de los que has venido trabajando hasta ahora
dado que no hay una interfaz web, todo se desarrollará en tu editor y
consola/terminal.

Es por ello que, para visualizar mejor lo que tendrás que hacer
y planificar tus tareas y objetivos, es recomendable hacer un
`diagrama de flujo`.

Si nunca has hecho un diagrama de flujo revisa este [recurso](https://www.youtube.com/watch?v=Lub5qOmY4JQ).

Una alternativa al diagrama de flujo puede ser el `pseudocódigo`.

### Planificación

En este proyecto te recomendamos usar la herramienta de planificación
y organización de GitHub llamada **Github Projects**.

Mediante **issues** y **milestones** podrás organizar y planificar
tareas y objetivos concretos.

Tomando en consideración los **entregables** del proyecto, el
[9. Checklist](#9-checklist) y los **pasos** que definiste en tu
`diagrama de flujo`, crea tu planificación en GitHub Projects.

### Antes de codear

En esta ocasión estarás trabajando en **NodeJS**, asegúrate
de saber para qué sirve y sus consideraciones.

En particular, deberás decidir desde un comienzo si usarás
`ES Modules`, es decir, **import/export**, ó, por el contrario,
`CommonJS Modules`, es decir, **require/module.exports**.

Asegurate de tener clara esta decisión desde un inicio para
que no encuentres problemas más adelante.

### Lee un archivo

Como primer reto, puedes tratar de leer un solo archivo con
una ruta fija e imprimir su contenido en la consola con un `console.log`.

La librería nativa `FS` (FileSystem) te será de utilidad.

**Recuerda**: Te sugerimos **no utilizar** la versión síncrona
de la función para leer archivos, `readFileSync`, y en cambio
intentar resolver ese desafío de manera asíncrona.

### Averigua la extensión de un archivo

Ya sabiendo leer un archivo, aventúrate a conocer cual
es su extensión.

Recuerda, las extensiones son esas letras al final del
nombre de un archivo, por ejemplo: .js, .txt, .doc, etc

Aquí también podrá ser útil `FS`.

### Obtén el contenido de un directorio

Este proyecto consiste en buscar archivos, pero para eso,
primero debes poder verlos.

Intenta imprimir en consola la lista de archivos en una carpeta.

La librería `FS` también te será útil aquí.

**Recuerda**: Para disminuir la complejidad de tu algoritmo
recursivo, te recomendamos utilizar la versión síncrona de
la función para leer directorios, `readdirSync`.

### Une dos rutas

Para poder acceder a carpetas y archivos será necesario que
indiques en qué lugar de tu computadora se encuentran, a esto
le llamamos **rutas**.

Usa la librería nativa `path` para unir dos segmentos de ruta,
por ejemplo, si queremos unir:

1) /home/Laboratoria/
2) ./test

El resultado sería: /home/Laboratoria/test

### Recursividad

Este proyecto se ha de resolver de forma casi natural con
**recursividad**.

¿Por qué?.

Porque no conocemos realmente cuantas carpetas y archivos
tendremos que recorrer antes de terminar.

Si recibes una ruta de carpeta, no sabrás de ante mano si
dentro hay más carpetas o muchos archivos.

Por ello, asegurate bien de entender de qué trata la
recursividad y ver algunos ejemplos.

Entre los recursos de este proyecto hay un video que te ayudará.

### Crea una promesa

El valor de retorno de nuestra librería es una `Promesa`,
no un `Array`.

Prueba leyendo sobre las promesas y creando una por tu
cuenta utilizando **new Promise()**

Es importante que sepas qué es un **callback** pues las
promesas los utilizarán.
