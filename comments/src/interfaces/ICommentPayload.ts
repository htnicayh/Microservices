import { ICommentContent } from "./ICommentContent"

export interface ICommentPayload {
    type: string
    data: ICommentContent
}