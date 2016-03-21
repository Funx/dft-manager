import { TestScheduler } from 'rx'

export const getMessages = (observable) =>
  (new TestScheduler())
    .startScheduler(() => observable)
    .messages


export const getValues = (observable) => getMessages(observable)
  .map((message) => message.value.value)

export default {
  getMessages,
  getValues,
}
