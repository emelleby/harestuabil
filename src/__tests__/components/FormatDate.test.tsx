import { render, screen } from '@testing-library/react'
import FormatDate from '../../components/FormatDate'

describe('FormatDate', () => {
  it('should format date in Norwegian format (DD.MM.YYYY)', () => {
    // Given: A specific date
    const date = new Date('2025-01-15')
    
    // When: Rendering the FormatDate component
    render(<FormatDate date={date} />)
    
    // Then: Should display date in Norwegian format
    expect(screen.getByText('15.01.2025')).toBeInTheDocument()
  })

  it('should render time element with ISO datetime attribute', () => {
    // Given: A specific date
    const date = new Date('2025-01-15')
    
    // When: Rendering the FormatDate component
    render(<FormatDate date={date} />)
    
    // Then: Should have time element with datetime attribute
    const timeElement = screen.getByText('15.01.2025').closest('time')
    expect(timeElement).toHaveAttribute('dateTime')
  })

  it('should format date with leading zeros', () => {
    // Given: A date with single-digit day and month
    const date = new Date('2025-03-05')
    
    // When: Rendering the FormatDate component
    render(<FormatDate date={date} />)
    
    // Then: Should display with leading zeros
    expect(screen.getByText('05.03.2025')).toBeInTheDocument()
  })

  it('should handle end of year date', () => {
    // Given: A date at the end of the year
    const date = new Date('2025-12-31')
    
    // When: Rendering the FormatDate component
    render(<FormatDate date={date} />)
    
    // Then: Should display correctly
    expect(screen.getByText('31.12.2025')).toBeInTheDocument()
  })

  it('should handle beginning of year date', () => {
    // Given: A date at the beginning of the year
    const date = new Date('2025-01-01')
    
    // When: Rendering the FormatDate component
    render(<FormatDate date={date} />)
    
    // Then: Should display correctly
    expect(screen.getByText('01.01.2025')).toBeInTheDocument()
  })
})

