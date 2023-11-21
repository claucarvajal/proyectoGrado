// En el componente CustomersSearch, puedes utilizar el estado local y el evento onChange para filtrar los resultados. Aquí tienes un ejemplo de cómo hacerlo:

import React, { useState } from 'react';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';

export const CustomersSearch = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <Card sx={{ p: 2 }}>
      <OutlinedInput
        value={searchValue}
        onChange={handleSearchChange}
        fullWidth
        placeholder="Buscar niños"
        startAdornment={(
          <InputAdornment position="start">
            <SvgIcon
              color="action"
              fontSize="small"
            >
              <MagnifyingGlassIcon />
            </SvgIcon>
          </InputAdornment>
        )}
        sx={{ maxWidth: 500 }}
      />
    </Card>
  );
};