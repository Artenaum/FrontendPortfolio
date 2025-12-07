import type {GenericData} from './common.types'

export interface Brand extends GenericData {
    id: string
    name: string
    icon: string
    margin: number
}
