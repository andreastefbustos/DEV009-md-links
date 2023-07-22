# Markdown Links

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Instalación](#3-instalación)
* [4. Comandos](#4-comandos)
* [5. Errores](#5-errores)

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

El primer comando mostrará las instrucciones para ejecutar el programa y los ejecutables disponibles.

```sh
Explore the mdLinks Library.


Usage: md-links <path> [options]

Comandos:
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

```shell
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

3. Comando `--validate`

Ejecutar --> `md-links ./docs --validate`

Obtendremos un arreglo de objetos con las propiedades:

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.
* `status`: Código de respuesta HTTP.
* `ok`: Mensaje `fail` en caso de fallo u `ok` en caso de éxito.

```shell
[
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: '/Users/andreabustos/workdir/laboratoria/DEV009-md-links/data_testing/subFolder/sub-test.md',
    status: 200,
    ok: 'ok'
  },
  {
    href: 'https://nodejs.org/',
    text: 'Node.js',
    file: '/Users/andreabustos/workdir/laboratoria/DEV009-md-links/data_testing/subFolder/sub-test.md',
    status: 200,
    ok: 'ok'
  },
  {
    href: 'https://user-images.githubusercontent.com',
    text: 'md-links',
    file: '/Users/andreabustos/workdir/laboratoria/DEV009-md-links/sub-test.md',
    status: 200,
    ok: 'ok'
  },
  {
    href: 'https://davichobits.github.io/demo-mdlinks/docs/hitos/hito-4',
    text: 'Markdown',
    file: '/Users/andreabustos/workdir/laboratoria/DEV009-md-links/data_testing/subFolder/test-noLinks.md',
    status: 404,
    ok: 'fail'
  },
  {
    href: 'https://mdn.github.io/learning-area/javascript/apis/introduction/maps-example.html',
    text: 'Node.js',
    file: '/Users/andreabustos/workdir/laboratoria/DEV009-md-links/data_testing/test-noLinks.md',
    status: 404,
    ok: 'fail'
  },
  {
    href: 'https://httpstat.us/450',
    text: 'md-links',
    file: '/Users/andreabustos/workdir/laboratoria/DEV009-md-links/test-noLinks.md',
    status: 450,
    ok: 'fail'
  }
]
```

4. Comando `--stats`

Ejecutar --> `md-links ./docs --stats`

Al utilizar esta opción, podrás obtener estadísticas relacionadas con los enlaces presentes en los archivos Markdown.

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

* Los `links Total` representan la cantidad total de enlaces encontrados en los archivos analizados. Cada enlace único se contabiliza, incluso si aparece varias veces en diferentes archivos.

* Los `links Unique` muestran la cantidad de enlaces distintos presentes en los archivos Markdown. Si un mismo enlace aparece en varios archivos, solo se contará una vez en esta métrica.

Utiliza esta opción para obtener una visión general de la cantidad total de enlaces y la diversidad de enlaces únicos en tus documentos Markdown.

5. Comando `--validate` y `--stats`

Ejecutar --> `md-links ./docs --validate --stats`

También podemos combinar `--validate` y `--stats` para obtener estadísticas que necesiten de los resultados de la validación.

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```

* `Broken:` El número de enlaces que están rotos o no devuelven un código de estado 200.

## 5. Errores

* Cuando el `./docs` no existe
```sh
md-links ./docs                    
Error: The provided path does not exist. Please provide a valid path.
```

* Cuando las carpetas no tienen archivos 
```sh
md-links ./docs
Error: No Markdown files found in the directory or subdirectories.
```

* Cuando el archivo no tiene la extensión .md `markdown` 
```sh
md-links ./docs.txt                  
Error: The file is not a Markdown.
```

* Cuando los comandos ejecutables son erróneos 
```sh
md-links ./docs --novalidate
Error: The argument '--novalidate' is invalid, the valid options are: --validate, --stats
```