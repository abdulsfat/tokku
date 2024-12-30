'use client'

import {useParams} from "next/navigation";
import {useOrigin} from "@/hooks/use-origin";
import {ApiAlert} from "@/components/ui/api-alert";

interface ApiListProps {
    nameIndicator: string
    idIndicator: string
}

export const ApiList: React.FC<ApiListProps> = ({nameIndicator, idIndicator}) => {
    const params = useParams()
    const origin = useOrigin()

    const baseUrl = `${origin}/api/${params.storeId}`

    return (
        <>
            <ApiAlert title="GET" description={`${baseUrl}/${nameIndicator}`} variant="public"/>
            <ApiAlert title="GET" description={`${baseUrl}/${nameIndicator}/{${idIndicator}`} variant="public"/>
            <ApiAlert title="POST" description={`${baseUrl}/${nameIndicator}`} variant="admin"/>
            <ApiAlert title="PATCH" description={`${baseUrl}/${nameIndicator}/{${idIndicator}`} variant="admin"/>
            <ApiAlert title="DELETE" description={`${baseUrl}/${nameIndicator}/{${idIndicator}`} variant="admin"/>
        </>
    )
}