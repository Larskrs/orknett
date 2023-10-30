
import { VideoPlayer } from "@/components";

export default function VideoPage() {
    return (
        <div style={{maxWidth: "90vw", maxHeight: "90vh"}}>
            <VideoPlayer videoProps={{loop: true}} source={"http://aktuelt.tv/api/v1/files/videos?quality=360&fileId=ffc422c6-b6a4-4e09-810d-9cd361d1d0c0.mov"} />
        </div>
    );
}