import React from 'react';
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import db from "@/lib/db";
import {SettingsForm} from "@/app/(dashboard)/[storeId]/(routes)/settings/components/settings-form";

interface SettingsPageProps {
    params: {
        storeId: string;
    }
}

const SettingsPage: React.FC<SettingsPageProps> = async ({params}) => {

    const {userId} = await auth()

    if (!userId) {
        redirect(`/sign-in`)
    }

    const store = await db.store.findFirst({
        where:{
            id: params.storeId,
            userId
        }
    })

    if(!store){
        redirect('/')
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingsForm initialData={store} />
            </div>
        </div>
    );
};

export default SettingsPage;