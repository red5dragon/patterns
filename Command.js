// Generated by CoffeeScript 1.8.0
var TextArea, TextCommander, TextExecuteButton, TextInputButton, TextInsertCommand, TextRedoButton, TextUndoButton, area, executeButton, insertCommand, redoButton, textInput, undoButton;

TextArea = (function() {
  function TextArea(parent, width, height, placeholder) {
    this.width = width;
    this.height = height;
    this.placeholder = placeholder;
    this.element = document.createElement("textarea");
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
    this.element.placeholder = placeholder;
    parent.appendChild(this.element);
  }

  return TextArea;

})();

TextInsertCommand = (function() {
  function TextInsertCommand(area, text) {
    this.area = area != null ? area : area.element;
    this.text = text;
  }

  TextInsertCommand.prototype.execute = function() {
    return this.area.element.value += this.text;
  };

  TextInsertCommand.prototype.unExecute = function() {
    return this.area.element.value = this.area.element.value.slice(0, this.area.element.value.length - this.text.length);
  };

  return TextInsertCommand;

})();

TextCommander = (function() {
  function TextCommander() {
    this.commands = [];
    this.count = 0;
  }

  TextCommander.prototype.execute = function(command) {
    this.commands[this.count] = command;
    command.execute();
    return this.count++;
  };

  TextCommander.prototype.redo = function() {
    if (this.count < this.commands.length) {
      this.count++;
      return this.commands[this.count - 1].execute();
    }
  };

  TextCommander.prototype.undo = function() {
    if (this.count > 0) {
      this.commands[this.count - 1].unExecute();
      return this.count--;
    }
  };

  return TextCommander;

})();

TextInputButton = (function() {
  function TextInputButton(parent, placeholder) {
    this.parent = parent;
    this.placeholder = placeholder;
    this.element = document.createElement("input");
    this.element.placeholder = this.placeholder;
    this.parent.appendChild(this.element);
  }

  return TextInputButton;

})();

TextExecuteButton = (function() {
  function TextExecuteButton(parent, name, input, commander) {
    this.parent = parent;
    this.name = name;
    this.input = input;
    this.element = document.createElement("button");
    this.element.innerHTML = this.name;
    this.parent.appendChild(this.element);
    this.element.addEventListener("click", (function(_this) {
      return function() {
        commander.execute(new TextInsertCommand(area, _this.input.element.value));
        return _this.input.element.value = "";
      };
    })(this));
  }

  return TextExecuteButton;

})();

TextUndoButton = (function() {
  function TextUndoButton(parent, name, commander) {
    this.parent = parent;
    this.name = name;
    this.element = document.createElement("button");
    this.element.innerHTML = this.name;
    this.parent.appendChild(this.element);
    this.element.addEventListener("click", function() {
      return commander.undo();
    });
  }

  return TextUndoButton;

})();

TextRedoButton = (function() {
  function TextRedoButton(parent, name, commander) {
    this.parent = parent;
    this.name = name;
    this.element = document.createElement("button");
    this.element.innerHTML = this.name;
    this.parent.appendChild(this.element);
    this.element.addEventListener("click", function() {
      return commander.redo();
    });
  }

  return TextRedoButton;

})();

area = new TextArea(document.body, 300, 100, "text-area");

insertCommand = new TextCommander;

textInput = new TextInputButton(document.body, "input text here");

executeButton = new TextExecuteButton(document.body, "Insert text", textInput, insertCommand);

undoButton = new TextUndoButton(document.body, "Undo", insertCommand);

redoButton = new TextRedoButton(document.body, "Redo", insertCommand);