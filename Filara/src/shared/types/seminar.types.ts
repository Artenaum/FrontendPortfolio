import type {GenericData} from './common.types'

export interface Seminar extends GenericData {
    id: number
    title: string
    description: string
    date: string
    time: string
    photo: string
    userId: number
    status: 'application' | 'upcoming' | 'history'
    likes?: number
}
