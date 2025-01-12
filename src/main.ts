import * as core from '@actions/core';
import { getRepository } from './inputs';

export const run = async (): Promise<void> => {
  try {
    const repository = getRepository();
    core.info(`repository: ${repository}`);
  } catch (error: unknown) {
    if (error instanceof Error) core.setFailed(error.message);
    else core.setFailed('Unexpected error occurred');
  }
};
