import React from 'react';
import {BannerClient} from "@/app/(dashboard)/[storeId]/(routes)/banners/components/client";
import db from "@/lib/db";
import {BannerColumn} from "@/app/(dashboard)/[storeId]/(routes)/banners/components/columns";
import {format} from "date-fns";

const BannerPage = async ({params}:{params: {storeId:string}}) => {
    const banners = await db.banner.findMany({
        where: {
            storeId: params.storeId,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedBanners: BannerColumn[] = banners.map((item) => (
        {
            id: item.id,
            label: item.label,
            createdAt: format(item.createdAt, "MM do, yyyy")
        }
    ))


    return (
        <div className="banner-page flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BannerClient data={formattedBanners} />
            </div>
        </div>
    );
};

export default BannerPage;
