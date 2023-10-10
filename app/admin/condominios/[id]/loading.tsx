import Breadcrumb from '@/components/Breadcrumbs/Breadcrumbs'

function loading() {
    return (
        <>
            <Breadcrumb
                separator={<span> / </span>}
                customPath={"Serviços"}
                activeClasses='text-primary'
                containerClasses='flex py-5 bg-gradient-to-r from-purple-600 to-blue-600 float-right'
                listClasses='text-xl mx-2 font-semibold text-black dark:text-white hover:text-primary'
                capitalizeLinks
            />

            <div>Carregando serviços...</div>
        </>

    )
}

export default loading