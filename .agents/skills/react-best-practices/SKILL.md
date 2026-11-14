---
name: react-best-practices
description: "Use when: creating, extending, reviewing, or debugging React components, hooks, state, effects, accessibility, or component tests in this TypeScript and Fluent UI template."
---

# React best practices for this template

Use this skill when implementing or reviewing React UI. For Microsoft 365 features, also follow the [project extension skill](../mgwdev-m365-project-extension-skill/SKILL.md) and its provider and service architecture.

## Workflow

1. Inspect the existing page, component, context, service, and localization patterns relevant to the change. Put route-level UI in `src/pages/` and reusable UI in `src/components/`.
2. Identify the source of each piece of data, the owner of mutable state, and the user actions that change it. Keep state near its consumers; lift it only when components need to share it.
3. Keep rendering pure. Derive values from props and state during render rather than maintaining redundant state. Update objects and arrays immutably, and use stable data IDs as list keys.
4. Put user-triggered work in event handlers. Use effects to synchronize with external systems, not to calculate render data or react to a button click. Declare every reactive dependency and clean up subscriptions, timers, and other resources.
5. For asynchronous reads, handle loading, empty, success, and error states as appropriate. Abort obsolete requests if the API supports it, or ignore stale results after cleanup; prevent an older response from overwriting newer data. Use existing providers and typed services for Microsoft 365 access.
6. Follow the Rules of Hooks: call hooks at the top level of React components or custom hooks, before conditional returns. Extract custom hooks for reusable stateful behavior, not merely to move a few lines.
7. Prefer existing Fluent UI components and theme styles. Provide accessible names for controls, semantic headings, keyboard operation, and useful feedback for loading and errors. Add user-facing strings to the localization resources and use the existing localization context.
8. Test observable behavior with Vitest and React Testing Library where appropriate, including interaction, error and empty states, and async cleanup or stale responses. Use the existing test setup; configure a DOM environment for a component test if required.
9. Run the smallest relevant test first, then `npm run lint` and `npm run build` when practical. Report failures rather than hiding them.

## Design reminders

- Treat props, state, and context as read-only snapshots. Use functional state updates when the next value depends on the previous one.
- Avoid unnecessary `useMemo`, `useCallback`, and `memo`: add them for a demonstrated performance problem or a required stable identity, not by default.
- Make effects resilient to setup and cleanup being repeated. React Strict Mode can exercise this behavior in development; do not assume the template currently enables it.
- Prefer explicit, typed props and state over `any`, and avoid hiding failed requests behind success-shaped defaults.
- Preserve existing app behavior and accessibility when replacing or refactoring UI.

## References

- [Keeping components pure](https://react.dev/learn/keeping-components-pure)
- [Choosing the state structure](https://react.dev/learn/choosing-the-state-structure)
- [Updating objects in state](https://react.dev/learn/updating-objects-in-state) and [rendering lists](https://react.dev/learn/rendering-lists)
- [You might not need an Effect](https://react.dev/learn/you-might-not-need-an-effect) and [synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks) and [Strict Mode](https://react.dev/reference/react/StrictMode)
- [React Testing Library guiding principles](https://testing-library.com/docs/guiding-principles/) and [query priority](https://testing-library.com/docs/queries/about/#priority)
- [Fluent UI React components](https://react.fluentui.dev/) and [WAI accessibility tutorials](https://www.w3.org/WAI/tutorials/)
