# Usar el API de la Base de Datos

## Endpoint "/api/users"

### GET "all"
Permite acceder a todos los usuarios regresando una lista de objetos con todos los usuarios en cada una de sus direcciones (obtiene un campo del *JSON* con cada combinación de user y address que esten relacionadas).

Para este método se utiliza el siguiente endpoint:
```
/api/users
```

### GET "id"
Permite acceder a un usuario en especifico dado un **user_id**. También incluye un campo donde se listan todos sus *addresses* y toda *identification*.

Para este método se utiliza el siguiente endpoint (reemplaza id por el id a buscar, sin utilizar las llaves del campo inferior):
```
/api/users/{id}
```

### PATCH "id"
Permite cambiar el valor de un usuario dado su **user_id**. Se debe acompañar con el envío de un *JSON* para especificar la columna que se debe alterar y el valor que reemplazará al anterior. Se puede pasar un *NULL* si se desea nullificar un campo en específico (este proceso no toma en cuenta la bandera *is_client*, por lo que se podría decir que es un *sudo* o una *superacción* para la nullificación, aunque más manual que *DELETE*). También actualiza el campo *updated_at* con el día actual (por esto último, *updated_at* no se puede modificar de manera manual).

El campo *column* indica el nombre de la columna a modificar. Por otro lado, el campo *data* indica el dato nuevo que reemplazará al anterior.

Ejemplo del *JSON* a pasar:

```
{
    "column": "name",
    "data": "José"
}
```
En caso de querer modificar algún dato dentro de alguno de sus addreses, se deberá enviar el siguente formato en el *JSON*.
En el siguente ejemplo se deben considerar los siguientes campos del *JSON*:
+ sector: Indica cual tabla se va a modificar (puede ser *addresses* o *identification*).
+ mode: Indica la modalidad de la modificación.
    
    + single: Modifica solo el address especifico que se pasa en el campo **address_id** o **identification_id**.
    + multiple: Modifica todos los address que esten relacionados con el campo **user_id** que se pasa en el endpoint de la URL. Es opcional especificar el **address_id** o el **identification_id** si se utiliza esta modalidad.
+ name: Es el nombre de la columna a modificar.
+ address_id/identification_id: Especifica el id del address o del identification cuando se utiliza la modalidad single.

El resto de los campos funcionan igual. A continuación se muestra un ejemplo:
```
{
    "column": {
        "sector": "addresses",
        "mode": "single",
        "name": "state",
        "address_id": 0
    },
    "data": "Guanajuato"
}
```
Para este método se utiliza el siguiente endpoint (reemplaza id por el id a buscar, sin utilizar las llaves del campo inferior):
```
/api/users/{id}
```

### DELETE "id"
Este método se utiliza para nullificar todos los datos relacionados a un **user_id** específico tanto en *users* como en todos los renglones asociados a este user en *addresses*. No los borra, simplemente los vuelve *NULL*, a menos que el campo **is_client** sea *TRUE*. También actualiza el campo *deleted_at* con el día actual, pero no vuelve NULL los campos *created_at* y *updated_at*.

Para este método se utiliza el siguiente endpoint (reemplaza id por el id a buscar, sin utilizar las llaves del campo inferior):
```
/api/users/{id}
```

## Endpoint "/api/arco_registers"

### GET "all"
Permite acceder a todos los registros ARCO regresando una lista de estos en formato *JSON*.

Para este método se utiliza el siguiente endpoint:
```
/api/arco_registers
```

### GET "id"
Permite acceder a un registro ARCO en especifico dado un **registro_arco_id**, regresando un *JSON* con su respectiva información.

Para este método se utiliza el siguiente endpoint (reemplaza id por el id a buscar, sin utilizar las llaves del campo inferior):
```
/api/arco_registers/{id}
```

### POST
Permite añadir un nuevo registro usando sus respectivos datos. Se debe acompañar con el envío de un *JSON* para especificar los datos del nuevo registro a añadir.

El campo *user_id* indica el *id* del usuario al que esta ligado el registro. El campo *arco_type* indica la sigla del tipo de derecho ARCO que se aplicó. Por último, el campo *message* indica el mensaje que acompaña al registro.

Ejemplo del *JSON* a pasar:
```
{
    "user_id": "1",
    "arco_type": "R",
    "message": "Rectificado ahora."
}
```

Para este método se utiliza el siguiente endpoint (reemplaza id por el id a buscar, sin utilizar las llaves del campo inferior):
```
/api/arco_registers
```

### DELETE
Permite eliminar el último registro que se añadió.

Para este método se utiliza el siguiente endpoint (reemplaza id por el id a buscar, sin utilizar las llaves del campo inferior):
```
/api/arco_registers
```
