import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';

const now = new Date();

const Page = () => (
  <>
    <Head>
      <title>
        Información
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
        >
          {/* <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewBudget
              difference={12}
              positive
              sx={{ height: '100%' }}
              value="$24k"
            />
          </Grid> */}
          {/* <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalCustomers
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value="1.6k"
            />
          </Grid> */}
          {/* <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTasksProgress
              sx={{ height: '100%' }}
              value={75.5}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalProfit
              sx={{ height: '100%' }}
              value="$15k"
            />
          </Grid> */}
          <Grid
            xs={12}
            lg={8}
          >
             <strong>Obligaciones de las eps con las mujeres embarazadas en colombia</strong>

             <p>Las Entidades Promotoras de Salud (EPS) tienen la responsabilidad de brindar atención integral a las mujeres embarazadas, 
              garantizando su bienestar y el de sus hijos. Algunas de las obligaciones específicas de las EPS con respecto a las mujeres embarazadas en Colombia incluyen:
                        
            Control prenatal: Las EPS deben proporcionar servicios de control prenatal para asegurar un seguimiento adecuado durante el 
            embarazo. Esto incluye consultas médicas regulares, exámenes de laboratorio y estudios de diagnóstico por imágenes según sea necesario.

            Atención durante el parto: Las EPS deben garantizar el acceso a servicios de atención obstétrica de calidad durante el parto.
             Esto implica la disponibilidad de personal médico calificado y la infraestructura necesaria para atender partos seguros.

            Acceso a medicamentos e insumos: Las mujeres embarazadas deben tener acceso a los medicamentos e insumos necesarios para 
            su salud y la del feto. Esto incluye la disponibilidad de suplementos vitamínicos, medicamentos específicos recomendados durante el embarazo y otros productos relacionados.

            Atención postparto: Después del parto, las EPS deben brindar atención postparto que incluya seguimiento médico tanto para 
            la madre como para el recién nacido. Esto puede incluir asesoramiento sobre la lactancia materna, cuidado del recién nacido y evaluación de la salud de la madre.

            Educación en salud: Las EPS tienen la responsabilidad de proporcionar educación en salud a las mujeres embarazadas,
             brindándoles información sobre la importancia del control prenatal, la nutrición adecuada durante el embarazo, la preparación para el parto y otros temas relacionados.
            </p>
            {/* <OverviewSales
              chartSeries={[
                {
                  name: 'This year',
                  data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20]
                },
                {
                  name: 'Last year',
                  data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13]
                }
              ]}
              sx={{ height: '100%' }}
            /> */}
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
          <img
              alt=""
              src="/assets/emba3.jpg"
              height="500px" // Puedes ajustar el valor según tus necesidades
            />
            {/* <OverviewTraffic
              chartSeries={[63, 15, 22]}
              labels={['Desktop', 'Tablet', 'Phone']}
              sx={{ height: '100%' }}
            /> */}
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <strong>¿la diabetes gestacional?</strong>
            <p>La diabetes gestacional puede provocar problemas de salud a la madre y al bebé durante y después del embarazo. 
              Es importante hacerse la prueba para que el doctor o la matrona pueda tomar medidas para protegerte a ti y al bebé.

            <p>Corres más riesgo de desarrollar diabetes gestacional si:</p>

          <ul>Tienes sobrepeso o eres obesa</ul>
          <ul>Tienes un historial familiar de diabetes</ul>
          <ul>Tienes un historial familiar de diabetes</ul>
          <ul>Tienes más de 25 años de edad</ul>
          <ul>Eres afroestadounidense, hispana, indígena de Estados Unidos, miembro de los pueblos originarios de Alaska, hawaiano u originario de las islas del Pacífico</ul>
          <ul>Tuviste diabetes gestacional durante un embarazo anterior</ul>
          <ul>Tuviste un bebé que pesó más de 9 libras (unos 4 kilogramos) al nacer.</ul>
          <ul>Tienes el síndrome del ovario poliquístico (PCOS, por sus siglas en inglés)</ul>

          Puedes reducir el riesgo de sufrir diabetes gestacional si tienes una alimentación saludable y te mantienes activa durante el embarazo.</p>

            {/* <OverviewLatestProducts
              products={[
                {
                  id: '5ece2c077e39da27658aa8a9',
                  image: '/assets/products/product-1.png',
                  name: 'Healthcare Erbology',
                  updatedAt: subHours(now, 6).getTime()
                },
                {
                  id: '5ece2c0d16f70bff2cf86cd8',
                  image: '/assets/products/product-2.png',
                  name: 'Makeup Lancome Rouge',
                  updatedAt: subDays(subHours(now, 8), 2).getTime()
                },
                {
                  id: 'b393ce1b09c1254c3a92c827',
                  image: '/assets/products/product-5.png',
                  name: 'Skincare Soja CO',
                  updatedAt: subDays(subHours(now, 1), 1).getTime()
                },
                {
                  id: 'a6ede15670da63f49f752c89',
                  image: '/assets/products/product-6.png',
                  name: 'Makeup Lipstick',
                  updatedAt: subDays(subHours(now, 3), 3).getTime()
                },
                {
                  id: 'bcad5524fe3a2f8f8620ceda',
                  image: '/assets/products/product-7.png',
                  name: 'Healthcare Ritual',
                  updatedAt: subDays(subHours(now, 5), 6).getTime()
                }
              ]}
              sx={{ height: '100%' }}
            /> */}
          </Grid>
          <Grid
            xs={12}
            md={12}
            lg={8}
          >
            <img
              alt=""
              src="/assets/1.png"
            />
            {/* <OverviewLatestOrders
              orders={[
                {
                  id: 'f69f88012978187a6c12897f',
                  ref: 'DEV1049',
                  amount: 30.5,
                  customer: {
                    name: 'Ekaterina Tankova'
                  },
                  createdAt: 1555016400000,
                  status: 'pending'
                },
                {
                  id: '9eaa1c7dd4433f413c308ce2',
                  ref: 'DEV1048',
                  amount: 25.1,
                  customer: {
                    name: 'Cao Yu'
                  },
                  createdAt: 1555016400000,
                  status: 'delivered'
                },
                {
                  id: '01a5230c811bd04996ce7c13',
                  ref: 'DEV1047',
                  amount: 10.99,
                  customer: {
                    name: 'Alexa Richardson'
                  },
                  createdAt: 1554930000000,
                  status: 'refunded'
                },
                {
                  id: '1f4e1bd0a87cea23cdb83d18',
                  ref: 'DEV1046',
                  amount: 96.43,
                  customer: {
                    name: 'Anje Keizer'
                  },
                  createdAt: 1554757200000,
                  status: 'pending'
                },
                {
                  id: '9f974f239d29ede969367103',
                  ref: 'DEV1045',
                  amount: 32.54,
                  customer: {
                    name: 'Clarke Gillebert'
                  },
                  createdAt: 1554670800000,
                  status: 'delivered'
                },
                {
                  id: 'ffc83c1560ec2f66a1c05596',
                  ref: 'DEV1044',
                  amount: 16.76,
                  customer: {
                    name: 'Adam Denisov'
                  },
                  createdAt: 1554670800000,
                  status: 'delivered'
                }
              ]}
              sx={{ height: '100%' }}
            /> */}
          </Grid>
          <Grid
            xs={12}
            md={12}
            lg={8}
          > 
            <img
            alt=""
            src="/assets/2.png"
          /></Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            Al igual que con las mujeres embarazadas, nuestro ordenamiento jurídico atribuye a los niños la condición de sujetos de especial
            protección constitucional, razón por la cual, también deben ser objeto de medidas de discriminación positiva, orientadas a materializar en ellos 
            el fin ulterior del Estado social de derecho. La protección de sus derechos fundamentales constituye un deber para el Estado.
            El artículo 44 de la Constitución señala que Son derechos fundamentales de los niños: la vida, la integridad física, la salud y la seguridad social,
            entre otros. En el mismo orden, declara que Los derechos de los niños prevalecen sobre los derechos de los demás. Resulta contrario al precedente 
            de esta corporación, que las EPS pretermitan la afiliación de estos sujetos de especial protección, bajo supuestos fuera de contexto o, peor aún,
            sin proporcionar razones objetivas para ello. Así las cosas, la protección de su derecho fundamental a la salud no se traduce en una simple labor 
            social, sino en un mandato constitucional, que debe interpretar el verbo del constituyente a través del despliegue institucional, al cual no escapan 
            los jueces de tutela.
          </Grid>
          <Grid
            xs={12}
            md={12}
            lg={12}
          >A los niños se les debe suministrar un servicio de salud que otorgue una ayuda eficaz. Para ello, el Estado tiene la obligación de asegurar 
            que les sean brindados todos los medios, sean médicos o educativos, que les permitan obtener una recuperación óptima, o si esto no fuera posible, 
            por lo menos que accedan a la mejor calidad de vida posible. En conclusión, se les debe prodigar a los pequeños un servicio especializado, 
            integral, eficiente y óptimo, que les permita acceder a todos los servicios, exámenes, procedimientos, intervenciones, medicamentos, tratamiento, 
            terapias, etc., requeridos para la recuperación de su estado de salud, evitando al máximo desconocer sus garantías fundamentales y 
            desmejorar su calidad de vida.
          </Grid>
          <Grid
            xs={12}
            md={12}
            lg={12}
          > 
          <img
          alt=""
          src="/assets/3.png"
          /></Grid>
         
        </Grid>
      </Container>
      <footer 
        style={{backgroundColor: "#111927",
        color: "#ffffff", /* Letra blanca */
        padding: "20px",
        textAlign: "center", width: "100%"}}
      >
        <p>Claudia Carvajal </p>
        <p>NIT: 544.000.061-9</p>
        <p>Dirección: Kra 50 # 25 - 90 Pisos 5 - 8 -13</p>
        <p>Ciudad: Bogotá - Colombia</p>
        <p>Horario de Atención: lunes a viernes de 7:00 am a 4:30 pm Planoteca, Biblioteca y Archivo de Predios</p>
        <p>Teléfono Conmutador: +57 601 345 80 00</p>
        <p>Linea Gratuita: 01 8000 913 038</p>
        <p>Línea anticorrupción: Línea 195 opción 1</p>
        <p>Canales de atención</p>
        <p>Correo electrónico institucional: servicioalciudadanoGEL@sdpaa.gov.co</p>
        <p>Correo electrónico notificaciones judiciales: buzonjudicial@sdpaa.gov.co</p>
        <p>Correo electrónico notificaciones judiciales: notificacionesjudiciales@secretariajuridica.gov.co</p>
      </footer>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
