import * as core from '@actions/core';
import { context } from '@actions/github';

const REPOSITORY_REGEX = /^[a-zA-Z0-9](?:-?[a-zA-Z0-9]){0,38}\/[a-zA-Z0-9](?:-?[a-zA-Z0-9]){0,99}$/;

export enum Inputs {
  GITHUB_TOKEN = 'github-token',
  REPOSITORY = 'repository',
}

export const getRepository = (): string => {
  const currentRepo = `${context.repo.owner}/${context.repo.repo}`;
  const repository = core.getInput(Inputs.REPOSITORY, { trimWhitespace: true }) || currentRepo;
  if (!REPOSITORY_REGEX.test(repository)) throw new Error(`Invalid repository: ${repository}`);
  return repository;
};

export const getGithubToken = (): string => {
  const token =
    core.getInput(Inputs.GITHUB_TOKEN, { trimWhitespace: true }) || process.env.GITHUB_TOKEN;
  if (!token) throw new Error('Unable to get GITHUB_TOKEN');
  return token;
};
