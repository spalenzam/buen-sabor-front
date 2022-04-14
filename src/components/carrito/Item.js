import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';

const Item = ({ item, onModificarCantidad, onEliminarItems }) => {
  return (
    <Card>
            <CardMedia image={item.media.source} alt={item.name}  />
            <CardContent >
                <Typography variant="h5" >{item.name}</Typography>
                <Typography variant="h6" color="textSecondary">{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>

            <CardActions >
                <div >
                    <Button type="button" size="small" onClick={() => onModificarCantidad(item.id, item.quantity - 1)}>
                        -
                    </Button>                    

                    <Typography>{item.quantity}</Typography>

                    <Button type="button" size="small" onClick={() => onModificarCantidad(item.id, item.quantity + 1)}>
                        +
                    </Button>
                    
                </div>
                <Button variant="contained" type="button" color="primary" onClick={() => onEliminarItems(item.id)}>
                    Eliminar
                </Button>
            </CardActions>

        </Card>
  )
}

export default Item