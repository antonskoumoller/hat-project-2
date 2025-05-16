import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#20c997', // your brand green
    },
    secondary: {
      main: '#79dfc1', // hover/focus accent
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#20c997',
          '&.Mui-focused': {
            color: '#79dfc1',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '0.375rem', // Tailwind `rounded-md`
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#20c997',
            transition: 'all 0.2s ease-in-out',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#79dfc1',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#79dfc1',
          },
        },
        input: {
          color: '#20c997',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: '#20c997',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#20c997',
          '&.Mui-checked': {
            color: '#79dfc1',
          },
        },
      },
    },
  },
});

export default theme;
