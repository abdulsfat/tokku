import {NextResponse} from "next/server";
import db from "@/lib/db";
import { auth } from '@clerk/nextjs/server'

export async function POST(req: Request, {params} : {params: {storeId: string}}) {
    try {
        const { userId } = await auth()
        const body = await req.json()

        const {label, imageUrl} = body

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        if (!label) {
            return new NextResponse("Must have a label", {status: 400})
        }

        if (!imageUrl) {
            return new NextResponse("Must have a image", {status: 400})
        }

        if (!params.storeId) {
            return new NextResponse("Store is not found", {status: 400})
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

        const banner = await db.banner.create({
            data: {
                label,
                imageUrl,
                storeId: params.storeId
            }
        })

        return NextResponse.json(banner)


    } catch (e) {
        console.log("[BANNER_POST",e);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}

export async function GET(req: Request, {params} : {params: {storeId: string}}) {
    try {
        const body = await req.json()

        const {label, imageUrl} = body

        if (!label) {
            return new NextResponse("Must have a label", {status: 400})
        }

        if (!imageUrl) {
            return new NextResponse("Must have a image", {status: 400})
        }

        if (!params.storeId) {
            return new NextResponse("Store is not found", {status: 400})
        }

        const storeByUserId = await db.store.findFirst({
            where: {
                id: params.storeId,
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", {status: 404})
        }

        const banner = await db.banner.create({
            data: {
                label,
                imageUrl,
                storeId: params.storeId
            }
        })

        return NextResponse.json(banner)


    } catch (e) {
        console.log("[BANNER_POST",e);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}