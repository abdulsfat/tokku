'use client'

import {Banner, Category} from "@prisma/client";
import {Heading} from "@/components/ui/heading";
import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import {useParams, useRouter} from "next/navigation";
import {AlertModal} from "@/components/modals/alert";
import {useOrigin} from "@/hooks/use-origin";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface CategoryFormProps {
    initialData: Category | null
    banners: Banner []
}

const formSchema = z.object({
    name: z.string().min(1),
    bannerId: z.string().min(1),
})

type CategoryFormValues = z.infer<typeof formSchema>

export const CategoryForm: React.FC<CategoryFormProps> = ({initialData, banners}) => {
    const params = useParams()
    const router = useRouter()
    const origin = useOrigin()

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit Category" : "Create Category"
    const description = initialData ? "Edit Category Store" : "Create Category Store"
    const toastMessage = initialData ? "Successfully Edit category" : "Successfully create category"
    const action = initialData ? "Save Category" : "Create Category"

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            bannerId: '',
        }
    })

    const onSubmit = async (data: CategoryFormValues) => {
        try {
            setLoading(true);

            if(initialData) {
            await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, data, {})
            } else {
                await axios.post(`/api/${params.storeId}/categories`, data, {})
            }
            router.push(`/${params.storeId}/categories`);
            router.refresh()
            toast.success(toastMessage)
            } catch (error) {
                toast.error("Failed to create category");
            } finally {
            setLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true);

            await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`)
            router.push(`/${params.storeId}/categories`)
            toast.success("Successfully delete category")
            router.refresh()
        } catch (error) {
            toast.error("Failed to delete category");
        } finally {
            setLoading(false);
        }
    }

    return(
        <>
            <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading}/>
            <div className="flex items-center justify-between">
                <Heading
                    title={title}
                    description={description}
                />
                {initialData && (
                <Button
                    disabled={loading}
                    variant="destructive"
                    size="sm"
                    onClick={() => setOpen(true)}>
                    <Trash className="h-4 w=4"/>
                </Button>
                )}
            </div>
            <Separator/>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name Category" disabled={loading} {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}
                        />
                        <FormField
                            control={form.control}
                            name="bannerId"
                            render={({field}) => (
                            <FormItem>
                                <FormLabel>Banner</FormLabel>
                                <FormControl>
                                    <Select
                                    disabled={loading}
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Select Banner"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {banners.map((banner) => (
                                                <SelectItem key={banner.id} value={banner.id}>
                                                    {banner.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    <Button disabled={loading} type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
            <Separator/>
        </>
    )
}