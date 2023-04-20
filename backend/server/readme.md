# Usar el API de la Base de Datos

## Endpoint "/api/users"

### GET "all"
Permite acceder a todos los usuarios regresando una lista de objetos con todos los usuarios en cada una de sus direcciones.

### GET "id"

### PATCH "id"
Permite cambiar el valor de un usuario dado su **user_id**. Se debe acompañar con el envío de un *JSON* para especificar la columna que se debe alterar y el valor que reemplazará al anterior.

Ejemplo del *JSON* a pasar:

```
{
    "column": "name",
    "data": "José"
}
```
En caso de querer modificar algún dato dentro de alguno de sus addreses, se deberá enviar el siguente formato en el *JSON*:
```
{
    "column": {
        
    },
    "data": "José"
}
```
