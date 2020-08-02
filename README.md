# sable
 interactive page history

Far from ready.

## Roadmap

+ Actual unique ids [bug]
+ ~~Fix add/remove node revert not working~~
+ Capture innerText/innerHTML changes
+ ~~Events for elements (attribute changed, removed, added, etc.)~~

## Docs

Incomplete

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
| index | index of the event in the list of events |
| snapshot | record of the element at the time of the event |
| target | live node of the element that the event took place on |
| uniqueId | the target node's unique id |
