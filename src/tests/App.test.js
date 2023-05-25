import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import App from '../App';
import PlanetsProvider, { PlanetsContext } from '../contexts/PlanetsProvider';
import mockAPI from './helpers/mockAPI';
import userEvent, { specialChars } from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('Testa elementos na Tela ao carregar a página', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (mockAPI)
    })
  });

  it('Testa se os elementos de filtro estão na tela ao carregar a página', () => {
    act(() => {
      render(
        <PlanetsProvider>
          <App />
        </PlanetsProvider>
      )
    })

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

    await act(async() => {
      render(
        <PlanetsProvider>
          <App />
        </PlanetsProvider>
      )
    })

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

    await act(async() => {
      render(
        <PlanetsProvider>
          <App />
        </PlanetsProvider>
      )
    })

    const filter = screen.getByTestId('name-filter');

    act(() => {
      userEvent.type(filter, 't')
    })

    await waitFor(() => {
      expect(filter.value).toBe('t')
      expect(screen.getByRole('cell', {
        name: /tatooine/i
      })).toBeInTheDocument();
      expect(screen.getByRole('cell', {
        name: /Hoth/i
      })).toBeInTheDocument();
    })

    act(() => {
      userEvent.type(filter, 'o')
    })

    await waitFor(() => {
      expect(screen.getByRole('cell', {
        name: /tatooine/i
      })).toBeInTheDocument();
    })
  })

  it('Testa se ao selecionar "diameter" "menor que" e "10000" só aparecerá na tela o "Hoth" e se quando clica em apagar filtro individual, ele é apagado corretamente', async () => {

    await act(async() => {
      render(
        <PlanetsProvider>
          <App />
        </PlanetsProvider>
      )
    })

    const column = screen.getByTestId('column-filter');
    const comparison = screen.getByTestId('comparison-filter');
    const value = screen.getByTestId('value-filter');
    const button = screen.getByTestId('button-filter');

    act(() => {
      userEvent.selectOptions(column, 'diameter');
      userEvent.selectOptions(comparison, 'menor que');
      userEvent.clear(value);
      userEvent.type(value, '10000');
    })

    act(() => {
      userEvent.click(button)
    })

    await waitFor(() => {
      expect(screen.getByRole('cell', {
        name: /Hoth/i
      })).toBeInTheDocument();
      expect(screen.getByTestId('filter')).toHaveTextContent('diameter menor que 10000Apagar');
    })

    const deleteFilter = screen.getByTestId('delete-filter');

    act(() => {
      userEvent.click(deleteFilter)
    })

    expect(await screen.queryAllByTestId('filter')).toHaveLength(0);
  })

  it('Testa se ao aplicar 3 filtros e apagar 2 deles, o efeito do outro continua', async () => {

    await act(async() => {
      render(
        <PlanetsProvider>
          <App />
        </PlanetsProvider>
      )
    })

    const column = screen.getByTestId('column-filter');
    const comparison = screen.getByTestId('comparison-filter');
    const value = screen.getByTestId('value-filter');
    const button = screen.getByTestId('button-filter');

    act(() => {
      userEvent.selectOptions(column, 'diameter')
      userEvent.selectOptions(comparison, 'menor que')
      userEvent.clear(value);
      userEvent.type(value, '10000');
      userEvent.click(button)
    })

    act(() => {
      userEvent.selectOptions(column, 'rotation_period')
      userEvent.selectOptions(comparison, 'igual a')
      userEvent.clear(value);
      userEvent.type(value, '23');
      userEvent.click(button)
    })

    act(() => {
      userEvent.selectOptions(column, 'orbital_period')
      userEvent.selectOptions(comparison, 'menor que')
      userEvent.clear(value);
      userEvent.type(value, '500');
      userEvent.click(button)
    })

    await waitFor(() => {
      expect(screen.getAllByTestId('planet-name')[0]).toHaveTextContent('Dagobah')
    })

    const deleteFilter = screen.getAllByRole('button', {
      name: /apagar/i
    })

    act(() => {
      userEvent.click(deleteFilter[0])
      userEvent.click(deleteFilter[0])
    })

    await waitFor(() => {
      expect(screen.getAllByTestId('planet-name')[0]).toHaveTextContent('Tatooine')
    })
  })
  
  it('Testa se ao selecionar "diameter" "igual a" e "7200" só aparecerá na tela o "Hoth" e se quando clica em apagar filtro individual, ele é apagado corretamente', async () => {

    await act(async() => {
      render(
        <PlanetsProvider>
          <App />
        </PlanetsProvider>
      )
    })

    const column = screen.getByTestId('column-filter');
    const comparison = screen.getByTestId('comparison-filter');
    const value = screen.getByTestId('value-filter');
    const button = screen.getByRole('button', {
      name: /filtrar/i
    })

    act(() => {
      userEvent.selectOptions(column, 'diameter');
      userEvent.selectOptions(comparison, 'igual a');
      userEvent.clear(value);
      userEvent.type(value, '7200');
      userEvent.click(button)
    })

    await waitFor(() => {
      expect(screen.getAllByTestId('planet-name')[0]).toHaveTextContent('Hoth')
    })
  })

  it('Testa se ao selecionar "population" "igual a" e "23" e "rotation_period" "maior que" "549" eles aparecem na listagem de filtros e ao clicar em "remover todos os filtros" eles somem da tela.', async () => {

    await act(async() => {
      render(
        <PlanetsProvider>
          <App />
        </PlanetsProvider>
      )
    })

    const column = screen.getByTestId('column-filter');
    const comparison = screen.getByTestId('comparison-filter');
    const value = screen.getByTestId('value-filter');
    const button = screen.getByTestId('button-filter');

    act(() => {
      userEvent.selectOptions(column, 'population');
      userEvent.selectOptions(comparison, 'igual a');
      userEvent.clear(value);
      userEvent.type(value, '23');
      userEvent.click(button)
    })

    act(() => {
      userEvent.selectOptions(screen.getByTestId('column-filter'), 'rotation_period');
      userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'maior que');
      userEvent.clear(value);
      userEvent.type(screen.getByTestId('value-filter'), '549');
      userEvent.click(button)
    })

    await waitFor(() => {
      expect(screen.getAllByTestId('filter')[0]).toHaveTextContent('population igual a 23Apagar');
      expect(screen.getAllByTestId('filter')[1]).toHaveTextContent('rotation_period maior que 549Apagar');
    })

    act(() => {
      userEvent.click(screen.getByTestId('button-remove-filters'))
    })

    await waitFor(() => {
      expect(screen.findByTestId('filter')).toMatchObject({})
    })
  })

  it('Testa se os filtros de sort estão funcionando', async () => {
    await act(async() => {
      render(
        <PlanetsProvider>
          <App />
        </PlanetsProvider>
      )
    })


    const columnSort = screen.getByTestId('column-sort');
    const asc = screen.getByTestId('column-sort-input-asc');
    const desc = screen.getByTestId('column-sort-input-desc');
    const buttonSort = screen.getByTestId('column-sort-button');

    act(() => {
      userEvent.selectOptions(columnSort, 'population')
      userEvent.click(asc)
    })

    await waitFor(() => {
      userEvent.click(buttonSort)
      expect(screen.getAllByTestId('planet-name')[0]).toHaveTextContent('Yavin IV')
    })

    act(() => {
      userEvent.click(desc)
    })

    await waitFor(() => {
      userEvent.click(buttonSort)
      expect(screen.getAllByTestId('planet-name')[0]).toHaveTextContent('Coruscant')
    })
  })
})