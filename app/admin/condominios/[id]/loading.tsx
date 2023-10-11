import Breadcrumb from '@/components/Breadcrumbs/Breadcrumbs'
import LoaderComponent from '@/components/common/LoaderComponent'

function loading() {
    return (
        <div className="flex flex-1 flex-col h-full">
            <Breadcrumb
                separator={<span> / </span>}
                customPath={"Serviços"}
                activeClasses='text-primary'
                containerClasses='flex py-5 bg-gradient-to-r from-purple-600 to-blue-600 float-right'
                listClasses='text-xl mx-2 font-semibold text-black dark:text-white hover:text-primary'
                capitalizeLinks
            />

            <LoaderComponent />
        </div>

    )
}

export default loading