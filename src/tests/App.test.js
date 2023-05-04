import React, { useContext } from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import App from '../App';
import PlanetsProvider, { PlanetsContext } from '../contexts/PlanetsProvider';
import mockAPI from './helpers/mockAPI';
import results from './helpers/mockResults';
import userEvent, { specialChars } from '@testing-library/user-event';

describe('Testa elementos na Tela ao carregar a página', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (mockAPI)
    })
  });

  it('Testa se os elementos de filtro estão na tela ao carregar a página', () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    )

    expect(screen.getByTestId('name-filter')).toBeInTheDocument();
    expect(screen.getByTestId('column-filter')).toBeInTheDocument();
    expect(screen.getByTestId('comparison-filter')).toBeInTheDocument();
    expect(screen.getByTestId('value-filter')).toBeInTheDocument();
    expect(screen.getByTestId('button-filter')).toBeInTheDocument();
    expect(screen.getByTestId('button-remove-filters')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort-input-asc')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort-input-desc')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort-button')).toBeInTheDocument();
    expect(screen.getByRole('columnheader', {
      name: /name/i
    })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', {
      name: /rotation_period/i
    })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', {
      name: /orbital_period/i
    })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', {
      name: /diameter/i
    })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', {
      name: /climate/i
    })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', {
      name: /gravity/i
    })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', {
      name: /terrain/i
    })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', {
      name: /surface_water/i
    })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', {
      name: /population/i
    })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', {
      name: /films/i
    })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', {
      name: /created/i
    })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', {
      name: /edited/i
    })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', {
      name: /url/i
    })).toBeInTheDocument();
  });

  it('Testa se os elementos gerados pelo resultado da API estão na tela após seu retorno', async () => {

    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    )

    await waitFor(() => {
      expect(screen.getByRole('cell', {
        name: /tatooine/i
      })).toBeInTheDocument();
      expect(screen.getByRole('cell', {
        name: /Alderaan/i
      })).toBeInTheDocument();
      expect(screen.getByRole('cell', {
        name: /Yavin IV/i
      })).toBeInTheDocument();
      expect(screen.getByRole('cell', {
        name: /Hoth/i
      })).toBeInTheDocument();
    })
  });
});

describe('Teste de Filtros', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (mockAPI)
    })
  });

  it('Testa se ao digitar "t" aparece só "Tatooine" e "Hoth" e em seguida digitar "o" só lista o "Tatooine"', async () => {

    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    )

    const filter = screen.getByTestId('name-filter');

    userEvent.type(filter, 't')

    await waitFor(() => {
      expect(screen.getByRole('cell', {
        name: /tatooine/i
      })).toBeInTheDocument();
      expect(screen.getByRole('cell', {
        name: /Hoth/i
      })).toBeInTheDocument();
    })

    userEvent.type(filter, 'o')

    await waitFor(() => {
      expect(screen.getByRole('cell', {
        name: /tatooine/i
      })).toBeInTheDocument();
    })
  })

  it('Testa se ao selecionar "population" "maior que" e "1000" só aparecerá na tela o "Tatooine" e "Alderaan" e o filtro é adicionado na lista; ao clicar em apagar ele some', async () => {

    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    )

    const column = screen.getByTestId('column-filter');
    const comparison = screen.getByTestId('comparison-filter');
    const value = screen.getByTestId('value-filter');
    const button = screen.getByTestId('button-filter');

    userEvent.selectOptions(column, 'population')
    userEvent.selectOptions(comparison, 'maior que')
    userEvent.type(value, `${specialChars.backspace}1000`);
    userEvent.click(button)

    await waitFor(() => {
      expect(screen.getByRole('cell', {
        name: /tatooine/i
      })).toBeInTheDocument();
      expect(screen.getByRole('cell', {
        name: /Alderaan/i
      })).toBeInTheDocument();
      expect(screen.getByTestId('filter')).toHaveTextContent('population maior que 1000Apagar');
    })

    userEvent.click(screen.getByRole('button', {
      name: /apagar/i
    }))

    await waitFor(() => {
      expect(screen.findByTestId('filter')).toMatchObject({})
    })
  })

  it('Testa se ao selecionar "population" "maior que" e "1000" só aparecerá na tela o "Tatooine" e "Alderaan" e o filtro é adicionado na lista; ao clicar em apagar ele some', async () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    )

    const columnSort = screen.getByTestId('column-sort');
    const asc = screen.getByTestId('column-sort-input-asc');
    const desc = screen.getByTestId('column-sort-input-desc');
    const buttonSort = screen.getByTestId('column-sort-button');

    userEvent.selectOptions(columnSort, 'population')
    userEvent.click(asc)
    userEvent.click(buttonSort)
    userEvent.click(desc)
    userEvent.click(buttonSort)
  })
})