/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {$getRoot, COMMAND_PRIORITY_LOW, KEY_MODIFIER_COMMAND} from 'lexical';
import {useEffect} from 'react';

export default function SelectAllPlugin(): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      KEY_MODIFIER_COMMAND,
      (event: KeyboardEvent) => {
        const {metaKey, code} = event;
        if (metaKey && code === 'KeyA') {
          const root = $getRoot();
          root.select(0, root.getChildrenSize());
          event.preventDefault();
          return true;
        }
        return false;
      },
      COMMAND_PRIORITY_LOW,
    );
  }, [editor]);

  return null;
}
