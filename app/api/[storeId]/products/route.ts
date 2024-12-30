import {NextResponse} from "next/server";
import db from "@/lib/db";
import { auth } from '@clerk/nextjs/server'

export async function POST(req: Request, {params} : {params: {storeId: string}}) {
    try {
        const { userId } = await auth()
        const body = await req.json()

        const {
            name,
            price,
            categoryId,
            images,
            isFeatured,
            isArchived,
        } = body

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        if (!name) {
            return new NextResponse("Must have a name", {status: 400})
        }

        if (!images || !images.length) {
            return new NextResponse("Must have a image", {status: 400})
        }

        if (!price) {
            return new NextResponse("Must have a price", {status: 400})
        }

        if (!categoryId) {
            return new NextResponse("Must have a category", {status: 400})
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

        const product = await db.product.create({
            data: {
                name,
                price,
                categoryId,
                isFeatured,
                isArchived,
                storeId: params.storeId,
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: {url: string}) => image)
                        ]
                    }
                }
            }
        })

        return NextResponse.json(product)

    } catch (e) {
        console.log("[PRODUCT_POST",e);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}

export async function GET(req: Request, {params} : {params: {storeId: string}}) {
    try {

        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get("categoryId") || undefined;
        const isFeatured = searchParams.get("isFeatured")

        if (!params.storeId) {
            return new NextResponse("Store is not found", {status: 400})
        }

        const products = await db.product.findMany({
            where:{
                storeId: params.storeId,
                categoryId,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false
            },
            include: {
                images: true,
                category: true
            },
            orderBy: {
                createdAt: 'desc',
            }
        })

        return NextResponse.json(products)

    } catch (e) {
        console.log("[PRODUCT_GET",e);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}