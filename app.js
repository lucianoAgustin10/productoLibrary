console.clear();
const argv = require("process").argv;
const moduloProductos = require("./productos");
require("colors");

const comando = argv[2];
let respuesta;

switch (comando) {
    case "listar":
        moduloProductos.listar();
        break;
    case "agregar":
        let nombre = argv[3];
        let marca = argv[4];
        let precio = +argv[5];
        let descuento = +argv[6] || 0;

        if ([nombre, marca, precio].includes(undefined)) {
            console.log("ERROR: todos los datos son obligatorios".red);
            break;
        }
        if ([precio, descuento].includes(NaN)) {
            console.log("ERROR : el precio o el descuento no son invalidos".red)
            break;
        }

        respuesta = moduloProductos.agregar(nombre, marca, precio, descuento);
        console.log(respuesta);


        if (moduloProductos.buscar(nombre)) {
            console.log("ERROR: el ya existe en la base de datos".green);
            break
        }

    case "filtrar":
        respuesta = moduloProductos.filtrar(argv[3])
        moduloProductos.listar(respuesta.black)
        console.log(respuesta)
        break;

    case "editar":
        respuesta = moduloProductos.editar(+argv[3])
        console.log(respuesta.blue)
        break;

    default:
        break;
}