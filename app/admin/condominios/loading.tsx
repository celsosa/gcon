import Breadcrumb from "@/components/Breadcrumbs/Breadcrumbs"
import LoadingSkeleton from "@/components/common/LoadingSkeleton"

function loading() {
    return (
        <div className="flex flex-1 flex-col h-full">

            <Breadcrumb
                separator={<span> / </span>}
                customPath={"Condomínios"}
                activeClasses='text-primary'
                containerClasses='flex py-5 bg-gradient-to-r from-purple-600 to-blue-600 float-right'
                listClasses='text-xl mx-2 font-semibold text-black dark:text-white hover:text-primary'
                capitalizeLinks
            />
            <LoadingSkeleton />
        </div>

    )
}

export default loading