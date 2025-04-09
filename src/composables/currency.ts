export const useCurrency = () => {
  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  const formatCurrency = (value: number) => {
    return currencyFormatter.format(Number(value / 100))
  }

  return {
    formatCurrency,
  }
}
