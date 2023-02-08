import { Component } from 'react';

export default class Notification extends Component<{
  preview?: boolean;
  showUndoRedo?: boolean;
  variables?: string[];
}> {
  getHtml: () => string;
  getJson: () => string;
  loadJson: (json: string | null) => string;
  undoredo: {
    undoActionCallback: () => void;
    redoActionCallback: () => void;
    isUndoEmpty: () => boolean;
    isRedoEmpty: () => boolean;
  };
}

export { Notification };
