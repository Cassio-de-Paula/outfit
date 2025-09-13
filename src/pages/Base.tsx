import { Outlet } from "react-router-dom"
import CustomHeader from "../components/CustomHeader"
import OfferHeader from "../components/OfferHeader"
import CustomFooter from "../components/CustomFooter"

const Base = () => {
    return (
        <>
            <OfferHeader />
            <CustomHeader />
            <Outlet />
            <CustomFooter />
        </>
    )
}

export default Base