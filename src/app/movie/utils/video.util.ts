export class VideoUtil {
    static convertYoutubeLinkToEmbededURL(url: string | null | undefined): string {
        return url?.replace("watch?v=", "embed/") || '';
    }
}