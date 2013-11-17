/*

 */

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
		
	},
	
	fieldNames : function () {
		
		 return _.without(Object.keys(this.attributes), 'id');		
	},
	
	
	classMeta : function () {
		return metas;
	}
	
	
})



classes.System = classes.Base.extend({
	relations: [
	    {
			type: Backbone.HasMany,
			key: 'subsystem',
			relatedModel: 'classes.SubSystem'
	    },
	    {
			type: Backbone.HasMany,
			key: 'unit',
			relatedModel: 'classes.Unit'
	    },
	    {
			type: Backbone.HasMany,
			key: 'parameter',
			relatedModel: 'classes.Parameter'
	    },	    
	]
});


classes.SubSystem = classes.Base.extend({
	relations: [
	    {
			type: Backbone.HasOne,
			key: 'system',
			relatedModel: 'classes.System'
	    },
	    {
			type: Backbone.HasMany,
			key: 'componentDeployment',
			relatedModel: 'classes.ComponentDeployment'
	    },
	    {
			type: Backbone.HasMany,
			key: 'parameterInteraction',
			relatedModel: 'classes.ParameterInteraction'
	    },	    
	]
});



classes.SensorDeployment = classes.Base.extend({
	relations: [
	    {
			type: Backbone.HasOne,
			key: 'parameter',
			relatedModel: 'classes.Parameter'
	    },
	    {
			type: Backbone.HasOne,
			key: 'unit',
			relatedModel: 'classes.Unit'
	    },
	    {
			type: Backbone.HasOne,
			key: 'dimension',
			relatedModel: 'classes.Dimension'
	    },	    
	]
});



classes.FleetEquipment = classes.Base.extend({
	relations: [
	    {
			type: Backbone.HasOne,
			key: 'fleet',
			relatedModel: 'classes.Fleet'
	    },
	    {
			type: Backbone.HasOne,
			key: 'unit',
			relatedModel: 'classes.Unit'
	    } 
	]
});



classes.Unit = classes.Base.extend({
	relations: [
	    {
	    	type: Backbone.HasOne,
	    	key: 'system',
	    	relatedModel: 'classes.System'
	    },	            
	    {
			type: Backbone.HasMany,
			key: 'fleetEquipment',
			relatedModel: 'classes.FleetEquipment'
	    },
	    {
			type: Backbone.HasMany,
			key: 'sensorDeployment',
			relatedModel: 'classes.SensorDeployment'
	    },
	    {
			type: Backbone.HasMany,
			key: 'componentDeployment',
			relatedModel: 'classes.ComponentDeployment'
	    },	    
	]
});



classes.ComponentDeployment = classes.Base.extend({
	relations: [
	    {
			type: Backbone.HasOne,
			key: 'subsystem',
			relatedModel: 'classes.SubSystem'
	    },
	    {
			type: Backbone.HasOne,
			key: 'unit',
			relatedModel: 'classes.Unit'
	    },	    
	]
});


classes.ComponentDeployment = classes.Base.extend({
	relations: [
	    {
			type: Backbone.HasOne,
			key: 'subsystem',
			relatedModel: 'classes.SubSystem'
	    },
	    {
			type: Backbone.HasOne,
			key: 'unit',
			relatedModel: 'classes.Unit'
	    },	    
	]
});


classes.PhysicalQuantity = classes.Base.extend({	
});


classes.Fleet = classes.Base.extend({	
});


classes.Parameter = classes.Base.extend({
	relations: [
	    {
			type: Backbone.HasOne,
			key: 'system',
			relatedModel: 'classes.System'
	    },
	    {
			type: Backbone.HasOne,
			key: 'physicalQuantity',
			relatedModel: 'classes.PhysicalQuantity'
	    }	    
	]
});


classes.ParameterInteraction = classes.Base.extend({
	
	
	
	relations: [
	    {
			type: Backbone.HasOne,
			key: 'subsystem',
			relatedModel: 'classes.SubSystem'
	    },
	    {
			type: Backbone.HasOne,
			key: 'parameter',
			relatedModel: 'classes.Parameter'
	    }	    
	]
});


classes.Dimension = classes.Base.extend({
	relations: [	   
	    {
			type: Backbone.HasOne,
			key: 'physicalQuantity',
			relatedModel: 'classes.PhysicalQuantity'
	    }	    
	]
});




console.log("loaded br");

/*
var aPhysicalQuantity = new PhysicalQuantity({
	"id":"Q0Av1RBvbJHXeXbA5kTh9Y75TX0",
	"title":"flow_vs_pressure"
});

alert(aPhysicalQuantity);

*/
