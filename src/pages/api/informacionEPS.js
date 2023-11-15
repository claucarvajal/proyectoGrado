import { supabaseIntermedia } from "src/supabase/clienteIntermedia";

export default async function handler(req, res) {
  // Inserta el usuario en la base de datos
  // const user = await insertUser(req.body);

  // const json = req.body;
  const { personas } = req.body;

  const data = {
    personas: [
      {
        tipoDoc: "CC",
        documento: "123456789",
        nombres: "Juana Pérez",
        fechaNacimiento: "1990-05-15",
        departamento: "Cundinamarca",
        municipio: "Bogotá",
        email: "juana.perez@example.com",
        embarazo: "SI",
        riesgo: "SI",
        controlEmbarazo: [
          {
            fechaVisita: "",
            descripcion: "",
            tipoControl: "inicial",
            cumplio: "NO",
          },
          {
            fechaVisita: "",
            descripcion: "",
            tipoControl: "medio",
            cumplio: "NO",
          },
          {
            fechaVisita: "",
            descripcion: "",
            tipoControl: "final",
            cumplio: "NO",
          },
        ],
        hijos: [
          {
            tipoDoc: "TI",
            documento: "987654321",
            nombres: "Sofía Pérez",
            fechaNacimiento: "2015-08-20",
            departamento: "Cundinamarca",
            municipio: "Bogotá",
            email: "sofia.perez@example.com",
            embarazo: 0,
            riesgo: 0,
            hijosvacunas: [
              {
                nombre: "BCG",
                descripcion: "Tuberculosis",
                fechaVacunacion: "2015-09-01",
              },
              {
                nombre: "DTP",
                descripcion: "Difteria, Tétanos, Tos ferina",
                fechaVacunacion: "2015-10-15",
              },
              {
                nombre: "HepB",
                descripcion: "Hepatitis B",
                fechaVacunacion: "2015-11-30",
              },
            ],
          },
          {
            tipoDoc: "RC",
            documento: "456789012",
            nombres: "Camila Pérez",
            fechaNacimiento: "2018-03-10",
            departamento: "Cundinamarca",
            municipio: "Bogotá",
            email: "camila.perez@example.com",
            embarazo: 0,
            riesgo: 0,
            hijosvacunas: [
              {
                nombre: "Rotavirus",
                descripcion: "Prevención de gastroenteritis",
                fechaVacunacion: "2018-04-01",
              },
              {
                nombre: "Neumococo",
                descripcion: "Neumonía y meningitis",
                fechaVacunacion: "2018-05-15",
              },
              {
                nombre: "Polio",
                descripcion: "Poliomielitis",
                fechaVacunacion: "2018-06-30",
              },
            ],
          },
        ],
      },
      {
        tipoDoc: "CC",
        documento: "987654321",
        nombres: "María Gómez",
        fechaNacimiento: "1995-08-22",
        departamento: "Antioquia",
        municipio: "Medellín",
        email: "maria.gomez@example.com",
        embarazo: "SI",
        riesgo: "SI",
        controlEmbarazo: [
          {
            fechaVisita: "",
            descripcion: "",
            tipoControl: "inicial",
            cumplio: "NO",
          },
          {
            fechaVisita: "",
            descripcion: "",
            tipoControl: "medio",
            cumplio: "NO",
          },
          {
            fechaVisita: "",
            descripcion: "",
            tipoControl: "final",
            cumplio: "NO",
          },
        ],
        hijos: [
          {
            tipoDoc: "TI",
            documento: "111223344",
            nombres: "Isabella Gómez",
            fechaNacimiento: "2017-12-10",
            departamento: "Antioquia",
            municipio: "Medellín",
            email: "isabella.gomez@example.com",
            embarazo: 0,
            riesgo: 0,
            hijosvacunas: [
              {
                nombre: "HepA",
                descripcion: "Hepatitis A",
                fechaVacunacion: "2018-01-01",
              },
              {
                nombre: "Varicela",
                descripcion: "Varicela",
                fechaVacunacion: "2018-02-15",
              },
              {
                nombre: "MMR",
                descripcion: "Sarampión, Paperas, Rubéola",
                fechaVacunacion: "2018-03-31",
              },
            ],
          },
          {
            tipoDoc: "CC",
            documento: "555666777",
            nombres: "Valentina Gómez",
            fechaNacimiento: "2019-06-25",
            departamento: "Antioquia",
            municipio: "Medellín",
            email: "valentina.gomez@example.com",
            embarazo: 0,
            riesgo: 0,
            hijosvacunas: [
              {
                nombre: "Rotavirus",
                descripcion: "Prevención de gastroenteritis",
                fechaVacunacion: "2019-07-01",
              },
              {
                nombre: "Neumococo",
                descripcion: "Neumonía y meningitis",
                fechaVacunacion: "2019-08-15",
              },
              {
                nombre: "Polio",
                descripcion: "Poliomielitis",
                fechaVacunacion: "2019-09-30",
              },
            ],
          },
        ],
      },
    ],
  };

  for (const persona of personas) {
    // Insertar o actualizar en la tabla 'personas'
    let { error } = await supabaseIntermedia
      .from("personas")
      .upsert([persona], { returning: "minimal" });

    if (error) {
      console.error("Error insertando o actualizando persona:", error);
      // manejar error
    }

    // Insertar o actualizar en la tabla 'controlEmbarazo'
    for (const control of persona.controlEmbarazo) {
      control.documento = persona.documento; // Asegúrate de que 'documento' es la clave correcta
      let { error } = await supabaseIntermedia
        .from("controlEmbarazo")
        .upsert([control], { returning: "minimal" });

      if (error) {
        console.error("Error insertando o actualizando controlEmbarazo:", error);
        // manejar error
      }
    }

    // Insertar o actualizar en la tabla 'hijos' y 'hijosvacunas'
    for (const hijo of persona.hijos) {
      hijo.documentoPadre = persona.documento; // Asegúrate de que 'documentoPadre' es la clave correcta
      let { error } = await supabaseIntermedia
        .from("hijos")
        .upsert([hijo], { returning: "minimal" });

      if (error) {
        console.error("Error insertando o actualizando hijo:", error);
        // manejar error
      }

      for (const vacuna of hijo.hijosvacunas) {
        vacuna.documentoHijo = hijo.documento; // Asegúrate de que 'documentoHijo' es la clave correcta
        let { error } = await supabaseIntermedia
          .from("hijosvacunas")
          .upsert([vacuna], { returning: "minimal" });

        if (error) {
          console.error("Error insertando o actualizando hijosvacunas:", error);
          // manejar error
        }
      }
    }
  }

  // Devuelve el usuario insertado
  res.status(201).json(personas);
}

// http://localhost:3001/api/informacionEPS
