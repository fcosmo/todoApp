

var classes = {};

classes.Base = Backbone.RelationalModel.extend({

	isRelation : function (field) {
		var aRelation = this._relations[field];

		if (typeof aRelation === "undefined" || aRelation === null) {
			return false;
		}

		var test = aRelation instanceof Backbone.Relation;
		return test;	
	},

	typeOf : function (field) {

		if (field === "id") {
			return "Id";
		}			

		var aRelation = this._relations[field];

		if (typeof aRelation === "undefined" || aRelation === null) {
			return "Value";
		}		

		if (aRelation instanceof Backbone.HasMany) {
			return "HasMany";
		}

		if (aRelation instanceof Backbone.HasOne) {
			return "HasOne";
		}

		return "Null"
	}
})


var metas = {};

var metaService =  function (data) {
	// for each meta file parse
	for (var i = 0; i < data.length; i++) {

		// parse file that contains array of metas
		if (data[i] instanceof Array) {
			for (var j = 0; j < data[i].length; j++) {
				var metaObject = data[i][j];
				var metaName = metaObject.entityMeta.name;																
				metas[metaName] = metaObject;							
			}
		}
		else {
			// parse file that contains just one meta
			var metaObject = data[i];
			var metaName = metaObject.entityMeta.name;																
			metas[metaName] = metaObject;						
		}												
	}			


	// for each meta, resolve fieldMeta inheritance from superclass, 
	// ie. push fieldMetas to subclasses
	for (metaName in metas) {
		var inheritedFields = [];									
		var extendsClass = metas[metaName].entityMeta.inherits;
		// note. this is doing from bottom to top, should probably do top to bottom using stack
		while (typeof extendsClass !== "undefined") {						
			inheritedFields = inheritedFields.concat(metas[extendsClass].fieldMetas);	
			extendsClass = metas[extendsClass].entityMeta.inherits;
		}			
		metas[metaName].fieldMetas = metas[metaName].fieldMetas.concat(inheritedFields);												
	}


	// resolve fieldMeta's class to their actual class, also create an convenience fieldMeta map by name
	for (metaName in metas) {
		if (metaName.charAt(0) == '$') {
			continue;
		}
		var fieldMetas = metas[metaName].fieldMetas;
		metas[metaName].fieldMetaMap = {};
		for (var i = 0; i < fieldMetas.length; i++) {
			var fieldMeta = fieldMetas[i];
			var fieldMetaClass = fieldMeta.type;

			// since fieldMeta share same reference to the class, so if it hasn't be converted (i.e. still a string) then do conversion
			if (typeof fieldMetaClass === "string") {						

				// note. for primitive we should create new instance, with different parameter value, for now one global
				if (fieldMetaClass.charAt(0) == '$') {
					fieldMetaClass = fieldMetaClass.split('(')[0];
					fieldMetas[i].type = metas[fieldMetaClass];							
				}
				else {
					// else it's regular class, point to same global value
					fieldMetas[i].type = metas[fieldMetaClass];														
				}
			}		

			metas[metaName].fieldMetaMap[fieldMeta.name] = fieldMeta;
		}

	}




	// generate backbone relation models
	for (var metaName in metas) {									

		var meta = metas[metaName];

		if (meta.entityMeta['abstract']) {
			continue;
		}					

		classes[meta.entityMeta.name] = (function (meta) {

			// define defaults
			var defaults = {};
			for (var i = 0; i < meta.fieldMetas.length; i++) {							
				var fieldMeta = meta.fieldMetas[i];				
				defaults[fieldMeta.name] = fieldMeta["default"];							
			}						

			// define relations
			var relations = [];
			for (var i = 0; i < meta.fieldMetas.length; i++) {

				var fieldMeta = meta.fieldMetas[i];

				if (!fieldMeta.type.entityMeta['abstract']) {
					var aRelation = {
							type: fieldMeta.hasMany ? Backbone.HasMany : Backbone.HasOne,
									key: fieldMeta.name,
									relatedModel : 'classes.' + fieldMeta.type.entityMeta.name
					}

					relations.push(aRelation);
				}
			}

			var relationalModel = classes.Base.extend({"relations":relations,"defaults":defaults});


			// meta static util functions	


			// return fieldNames that are visible and in ranking order
			meta.fieldNames = (function () {
				// self-caching
				var fieldNames = null;								
				return function () {									
					if (fieldNames == null) {
						var fieldMetas = this.fieldMetas;

						fieldMetas = _.reject(fieldMetas, function (aFieldMeta) {
							return aFieldMeta.visible == false;
						});		

						fieldMetas = _.sortBy(fieldMetas, function (aFieldMeta) {
							return aFieldMeta.rank;
						});

						fieldNames = _.pluck(fieldMetas, "name");									
					}																						
					return fieldNames;		
				}

			})();


			// label for fields
			meta.labelForFieldMeta = function (fieldName) {		
				var fieldEntityTypeLabel = this.fieldMetaMap[fieldName].type.entityMeta.label;
				var fieldLabel = this.fieldMetaMap[fieldName].label;
				//return this.fieldMetaMap[fieldName].type.entityMeta.label;
				return fieldLabel;
			};



			// make both class and instance to have method meta
			relationalModel.prototype.meta = function () {
				return meta;
			};
			relationalModel.meta = function () {
				return meta;
			}
			return relationalModel;


		}) (meta);

	}

}	



var models = {};

var modelService = function (data) {

	var cap = function (string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};
	
	for (var i = 0; i < data.length; i++) {
		for (var key in data[i]) {

			var className = cap(key);
			var theClass = classes[className];
			var theAttributesList = data[i][key];

			var instanceCollection = [];

			for (var j = 0; j < theAttributesList.length; j++) {
				var theAttributes = theAttributesList[j];

				var duplicate = _.find(instanceCollection, function (instance) {
					return instance.id == theAttributes.id;
				});

				if (duplicate) {
					continue;
				}

				try {
					var anInstance = new theClass(theAttributes);
					instanceCollection.push(anInstance);	
				}
				catch (err) {
					alert(className + err);
				}
			}
			models[className] = instanceCollection;
		}					
	}				
}
