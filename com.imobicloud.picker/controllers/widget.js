var controllers = [];

/*
 args = {
 	columns: [{
 		classes: '',
 		title: '', // string or undefined
 		template: '', // 'title', 'icon' or 'icon-title'
 		rows: [{
 			id: '',
 			icon: '',
 			title: ''
 		}],
 		selectedRow: 0 // row index
 	}]
 }
 
 $.datePicker.on('picker:change', function(e) {
	var item = e.section.getItemAt(e.rowIndex);
	item.properties.accessoryType = e.isSelected ? Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK : Ti.UI.LIST_ACCESSORY_TYPE_NONE;
	e.section.updateItemAt(e.rowIndex, item);
});
 * */
exports.init = function (args) {
	for(var i=0,ii=args.columns.length; i<ii; i++){
		var column = args.columns[i];
		column.columnIndex = i;
		
		var controller = Widget.createController('column', column);
		controllers.push(controller);  	
	  	
	  	$.picker.add( controller.getView() );
	};
};

exports.unload = function() {
	for(var i = 0, ii = controllers.length; i < ii; i++) {
      	controllers[i].unload();
    };
    controllers.length = 0;
};

exports.reset = function () {
    for(var i = 0, ii = controllers.length; i < ii; i++) {
      	controllers[i].reset();
    };
};

exports.setSelectedRow = function(columnIndex, rowIndex, animated) {
	controllers[columnIndex] && controllers[columnIndex].setSelectedRow(rowIndex, animated);
};

exports.getSelectedRow = function(columnIndex) {
	return controllers[columnIndex] ? controllers[columnIndex].getSelectedRow() : null;
};

exports.getSelectedRows = function() {
	var selectedRows = [];
	for(var i = 0, ii = controllers.length; i < ii; i++) {
      	selectedRows.push( controllers[i].getSelectedRow() );
    };
	return selectedRows;
};

// EVENTS

exports.on = function(type, callback) {
	for(var i = 0, ii = controllers.length; i < ii; i++) {
		controllers[i].on(type, callback);
    };
  	return this;
};