import React from 'react';
import db from "@/lib/db";
import {format} from "date-fns";
import {formatter} from "@/lib/utils";
import {ProductColumn} from "@/app/(dashboard)/[storeId]/(routes)/products/components/columns";
import {ProductClient} from "@/app/(dashboard)/[storeId]/(routes)/products/components/client";

const ProductPage = async ({params}:{params: {storeId:string}}) => {
    const products = await db.product.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            category: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedProducts: ProductColumn[] = products.map((item) => (
        {
            id: item.id,
            name: item.name,
            isFeatured: item.isFeatured,
            isArchived: item.isArchived,
            price: formatter.format(item.price.toNumber()),
            category: item.category.name,
            createdAt: format(item.createdAt, "MMM do, yyyy")
        }
    ))


    return (
        <div className="banner-page flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductClient data={formattedProducts} />
            </div>
        </div>
    );
};

export default ProductPage;
