import React from 'react';
import {BannerClient} from "@/app/(dashboard)/[storeId]/(routes)/banners/components/client";
import db from "@/lib/db";

const BannerPage = async ({params}:{params: {storeId:string}}) => {
    const banners = await db.banner.findMany({
        where: {
            storeId: params.storeId,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });


    return (
        <div className="banner-page flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BannerClient data={banners} />
            </div>
        </div>
    );
};

export default BannerPage;
