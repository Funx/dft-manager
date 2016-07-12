import {remove} from 'diacritics'
import slugify from 'slugify'

/* converts an element name to its id, following dofus.com conventions */
export const idFromName = (x = '') => slugify(remove(x))
  .toLowerCase()
  .replace(/-de-/g, '-')
  .replace(/-des-/g, '-')
  .replace(/-du-/g, '-')
  .replace(/-le-/g, '-')
  .replace(/-la-/g, '-')
  .replace(/-en-/g, '-')
  .replace(/-or-/g, '-') // lol wtf
  .replace(/-wo-/g, '-') // lol wtf
  .replace(/-a-/g, '-')
  .replace(/-d'/g, '-')
  .replace(/-l'/g, '-')
