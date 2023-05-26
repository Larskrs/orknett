
import FileSharingLayout from '@/layouts/FileSharingLayout';
import FileUpload from '@/components/FileUpload'
import LoginButton from '@/components/LoginButton'

import { useSession } from 'next-auth/react';

export default function Upload() {
    
    const session = useSession({
        required: false,
    })

    return (


        <FileSharingLayout pageId={1}>
            <LoginButton />
            <FileUpload />
        </FileSharingLayout>
    );
}