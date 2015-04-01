// Generated by CoffeeScript 1.8.0
var CalendarDay, CalendarItem, CalendarMonth, Car, CarFactory, CarRecordManage, DialogBox, DialogBoxManager, TooltipManager, calendarDay;

Car = (function() {
  function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  Car.prototype.getMake = function() {
    return this.make;
  };

  Car.prototype.getModel = function() {
    return this.model;
  };

  Car.prototype.getYear = function() {
    return this.year;
  };

  return Car;

})();

CarFactory = (function() {
  var createdCars;
  createdCars = {};
  return {
    createCar: function(make, model, year) {
      var data;
      data = "" + make + "-" + model + "-" + year;
      if (createdCars[data]) {
        return createCar[data];
      } else {
        return createdCars[data] = new Car(make, model, year);
      }
    }
  };
})();

CarRecordManage = (function() {
  var carRecordDatabase;
  carRecordDatabase = {};
  return {
    addRecordCar: function(make, model, year, owner, tag, renewDate) {
      return carRecordDatabase[tag] = {
        owner: owner,
        renewDate: renewDate,
        car: CarFactory.createdCar(make, model, year)
      };
    },
    transferOwnership: function(tag, newOwner, newTag, newRenewDate) {
      var record;
      record = carRecordDatabase[tag];
      record.owner = newOwner;
      record.tag = newTag;
      return record.renewDate = newRenewDate;
    },
    renewRegistration: function(tag, newRenewDate) {
      return carRecordDatabase[tag].renewDate = newRenewDate;
    },
    isRegistrationCurrent: function(tag) {
      var today;
      today = new Date();
      return today.getTime() < Date.parse(carRecordDatabase[tag].renewDate);
    }
  };
})();

CalendarDay = (function() {
  function CalendarDay() {}

  CalendarDay.prototype.display = function(date, parent) {
    var element;
    element = document.createElement("div");
    parent.appendChild(element);
    return this.element.innerHTML = date;
  };

  return CalendarDay;

})();

calendarDay = new CalendarDay;

CalendarMonth = (function() {
  function CalendarMonth(monthNum, numDays, parent) {
    var i, _i;
    this.monthNum = monthNum;
    this.element = document.createElement("div");
    this.element.style.display = "none";
    parent.appendChild(this.element);
    this.days = [];
    for (i = _i = 0; 0 <= numDays ? _i <= numDays : _i >= numDays; i = 0 <= numDays ? ++_i : --_i) {
      this.days[i] = calendarDay;
    }
  }

  CalendarMonth.prototype.display = function() {
    var day, _i, _len, _ref;
    _ref = this.days;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      day = _ref[_i];
      day.display(i, this.element);
    }
    return this.element.style.display = "block";
  };

  return CalendarMonth;

})();

CalendarItem = (function() {
  var i, isLeapYear, _i, _ref;

  function CalendarItem(year, parent) {
    this.year = year;
    this.element = document.createElement("div");
    this.element.style.display = "none";
    parent.appendChild(this.element);
  }

  isLeapYear = function(y) {
    return (y > 0) && !(y % 4) && ((y % 4) || !(y % 400));
  };

  CalendarItem.months = [];

  CalendarItem.numDays = [
    31, isLeapYear((_ref = CalendarItem.year) != null ? _ref : {
      29: 28
    }, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
  ];

  for (i = _i = 0; _i <= 12; i = ++_i) {
    CalendarItem.months[i] = new CalendarMonth(i, CalendarItem.numDays[i], CalendarItem.element);
  }

  CalendarItem.prototype.display = function() {
    var month, _j, _len, _ref1;
    _ref1 = this.months;
    for (_j = 0, _len = _ref1.length; _j < _len; _j++) {
      month = _ref1[_j];
      month.display();
    }
    return this.element.style.display = "block";
  };

  return CalendarItem;

})();

TooltipManager = (function() {
  var Tooltip, storedInstance;
  storedInstance = null;
  Tooltip = (function() {
    function Tooltip() {
      this.delayTimeout = null;
      this.delay = 1500;
      this.element = document.createElement("div");
      this.element.style.display = "none";
      this.element.style.position = "absolute";
      this.element.className = "tooltip";
      document.querySelector("body").appendChild(this.element);
    }

    Tooltip.prototype.startDelay = function(e) {
      var x, y;
      if (!this.delayTimeout) {
        x = e.clientX;
        y = e.clientY;
        return this.delayTimeout = setTimeout((function(_this) {
          return function() {
            return _this.show(x, y, text);
          };
        })(this), this.delay);
      }
    };

    Tooltip.prototype.show = function(x, y, text) {
      clearTimeout(this.delayTimeout);
      this.delayTimeout = null;
      this.element.innerHTML = text;
      this.element.style.left = "" + x + "px";
      this.element.style.top = "" + (y + 20) + "px";
      return this.element.style.display = "block";
    };

    Tooltip.prototype.hide = function() {
      clearTimeout(this.delayTimeout);
      this.delayTimeout = null;
      return this.element.style.display = "none";
    };

    return Tooltip;

  })();
  return {
    addTooltip: function(targetElement, text) {
      var tt;
      tt = this.getTooltip;
      addEvent(targetElement, "mouseover", (function(_this) {
        return function(e) {
          return tt.startDelay(e);
        };
      })(this));
      return addEvent(targetElement, "mouseout", (function(_this) {
        return function(e) {
          return tt.hide(e);
        };
      })(this));
    },
    getTooltip: function() {
      return storedInstance != null ? storedInstance : new Tooltip;
    }
  };
})();

DialogBox = (function() {
  function DialogBox() {}

  DialogBox.prototype.show = function(header, body, footer) {};

  DialogBox.prototype.hide = function() {};

  DialogBox.prototype.state = function() {};

  return DialogBox;

})();

DialogBoxManager = (function() {
  var created;
  created = [];
  return {
    displayDialogBox: function(header, body, footer) {
      var inUse;
      inUse = this.numberInUse();
      if (inUse > created.length) {
        created.push(this.createdDialogBox());
      }
      return created[inUse].show(header, body, footer);
    },
    createdDialogBox: function() {
      return new DialogBox;
    },
    numberInUse: function() {
      var create, inUse, _i, _len;
      inUse = 0;
      if (create.state() === "visible") {
        for (_i = 0, _len = created.length; _i < _len; _i++) {
          create = created[_i];
          inUse++;
        }
      }
      return inUse;
    }
  };
})();
