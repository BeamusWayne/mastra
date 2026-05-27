import type { HonoRequest } from 'hono';

export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'ALL';

export type MastraAuthConfig<TUser = unknown, TContext = unknown> = {
  /**
   * Protected paths for the server.
   */
  protected?: (RegExp | string | [string, Methods | Methods[]])[];

  /**
   * Public paths for the server.
   */
  public?: (RegExp | string | [string, Methods | Methods[]])[];

  /**
   * Authenticate a token and return the user.
   */
  authenticateToken?: (token: string, request: HonoRequest) => Promise<TUser>;

  /**
   * Maps the authenticated user to a resource ID for memory/thread scoping.
   */
  mapUserToResourceId?(user: TUser): string | undefined | null;

  /**
   * Authorization function for the server.
   */
  authorize?: (path: string, method: string, user: TUser, context: TContext) => Promise<boolean>;

  /**
   * Rules for the server.
   */
  rules?: {
    /** Path for the rule. */
    path?: RegExp | string | string[];
    /** Method for the rule. */
    methods?: Methods | Methods[];
    /** Condition for the rule. */
    condition?: (user: TUser) => Promise<boolean> | boolean;
    /** Allow the rule. */
    allow?: boolean;
  }[];
};

export type { MastraAuthProviderOptions } from '../provider';
