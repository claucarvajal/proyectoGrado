import Head from "next/head";
import { subDays, subHours } from "date-fns";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
// import { OverviewBudget } from "src/sections/overview/overview-budget";
// import { OverviewLatestOrders } from "src/sections/overview/overview-latest-orders";
// import { OverviewLatestProducts } from "src/sections/overview/overview-latest-products";
// import { OverviewSales } from "src/sections/overview/overview-sales";
// import { OverviewTasksProgress } from "src/sections/overview/overview-tasks-progress";
// import { OverviewTotalCustomers } from "src/sections/overview/overview-total-customers";
// import { OverviewTotalProfit } from "src/sections/overview/overview-total-profit";
// import { OverviewTraffic } from "src/sections/overview/overview-traffic";

const now = new Date();

const Page = () => (
  <>
    <Head>
      <title>Información</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid xs={12} lg={8}>
            <strong>Obligaciones de las eps con las mujeres embarazadas en colombia</strong>

            <p>
              Las Entidades Promotoras de Salud (EPS) tienen la responsabilidad de brindar atención
              integral a las mujeres embarazadas, garantizando su bienestar y el de sus hijos.
              Algunas de las obligaciones específicas de las EPS con respecto a las mujeres
              embarazadas en Colombia incluyen: Control prenatal: Las EPS deben proporcionar
              servicios de control prenatal para asegurar un seguimiento adecuado durante el
              embarazo. Esto incluye consultas médicas regulares, exámenes de laboratorio y estudios
              de diagnóstico por imágenes según sea necesario. Atención durante el parto: Las EPS
              deben garantizar el acceso a servicios de atención obstétrica de calidad durante el
              parto. Esto implica la disponibilidad de personal médico calificado y la
              infraestructura necesaria para atender partos seguros. Acceso a medicamentos e
              insumos: Las mujeres embarazadas deben tener acceso a los medicamentos e insumos
              necesarios para su salud y la del feto. Esto incluye la disponibilidad de suplementos
              vitamínicos, medicamentos específicos recomendados durante el embarazo y otros
              productos relacionados. Atención postparto: Después del parto, las EPS deben brindar
              atención postparto que incluya seguimiento médico tanto para la madre como para el
              recién nacido. Esto puede incluir asesoramiento sobre la lactancia materna, cuidado
              del recién nacido y evaluación de la salud de la madre. Educación en salud: Las EPS
              tienen la responsabilidad de proporcionar educación en salud a las mujeres
              embarazadas, brindándoles información sobre la importancia del control prenatal, la
              nutrición adecuada durante el embarazo, la preparación para el parto y otros temas
              relacionados.
            </p>
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <img
              alt=""
              src="/assets/emba3.jpg"
              height="500px" // Puedes ajustar el valor según tus necesidades
            />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <strong>¿la diabetes gestacional?</strong>
            <p>
              La diabetes gestacional puede provocar problemas de salud a la madre y al bebé durante
              y después del embarazo. Es importante hacerse la prueba para que el doctor o la
              matrona pueda tomar medidas para protegerte a ti y al bebé.
              <p>Corres más riesgo de desarrollar diabetes gestacional si:</p>
              <ul>Tienes sobrepeso o eres obesa</ul>
              <ul>Tienes un historial familiar de diabetes</ul>
              <ul>Tienes un historial familiar de diabetes</ul>
              <ul>Tienes más de 25 años de edad</ul>
              <ul>
                Eres afroestadounidense, hispana, indígena de Estados Unidos, miembro de los pueblos
                originarios de Alaska, hawaiano u originario de las islas del Pacífico
              </ul>
              <ul>Tuviste diabetes gestacional durante un embarazo anterior</ul>
              <ul>Tuviste un bebé que pesó más de 9 libras (unos 4 kilogramos) al nacer.</ul>
              <ul>Tienes el síndrome del ovario poliquístico (PCOS, por sus siglas en inglés)</ul>
              Puedes reducir el riesgo de sufrir diabetes gestacional si tienes una alimentación
              saludable y te mantienes activa durante el embarazo.
            </p>
          </Grid>
          <Grid xs={12} md={12} lg={8}>
            <img alt="" src="/assets/1.png" />
          </Grid>
          <Grid xs={12} md={12} lg={8}>
            <img alt="" src="/assets/2.png" />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            Al igual que con las mujeres embarazadas, nuestro ordenamiento jurídico atribuye a los
            niños la condición de sujetos de especial protección constitucional, razón por la cual,
            también deben ser objeto de medidas de discriminación positiva, orientadas a
            materializar en ellos el fin ulterior del Estado social de derecho. La protección de sus
            derechos fundamentales constituye un deber para el Estado. El artículo 44 de la
            Constitución señala que Son derechos fundamentales de los niños: la vida, la integridad
            física, la salud y la seguridad social, entre otros. En el mismo orden, declara que Los
            derechos de los niños prevalecen sobre los derechos de los demás. Resulta contrario al
            precedente de esta corporación, que las EPS pretermitan la afiliación de estos sujetos
            de especial protección, bajo supuestos fuera de contexto o, peor aún, sin proporcionar
            razones objetivas para ello. Así las cosas, la protección de su derecho fundamental a la
            salud no se traduce en una simple labor social, sino en un mandato constitucional, que
            debe interpretar el verbo del constituyente a través del despliegue institucional, al
            cual no escapan los jueces de tutela.
          </Grid>
          <Grid xs={12} md={12} lg={12}>
            A los niños se les debe suministrar un servicio de salud que otorgue una ayuda eficaz.
            Para ello, el Estado tiene la obligación de asegurar que les sean brindados todos los
            medios, sean médicos o educativos, que les permitan obtener una recuperación óptima, o
            si esto no fuera posible, por lo menos que accedan a la mejor calidad de vida posible.
            En conclusión, se les debe prodigar a los pequeños un servicio especializado, integral,
            eficiente y óptimo, que les permita acceder a todos los servicios, exámenes,
            procedimientos, intervenciones, medicamentos, tratamiento, terapias, etc., requeridos
            para la recuperación de su estado de salud, evitando al máximo desconocer sus garantías
            fundamentales y desmejorar su calidad de vida.
          </Grid>
          <Grid xs={12} md={12} lg={12}>
            <img alt="" src="/assets/3.png" />
          </Grid>
        </Grid>
      </Container>
      <footer
        style={{
          backgroundColor: "#111927",
          color: "#ffffff" /* Letra blanca */,
          padding: "20px",
          textAlign: "center",
          width: "100%",
        }}
      >
        <p>Claudia Carvajal </p>
        <p>NIT: 544.000.061-9</p>
        <p>Dirección: Kra 50 # 25 - 90 Pisos 5 - 8 -13</p>
        <p>Ciudad: Bogotá - Colombia</p>
        <p>
          Horario de Atención: lunes a viernes de 7:00 am a 4:30 pm Planoteca, Biblioteca y Archivo
          de Predios
        </p>
        <p>Teléfono Conmutador: +57 601 345 80 00</p>
        <p>Linea Gratuita: 01 8000 913 038</p>
        <p>Línea anticorrupción: Línea 195 opción 1</p>
        <p>Canales de atención</p>
        <p>Correo electrónico institucional: servicioalciudadanoGEL@sdpaa.gov.co</p>
        <p>Correo electrónico notificaciones judiciales: buzonjudicial@sdpaa.gov.co</p>
        <p>
          Correo electrónico notificaciones judiciales:
          notificacionesjudiciales@secretariajuridica.gov.co
        </p>
      </footer>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
