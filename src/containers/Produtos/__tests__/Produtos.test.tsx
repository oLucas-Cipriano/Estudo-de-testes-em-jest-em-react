import { rest } from 'msw'
import { setupServer } from 'msw/node'
import Produtos from '..'
import { renderizaComProvider } from '../../../utils/tests'
import { screen, waitFor } from '@testing-library/react'

const mocks = [
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
  },
  {
    id: 3,
    categoria: 'Rpg',
    imagem: '',
    plataformas: ['Windows'],
    preco: 150.9,
    precoAntigo: 199.9,
    titulo: 'Elden Ring2'
  },
  {
    id: 4,
    categoria: 'Rpg',
    imagem: '',
    plataformas: ['Windows'],
    preco: 100.9,
    precoAntigo: 130.9,
    titulo: 'Zelda2'
  }
]

const server = setupServer(
  rest.get(
    'http://localhost:4000/produtos',
    (requisicao, resposta, contexto) => {
      return resposta(contexto.json(mocks))
    }
  )
)

describe('testes para os produtos', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('deve renderizar corretamente com o texto de carregando', () => {
    renderizaComProvider(<Produtos></Produtos>)
    expect(screen.getByText('carregando...')).toBeInTheDocument()
  })

  test('deve renderizar corretamente com a listagem de jogos', async () => {
    renderizaComProvider(<Produtos></Produtos>)
    await waitFor(() => {
      expect(screen.getByText('Zelda')).toBeInTheDocument
    })
  })
})
