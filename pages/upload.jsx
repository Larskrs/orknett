
import FileSharingLayout from '@/components/FileSharingLayout';
import FileUpload from '@/components/FileUpload'
import LoginButton from '@/components/LoginButton'

import { useSession } from 'next-auth/react';

export default function() {
    
    const session = useSession({
        required: false,
    })

    return (


        <FileSharingLayout>
            <LoginButton />
            <FileUpload />
        </FileSharingLayout>
    );
}