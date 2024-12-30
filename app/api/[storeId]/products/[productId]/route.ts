import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import db from "@/lib/db";
import {string} from "zod";

export async function GET (
    req: Request,
    {params}: {params: { productId: string}}
) {
    try{
        if (!params.productId) {
            return new NextResponse("Product id is not found ", {status: 400})
        }

        const product = await db.product.findUnique({
            where: {
                id: params.productId,
            },
            include: {
                images: true,
                category: true,
            }
        })

        return NextResponse.json(product);

    } catch (e) {
        console.log('[PRODUCT_GET]', e)
        return new NextResponse("Internal error", {status: 500})
    }
}

export async function PATCH (
    req: Request,
    {params}: {params: {storeId: string, productId: string}}
) {
    try{
        const {userId} = await auth()
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

        if (!params.productId) {
            return new NextResponse("Product is not found ", {status: 400})
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

        await db.product.update({
            where: {
                id: params.productId,
            },
            data: {
                name,
                price,
                isFeatured,
                isArchived,
                categoryId,
                images: {
                    deleteMany: {}
                },
            }
        })

        const product = await db.product.update({
            where: {
                id: params.productId,
            },
            data: {
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: {url: string}) => image)
                        ]
                    }
                }
            }
        })

        return NextResponse.json(product);

    } catch (e) {
        console.log('[PRODUCT_PATCH]', e)
        return new NextResponse("Internal error", {status: 500})
    }
}

export async function DELETE (
    req: Request,
    {params}: {params: {storeId: string, productId: string}}
) {
    try{
        const {userId} = await auth()

        if (!userId) {
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if (!params.productId) {
            return new NextResponse("Product is not found ", {status: 400})
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

        await db.product.deleteMany({
            where: {
                id: params.productId,
            },
        })

        return NextResponse.json("OK", {status: 200});

    } catch (e) {
        console.log('[PRODUCT_DELETE]', e)
        return new NextResponse("Internal error", {status: 500})
    }
}