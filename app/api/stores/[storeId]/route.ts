import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import db from "@/lib/db";

export async function PATCH (
    req: Request,
    {params}: {params: {storeId: string}}
) {
    try{
        const {userId} = await auth()
        const body = await req.json()

        const {name} = body

        if (!userId) {
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if (!name) {
            return new NextResponse("name store is not found", {status: 400})
        }

        if (!params) {
            return new NextResponse("user id is not found ", {status: 400})
        }

        const store = await db.store.updateMany({
            where: {
                id: params.storeId,
                userId
            },
            data: {
                name
            }
        })

        return NextResponse.json(store);

    } catch (e) {
        console.log('[STORE_PATCH]', e)
        return new NextResponse("Internal error", {status: 500})
    }
}

export async function DELETE (
    req: Request,
    {params}: {params: {storeId: string}}
) {
    try{
        const {userId} = await auth()

        if (!userId) {
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if (!params) {
            return new NextResponse("user id is not found ", {status: 400})
        }

        await db.store.deleteMany({
            where: {
                id: params.storeId,
                userId
            },
        })

        return NextResponse.json("OK", {status: 200});

    } catch (e) {
        console.log('[STORE_DELETE]', e)
        return new NextResponse("Internal error", {status: 500})
    }
}