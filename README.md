DOCUMENTO FINAL TÉCNICO DE ARQUITECTURA Y PROYECTO
Proyecto: Sistema Integral de Gestión Bibliotecaria y Estructuras de Datos

Integrantes del Equipo: (Escribe aquí los nombres de tu grupo)

Asignatura: Estructuras de Datos

URL de Despliegue en Vivo: https://eloquent-brigadeiros-aca796.netlify.app

Repositorio GitHub: https://github.com/fabianalmanza-arch/Estructura-de-datos-y-algoritomos-dos

1. Resumen Ejecutivo
El presente proyecto consiste en el diseño, desarrollo e implementación de una librería independiente de estructuras de datos (data-structures-lib) compilada mediante Rollup/Babel, y una aplicación web en React (frontend-app) que la consume para resolver casos prácticos del dominio bibliotecario.

2. Cobertura de Estructuras de Datos (8 en Total)
Estructuras Lineales (4)
Singly LinkedList (Lista Enlazada Simple): Implementada para el control secuencial de la lista de reproducción de audiolibros/canciones.

Doubly LinkedList (Lista Enlazada Doble): Implementada con apuntadores prev y next para la navegación por historial web (retroceder/avanzar).

Stack (Pila LIFO): Implementada para la recepción e inventario de ejemplares de libros donde el último ingresado es el primero en procesarse.

Queue (Cola FIFO): Implementada con ordenamiento por marca de tiempo para la gestión de turnos de atención de usuarios en ventanilla.

Estructuras Jerárquicas y No Lineales (4)
Binary Search Tree (BST - Árbol Binario de Búsqueda): Indexación de códigos ID de catálogo con recorridos inorder, preorder, postorder y renderizado gráfico interactivo con react-d3-tree.

N-ary Tree (Árbol N-ario): Construcción jerárquica del menú de navegación lateral (Sidebar) multinivel y dinámico.

Trie (Árbol de Prefijos): Buscador predictivo en tiempo real integrado en la barra superior con autocompletado por prefijo y redirección dinámica.

Graph (Grafo No Dirigido): Implementación de lista de adyacencia y algoritmos BFS (Breadth-First Search) y DFS (Depth-First Search) para modelar la Red de Bibliotecas y la logística de transferencia interbibliotecaria.

3. Persistencia de Datos y Gestión de Transacciones
El sistema incluye la clase TransactionManager que simula un motor de base de datos relacional/ACID con persistencia local (localStorage) que permite:

BEGIN TRANSACTION: Crear una copia de aislamiento temporal de los datos.

COMMIT: Confirmar y persistir permanentemente los cambios en la base de datos local.

ROLLBACK: Revertir inmediatamente cualquier cambio no deseado y restaurar la copia de seguridad.

4. Instrucciones de Ejecución Local
Bash
# 1. Compilar la Librería
cd "proyecto final/data-structures-lib"
npm install
npm run build

# 2. Ejecutar el Frontend
cd "../frontend-app"
npm install
npm run dev Y PEGAS ESO AHI
