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
        fechaEmbarazo: "2023-05-12",
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
                cumplio: "NO"
            },
            {
                fechaVisita: "",
                descripcion: "",
                tipoControl: "medio",
                cumplio: "NO"
            },
            {
                fechaVisita: "",
                descripcion: "",
                tipoControl: "final",
                cumplio: "NO"
            }
        ],
        hijos: [
            {
                tipoDoc: "TI",
                documento: "987654321",
                nombres: "Sofía Pérez",
                fechaNacimiento: "2019-08-20",
                departamento: "Cundinamarca",
                municipio: "Bogotá",
                email: "juana.perez@example.com",
                embarazo: 0,
                riesgo: 0,
                hijosvacunas: [
                    {
                        nombre: "001",
                        descripcion: "Tuberculosis B.C.G",
                        fechaVacunacion: "2019-08-22"
                    },
                    {
                        nombre: "002",
                        descripcion: "Hepatitis B",
                        fechaVacunacion: "2019-08-22"
                    },
                    {
                        nombre: "004",
                        descripcion: "Polio (oral-IM)",
                        fechaVacunacion: "2019-10-22"
                    }

                ]
            },
            {
                tipoDoc: "RC",
                documento: "456789012",
                nombres: "Camila Pérez",
                fechaNacimiento: "2021-03-10",
                fechaEmbarazo: "",
                departamento: "Cundinamarca",
                municipio: "Bogotá",
                email: "juana.perez@example.com",
                embarazo: 0,
                riesgo: 0,
                hijosvacunas: [
                    {
                        nombre: "001",
                        descripcion: "Tuberculosis B.C.G",
                        fechaVacunacion: "2021-08-15"
                    },
                    {
                        nombre: "002",
                        descripcion: "Hepatitis B",
                        fechaVacunacion: "2021-08-15"
                    },
                    {
                        nombre: "004",
                        descripcion: "Polio (oral-IM)",
                        fechaVacunacion: "2021-10-15"
                    }
                ]
            }
        ]
    },
    {
        tipoDoc: "CC",
        documento: "987654321",
        nombres: "María Gómez",
        fechaNacimiento: "1995-08-22",
        fechaEmbarazo: "2023-04-12",
        departamento: "Antioquia",
        municipio: "Medellín",
        email: "maria.gomez@example.com",
        embarazo: "SI",
        riesgo: "SI",
        controlEmbarazo: [
            {
                fechaVisita: "2023-07-12",
                descripcion: "",
                tipoControl: "inicial",
                cumplio: "SI"
            },
            {
                fechaVisita: "2023-08-12",
                descripcion: "",
                tipoControl: "medio",
                cumplio: "SI"
            },
            {
                fechaVisita: "2023-11-12",
                descripcion: "",
                tipoControl: "final",
                cumplio: "SI"
            }
        ],
        hijos: [
            {
                tipoDoc: "TI",
                documento: "111223344",
                nombres: "Isabella Gómez",
                fechaNacimiento: "2019-12-10",
                departamento: "Antioquia",
                municipio: "Medellín",
                email: "isabella.gomez@example.com",
                embarazo: 0,
                riesgo: 0,
                hijosvacunas: [
                    {
                        nombre: "001",
                        descripcion: "Hepatitis A",
                        fechaVacunacion: "2019-12-15"
                    },
                    {
                        nombre: "002",
                        descripcion: "Varicela",
                        fechaVacunacion: "2019-12-15"
                    },
                    {
                        nombre: "004",
                        descripcion: "Sarampión, Paperas, Rubéola",
                        fechaVacunacion: "2020-01-15"
                    }
                ]
            }
           
        ]
    },
    {
        tipoDoc: "CC",
        documento: "987654321",
        nombres: "sara orduz",
        fechaNacimiento: "1996-09-15",
        fechaEmbarazo: "2023-06-12",
        departamento: "Antioquia",
        municipio: "Medellín",
        email: "sara.orduz@example.com",
        embarazo: "SI",
        riesgo: "NO",
        controlEmbarazo: [
            {
                fechaVisita: "2023-09-12",
                descripcion: "",
                tipoControl: "inicial",
                cumplio: "SI"
            },
            {
                fechaVisita: "",
                descripcion: "",
                tipoControl: "medio",
                cumplio: "NO"
            },
            {
                fechaVisita: "",
                descripcion: "",
                tipoControl: "final",
                cumplio: "NO"
            }
        ],
        hijos: []
    }
    ],
  };


  for (const persona of personas) {
    // Insertar o actualizar en la tabla 'personasintermedia'
    let { error } = await supabaseIntermedia
      .from("personasintermedia")
      .upsert([persona], { returning: "minimal" });

    if (error) {
      console.error("Error insertando o actualizando persona:", error);
      // manejar error
    }

    // Insertar o actualizar en la tabla 'controlembarazointermedia'
    for (const control of persona.controlEmbarazo) {
      control.documento = persona.documento; // Asegúrate de que 'documento' es la clave correcta
      let { error } = await supabaseIntermedia
        .from("controlembarazointermedia")
        .upsert([control], { returning: "minimal" });

      if (error) {
        console.error("Error insertando o actualizando controlEmbarazo:", error);
        // manejar error
      }
    }

    // Insertar o actualizar en la tabla 'hijosintermedia' y 'hijosvacunasintermedia'
    for (const hijo of persona.hijos) {
      hijo.documentoPadre = persona.documento; // Asegúrate de que 'documentoPadre' es la clave correcta
      let { error } = await supabaseIntermedia
        .from("hijosintermedia")
        .upsert([hijo], { returning: "minimal" });

      if (error) {
        console.error("Error insertando o actualizando hijo:", error);
        // manejar error
      }

      for (const vacuna of hijo.hijosvacunas) {
        vacuna.documentoHijo = hijo.documento; // Asegúrate de que 'documentoHijo' es la clave correcta
        let { error } = await supabaseIntermedia
          .from("hijosvacunasintermedia")
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
