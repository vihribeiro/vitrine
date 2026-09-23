import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SearchBar } from './SearchBar'

describe('SearchBar', () => {
  it('chama onChange ao digitar', async () => {
    const onChange = vi.fn()

    render(<SearchBar value="" onChange={onChange} />)

    await userEvent.type(screen.getByRole('searchbox'), 'laptop')

    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledWith('l')
  })
})
