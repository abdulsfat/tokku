import React from 'react';
import {BannerClient} from "@/app/(dashboard)/[storeId]/(routes)/banners/components/client";

const BannerPage = () => {
    return (
        <div className="banner-page flex-col">
            <div className="container flex-1 space-y-4 p-8 pt-6">
                <BannerClient />
            </div>
        </div>
    );
};

export default BannerPage;
