# proyectoGrado

![image](https://github.com/claucarvajal/proyectoGrado/assets/108345218/288b29df-e464-4297-a5a0-b3eda8136c89)


![image](https://github.com/claucarvajal/proyectoGrado/assets/108345218/d49f61c2-fb94-47e1-bc03-e0736335dfec)

![image](https://github.com/claucarvajal/proyectoGrado/assets/108345218/8de7408b-dae3-4004-97e2-b576a177433d)

![image](https://github.com/claucarvajal/proyectoGrado/assets/108345218/32fec9b5-5d5a-4935-acf8-f940bda13dd8)

![image](https://github.com/claucarvajal/proyectoGrado/assets/108345218/e9cc833a-854c-470c-8d6f-7cbcc4b1d5d7)


![image](https://github.com/claucarvajal/proyectoGrado/assets/108345218/090104c7-fc8d-40e0-97f4-1615dfdf5866)


![image](https://github.com/claucarvajal/proyectoGrado/assets/108345218/4d12543d-64e8-4537-8d4c-d0fe8cea98d4)


![image](https://github.com/claucarvajal/proyectoGrado/assets/108345218/b8f276a4-bb1b-48f2-98a8-009fe4bf1a9b)

![image](https://github.com/claucarvajal/proyectoGrado/assets/108345218/e25f7c46-a0cf-44e5-85a3-d4a2b1f3b25b)


![image](https://github.com/claucarvajal/proyectoGrado/assets/108345218/5efa2b1d-2f7f-4699-9e12-e0b9e83d2d40)


Documentación de la API

Endpoint
El endpoint para enviar la información de las EPS de Colombia es: REAL:https://tu-servidor.com/api/informacionEPS
LOCAL: http://localhost:3000/api/informacionEPS

Los campos del JSON son los siguientes:

Nota: En el campo embarazo es obligatorio

- personas: Un arreglo que contiene la información de cada persona.
- tipodoc: Tipo de documento de la persona (CC, TI, RC, etc.).
- documento: Número de documento de la persona.
- nombres: Nombres de la persona.
- fechanacimiento: Fecha de nacimiento de la persona.
- fechaembarazo: Fecha de embarazo de la persona.
- departamento: Departamento de residencia de la persona.
- municipio: Municipio de residencia de la persona.
- email: Correo electrónico de la persona.
- embarazo: Indicador de si la persona está embarazada (SI o NO).
- riesgo: Indicador de si la persona presenta riesgos (SI o NO).
- entidad: EPS a la que está afiliada la persona.
- regimen: Régimen al que pertenece la persona (Subsidiado, Contributivo, etc.).
- controlembarazo: Arreglo que contiene la información de los controles de embarazo de la persona.
- fechavisita: Fecha de la visita de control.
- descripcion: Descripción de la visita de control.
- tipocontrol: Tipo de control (inicial, medio, final).
- cumplio: Indicador de si la persona cumplió con el control (SI o NO).
- hijos: Arreglo que contiene la información de los hijos de la persona.
- tipodoc: Tipo de documento del hijo.
- documento: Número de documento del hijo.
- nombres: Nombres del hijo.
- fechanacimiento: Fecha de nacimiento del hijo.
- departamento: Departamento de residencia del hijo.
- municipio: Municipio de residencia del hijo.
- email: Correo electrónico del hijo.
- embarazo: Indicador de si el hijo está embarazado (SI o NO).
- riesgo: Indicador de si el hijo presenta riesgos (SI o NO).
- hijosvacunas: Arreglo que contiene la información de las vacunas de los hijos.
- nombre: Nombre de la vacuna.
- descripcion: Descripción de la vacuna.
- `fechavacunacion`: Fecha de vacunación del hijo.



Códigos de Vacunación:
Los códigos de vacunación son identificadores únicos asociados a diferentes vacunas y etapas de vacunación. A continuación, se presenta una lista de códigos de vacunación junto con la información correspondiente:
Tuberculosis B.C.G
Grupo: Recién nacido
Código: 001
Hepatitis B
Grupo: Recién nacido
Código: 002
Polio (oral-IM)
Grupo: 2 meses
Código: 004
Pentavalente
Grupo: 2 meses
Código: 005
Rotavirus
Grupo: 2 meses
Código: 006
Neumococo
Grupo: 2 meses
Código: 007
Polio (oral-IM)
Grupo: 4 meses
Código: 008
Pentavalente
Grupo: 4 meses
Código: 009
Rotavirus
Grupo: 4 meses
Código: 010
Neumococo
Grupo: 4 meses
Código: 011
Polio (oral-IM)
Grupo: 6 meses
Código: 012
Pentavalente
Grupo: 6 meses
Código: 013
Influenza
Grupo: 6 meses
Código: 014
Influenza
Grupo: 7 meses
Código: 015
Sarampión Rubeola Paperas (SRP)
Grupo: 12 meses
Código: 016
Fiebre Amarilla
Grupo: 12 meses
Código: 017
Neumococo
Grupo: 12 meses
Código: 018
Influenza
Grupo: 12 meses
Código: 019
Hepatitis A
Grupo: 12 meses
Código: 020
Difteria-Tosferina-Tetano (DPT)
Grupo: 18 meses
Código: 021
Polio (oral-IM)
Grupo: 18 meses
Código: 022
Sarampión Rubeola Paperas (SRP)
Grupo: 5 años
Código: 023
Polio (oral-IM)
Grupo: 5 años
Código: 024
Difteria-Tosferina-Tetano (DPT)
Grupo: 5 años
Código: 025
Estos códigos facilitan el seguimiento y registro de las vacunas administradas, garantizando un historial completo y preciso de la inmunización.






Códigos de Seguimiento de Embarazo:
Los códigos de seguimiento de embarazo son identificadores utilizados para clasificar las diferentes etapas del embarazo y los procedimientos asociados. A continuación, se presenta una lista de códigos de embarazo junto con la información correspondiente:
Primer trimestre (hasta la semana 13):
Descripción: Confirmación del embarazo.
Evaluación del historial médico y obstétrico.
Exámenes de sangre para verificar el grupo sanguíneo, la presencia de enfermedades infecciosas y otros parámetros.
Control de la presión arterial.
Ecografía temprana para confirmar la edad gestacional y detectar posibles problemas.
Código: inicial
Segundo trimestre (semanas 14 a 26):
Control de la presión arterial.
Exámenes de sangre para detectar anomalías genéticas, como el síndrome de Down.
Segunda ecografía para evaluar el desarrollo fetal y verificar la salud de la placenta.
Detección de la diabetes gestacional (por lo general, entre las semanas 24 y 28).
Código: medio
Tercer trimestre (semana 27 hasta el parto):
Control regular de la presión arterial.
Pruebas para evaluar el riesgo de parto prematuro.
Monitoreo del crecimiento fetal y posición del bebé.
Pruebas para detectar la presencia de bacterias estreptococo del grupo B.
En algunos casos, ecografías adicionales para evaluar la posición y el crecimiento del feto.
Código: final
Estos códigos facilitan la organización y el seguimiento de las diferentes etapas del embarazo, asegurando una atención médica adecuada y un registro detallado de la salud materna y fetal.










Formato del JSON

Las EPS de Colombia deben enviar un JSON con la siguiente estructura(ejemplo):


{
    "personas": [
        {
            "tipodoc": "CC",
            "documento": "123456789",
            "nombres": "Juana Pérez",
            "fechanacimiento": "1990-05-15",
            "fechaembarazo": "2023-05-12",
            "departamento": "Cundinamarca",
            "municipio": "Bogotá",
            "email": "claudiamarcelacarvajal27@gmail.com",
            "embarazo": "SI",
            "riesgo": "SI",
            "entidad":"Coomeva",
            "regimen": "Subsidiado",
            "cumple":"pendiente",
            "controlembarazo": [
                {
                    "fechavisita": "",
                    "descripcion": "",
                    "tipocontrol": "inicial"
                },
                {
                    "fechavisita": "",
                    "descripcion": "",
                    "tipocontrol": "medio"
                },
                {
                    "fechavisita": "",
                    "descripcion": "",
                    "tipocontrol": "final"
                }
            ],
            "hijos": [
                {
                    "tipodoc": "TI",
                    "documento": "987654321",
                    "nombres": "Sofía Pérez",
                    "fechanacimiento": "2019-08-20",
                    "departamento": "Cundinamarca",
                    "municipio": "Bogotá",
                    "email": "claudiamarcelacarvajal27@gmail.com",
                    "embarazo": "",
                    "riesgo": "",
                    "cumple":"pendiente",
                    "hijosvacunas": [
                        {
                            "nombre": "001",
                            "descripcion": "Tuberculosis B.C.G",
                            "fechavacunacion": "2019-08-22"
                        },
                        {
                            "nombre": "002",
                            "descripcion": "Hepatitis B",
                            "fechavacunacion": "2019-08-22"
                        },
                        {
                            "nombre": "004",
                            "descripcion": "Polio (oral-IM)",
                            "fechavacunacion": "2019-10-22"
                        }
                    ]
                },
                {
                    "tipodoc": "RC",
                    "documento": "456789012",
                    "nombres": "Camila Pérez",
                    "fechanacimiento": "2021-03-10",
                    "fechaembarazo": "",
                    "departamento": "Cundinamarca",
                    "municipio": "Bogotá",
                    "email": "claudiamarcelacarvajal27@gmail.com",
                    "embarazo": "",
                    "riesgo": "",
                    "cumple":"pendiente",
                    "hijosvacunas": [
                        {
                            "nombre": "001",
                            "descripcion": "Tuberculosis B.C.G",
                            "fechavacunacion": "2021-08-15"
                        },
                        {
                            "nombre": "002",
                            "descripcion": "Hepatitis B",
                            "fechavacunacion": "2021-08-15"
                        },
                        {
                            "nombre": "004",
                            "descripcion": "Polio (oral-IM)",
                            "fechavacunacion": "2021-10-15"
                        }
                    ]
                }
            ]
        },
        {
            "tipodoc": "CC",
            "documento": "185645",
            "nombres": "María Gómez",
            "fechanacimiento": "1995-08-22",
            "fechaembarazo": "2023-04-12",
            "departamento": "Antioquia",
            "municipio": "Medellín",
            "email": "claudiamarcelacarvajal27@gmail.com",
            "embarazo": "SI",
            "riesgo": "SI",
            "entidad":"Saludcoop",
            "regimen": "Subsidiado",
            "cumple":"cumplio",
            "controlembarazo": [
                {
                    "fechavisita": "2023-07-12",
                    "descripcion": "",
                    "tipocontrol": "inicial"
                },
                {
                    "fechavisita": "2023-12-12",
                    "descripcion": "",
                    "tipocontrol": "medio"
                },
                {
                    "fechavisita": "2023-11-12",
                    "descripcion": "",
                    "tipocontrol": "final"
                }
            ],
            "hijos": [
                {
                    "tipodoc": "TI",
                    "documento": "111223344",
                    "nombres": "Isabella Gómez",
                    "fechanacimiento": "2019-12-10",
                    "departamento": "Antioquia",
                    "municipio": "Medellín",
                    "email": "claudiamarcelacarvajal27@gmail.com",
                    "embarazo": "",
                    "riesgo": "",
                    "cumple":"pendiente",
                    "hijosvacunas": [
                        {
                            "nombre": "001",
                            "descripcion": "Hepatitis A",
                            "fechavacunacion": "2019-12-15"
                        },
                        {
                            "nombre": "002",
                            "descripcion": "Varicela",
                            "fechavacunacion": "2019-12-15"
                        },
                        {
                            "nombre": "004",
                            "descripcion": "Sarampión, Paperas, Rubéola",
                            "fechavacunacion": "2020-01-15"
                        }
                    ]
                }
            ]
        },
        {
            "tipodoc": "CC",
            "documento": "2355411",
            "nombres": "sara orduz",
            "fechanacimiento": "1996-09-15",
            "fechaembarazo": "2023-06-12",
            "departamento": "Antioquia",
            "municipio": "Medellín",
            "email": "claudiamarcelacarvajal27@gmail.com",
            "embarazo": "SI",
            "riesgo": "NO",
            "entidad":"Saludcoop",
            "regimen": "Subsidiado",
            "cumple":"pendiente",
            "controlembarazo": [
                {
                    "fechavisita": "2023-09-01",
                    "descripcion": "",
                    "tipocontrol": "inicial"
                },
                {
                    "fechavisita": "",
                    "descripcion": "",
                    "tipocontrol": "medio"
                },
                {
                    "fechavisita": "",
                    "descripcion": "",
                    "tipocontrol": "final"
                }
            ],
            "hijos": []
        },
        {
            "tipodoc": "CC",
            "documento": "4578",
            "nombres": "María torre peñuela",
            "fechanacimiento": "1998-05-13",
            "fechaembarazo": "2020-12-21",
            "departamento": "Santander",
            "municipio": "Girón",
            "email": "claudiamarcelacarvajal27@gmail.com",
            "embarazo": "NO",
            "riesgo": "NO",
            "entidad":"Saludcoop",
            "regimen": "Subsidiado",
            "cumple":"pendiente",
            "controlembarazo": [],
            "hijos": [
                {
                    "tipodoc": "TI",
                    "documento": "784123",
                    "nombres": "Julieta torres",
                    "fechanacimiento": "2021-08-18",
                    "departamento": "Santander",
                    "municipio": "Girón",
                    "email": "claudiamarcelacarvajal27@gmail.com",
                    "embarazo": "",
                    "riesgo": "",
                    "cumple":"pendiente",
                    "hijosvacunas": [
                        {
                            "nombre": "001",
                            "descripcion": "Hepatitis A",
                            "fechavacunacion": "2021-12-15"
                        },
                        {
                            "nombre": "002",
                            "descripcion": "Varicela",
                            "fechavacunacion": "2021-12-15"
                        },
                        {
                            "nombre": "004",
                            "descripcion": "Sarampión, Paperas, Rubéola",
                            "fechavacunacion": "2021-01-15"
                        }
                    ]
                }
            ]
        }
    ]
}


La API responderá de la siguiente manera:

- Si la operación se completa exitosamente, responderá con un estado 200 y el mensaje: { message: "Operación completada exitosamente" }.
- Si ocurre un error al registrar, responderá con un estado 201 y el mensaje de error: {error: "Error al registrar"}.


