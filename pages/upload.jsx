
import FileSharingLayout from '@/layouts/FileSharingLayout';
import NewFileUpload from '@/components/NewFileUpload'
import LoginButton from '@/components/LoginButton'

import { useSession } from 'next-auth/react';

export default function Upload() {
    
    const session = useSession({
        required: false,
    })

    return (


        <FileSharingLayout pageId={1}>
           {session.status === "authenticated" && <NewFileUpload /> }
        </FileSharingLayout>
    );
}