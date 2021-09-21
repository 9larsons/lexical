# Outline

Outline is a fast, light-weight, extensible library for building rich text editors on the web. The core of Outline is a dependency-free
text editor engine that allows for powerful, simple and complex, editor implementations to be built on top. Outline's engine provides three
main parts: state, a reconciler for rendering to the DOM, and a set of APIs that allow you to incrementally read, update, and subscribe to
editor instances.

Outline has tight intergration with React 18+ via the optional `outline-react` package. This package provides a set of hooks, utility functions
and helpers that wire toghether event listeners and effects in React, to editor instances running with Outline.

## Environment setup

1. Clone this repository

2. Install dependencies
   - `npm install`

3. Start local server and run tests
   - `npm run start`
   - `npm run test`
     - The server needs to be running for the e2e tests

## Getting started with React

Below is an example of a basic plain text editor using `outline` and `outline-react` ([try it yourself](https://codesandbox.io/s/outline-plain-text-example-g932e)).


```jsx
import {useCallback} from 'react';
import useOutlineEditor from 'outline-react/useOutlineEditor';
import useOutlinePlainText from 'outline-react/useOutlinePlainText';

function Editor() {
  // When Outline encounters an error, this is where
  // we can report/handle it.
  const onError = useCallback((error) => {
    throw error;
  }, [])

  // Create an Outline editor instance and also a ref
  // that we need to pass to our content editable.
  const [editor, contentEditableRef, showPlaceholder] = useOutlineEditor(
    onError,
  );

  // Setup plain text entry event handlers.
  useOutlinePlainText(editor);

  // Our <div> content editable element with some basic styling.
  return (
    <div>
      <div
        ref={contentEditableRef}
        contentEditable={true}
        role="textbox"
        spellCheck={true}
        style={{
          outline: 0,
          overflowWrap: 'break-word',
          padding: '10px',
          userSelect: 'text',
          whiteSpace: 'pre-wrap',
        }}
        tabIndex={0}
      />
      {showPlaceholder && (
        <div className="placeholder">Enter some plain text...</div>
      )}
    </div>
  );
}
```

## Working with Outline

## Overview

This section covers how to use Outline, independently of any framework or library. For those intending to use Outline in their React applications,
it's advisable to [check out the source-code for the hooks that are shipped in `outline-react`](https://github.com/facebookexternal/Outline/tree/main/packages/outline-react/src).

## Creating an editor instance and using it

When you work with Outline, you normally work with a single editor instance. An editor instance can be created from the `outline` package and accepts
an optional configuration object that allows for theming and the passing of context:

```js
import {createEditor} from 'outline';

const config = {
  theme: {
    ...
  },
  context: {
    ...
  },
};

const editor = createEditor(config);
```

Once you have an editor instance, when ready, you can associate the editor instance with a content editable `<div>` element in your document:

```js
const contentEditableElement = document.getElementById('editor');

editor.setRootElement(contentEditableElement);
```

If you want to clear the editor instance from the element, you can pass `null`. Alternatively, you can switch to another element if need be,
just pass an alternative element reference to `setRootElement`.

## Understanding the View Model

TODO

## Updating an editor instance

There are two ways to update an editor instance, either with `editor.update()` or `editor.setViewModel()`. 

TODO

### Optional but recommended, use VSCode for development

1.  Download and install VSCode
    - Download from [here](https://code.visualstudio.com/download) (it’s recommended to use the unmodified version)

2. Install extensions
   - [Flow Language Support](https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode)
     - Make sure to follow the setup steps in the README
   - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
     - Set prettier as the default formatter in `editor.defaultFormatter`
     - Optional: set format on save `editor.formatOnSave`
   - [ESlint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Documentation

- [How Outline was designed](/docs/design.md)
- [Testing](/docs/testing.md)

## Contributing

1. Create a new branch
   - `git checkout -b my-new-branch`
2. Commit your changes
   - `git commit -a -m 'Description of the changes'`
     - There are many ways of doing this and this is just a suggestion
3. Push your branch to GitHub
   - `git push origin my-new-branch`
4. Go to the repository page in GitHub and click on "Compare & pull request"
   - The [GitHub CLI](https://cli.github.com/manual/gh_pr_create) allows you to skip the web interface for this step (and much more)

## Running tests

* `npm run test-unit` runs only unit tests.
* `npm run test-e2e:chromium` runs only chromium e2e tests.
* `npm run test-e2e:firefox` runs only firefox e2e tests.
* `npm run test-e2e:webkit` runs only webkit e2e tests.
