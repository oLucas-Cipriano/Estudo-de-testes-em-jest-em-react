import { screen } from '@testing-library/react'
import Header from '..'
import { renderizaComProvider } from '../../../utils/tests'

describe('testes para o componente header', () => {
  test('deve renderizar corretamente', () => {
    renderizaComProvider(<Header></Header>)
    expect(screen.getByText('EBAC Games')).toBeInTheDocument()
  })
  test('deve renderizar 2 itens no carrinho', () => {
    renderizaComProvider(<Header></Header>, {
      preloadedState: {
        carrinho: {
          itens: [
            {
              id: 1,
              categoria: 'Rpg',
              imagem: '',
              plataformas: ['Windows'],
              preco: 150.9,
              precoAntigo: 199.9,
              titulo: 'Elden Ring'
            },
            {
              id: 2,
              categoria: 'Rpg',
              imagem: '',
              plataformas: ['Windows'],
              preco: 100.9,
              precoAntigo: 130.9,
              titulo: 'Zelda'
            }
          ]
        }
      }
    })
    expect(screen.getByTestId('qtd-carrinho').innerHTML).toContain('2 itens')
  })
})
