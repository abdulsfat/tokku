'use client'

import {useEffect, useState} from "react";
import Modal from "@/components/ui/modal";
import {Button} from "@/components/ui/button";

interface AlertModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    loading: boolean
}

export const AlertModal: React.FC<AlertModalProps> = ({isOpen, loading, onClose, onConfirm}) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }
    
    return (
        <Modal
        title="Are you sure?"
        description="This action can not be undone."
        isOpen={isOpen}
        onClose={onClose}
        >
            <div className="pt-6 space-x-2 flex justify-end w-full">
                <Button disabled={loading} onClick={onClose} variant="outline">
                    Cancel
                </Button>
                <Button disabled={loading} onClick={onConfirm} variant="destructive">
                    Delete
                </Button>
            </div>
        </Modal>
    )
}