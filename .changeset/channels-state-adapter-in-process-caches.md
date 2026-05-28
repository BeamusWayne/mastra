---
'@mastra/core': patch
---

**performance(core):** `MastraStateAdapter` now caches confirmed subscriptions in-process, and `AgentChannels` caches the external-thread-id → Mastra-thread mapping.

Two cheap caches eliminate redundant storage round-trips on warm instances:

- The state adapter's `isSubscribed`, `subscribe`, and `unsubscribe` now share a `Set<externalThreadId>` of confirmed subscriptions. The chat SDK calls `isSubscribed` on every inbound message to decide between `onNewMention` and `onSubscribedMessage`; that call is now free after the first hit. `subscribe` skips the `updateThread` write when the thread is already known-subscribed. Persisted state is unchanged.
- `AgentChannels.getOrCreateThread` caches the external → Mastra thread mapping, skipping the `listThreads` metadata scan on repeat lookups. The mapping is immutable once created.

Only `true` answers are cached for subscriptions (a parallel request could subscribe between calls). `unsubscribe` clears the cache entry. Cold-start behavior is unchanged; the caches fill as messages are processed.
