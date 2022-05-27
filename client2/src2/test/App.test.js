import { render, screen } from '@testing-library/react';
// render para que se te renderize un componente
import App from '../App';
import { BrowserRouter } from 'react-router-dom';

test('Encuentre el boton de incio llamado "Empieza Ahora"', () => {
  render(<BrowserRouter> <App /> </BrowserRouter>);
  const linkElement = screen.getByText(/Empieza Ahora/i);
  expect(linkElement).toBeInTheDocument();//expect es de jest 
});
