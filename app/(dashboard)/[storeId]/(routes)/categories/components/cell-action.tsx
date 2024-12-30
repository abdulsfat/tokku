'use client'

import toast from "react-hot-toast";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Copy, Edit, MoreHorizontal, Trash} from "lucide-react";
import {useParams, useRouter} from "next/navigation";
import axios from "axios";
import {useState} from "react";
import {AlertModal} from "@/components/modals/alert";
import {CategoryColumn} from "@/app/(dashboard)/[storeId]/(routes)/categories/components/columns";

interface CellActionProps {
    data: CategoryColumn
}

export const CellAction: React.FC<CellActionProps> = ({data}) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const router = useRouter();
    const params = useParams();

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id)
        toast.success("Successfully copied to clipboard")
    }

    const onDelete = async () => {
        try {
            setLoading(true);

            await axios.delete(`/api/${params.storeId}/categories/${data.id}`)
            router.push(`/${params.storeId}/categories`)
            toast.success("Successfully delete category")
            router.refresh()
        } catch (error) {
            toast.error("Failed to delete category");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
        <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"}>
                        <span className="sr-only">Open Menu</span>
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={"end"}>
                    <DropdownMenuLabel>Action</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onCopy(data.id)}>
                        <Copy className="h-4 w-4 mr-2"/>
                        Copy Id
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/categories/${data.id}`)}>
                        <Edit className="h-4 w-4 mr-2"/>
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="h-4 w-4 mr-2"/>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        </>
    )
}