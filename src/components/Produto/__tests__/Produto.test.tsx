import { fireEvent, screen } from '@testing-library/react'
import Produto from '..'
import { renderizaComProvider } from '../../../utils/tests'

const jogo = {
  id: 2,
  categoria: 'Rpg',
  imagem: '',
  plataformas: ['Windows'],
  preco: 100.9,
  precoAntigo: 130.9,
  titulo: 'Zelda'
}

describe('testes para o componente produto', () => {
  test('deve renderizar corretamente', () => {
    renderizaComProvider(<Produto game={jogo}></Produto>)
    expect(screen.getByText('Zelda')).toBeInTheDocument()
  })

  test('deve adicionar um item ao carrinho', () => {
    const { store } = renderizaComProvider(<Produto game={jogo}></Produto>)
    const botao = screen.getByTestId('btn-adicionar-produto')
    fireEvent.click(botao)

    expect(store.getState().carrinho.itens).toHaveLength(1)
  })
})
