#Top Level:
    
    entityMeta:

        name: The name of this entity. Capitalized with Camel Case. 
            ::= <string>
        description: The description of this entity.
            ::= <string>
        inherits: The parent entity in which this entity inherits from if any.
            ::= <entity>
        access: The access level of this entity, for 0 being lowest. 
            ::= <digit>         
        since: Which version at which this entity is introduced. 
            ::= <digit>
        label: The UI display label for this entity.
            ::= <string>
        abstract: Indicates if this entity is abstract. For example Abstract, Base or Primitive entities are abstract entities.
            ::= <boolean>


    fieldMetas:

        name: The name of this field. Lowercase with CamelCase. (ie theField).  Carries suffix "List" for "hasMany" relation fields. (ie theFieldList). 
            ::= <string>
        description: The description of this field.
            ::= <string>        
        hasMany: When present, indicates the field has oneToMany relationship.  
            ::= "forward" | "backward" | "bidirectional" 
        type: The type of entity for this field.
            ::= <string>
        required: Indicates if this field is required.
            ::= <boolean>    
        unique:  Indicates if this value is unique. 
            ::= <boolean>
        default: The default value of this field. ie. number:-1, string:"", array:[], reference:null, object:{}, boolean:false
            ::=  <boolean> | <digits> | <string> | "[]" | "null" | "{}" 
        final: Indicates if this field value final once created. i.e. readOnly.
            ::= <boolean>
        access: The access level of this field, for 0 being lowest.
            ::= <integer>
        since: The version at which this field is introduced.
            ::= <integer>
        label: The UI display label for this field.
            ::= <string>
        rank: The displaying rank of this field.
            ::= <integer> 
        visible: Indicate if this field is visible.
            ::= <boolean>

