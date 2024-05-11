import { Suspense, lazy } from "react"
import LoadingComponent from "../../components/Loading/Loading"
const LeftBar = lazy(() => import('../../components/LeftBar/LeftBar'))
const RightBar = lazy(() => import('../../components/RightBar/RightBar'))

function Layout() {
    return (
        <main>
            <Suspense fallback={<LoadingComponent />}>

                <LeftBar />
                <RightBar />
            </Suspense>
        </main>
    )
}

export default Layout
