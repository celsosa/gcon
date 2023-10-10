'use client'

import React, { ReactNode } from 'react'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

type TBreadCrumbProps = {
    homeElement?: ReactNode,
    separator: ReactNode,
    customPath?: string,
    containerClasses?: string,
    listClasses?: string,
    activeClasses?: string,
    capitalizeLinks?: boolean
}

const Breadcrumb = ({ homeElement, separator, customPath, containerClasses, listClasses, activeClasses, capitalizeLinks }: TBreadCrumbProps) => {

    const paths = usePathname()

    const pathNames = paths.split('/').filter(path => path)

    if (customPath) {
        pathNames[pathNames.length - 1] = customPath;
    }


    return (
        <div>
            <ul className={containerClasses}>
                <li className={listClasses}><Link href={'/'}>{homeElement}</Link></li>
                {
                    pathNames.map((link, index) => {
                        let href = `/${pathNames.slice(0, index + 1).join('/')}`
                        let itemClasses = href.split('/').pop() === pathNames[pathNames.length - 1] ? `${listClasses} ${activeClasses}` : listClasses;
                        let itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1, link.length) : link
                        return (
                            <React.Fragment key={index}>
                                {index < pathNames.length - 1 ? (
                                    <li className={itemClasses} >
                                        <Link href={href}>{itemLink}</Link>
                                    </li>
                                ) :
                                    (<li className={itemClasses} >
                                        {itemLink}
                                    </li>)}
                                {pathNames.length !== index + 1 && separator}
                            </React.Fragment>
                        )
                    })
                }
            </ul>
        </div >
    )
}

export default Breadcrumb