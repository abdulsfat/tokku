'use client'

import {useStoreModal} from "@/hooks/use-store-modal";
import {useEffect} from "react";
import {UserButton} from "@clerk/clerk-react";

const SetupPage = () => {
    const onOpen = useStoreModal((state) => state.onOpen);
    const isOpen = useStoreModal((state) => state.isOpen);

    useEffect(() => {
        if (!isOpen){
            onOpen()
        }
    },[isOpen, onOpen]);

  return (
    <div className="p-4">
        <UserButton></UserButton>
        Root Page
    </div>
  );
}

export default SetupPage;
