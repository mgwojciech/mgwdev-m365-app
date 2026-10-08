---
name: mgwdev-m365-project-extension
user-invocable: true
description: "Use when: extending this template into a new Microsoft 365 app feature or solution; adding pages, services, models, or UI built on mgwdev-m365-components, mgwdev-m365-helpers, and @fluentui/react-components; wiring Graph, SharePoint, Dataverse, or auth flows into this project; or deciding how to add a feature without bypassing the existing provider-based architecture."
---

# Extending this template

Use this skill when you are adding new functionality to the mgwdev-m365-app template and want to keep the implementation aligned with the libraries already in the repo.

## Primary goal

Extend the app by reusing the existing Microsoft 365 provider layer, helper services, and Fluent UI components instead of introducing ad hoc fetch logic or a parallel UI pattern.

## Extension workflow

1. Identify the target capability and the data source behind it.
2. Decide whether the feature belongs in a page, reusable component, service, or model.
3. Reuse the app-level providers already wired in `src/App.tsx`.
4. Use `mgwdev-m365-components` for Microsoft 365-aware UI and context-driven access.
5. Use `mgwdev-m365-helpers` for auth wrappers, client composition, query builders, and paging.
6. Use `@fluentui/react-components` for layout, inputs, tables, dialogs, and visual states.
7. Keep business logic in services and data models, not directly inside page markup.
8. Validate the change with the smallest useful check first, then run broader checks if needed.

## Default architecture for new work

### Pages

Use `src/pages/` for route-level experiences and screen-sized features.

### Components

Use `src/components/` for reusable UI pieces that can be shared across pages.

### Services

Use `src/services/` for Graph, SharePoint, Dataverse, or other API integration logic.

### Models

Use `src/model/` for the TypeScript shapes returned by the services or rendered by the UI.

## Library usage rules

### mgwdev-m365-components

Use this library when the feature needs app-level Microsoft 365 context, provider wiring, or ready-made M365 UI primitives.

Prefer this pattern:

```tsx
import { useGraph, useSP, useDataverse } from "mgwdev-m365-components";

export function ExamplePage() {
  const { graphClient } = useGraph();
  const { spClient } = useSP();
  const { dataverseClient } = useDataverse();

  return <div />;
}
```

### mgwdev-m365-helpers

Use this library when the feature needs auth wrappers, paging providers, or query builders.

Prefer building on the library’s abstractions instead of calling service endpoints directly from page components.

### Fluent UI

Use `@fluentui/react-components` for the visible app shell, forms, cards, data views, and interaction states.

Prefer Fluent UI components over custom HTML when the same behavior already exists in the library.

## Decision points

### If the feature needs Microsoft 365 data

Use the existing provider context and a service wrapper. Do not create a new authentication stack inside the page.

### If the feature mostly transforms or displays data

Keep the transform in a service or utility and keep the page focused on composition.

### If the feature needs reusable UI

Create a component in `src/components/` and keep it presentation-focused.

### If the feature introduces new data types

Add or update models in `src/model/` before wiring the UI.

## Good extension pattern

1. Read from the relevant provider.
2. Call a typed service method.
3. Store the result in state.
4. Render the result using Fluent UI.
5. Keep loading and empty states explicit.

## Avoid

- Do not bypass the provider setup in `src/App.tsx` unless the change truly requires a structural refactor.
- Do not scatter Graph, SharePoint, or Dataverse calls directly through page components.
- Do not reimplement auth or paging if the helpers library already covers the case.
- Do not introduce another UI framework for a feature that can be built with Fluent UI.

## Completion checks

Before considering the extension done, confirm:

1. the new feature uses the existing provider and helper flow
2. the code is placed in the right layer
3. the UI uses Fluent UI consistently
4. the change builds cleanly
5. any touched service logic has a matching test or a clear reason it does not

## Example prompts this skill should handle

- extend this project with a new SharePoint-driven page
- add a Dataverse search experience using the existing libraries
- build a reusable Fluent UI component for this app
- wire a Graph-backed feature into the template
- show me the right place to put a new service or model