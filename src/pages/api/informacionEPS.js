import { supabaseIntermedia } from "src/supabase/clienteIntermedia";

// Restricción única para 'personasintermedia' basada en 'documento'
const personaUniqueConstraint = ["documento"];

// Restricción única para 'controlembarazointermedia' basada en 'documento' y 'tipocontrol'
const controlUniqueConstraint = ["documento", "tipocontrol"];

// Restricción única para 'hijosintermedia' basada en 'documento'
const hijoUniqueConstraint = ["documento"];

// Restricción única para 'vacunacionintermedia' basada en 'documento' y 'nombre'
const vacunaUniqueConstraint = ["documento", "nombre"];

export default async function handler(req, res) {
  // Inserta el usuario en la base de datos
  // const user = await insertUser(req.body);

  // const json = req.body;
  const { personas } = req.body;


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
    let { errorPer } = await supabaseIntermedia
      .from("personasintermedia")
      .upsert([personaData], { returning: "minimal", onConflict: personaUniqueConstraint  });
  
    console.log(errorPer, "que viene??");
    if (errorPer) {
      console.error("Error insertando o actualizando persona:", errorPer);
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
      let { errorControl  } = await supabaseIntermedia
        .from("controlembarazointermedia")
        .upsert([controlData], { returning: "minimal", onConflict: controlUniqueConstraint });
  
      if (errorControl ) {
        console.error("Error insertando o actualizando controlEmbarazo:", errorControl );
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
      let { errorHijo  } = await supabaseIntermedia
        .from("hijosintermedia")
        .upsert([hijoData], { returning: "minimal", onConflict: hijoUniqueConstraint });
  
      if (errorHijo ) {
        console.error("Error insertando o actualizando hijo:", errorHijo );
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
      let { errorPer2 } = await supabaseIntermedia
        .from("personasintermedia")
        .upsert([personaData2], { returning: "minimal", onConflict: personaUniqueConstraint  });
    
      console.log(errorPer2, "que viene??");

      if (errorPer2) {
        console.error("Error insertando o actualizando persona:", errorPer2);
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
        let { errorVacuna  } = await supabaseIntermedia
          .from("vacunacionintermedia")
          .upsert([vacunaData], { returning: "minimal", onConflict: vacunaUniqueConstraint });
  
        if (errorVacuna) {
          console.error("Error insertando o actualizando hijosvacunas:", errorVacuna );
          res.status(201).json({error: "Error al registrar vacunacionintermedia"});
        }
      }
    }
  }
  
  // Devuelve el usuario insertado
  res.status(200).json({ message: "Operación completada exitosamente" });
}

// http://localhost:3001/api/informacionEPS
