import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import db from "@/lib/db";

export async function GET (
    req: Request,
    {params}: {params: { bannerId: string}}
) {
    try{
        if (!params.bannerId) {
            return new NextResponse("Banner id is not found ", {status: 400})
        }

        const banner = await db.banner.findUnique({
            where: {
                id: params.bannerId,
            },
        })

        return NextResponse.json(banner);

    } catch (e) {
        console.log('[BANNER_GET]', e)
        return new NextResponse("Internal error", {status: 500})
    }
}

export async function PATCH (
    req: Request,
    {params}: {params: {storeId: string, bannerId: string}}
) {
    try{
        const {userId} = await auth()
        const body = await req.json()

        const {label, imageUrl} = body

        if (!userId) {
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if (!label) {
            return new NextResponse("Label banner is not found", {status: 400})
        }

        if (!imageUrl) {
            return new NextResponse("Image banner is not found", {status: 400})
        }

        if (!params.bannerId) {
            return new NextResponse("Banner is not found ", {status: 400})
        }

        const storeByUserId = await db.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", {status: 404})
        }

        const banner = await db.banner.updateMany({
            where: {
                id: params.bannerId,
            },
            data: {
                label,
                imageUrl,
            }
        })

        return NextResponse.json(banner);

    } catch (e) {
        console.log('[BANNER_PATCH]', e)
        return new NextResponse("Internal error", {status: 500})
    }
}

export async function DELETE (
    req: Request,
    {params}: {params: {storeId: string, bannerId: string}}
) {
    try{
        const {userId} = await auth()

        if (!userId) {
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if (!params.bannerId) {
            return new NextResponse("Banner id is not found ", {status: 400})
        }

        const storeByUserId = await db.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", {status: 404})
        }

        await db.banner.deleteMany({
            where: {
                id: params.bannerId,
            },
        })

        return NextResponse.json("OK", {status: 200});

    } catch (e) {
        console.log('[BANNER_DELETE]', e)
        return new NextResponse("Internal error", {status: 500})
    }
}