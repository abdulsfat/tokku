'use client'

import {Heading} from "@/components/ui/heading";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {useParams, useRouter} from "next/navigation";

export const BannerClient = () => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
        <div className="flex items-center justify-between">
            <Heading title="Banner (0)" description="test desctipsi yooo"/>
            <Button onClick={() => router.push(`/${params.storeId}/banners/new`)}>
                <Plus className="mr-2 w-4 h-4"/>
                Add New Banner
            </Button>
        </div>
            <Separator/>
        </>
    )
}