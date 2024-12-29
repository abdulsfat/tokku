'use client'

import {Banner} from "@prisma/client";
import {Heading} from "@/components/ui/heading";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {useParams, useRouter} from "next/navigation";

interface BannerClientProps {
    data: Banner[]
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
        </>
    )
}