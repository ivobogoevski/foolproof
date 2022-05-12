export interface IFile {
    creationDateTime: string;
    status: string;
    modifiedBy: number;
    type: string;
    uri: string;
    version: number;
    id: number;
    fileId: string;
    scheduled: boolean;
    title: string;
    createdBy: number;
    modifiedDateTime: string;
    live: boolean;
    popularity: number;
    modifiedByUserName?: string;
    createdByUserName?: string;
    typeColor?: string;
}