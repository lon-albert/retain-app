/**
 * Created by lon on 1/6/17.
 */
import * as services from './services'
export { App } from './app'

const mapValuesToArray = (obj) => Object.keys(obj).map(key => obj[key])

export const providers = [
    ...mapValuesToArray(services)
]