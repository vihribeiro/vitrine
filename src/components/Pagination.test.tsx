import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Pagination } from './Pagination'

describe('Pagination', () => {
  it('mostra o intervalo e dispara onChange ao avançar', async () => {
    const onChange = vi.fn()

    render(<Pagination page={2} totalPages={25} total={194} pageSize={8} onChange={onChange} />)

    expect(screen.getByText('9–16 de 194')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: /próxima/i }))
    expect(onChange).toHaveBeenCalledWith(3)
  })

  it('desabilita "anterior" na primeira página e "próxima" na última', () => {
    const { rerender } = render(
      <Pagination page={1} totalPages={25} total={194} pageSize={8} onChange={vi.fn()} />,
    )
    expect(screen.getByRole('button', { name: /anterior/i })).toBeDisabled()

    rerender(<Pagination page={25} totalPages={25} total={194} pageSize={8} onChange={vi.fn()} />)
    expect(screen.getByRole('button', { name: /próxima/i })).toBeDisabled()
  })
})
