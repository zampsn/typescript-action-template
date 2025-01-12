import {vi} from "vitest";
import {Context} from "@actions/github/lib/context";
import * as github from "@actions/github";

const newMockContext = (overrides = {}) => {
    vi.stubEnv('GITHUB_REPOSITORY', 'owner/env-repo') // Required for new Context() not to throw
    const context = new Context()
    Object.assign(context, overrides)
    return context
}
export const mockContext = (context?: Context) =>
    vi.spyOn(github, 'context', 'get').mockReturnValue(context || newMockContext())