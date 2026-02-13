import { AsyncLocalStorage } from 'node:async_hooks';

import { origin } from '../../../runtime/api';
import { createWorkerdRequestScope } from '../workerd';

const STORE = new AsyncLocalStorage();

describe(createWorkerdRequestScope, () => {
  it('uses `Origin` header when present', async () => {
    const run = createWorkerdRequestScope(STORE, {});
    const request = new Request('http://localhost:8081/test', {
      headers: { Origin: 'http://example.com' },
    });

    const result = await run(
      async () => {
        expect(origin()).toBe('http://example.com');
        return Response.json({ ok: true });
      },
      request,
      {},
      {}
    );

    expect(result).toBeInstanceOf(Response);
  });

  it('falls back to request URL origin when `Origin` header is absent', async () => {
    const run = createWorkerdRequestScope(STORE, {});
    const request = new Request('http://localhost:8081/test');

    const result = await run(
      async () => {
        expect(origin()).toBe('http://localhost:8081');
        return Response.json({ ok: true });
      },
      request,
      {},
      {}
    );

    expect(result).toBeInstanceOf(Response);
  });
});
