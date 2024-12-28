'use client'

import * as z from 'zod'

import Modal from "@/components/ui/modal";
import {useStoreModal} from "@/hooks/use-store-modal";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
    name: z.string().min(1).max(100)
});

export const StoreModal = () => {

    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            setLoading(true)

            const response = await axios.post("/api/stores", values)

            // TODO : build page after user create store
            // window.location.assign(`/${response.data.id}`)

            toast.success("Store stored successfully")
        }catch(e){
            toast.error("Failed create store")
        } finally {
            setLoading(false)
        }
    }

    const storeModal = useStoreModal();
    return (
        <Modal title="Selamat datang di tokku" description="Buat Toko Anda Sendiri" isOpen={storeModal.isOpen} onClose={storeModal.onClose}>
            <div>
                <div className='space-y-4 py-2 pb-4'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                        placeholder='Name Toko'
                                        {...field}
                                        disabled={loading}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                            />
                            <div className="pt-6 space-x-2 flex items-center justify-end w-full" >
                                <Button variant="outline" onClick={storeModal.onClose}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={loading}>
                                    Continue
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}