'use client'

import {useEffect, useState} from "react";
import {ImagePlus, Trash} from "lucide-react";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {CldUploadWidget} from "next-cloudinary";

interface ImageUploadProps {
    disabled?: boolean
    onChange?: (value: string) => void
    onRemove?: (value: string) => void
    value?: string[]
}

const ImageUpload: React.FC<ImageUploadProps> = ({disabled, value, onRemove, onChange}) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const onUpload = (result: any) => {
        if (onChange) {
            onChange(result.info.secure_url)
        }
    }

    if(!isMounted){
        return null
    }
    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value?.map((url) => (
                    <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                            <Button type="button" onClick={() => onRemove ? onRemove(url) : {}} variant={"destructive"} size="icon">
                                <Trash className="h-4 w-4"/>
                            </Button>
                        </div>
                        <Image fill className="object-cover" alt="image" src={url} />
                    </div>
                ))}
            </div>
            <CldUploadWidget onSuccess={onUpload} uploadPreset="31rwq2">
                {({open}) => {
                    const onClick = () => {
                        open()
                };
                    return (
                    <Button type="button" variant="secondary" onClick={onClick} disabled={disabled}>
                        <ImagePlus className="h-4 w-4 ml-2"/>
                        Upload Image
                    </Button>
                    )
                }}
            </CldUploadWidget>
        </div>
    )
}

export default ImageUpload;