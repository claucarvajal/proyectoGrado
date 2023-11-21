import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersSearch } from "src/sections/hijos/hijos-search";
import { applyPagination } from "src/utils/apply-pagination";
import { supabase } from "src/supabase/client";
import { HijosTable } from "src/sections/hijos/hijos-table";
import * as XLSX from 'xlsx';

const now = new Date();

const exportToExcel = (data) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, 'data.xlsx');
};

const usePersona = (persona, page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(persona, page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const usePersonaIds = (customers) => {
  return useMemo(() => {
    return customers.map((customer) => customer.id);
  }, [customers]);
};

export async function getServerSideProps() {
  try {
    const { data, error } = await supabase
    .from('persona')
    .select('*')
    .eq('embarazo', '');

    return {
      props: {
        persona: data,
        error: error,
      },
    };
  } catch (error) {
    return {
      props: {
        persona: null,
        error: error.message,
      },
    };
  }
}

const Page = ({ persona, error }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = usePersona(persona, page, rowsPerPage);
  const personaIds = usePersonaIds(customers);
  const personaSelection = useSelection(personaIds);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const filteredHijos = customers.filter((hijos) =>
    hijos.nombres.toLowerCase().includes(searchValue.toLowerCase()) || 
    hijos.departamento.toLowerCase().includes(searchValue.toLowerCase()) ||
    hijos.entidad.toLowerCase().includes(searchValue.toLowerCase()) ||
    hijos.municipio.toLowerCase().includes(searchValue.toLowerCase()) ||
    (hijos.documento && (hijos.documento.toString().toLowerCase().includes(searchValue.toLowerCase()) 
    || hijos.documento.toString().includes(searchValue))) || 
    (hijos.id && (hijos.id.toString().toLowerCase().includes(searchValue.toLowerCase()) 
    || hijos.id.toString().includes(searchValue)))
  );


  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>Niños</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Listado de niños</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
     
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                    onClick={() => exportToExcel(filteredHijos)}
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
    
            </Stack>
            <CustomersSearch onSearch={handleSearch} />

            <HijosTable
              count={filteredHijos.length}
              items={filteredHijos}
              onDeselectAll={personaSelection.handleDeselectAll}
              onDeselectOne={personaSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={personaSelection.handleSelectAll}
              onSelectOne={personaSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={personaSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
