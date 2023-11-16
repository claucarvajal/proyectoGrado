import { supabaseIntermedia } from "src/supabase/clienteIntermedia";

export default async function handler(req, res) {
  // Inserta el usuario en la base de datos
  // const user = await insertUser(req.body);

  // const json = req.body;
  const { personas } = req.body;

  const data = {
    personas: [     
      {
        tipodoc: "CC",
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
                fechavisita: "",
                descripcion: "",
                tipoControl: "inicial",
                cumplio: "NO"
            },
            {
                fechavisita: "",
                descripcion: "",
                tipoControl: "medio",
                cumplio: "NO"
            },
            {
                fechavisita: "",
                descripcion: "",
                tipoControl: "final",
                cumplio: "NO"
            }
        ],
        hijos: [
            {
                tipodoc: "TI",
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
                        fechavacunacion: "2019-08-22"
                    },
                    {
                        nombre: "002",
                        descripcion: "Hepatitis B",
                        fechavacunacion: "2019-08-22"
                    },
                    {
                        nombre: "004",
                        descripcion: "Polio (oral-IM)",
                        fechavacunacion: "2019-10-22"
                    }

                ]
            },
            {
                tipodoc: "RC",
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
                        fechavacunacion: "2021-08-15"
                    },
                    {
                        nombre: "002",
                        descripcion: "Hepatitis B",
                        fechavacunacion: "2021-08-15"
                    },
                    {
                        nombre: "004",
                        descripcion: "Polio (oral-IM)",
                        fechavacunacion: "2021-10-15"
                    }
                ]
            }
        ]
    },
    {
        tipodoc: "CC",
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
                fechavisita: "2023-07-12",
                descripcion: "",
                tipoControl: "inicial",
                cumplio: "SI"
            },
            {
                fechavisita: "2023-08-12",
                descripcion: "",
                tipoControl: "medio",
                cumplio: "SI"
            },
            {
                fechavisita: "2023-11-12",
                descripcion: "",
                tipoControl: "final",
                cumplio: "SI"
            }
        ],
        hijos: [
            {
                tipodoc: "TI",
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
                        fechavacunacion: "2019-12-15"
                    },
                    {
                        nombre: "002",
                        descripcion: "Varicela",
                        fechavacunacion: "2019-12-15"
                    },
                    {
                        nombre: "004",
                        descripcion: "Sarampión, Paperas, Rubéola",
                        fechavacunacion: "2020-01-15"
                    }
                ]
            }
           
        ]
    },
    {
        tipodoc: "CC",
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
                fechavisita: "2023-09-12",
                descripcion: "",
                tipoControl: "inicial",
                cumplio: "SI"
            },
            {
                fechavisita: "",
                descripcion: "",
                tipoControl: "medio",
                cumplio: "NO"
            },
            {
                fechavisita: "",
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
    // Extract only the desired properties for 'personasintermedia'
    const personaData = {
      tipodoc: persona.tipodoc,
      documento: persona.documento,
      nombres: persona.nombres,
      fechanacimiento: persona.fechanacimiento,
      departamento: persona.departamento,
      municipio: persona.municipio,
      email: persona.email,
      embarazo: persona.embarazo,
      entidad: persona.entidad,
      regimen: persona.regimen,
      fechaembarazo: persona.fechaembarazo,
      riesgo: persona.riesgo,
    };
  
    // Insert or update in the 'personasintermedia' table
    let { error } = await supabaseIntermedia
      .from("personasintermedia")
      .upsert([personaData], { returning: "minimal" });
  
    console.log(error, "que viene??");
    if (error) {
      console.error("Error insertando o actualizando persona:", error);
      res.status(201).json({error: "Error al registrar persona"});
    }
  
    for (const control of persona.controlembarazo) {
      // Extract only the desired properties for 'controlembarazointermedia'
      const controlData = {
        documento: persona.documento,
        fechavisita: control.fechavisita,
        tipocontrol: control.tipocontrol,
        descripcion: control.descripcion
      };
  
      // Insert or update in the 'controlembarazointermedia' table
      let { error } = await supabaseIntermedia
        .from("controlembarazointermedia")
        .upsert([controlData], { returning: "minimal" });
  
      if (error) {
        console.error("Error insertando o actualizando controlEmbarazo:", error);
        res.status(201).json({error: "Error al registrar controlEmbarazo"});
      }
    }
  
    for (const hijo of persona.hijos) {
      // Extract only the desired properties for 'hijosintermedia'
      const hijoData = {
        responsable: persona.documento,
        documento: hijo.documento,
        nombres: hijo.nombres,
      };
  
      // Insert or update in the 'hijosintermedia' table
      let { error } = await supabaseIntermedia
        .from("hijosintermedia")
        .upsert([hijoData], { returning: "minimal" });
  
      if (error) {
        console.error("Error insertando o actualizando hijo:", error);
        res.status(201).json({error: "Error al registrar hijo"});
      }
      
      const personaData2 = {
        tipodoc: hijo.tipodoc,
        documento: hijo.documento,
        nombres: hijo.nombres,
        fechanacimiento: persona.fechanacimiento,
        tipodoc: hijo.tipodoc,
        documento: hijo.documento,
        nombres: hijo.nombres,
        fechanacimiento: hijo.fechanacimiento,
        departamento: hijo.departamento,
        municipio: hijo.municipio,
        email: persona.email,
        embarazo: "",
        entidad: persona.entidad,
        regimen: persona.regimen,
        fechaembarazo: "",
        riesgo:""
      };
    
      // Insert or update in the 'personasintermedia' table
      let { error2 } = await supabaseIntermedia
        .from("personasintermedia")
        .upsert([personaData2], { returning: "minimal" });
    
      console.log(error2, "que viene??");

      if (error2) {
        console.error("Error insertando o actualizando persona:", error2);
        res.status(201).json({error: "Error al registrar persona"});
      }

  
      for (const vacuna of hijo.hijosvacunas) {
        // Extract only the desired properties for 'hijosvacunasintermedia'
        const vacunaData = {
          documento: hijo.documento,
          nombre: vacuna.nombre,
          descripcion: vacuna.descripcion,
          fechavacunacion: vacuna.fechavacunacion,
          responsable: persona.documento,
        };
  
        // Insert or update in the 'hijosvacunasintermedia' table
        let { error } = await supabaseIntermedia
          .from("vacunacionintermedia")
          .upsert([vacunaData], { returning: "minimal" });
  
        if (error) {
          console.error("Error insertando o actualizando hijosvacunas:", error);
          res.status(201).json({error: "Error al registrar vacunacionintermedia"});
        }
      }
    }
  }
  
  // Devuelve el usuario insertado
  res.status(201).json({exito: "registros insertados con exito"});
}

// http://localhost:3001/api/informacionEPS
