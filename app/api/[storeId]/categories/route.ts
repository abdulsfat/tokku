import {NextResponse} from "next/server";
import db from "@/lib/db";
import { auth } from '@clerk/nextjs/server'

export async function POST(req: Request, {params} : {params: {storeId: string}}) {
    try {
        const { userId } = await auth()
        const body = await req.json()

        const {name, bannerId} = body

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        if (!name) {
            return new NextResponse("Must have a name", {status: 400})
        }

        if (!bannerId) {
            return new NextResponse("Banner is not found", {status: 400})
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

        const category = await db.category.create({
            data: {
                name,
                bannerId,
                storeId: params.storeId
            }
        })

        return NextResponse.json(category)


    } catch (e) {
        console.log("[CATEGORY_POST",e);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}

export async function GET(req: Request, {params} : {params: {storeId: string}}) {
    try {

        if (!params.storeId) {
            return new NextResponse("Store is not found", {status: 400})
        }

        const category = await db.category.findMany({
            where:{
                storeId: params.storeId,
            }
        })

        return NextResponse.json(category)

    } catch (e) {
        console.log("[CATEGORY_GET",e);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}