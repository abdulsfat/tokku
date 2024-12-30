'use client'

import {Heading} from "@/components/ui/heading";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {useParams, useRouter} from "next/navigation";
import {BannerColumn, columns} from "@/app/(dashboard)/[storeId]/(routes)/banners/components/columns";
import {DataTable} from "@/components/ui/data-table";
import {ApiList} from "@/components/ui/api-list";

interface BannerClientProps {
    data: BannerColumn[]
}

export const BannerClient: React.FC<BannerClientProps> = ({data}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
        <div className="flex items-center justify-between">
            <Heading title={`Banner (${data.length})`} description="Set up banners for your store"/>
            <Button onClick={() => router.push(`/${params.storeId}/banners/new`)}>
                <Plus className="mr-2 w-4 h-4"/>
                Add New Banner
            </Button>
        </div>
            <Separator/>
            <DataTable columns={columns} data={data} searchKey="label" />
            <Heading title="API" description="API for Banners" />
            <ApiList nameIndicator="banners" idIndicator="bannerId" />
        </>
    )
}