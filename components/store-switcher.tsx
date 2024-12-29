'use client'

import React, {useState} from 'react';
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Store} from "@prisma/client";
import {useStoreModal} from "@/hooks/use-store-modal";
import {useParams, useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Check, ChevronsUpDown, PlusCircle, StoreIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
} from "@/components/ui/command";

type PopOverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopOverTriggerProps {
    items: Store[]
}

const StoreSwitcher = ({
    className,
    items = []
}: StoreSwitcherProps) => {
    const storeModal = useStoreModal()
    const params = useParams()
    const router = useRouter()

const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id
}))

    const currentStore = formattedItems.find((item) => item.value === params.storeId)

    const [open, setOpen] = useState(false)

    const onStoreSelect = (store: {value: string, label: string}) => {
        setOpen(false)
        router.push(`/${store.value}`)
    }

    return (
        <Popover open={open} onOpenChange={setOpen} >
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" role="combobox" aria-expanded={open} aria-label="Select Store" className={cn("w-[200px] justify-between", className)}>
                    <StoreIcon className="mr-2 h-2 w-2"/>
                    {currentStore?.label}
                    <ChevronsUpDown className="ml-auto shrink-0 opacity-50 h-2 w-2"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" >
                <Command>
                    <CommandList>
                        <CommandInput placeholder="search your store" />
                        <CommandEmpty>
                            Store not found
                        </CommandEmpty>
                        <CommandGroup heading="Store">
                            {formattedItems.map((store) => (
                                <CommandItem key={store.value} onSelect={() => onStoreSelect(store)} className="text-sm">
                                    <StoreIcon className="mr-2 h-4 w-4"/>
                                    {store.label}
                                    <Check
                                    className={cn("ml-2 h-4 w-4", currentStore?.value === store.value ? "opacity-100" : "opacity-0")}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator/>
                    <CommandList>
                        <CommandGroup>
                            <CommandItem onSelect={() => {
                                setOpen(false)
                                storeModal.onOpen()
                            }}>
                                <PlusCircle className="mr-2 h-4 w-4"/>
                                Creat new store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default StoreSwitcher;
