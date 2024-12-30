import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import db from "@/lib/db";

export async function GET (
    req: Request,
    {params}: {params: { categoryId: string}}
) {
    try{
        if (!params.categoryId) {
            return new NextResponse("Category id is not found ", {status: 400})
        }

        const category = await db.category.findUnique({
            where: {
                id: params.categoryId,
            },
        })

        return NextResponse.json(category);

    } catch (e) {
        console.log('[CATEGORY_GET]', e)
        return new NextResponse("Internal error", {status: 500})
    }
}

export async function PATCH (
    req: Request,
    {params}: {params: {storeId: string, categoryId: string}}
) {
    try{
        const {userId} = await auth()
        const body = await req.json()

        const {name, bannerId} = body

        if (!userId) {
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if (!name) {
            return new NextResponse("Name category is not found", {status: 400})
        }

        if (!bannerId) {
            return new NextResponse("Banner is not found", {status: 400})
        }

        if (!params.categoryId) {
            return new NextResponse("Category is not found ", {status: 400})
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

        const category = await db.category.updateMany({
            where: {
                id: params.categoryId,
            },
            data: {
                name,
                bannerId,
            }
        })

        return NextResponse.json(category);

    } catch (e) {
        console.log('[CATEGORY_PATCH]', e)
        return new NextResponse("Internal error", {status: 500})
    }
}

export async function DELETE (
    req: Request,
    {params}: {params: {storeId: string, categoryId: string}}
) {
    try{
        const {userId} = await auth()

        if (!userId) {
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if (!params.categoryId) {
            return new NextResponse("Category is not found ", {status: 400})
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

        await db.category.deleteMany({
            where: {
                id: params.categoryId,
            },
        })

        return NextResponse.json("OK", {status: 200});

    } catch (e) {
        console.log('[CATEGORY_DELETE]', e)
        return new NextResponse("Internal error", {status: 500})
    }
}