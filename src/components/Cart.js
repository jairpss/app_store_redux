import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

const Cart = ({carrito}) => {
    return ( 
        <div>
            <h3>Shopping bag</h3>
            {carrito.length > 0 ?
                carrito.map((producto, index) => {
                    return(
                        <Producto key={index}>
                            <NombreProducto>
                                {producto.nombre}
                            </NombreProducto>
                            Cantidad: {producto.cantidad}
                        </Producto>
                    );
                })
            :
                <p>The shopping bag is empty :(</p>
            }
        </div>
    );
}
 
const Producto = styled.div`
    padding: 10px;
    border-bottom: 1px solid #ebebf3;
    font-size: 14px;
`;

const NombreProducto = styled.p`
    font-weight: bold;
    font-size: 16px;
    color: #000;
`;

const mapStateToProps = (estado) => {
    return{
        carrito: estado.carrito
    }
}

export default connect(mapStateToProps)(Cart);