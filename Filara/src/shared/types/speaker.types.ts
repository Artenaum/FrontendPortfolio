import type {GenericData} from './common.types'

export interface Speaker extends GenericData {
    id: number
    fullName: string
    organization: string
    email: string
    phone: string
    roleId: number
    cityId: number
}
