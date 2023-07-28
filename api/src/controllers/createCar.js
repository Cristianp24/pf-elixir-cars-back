const { cars, brands, carModels } = require("../db.js");

async function createCar(req, res) {
  try {
    const {
      marca,
      modelo,
      presentacion,
      precio,
      estado,
      year,
      imageUrl,
      kilometraje,
      combustible,
      fichaTecnica,
    } = req.body;

    //validacion
    if (
      !marca ||
      !modelo ||
      !presentacion ||
      !precio ||
      !estado ||
      !year ||
      !imageUrl ||
      !kilometraje ||
      !combustible ||
      !fichaTecnica
    ) {
      return res
        .status(400)
        .json({
          error:
            "Todos los campos son obligatorios, debe llenarlos correctamente",
        });
    }

    if (typeof precio !== "number" || precio <= 0) {
      return res
        .status(400)
        .json({ error: "El precio debe ser un número positivo" });
    }

    const estadoRegex = /^(nuevo|usado)$/i;
    if (!estadoRegex.test(estado)) {
      return res
        .status(400)
        .json({ error: "El estado debe ser 'nuevo' o 'usado'" });
    }

    const currentYear = new Date().getFullYear();
    if (typeof year !== "number" || year < 2010 || year > currentYear) {
      return res.status(400).json({ error: "Año inválido" });
    }

    const imageUrlRegex = /^(http|https):\/\/[^\s/$.?#].[^\s]*$/i;
    if (!imageUrlRegex.test(imageUrl)) {
      return res
        .status(400)
        .json({ error: "La URL de la imagen no es válida" });
    }

    if (
      //validacion para que ficha tecnica contenga estos datos especificos
      typeof fichaTecnica !== "object" ||
      !fichaTecnica.Motor ||
      !fichaTecnica.Pasajeros ||
      !fichaTecnica.Carroceria ||
      !fichaTecnica.Transmision ||
      !fichaTecnica.Traccion ||
      !fichaTecnica.Llantas ||
      !fichaTecnica.Potencia ||
      !fichaTecnica.Puertas ||
      !fichaTecnica.Baul ||
      !fichaTecnica.airbag
    ) {
      return res.status(400).json({ error: "La ficha técnica es inválida" });
    }

    // Crear Brand (marca) si no existe
    const [marcaBd, marcaCreada] = await brands.findOrCreate({
      where: { name: marca },
    });

    // Crear CarModel (modelo) si no existe
    const [modeloBd, modeloCreado] = await carModels.findOrCreate({
      where: { name: modelo },
      defaults: {
        brandId: marcaBd.id,
      },
    });

    // Crear el nuevo automóvil en la base de datos
    const [newCar, carCreated] = await cars.findOrCreate({
      where: { presentacion },
      defaults: {
        carModelId: modeloBd.id,
        brandId: marcaBd.id,
        presentacion,
        precio,
        estado,
        year,
        imageUrl,
        kilometraje,
        combustible,
        fichaTecnica,
      },
    });

    res.status(201).json(newCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el automóvil" });
  }
}
module.exports = createCar;
