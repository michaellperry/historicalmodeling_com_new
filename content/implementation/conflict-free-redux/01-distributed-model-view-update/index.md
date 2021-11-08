---
title: "Distributed Model-View-Update"
date: "2021-11-02T11:45:58Z"
description: "Reduce over past actions to compute current state. But do it between the client and the server."
status: "Published"
---

## Reduction Beats Mutation

Reduction beats mutation.
Free-for-all mutation of data structures leads to code that is very difficult to think about.

To reduce the prevalence of bugs, libraries like React and Redux adopt an immutable approach.
The main operation in these libraries is the "reducer".

A reducer is a pure function.
It has no side-effects.
Below is an example, which I call `apply`.
This function takes a state and an action, and produces a new state.

```typescript
function apply(old: State, next: Action): State {
  // ...
}
```

It does not change the old state.
It just returns the new state.
The advantage is that the old state is still around for us to apply a different action.
We'll put that to good use in a little bit.

In the meantime, let's compose a bunch of apply operations.
This will evolve state from what it was in the past to what it would be after a sequence actions.
This kind of composition is sometimes called a "left fold".

```typescript
function leftFold(initial: State, sequence: Action[]): State {
  let current = initial;
  for (const action of sequence) {
    current = apply(current, action);
  }
  return current;
}
```

Javascript has a built-in function called `reduce` that does the same thing.
Hence "Redux".

```typescript
sequence.reduce(apply, initial);
```

The left-fold operation has a significant advantage over mutation: it does not destroy the prior state.
That means that we can hold on to it and apply a different sequence of actions later.
Perhaps one sequence of actions is what happened on the local device, and the other is what happened on the server
This is precisely what the distributed model-view-update pattern is all about.

## Dispatcher Example

Let's build an app.
This app will help dispatchers and contractors communicate.
When a customer requests some work, a dispatcher will add that work order to the system.
This takes the form of an action.

```typescript
const workOrderAction = {
  type: "WorkOrder",
  location: "525 Main",
  workDate: "2022-03-27",
  description: "Spread fertilizer"
}
```

The app lists all open work orders.
Part of the app state is therefore a list of open orders.
We can apply this action to the list.

```typescript
function apply(state: State, action: Action) {
  if (action.type === "WorkOrder") {
    return {
      ...state,
      openWorkOrders = [
        ...state.openWorkOrders,
        action
      ]
    };
  }
}
```

