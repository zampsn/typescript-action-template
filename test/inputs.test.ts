import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as core from '@actions/core';
import { getGithubToken, getRepository, Inputs } from '../src/inputs';
import { mockContext } from './helpers';

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
  vi.unstubAllEnvs();
});

describe('github-token', () => {
  it('Should return the input token', () => {
    vi.stubEnv('GITHUB_TOKEN', 'env-token');
    vi.spyOn(core, 'getInput').mockReturnValue('input-token');

    expect(getGithubToken).not.toThrow();
    expect(getGithubToken()).toEqual('input-token');
    expect(core.getInput).toHaveBeenCalledWith(Inputs.GITHUB_TOKEN, {
      trimWhitespace: true,
    });
  });

  it('Should return the env token if no input is provided', () => {
    vi.stubEnv('GITHUB_TOKEN', 'env-token');

    expect(getGithubToken()).toEqual('env-token');
    expect(core.getInput).toHaveBeenCalledWith(Inputs.GITHUB_TOKEN, {
      trimWhitespace: true,
    });
  });

  it('Should throw an error if neither the input or env token is found', () => {
    expect(getGithubToken).toThrow();
    expect(core.getInput).toHaveBeenCalledWith(Inputs.GITHUB_TOKEN, {
      trimWhitespace: true,
    });
  });
});

describe('repository', () => {
  beforeEach(() => mockContext());

  it('Should return the repository input', () => {
    vi.spyOn(core, 'getInput').mockReturnValue('owner/input-repo');

    expect(getRepository()).toEqual('owner/input-repo');
    expect(core.getInput).toHaveBeenCalledWith(Inputs.REPOSITORY, {
      trimWhitespace: true,
    });
  });

  it('Should return the context repository if no input is provided', () => {
    mockContext();
    expect(getRepository()).toEqual('owner/env-repo');
    expect(core.getInput).toHaveBeenCalledWith(Inputs.REPOSITORY, {
      trimWhitespace: true,
    });
  });

  it('Should throw an error if the repository is invalid', () => {
    ['repos', '/repo', 'owner/', 'owner/foo/bar', 'owner//repo'].forEach((input) => {
      vi.spyOn(core, 'getInput').mockReturnValue(input);

      expect(getRepository).toThrow();
    });
  });
});
