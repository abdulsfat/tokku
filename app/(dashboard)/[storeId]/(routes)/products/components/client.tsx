'use client'

import {Heading} from "@/components/ui/heading";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {useParams, useRouter} from "next/navigation";
import {DataTable} from "@/components/ui/data-table";
import {ApiList} from "@/components/ui/api-list";
import {columns, ProductColumn} from "@/app/(dashboard)/[storeId]/(routes)/products/components/columns";

interface ProductClientProps {
    data: ProductColumn[]
}

export const ProductClient: React.FC<ProductClientProps> = ({data}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
        <div className="flex items-center justify-between">
            <Heading title={`Product (${data.length})`} description="Set up product for your store"/>
            <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
                <Plus className="mr-2 w-4 h-4"/>
                Add New Product
            </Button>
        </div>
            <Separator/>
            <DataTable columns={columns} data={data} searchKey="name" />
            <Heading title="API" description="API for Product" />
            <ApiList nameIndicator="products" idIndicator="productId" />
        </>
    )
}