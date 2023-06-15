/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {
  $getRoot,
  $getSelection,
  $isDecoratorNode,
  $isRangeSelection,
  $isTextNode,
  COMMAND_PRIORITY_LOW,
  KEY_MODIFIER_COMMAND,
} from 'lexical';
import {useEffect} from 'react';

export default function SelectAllPlugin(): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      KEY_MODIFIER_COMMAND,
      (event: KeyboardEvent) => {
        const {metaKey, code} = event;
        if (metaKey && code === 'KeyA') {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const root = $getRoot();
            const firstNode = root.getFirstChildOrThrow();
            const lastNode = root.getLastChildOrThrow();

            if (firstNode && lastNode) {
              if (!$isDecoratorNode(firstNode)) {
                const firstChild = firstNode.getFirstChild();
                if ($isTextNode(firstChild)) {
                  selection.anchor.set(firstChild.getKey(), 0, 'text');
                }
              } else {
                selection.anchor.set('root', 0, 'element');
              }

              if (!$isDecoratorNode(lastNode)) {
                const lastChild = lastNode.getLastChild();
                if ($isTextNode(lastChild)) {
                  selection.focus.set(
                    lastChild.getKey(),
                    lastChild.getTextContentSize(),
                    'text',
                  );
                }
              } else {
                selection.focus.set(
                  'root',
                  lastNode.getIndexWithinParent() + 1,
                  'element',
                );
              }
              event.preventDefault();
              return true;
            }
          }
        }
        return false;
      },
      COMMAND_PRIORITY_LOW,
    );
  }, [editor]);

  return null;
}
