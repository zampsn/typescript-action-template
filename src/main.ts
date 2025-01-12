import * as core from '@actions/core'
import {getRepository} from "./inputs";

export const run = async (): Promise<void> => {
    try {
        const repository = getRepository()
        core.info(`repository: ${repository}`)
    } catch (error: any) {
        core.setFailed(error.message)
    }
}
