# sable

interactive page history

Sable is a library for visualising document changes, and reverting back to them.

**Somewhat ready.**

+ [Docs](#docs)
  + [Setup](#setup)
  + [Methods](#methods)
  + [Hooks](#hooks)

## Roadmap

+ Actual unique ids [bug]
+ ~~Fix add/remove node revert not working~~
+ Capture innerText/innerHTML changes
+ ~~Events for elements (attribute changed, removed, added, etc.)~~

## Docs

### Setup

```javascript
import Sable from '{LOCATION}';

let sable = new Sable();

// starts tracking an element
sable.start(document.querySelector('div'), {
    attributes: true,
    attributeOldValue: true,
    characterData: true,
    characterDataOldValue: true,
    childList: true,
    subtree: true,
});

window.addEventListener('sable-change', (event) => {
    // ...
});
```

### Methods

#### revert(id)

Returns the snapshot of the specified id.  The id can be obtained by listening to the `sable-change` event.

```javascript
window.addEventListener("sable-change", data => {
    let snapshot = instance.revert(data.detail.id); // snapshot of the element before its most recent change
};
```

#### start(element, config)

Starts observing an element, using the specified [config](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit).

```javascript
instance.start(document.querySelector('div'), {
    attributes: true,
    attributeOldValue: true,
    characterData: true,
    characterDataOldValue: true,
    childList: true,
    subtree: true,
});
```

#### stop()

Stops monitoring the element specified when the `start()` method was called.

### Hooks

#### Element-Specific Hooks

Any child within the element set when `instance.start()` will have a `changed-attribute` hook.  The parents of elements that are added or removed will have `added-node` and `removed-node` hooks.  These hooks will carry data about the change, through the event's `detail` property.

```javascript
element.addEventListener('changed-attribute', (event) => {
    event = event.detail; // get rid of miscellaneous information
    console.log(`Changed attribute: ${event.attribute}.  New attribute value: ${event.new}.  Old attribute value: ${event.old}.`);
});
```

See [Hook Details](#hook-details) for information about the information passed to the event listener.

#### Window Hooks

The `sable-change` event is broadcast to the `window` when any time of change is made.

```javascript
window.addEventListener('sable-change', (event) => {
    event = event.detail;
    ...
});
```

See [Hook Details](#hook-details) for information about the information passed to the event listener.

#### Hook Details

| Property | Description |
| -------- | ----------- |
| new | the new value of the attribute that changed (only with `changed-attribute`) |
| old | the previous value of the attribute that changed (only with `changed-attribute`) |
| change | the type of change (always `changed-attribute`) |
| index | index of the event in the list of events (id value) |
| snapshot | record of the element at the time of the event |
| target | live node of the element that the event took place on |
| uniqueId | the target node's unique id |
