import {Route, Routes} from 'react-router'
import './App.css'
import '../src/shared/global.css'
import AuthPage from './pages/AuthPage'
import BannersPage from './pages/Banners/BannersPage'
import BrandsPage from './pages/Brands/BrandsPage'
import CategoriesPage from './pages/Categories/CategoriesPage'
import CitiesPage from './pages/Cities/CitiesPage'
import OrdersPage from './pages/Orders/OrdersPage'
import ProductsPage from './pages/Products/ProductsPage'
import PromocodesPage from './pages/Promocodes/PromocodesPage'
import ProtocolsPage from './pages/Protocols/ProtocolsPage'
import RequestsPage from './pages/Requests/RequestsPage'
import SeminarsPage from './pages/Seminars/SeminarsPage'
import SettingsPage from './pages/Settings/SettingsPage'
import UsersPage from './pages/Users/UsersPage'
import ProtectedRoute from './processes/ProtectedRoute'

function App() {
    return (
        <>
            <Routes>
                <Route path="/" />
                <Route path="auth" element={<AuthPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/banners" element={<BannersPage />} />
                    <Route path="/brands" element={<BrandsPage />} />
                    <Route path="/categories" element={<CategoriesPage />} />
                    <Route path="/cities" element={<CitiesPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/promocodes" element={<PromocodesPage />} />
                    <Route path="/protocols" element={<ProtocolsPage />} />
                    <Route path="/requests" element={<RequestsPage />} />
                    <Route path="/seminars" element={<SeminarsPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/users" element={<UsersPage />} />
                </Route>
            </Routes>
        </>
    )
}

export default App
