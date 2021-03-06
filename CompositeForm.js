// Generated by CoffeeScript 1.8.0
var CompositeFieldset, CompositeForm, Field, InputField, SelectField, TextareaField, addresFieldset, contactForm, nameFieldset,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

CompositeForm = (function() {
  function CompositeForm(id, method, action) {
    this.formComponents = [];
    this.element = document.createElement("form");
    this.element.id = id;
    this.element.method = method || "POST";
    this.element.action = action || "#";
  }

  CompositeForm.prototype.add = function(child) {
    this.formComponents.push(child);
    return this.element.appendChild(child.getElement());
  };

  CompositeForm.prototype.remove = function(child) {
    var component, i, _i, _len, _ref, _results;
    _ref = this.formComponents;
    _results = [];
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      component = _ref[i];
      if (!(component === child)) {
        continue;
      }
      this.formComponents.slice(i, 1);
      break;
    }
    return _results;
  };

  CompositeForm.prototype.getChild = function(n) {
    return this.formComponents[n];
  };

  CompositeForm.prototype.save = function() {
    var component, _i, _len, _ref, _results;
    _ref = this.formComponents;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      component = _ref[_i];
      _results.push(component.save());
    }
    return _results;
  };

  CompositeForm.prototype.restore = function() {
    var component, _i, _len, _ref, _results;
    _ref = this.formComponents;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      component = _ref[_i];
      _results.push(component.restore());
    }
    return _results;
  };

  CompositeForm.prototype.getElement = function() {
    return this.element;
  };

  return CompositeForm;

})();

CompositeFieldset = (function() {
  function CompositeFieldset(id, legendText) {
    this.components = {};
    this.element = document.createElement("fieldset");
    this.element.id = id;
    if (legendText) {
      this.legend = document.createElement("legend");
      this.legend.appendChild(document.createTextNode(legendText));
      this.element.appendChild(this.legend);
    }
  }

  CompositeFieldset.prototype.add = function(child) {
    this.components[child.id] = child;
    return this.element.appendChild(child.getElement());
  };

  CompositeFieldset.prototype.remove = function(child) {
    return delete this.components[child.id];
  };

  CompositeFieldset.prototype.getChild = function(id) {
    if (this.components[id]) {
      return this.components[id];
    }
  };

  CompositeFieldset.prototype.save = function() {
    var component, name, _ref, _results;
    _ref = this.components;
    _results = [];
    for (name in _ref) {
      if (!__hasProp.call(_ref, name)) continue;
      component = _ref[name];
      _results.push(component.save());
    }
    return _results;
  };

  CompositeFieldset.prototype.restore = function() {
    var component, name, _ref, _results;
    _ref = this.components;
    _results = [];
    for (name in _ref) {
      if (!__hasProp.call(_ref, name)) continue;
      component = _ref[name];
      _results.push(component.restore());
    }
    return _results;
  };

  CompositeFieldset.prototype.getElement = function() {
    return this.element;
  };

  return CompositeFieldset;

})();

Field = (function() {
  function Field(id) {
    this.id = id;
    this.element;
  }

  Field.prototype.add = function() {};

  Field.prototype.remove = function() {};

  Field.prototype.getChild = function() {};

  Field.prototype.save = function() {
    return setCookie(this.id, this.getValue);
  };

  Field.prototype.restore = function() {
    return this.element.value = getCookie(this.id);
  };

  Field.prototype.getElement = function() {
    return this.element;
  };

  Field.prototype.getValue = function() {
    throw new Error("Unsupported operation on the class Field.");
  };

  return Field;

})();

InputField = (function(_super) {
  __extends(InputField, _super);

  function InputField(id, label) {
    var labelTextNode;
    Field.call(this, id);
    this.input = document.createElement("input");
    this.input.id = id;
    this.label = document.createElement("label");
    labelTextNode = document.createTextNode(label);
    this.label.appendChild(labelTextNode);
    this.element = document.createElement("div");
    this.element.className = "input-field";
    this.element.appendChild(this.label);
    this.element.appendChild(this.input);
  }

  InputField.prototype.getValue = function() {
    return this.input.value;
  };

  return InputField;

})(Field);

TextareaField = (function(_super) {
  __extends(TextareaField, _super);

  function TextareaField(id, label) {
    var labelTextNode;
    Field.call(this, id);
    this.textarea = document.createElement("textarea");
    this.textarea.id = id;
    this.label = document.createElement("label");
    labelTextNode = document.createTextNode(label);
    this.label.appendChild(labelTextNode);
    this.element = document.createElement("div");
    this.element.className = "input-field";
    this.element.appendChild(this.label);
    this.element.appendChild(this.textarea);
  }

  TextareaField.prototype.getValue = function() {
    return this.textarea.value;
  };

  return TextareaField;

})(Field);

SelectField = (function(_super) {
  __extends(SelectField, _super);

  function SelectField(id, label) {
    var labelTextNode;
    Field.call(this, id);
    this.select = document.createElement("select");
    this.select.id = id;
    this.label = document.createElement("label");
    labelTextNode = document.createTextNode(label);
    this.label.appendChild(labelTextNode);
    this.element = document.createElement("div");
    this.element.className = "input-field";
    this.element.appendChild(this.label);
    this.element.appendChild(this.select);
  }

  SelectField.prototype.getValue = function() {
    return this.select.select.options[this.select.selectedIndex].value;
  };

  return SelectField;

})(Field);

contactForm = new CompositeForm("contact-form", "POST", "contact.php");

nameFieldset = new CompositeFieldset("name-fieldset");

nameFieldset.add(new InputField("first-name", "First Name"));

nameFieldset.add(new InputField("last-name", "Last Name"));

contactForm.add(nameFieldset);

addresFieldset = new CompositeFieldset("addres-fieldset");

addresFieldset.add(new InputField("addres", "Addres"));

addresFieldset.add(new InputField("city", "City"));

addresFieldset.add(new SelectField("state", "State", []));

addresFieldset.add(new InputField("zip", "Zip"));

contactForm.add(addresFieldset);

console.log(new InputField("first-name", "First Name").getElement().id);

contactForm.add(new TextareaField("comments", "Comments"));

document.body.appendChild(contactForm.getElement());

console.log(contactForm);
