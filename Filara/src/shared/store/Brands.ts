import {makeAutoObservable} from 'mobx'
import type {Brand} from '../types/brand.types'
import {DB_URL} from '../constants'

class Brands {
    brands: Brand[] = []

    constructor() {
        makeAutoObservable(this)
    }

    addBrand(brand: Brand) {
        this.brands.push(brand)
    }

    removeBrand(id: string) {
        this.brands = this.brands.filter((brand) => brand.id !== id)
    }

    async fetchBrands() {
        await fetch(DB_URL + '/brands')
            .then((response) => response.json())
            .then((json) => {
                this.brands = json
            })
    }

    async createBrand(brand: Brand) {
        await fetch(DB_URL + '/brands', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(brand)
        })
    }

    async editBrand(brand: Brand, id: string) {
        await fetch(DB_URL + '/brands' + '/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(brand)
        })
    }

    async deleteBrand(id: string) {
        await fetch(DB_URL + '/brands' + '/' + id, {
            method: 'DELETE'
        })
    }
}

export default new Brands()
