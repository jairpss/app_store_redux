const estadoInicial = {
    productos: [
        {id:1, nombre: 'Producto 1'},
        {id:2, nombre: 'Producto 2'},
        {id:3, nombre: 'Producto 3'},
        {id:4, nombre: 'Producto 4'}
    ],

    carrito: []
}
//Reducer es una funcion que se encarga de admin el estado global de la app
const reducer = (estado = estadoInicial, accion) => {
    switch (accion.type) {
        case 'AGREGAR_PRODUCTO_CARRITO':
            const {nombre, idProducto} = accion;

            // Si el carrito no tiene elementos entonces agregamos uno.
            if(estado.carrito.length === 0){
                return {
                    ...estado,
                    carrito: [{id: idProducto, nombre: nombre, cantidad: 1}]
                } 
            } else {
                    // De otra foma tenemos que revisar que el carrito no tenga ya el producto que queremos agregar.
                    // Si ya lo tiene entonces queremos actualizar su valor.
                    // Si no tiene el producto entonces lo agregamos.

                    // Para poder editar el arreglo tenemos que clonarlo.
                    const nuevoCarrito = [...estado.carrito];

                    // Comprobamos si el carrito ya tiene el ID del producto a agregar.
                    const enCarrito = nuevoCarrito.filter((productoCarrito) => {
                    return productoCarrito.id === idProducto
                    }).length > 0;
                    
                    // Si ya tiene el producto entonces lo tenemos que actualizar.
                    if(enCarrito){
                        // Para ello tenemos que buscarlo, obtener su posicion en el arreglo.
                        // Y en base a su posicion ya actualizamos el valor.
                        nuevoCarrito.forEach((productoCarrito, index) => {
                            if(productoCarrito.id === idProducto){
                                const cantidad = nuevoCarrito[index].cantidad;
                                nuevoCarrito[index] = {
                                    id: idProducto, 
                                    nombre: nombre, 
                                    cantidad: cantidad + 1
                                }
                            }
                        });
                        // De otra forma entonces agregamos el producto al arreglo.
                        } else {
                            nuevoCarrito.push(
                                {
                                    id: idProducto,
                                    nombre: nombre,
                                    cantidad: 1
                                }
                            );
                        }
                        return {
                            ...estado,
                            carrito: nuevoCarrito
                        }
                    }
        default:
            return estado;
    }
}
 
export default reducer;