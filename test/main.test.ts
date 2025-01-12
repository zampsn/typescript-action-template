import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as core from '@actions/core';
import { run } from '../src/main';
import { mockContext } from './helpers';

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
  vi.unstubAllEnvs();
});

describe('main', () => {
  it('should not blow up', async () => {
    mockContext();
    vi.spyOn(core, 'setFailed');

    await expect(run()).resolves.not.toThrow();
    expect(core.setFailed).not.toHaveBeenCalled();
  });

  it('should blow up', async () => {
    mockContext();
    vi.spyOn(core, 'setFailed');
    vi.spyOn(core, 'info').mockImplementation(() => {
      throw new Error('ahhhhh');
    });

    await expect(run()).resolves.not.toThrow();
    expect(core.setFailed).toHaveBeenCalledWith('ahhhhh');
  });
});
