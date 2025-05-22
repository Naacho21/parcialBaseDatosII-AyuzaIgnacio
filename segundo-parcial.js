//**
//      tipo (espresso, filtrado, cold brew, descafeinado, etc…)
//• array de ingredientes (vainilla-canela, chocolate, caramelo, etc.)
//• peso en gramos
//• intensidad (baja, media, alta)
//• array de objetos precio (tipo: efectivo, precio: 500 … tipo: tarjeta, precio: 550 …)
//• si contiene leche (booleano)
//• objeto tostador con localidad, nombre y cuit 
//
//  */

//1) Crear el script .js con la creación de la base de datos y las colecciones.

db.createCollection("cafe_especiales")

db.cafe_especiales.drop()

db.cafe_especiales.insertOne({tipo: "Expresso", ingredientes: ["Vainilla-canela", "Caramelo"],
    peso_gramos: 220, intensidad: "media", precio: [{tipo: "efecivo", precio: 450}, {tipo: "tarjeta", precio: 520}],
    contiene_leche: true, tostador: {localidad: "Avellaneda", nombre: "Cafe Argentino", cuit: "34-17755896-5"}})

db.cafe_especiales.insertOne({tipo: "Cold brew", ingredientes: ["Vainilla"],
    peso_gramos: 200, intensidad: "alta", precio: [{tipo: "efecivo", precio: 430}, {tipo: "tarjeta", precio: 490}],
    contiene_leche: false, tostador: {localidad: "Monte Grande", nombre: "Cafe C", cuit: "34-98455896-5"}})

db.cafe_especiales.insertOne({tipo: "Descafeinado", ingredientes: ["Vainilla"],
    peso_gramos: 270, intensidad: "alta", precio: [{tipo: "efecivo", precio: 470}, {tipo: "tarjeta", precio: 540}],
    contiene_leche: true, tostador: {localidad: "Zarate", nombre: "Cafe S", cuit: "34-25455896-5"}})

db.cafe_especiales.insertOne({tipo: "Americano", ingredientes: ["Caramelo"],
    peso_gramos: 280, intensidad: "media", precio: [{tipo: "efecivo", precio: 500}, {tipo: "tarjeta", precio: 570}],
    contiene_leche: false, tostador: {localidad: "Cordoba", nombre: "Cafe Inc", cuit: "34-12635896-5"}})

db.cafe_especiales.insertOne({tipo: "Latte", ingredientes: ["Vainilla", "Chocolate"],
    peso_gramos: 250, intensidad: "baja", precio: [{tipo: "efecivo", precio: 490}, {tipo: "tarjeta", precio: 560}],
    contiene_leche: true, tostador: {localidad: "Lanus", nombre: "Cafe Epic", cuit: "34-12453811-5"}})

db.cafe_especiales.insertOne({tipo: "Latte", ingredientes: ["Vainilla", "Chocolate"],
    peso_gramos: 250, intensidad: "media", precio: [{tipo: "efecivo", precio: 550}, {tipo: "tarjeta", precio: 590}],
    contiene_leche: true, tostador: {localidad: "San Pedro", nombre: "Cafe Cafe", cuit: "34-28553811-5"}})

db.cafe_especiales.insertOne({tipo: "Americano", ingredientes: ["Vainilla", "Chocolate"],
    peso_gramos: 250, intensidad: "media", precio: [{tipo: "efecivo", precio: 500}, {tipo: "tarjeta", precio: 590}],
    contiene_leche: false, tostador: {localidad: "San Justo", nombre: "Cafe Bs", cuit: "34-28553811-5"}})

db.cafe_especiales.insertOne({tipo: "Cold brew", ingredientes: ["Vainilla", "Chocolate"],
    peso_gramos: 240, intensidad: "media", precio: [{tipo: "efecivo", precio: 500}, {tipo: "tarjeta", precio: 590}],
    contiene_leche: false, tostador: {localidad: "San Bernardo", nombre: "Cafe B", cuit: "34-28553820-5"}})

db.cafe_especiales.insertOne({tipo: "Expresso", ingredientes: ["Vainilla", "Chocolate"],
    peso_gramos: 240, intensidad: "media", precio: [{tipo: "efecivo", precio: 515}, {tipo: "tarjeta", precio: 580}],
    contiene_leche: true, tostador: {localidad: "San Bernardo", nombre: "Cafe Bernardo", cuit: "34-28163811-5"}})

db.cafe_especiales.insertOne({tipo: "Descafeinado", ingredientes: ["Chocolate"],
    peso_gramos: 240, intensidad: "media", precio: [{tipo: "efecivo", precio: 510}, {tipo: "tarjeta", precio: 560}],
    contiene_leche: false, tostador: {localidad: "Almirante Brown", nombre: "Cafe Bar", cuit: "34-28525811-5"}})


//2) Buscar cuántos cafés contienen chocolate entre sus ingredientes.

db.cafe_especiales.find({ingredientes: "chocolate"}).count()

//3) Buscar cuántos cafés son de tipo “cold brew”· y contienen “vainilla” entre sus ingredientes.

db.cafe_especiales.find({tipo: "Cold brew", ingredientes: "Vainilla"}).count()

//4) Listar tipo y peso de los cafés que tienen una intensidad “media”.

db.cafe_especiales.aggregate([ {$match: {intensidad: "media"}}, {$project: {_id:0, tipo: 1, peso_gramos: 1}}])

//5) Obtener tipo, peso e intensidad de los cafés cuyo peso se encuentre entre 200 y 260 inclusive.

db.cafe_especiales.aggregate([ {$match: {peso_gramos: {$gte: 200, $lte: 260}}}, {$project: {_id:0, tipo: 1, peso_gramos: 1, intensidad: 1}}])

//6) Mostrar los cafés que fueron tostados en localidades que contengan “san”, permitiendo buscar por “san” y que se 
// muestren también los de “santos”, “san justo”, etc. Ordenar el resultado por peso de manera descendente.

db.cafe_especiales.aggregate([ {$match: {"tostador.localidad": {$regex: /san/i}}}, {$project: {_id: 0, tipo: 1,}}, {$sort: {peso_gramos: -1}} ])

//7) Mostrar la sumar del peso de cada tipo de Café.

db.cafe_especiales.aggregate([ {$group: {_id: "$tipo", peso_por_tipo: {$sum: "$peso_gramos"}}}])

//8) Agregar el ingrediente “whisky” todos los cafés cuya intensidad es alta.

db.cafe_especiales.updateMany({intensidad: "alta"}, {$push: {ingredientes: "whisky"}})

//9) Sumarle 10 al peso de los cafés cuyo peso se encuentre entre 200 y 260 inclusive.

db.cafe_especiales.updateMany({peso_gramos: {$gte: 200, $lte: 260}}, {$inc: {peso_gramos: 10}})

//10) Eliminar los cafés cuyo peso sea menor o igual a 210.

db.cafe_especiales.deleteMany({peso_gramos: {$lte: 210}})


