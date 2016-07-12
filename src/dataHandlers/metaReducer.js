export const metaReducer = (transactions, transaction) => {
  if (transaction.type == 'UNDO') {
    return transactions
      .update(transaction.target, (x) => ({...x, canceled: true}))
      .delete(transaction.id)
  }
  if (transaction.type == 'REDO') {
    return transactions
      .update(transaction.target, (x) => ({...x, canceled: false}))
      .delete(transaction.id)
  }
  return transactions
}
export default metaReducer
